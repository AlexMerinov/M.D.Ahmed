// Slide Advantsges ------------------------------>
const advantagesSlider = new Swiper('.advantages-slider', {
   // Optional parameters
   slidesPerView: 1.4,
   spaceBetween: 20,

   breakpoints: {
      768: {
         slidesPerView: 2.3,
      },

      1364: {
         slidesPerView: 4,
      }
   },

 });

// Close All Popups Function

const closeAllPopups = () => {
    const popups = document.querySelectorAll('.popup');
    if (popups) {
        popups.forEach((popup) => {
            popup.classList.remove('popup--active');
            body.classList.remove('lock');
        });
    }
};

//label-------------------------label=----------------->

   const labelBtn   = document.querySelector('.label__btn');
   const labelClose = document.querySelector('.label__close');
   const label      = document.querySelector('.label');

   if (label) {
      labelBtn.addEventListener('click', () => {
         label.classList.remove('label--active');
      });

      labelClose.addEventListener('click', () => {
         label.classList.remove('label--active');
      });
   }


//Scroll-------------------------button----------------->

   const btnFixed = document.querySelector('.btn-fixed');

   if (btnFixed) {
      window.addEventListener('scroll', () => {
         function animOnScroll() {
            const btnFixedHeight = btnFixed.offsetHeight;
            const btnFixedOffset = offset(btnFixed).top;
            const animStart = 1.5;
   
            let btnFixedPoint = window.innerHeight - btnFixedHeight * animStart;
   
            if ((window.pageYOffset > btnFixedOffset - btnFixedPoint) && window.pageYOffset > 0  && window.pageYOffset < (btnFixedOffset + btnFixedHeight)) {
               btnFixed.classList.add('btn-fixed--active');
            } else {
                  btnFixed.classList.remove('btn-fixed--active');
            }
         };
       
         function offset(el) {
            const rect = el.getBoundingClientRect();
               scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
               scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
            return {
               top: rect.top + scrollTop, 
               left: rect.left + scrollLeft
            }
         }
         animOnScroll();
      });
   };


 //-------------------burger--------------------

   const menu = document.querySelector('.menu');
   const navList = document.querySelector('.nav__list');

   menu.addEventListener('click', () => {
     let isOpenedPopup = false;
     const popups = document.querySelectorAll('.popup');
     if (popups) {
       popups.forEach((popup) => {
           if (popup.classList.contains('popup--active')) {
               isOpenedPopup = true;
               popup.classList.remove('popup--active');
               body.classList.remove('lock');
           }
       });
     }

     const labels = document.querySelectorAll('.label');
     if (labels) {
      labels.forEach((label) => {
           if (label.classList.contains('label--active')) {
               isOpenedPopup = true;
               label.classList.remove('label--active');
               body.classList.remove('lock');
           }
       });
     }

     menu.classList.toggle('menu--active');
       if (!isOpenedPopup) {
           navList.classList.toggle('nav__list--active');
       }
   });

   const navLinks = document.querySelectorAll(".nav__link");
   navLinks.forEach(function (item) {
      item.addEventListener("click", function () {

         let navItems = document.querySelectorAll(".nav__item");
         navItems.forEach(function (item) {
            item.classList.remove('nav__item--active');
         })

         item.closest('.nav__item').classList.add('nav__item--active');

         menu.classList.remove('menu--active');
         navList.classList.remove('nav__list--active');
   
      });
   });
   


//scroll------------------------------>
const anchors = document.querySelectorAll('.js-anchor');
if (anchors) {
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const headerHeight = document.documentElement.clientWidth <= 1364 ? document.querySelector('.header').offsetHeight :  0;
            const top = document.querySelector(anchor.getAttribute('href')).offsetTop - headerHeight - 10;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        })
    }
}

//Accordion cards ----------------------->
   if (document.body.clientWidth < 1344) {
      const operationCards = Array.from(document.querySelectorAll('.card-operation'));

      operationCards.forEach((operationCard) => {
         operationCard.addEventListener('click', cardOpen);
      });

      function cardOpen(e) {
         e.preventDefault();
         let currentCard = e.target.closest('.card-operation');
         let currentDesc = e.target.nextElementSibling;
         currentCard.classList.toggle('card-operation--visible');
         if (currentCard.classList.contains('card-operation--visible')) {
            currentDesc.style.maxHeight = currentDesc.scrollHeight + "px";
         } else {
            currentDesc.style.maxHeight = 0;
         }
      }
   }


   const fixBlocks = document.querySelectorAll('.fix-block');

   const disableScroll = function () {
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
      document.body.classList.add('disable--scroll');
      fixBlocks.forEach((el) => {
         el.style.paddingRight = paddingOffset;
      });
      document.body.style.paddingRight = paddingOffset;
   }

   const enableScroll = function () {
      document.body.classList.remove('disable--scroll');
      fixBlocks.forEach((el) => {
         el.style.paddingRight = '0px';
      });
      document.body.style.paddingRight = '0px';
   }



  
  // Open Popup
   const body = document.querySelector('body');
   const openPopupButtons = document.querySelectorAll('[data-open-popup]');
   if (openPopupButtons) {
       openPopupButtons.forEach((openPopupButton) => {
           openPopupButton.addEventListener('click', (event) => {

               disableScroll();

               event.preventDefault();
               const popupName = event.target.dataset.openPopup;
               const popups = document.querySelectorAll('.popup');
               if (popups) {
                   popups.forEach((popup) => {
                       if (popup.dataset.popupName == popupName) {
                           popup.classList.add('popup--active');
                           body.classList.add('lock');
                           if (document.documentElement.clientWidth < 769) {
                               menu.classList.toggle('menu--active');
                           }
                       } else {
                           body.classList.remove('lock');
                       }
                   });
               }
           });
       });

      
   }


   // Close Popup After Button Click

   const closePopupButtons = document.querySelectorAll('[data-close-popup]');
   if (closePopupButtons) {
       closePopupButtons.forEach((closePopupButton) => {
           closePopupButton.addEventListener('click', (event) => {
               enableScroll();
               event.preventDefault();
               closeAllPopups();
           });
       });
   }

   // Close Popup After Outside Click

   const popups = document.querySelectorAll('.page__popup');
   if (popups) {
       popups.forEach((popup) => {
           popup.addEventListener('mousedown', (event) => {
               if (!event.target.closest('.popup__window')) {
                  enableScroll();
                  event.preventDefault();
                  closeAllPopups();
               }
           });
       });
   }

   // Close Popups After "Escape" Key Press

   document.addEventListener('keydown', (event) => {
       if (event.key == 'Escape') {
            enableScroll();
            event.preventDefault();
            closeAllPopups();
       }
   });


   // ----------------------------mask---------------------------------------


let element = document.getElementById('phone');
let maskOptions = {
  mask: '+{7}(000)000-00-00'
};
let mask = IMask(element, maskOptions);

