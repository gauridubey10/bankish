'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const  btnScrollTo=document .querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
  // const s1cords=section1.getBoundingClientRect()
  // console.log(s1cords);
  // console.log(" ddd ");
  // console.log(e.target.getBoundingClientRect());

  // console.log('.current scroll (X/Y)',window.pageYOffset);

   section1.scrollIntoView({behavior:'smooth'});

});

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});



//rgb(255,255,255);
// const randomInt = (min,max) =>
//   Math.floor(Math.random()*(max-min+1) + min);

//   const randomcolor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)} )`;


//   document.querySelector('.nav__link').addEventListener('click',function(e){
//     this.style.backgroundColor=randomcolor();
//     console.log('nav_link');
//     e.stopPropagation();
//   });

//   document.querySelector('.nav__links').addEventListener('click',function(e){
//     this.style.backgroundColor=randomcolor();
//     console.log('nav_link');

//   });

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');

//console.log(tabsContent);

tabsContainer.addEventListener('click',function(e){
 const clicked=e.target.closest('.operations__tab');

 if(!clicked)return ;
 
 //remove tab active
 tabs.forEach(t=>t.classList.remove('operations__tab--active'));
 tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
//add tab activate
 clicked.classList.add('operations__tab--active');

  //activate content area
  console.log(clicked.dataset.tab);
 document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//menu fade animation

const nav=document.querySelector('.nav');

const handleHover=function(e){

  if(e.target.classList.contains('nav__link')){
    const link =e.target;
    const sibling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    //console.log(sibling);
 
    sibling.forEach(el=>{
      if(el!=link)el.style.opacity=this;
    });
     logo.style.opacity=this;
   } 
}

nav.addEventListener('mouseover',handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));

// //sticky navigation
// const initialcords=section1.getBoundingClientRect();

// //console.log(initialcords.top);
// window.addEventListener('scroll',function(){
//  // console.log(window.scrollY);

//   if(window.scrollY>initialcords.top)nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//sticky navigation using api

const header=document.querySelector('.header');
const navheight=nav.getBoundingClientRect().height;
 //console.log(navheight);

const stickyNav = function(entries){
 // console.log(entries);
  const [entry]=entries; // is equal to entries[0];

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0.1,
  rootMargin: `-${navheight}px`,
});

headerObserver.observe(header);

//reveal section
const allSection=document.querySelectorAll('.section');

const revealSection = function(entries,observer){
     const [entry]=entries;

     if(!entry.isIntersecting)return ;
     entry.target.classList.remove('section--hidden');
     observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function(section){
 sectionObserver.observe(section);
 //section.classList.add('section--hidden');
});


//lazy loading  images
const imgTargets=document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg=function (entries,observer){
  const [entry]=entries;
  //console.log(entry);

  if(!entry.isIntersecting)return ;
  entry.target.src=entry.target.dataset.src;
  
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });
   
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg , {
  root:null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//slider 
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();