
/*============================  typed js =============================*/
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Web Designer', 'Wordpress Developer', 'SEO Optimizer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
    

});


/*============================  Toogle menu for responsiveness =============================*/
const menuIcon = document.getElementById('menu-icon');
const navList = document.getElementById('nav__overlay');
const navLinks = document.querySelectorAll('.nav__link , .nav__end');

menuIcon.addEventListener('click', () => {
    navList.classList.toggle('active'); 
    menuIcon.classList.toggle('fa-xmark');   
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');  
        menuIcon.classList.remove('fa-xmark');   
    });
});

function confirmAction(event) {
  const userConfirmed = confirm("Do you want to open external site?");
  if (!userConfirmed) {
      event.preventDefault();
      return false; 
  }
  return true;
}


/*====================================   ABOUT TABS ==========================================*/
const tabs = document.querySelectorAll('[data-target'),
tabContents = document.querySelectorAll('[data-content');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('tab__active');
        });

        target.classList.add('tab__active');

        tabs.forEach((tab) => {
            tab.classList.remove('tab__active');
        });

        tab.classList.add('tab__active');
    });
});



/*====================================   Testimonial Scroll Effect ==========================================*/
let swiper = new Swiper('.testimonials__container', {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,               
      disableOnInteraction: false, 
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        800: {
            slidesPerView: 1,
        },
        900: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
        

    },
});


const swiperContainer = document.querySelector('.testimonials__container');

swiperContainer.addEventListener('mouseenter', () => {
  swiper.autoplay.stop();
});

swiperContainer.addEventListener('mouseleave', () => {
  swiper.autoplay.start();
});


/*==============================  ABOUT IMAGE SLIDER =============================*/
const slides = document.querySelectorAll('.about__slide');
const prev = document.querySelector('.about__prev');
const next = document.querySelector('.about__next');
let currentSlide = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('about__active');
    if (i === index) {
      slide.classList.add('about__active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Automatic slideshow
function startSlideshow() {
  intervalId = setInterval(nextSlide, 6000);
}

function stopSlideshow() {
  clearInterval(intervalId);
}

// Event listeners
next.addEventListener('click', () => {
  stopSlideshow();
  nextSlide();
  startSlideshow();
});

prev.addEventListener('click', () => {
  stopSlideshow();
  prevSlide();
  startSlideshow();
});

document.querySelector('.about__slideshow').addEventListener('mouseenter', stopSlideshow);
document.querySelector('.about__slideshow').addEventListener('mouseleave', startSlideshow);

// Initialize slideshow
showSlide(currentSlide);
startSlideshow();



/*==========================  SERVICES MODAL ==============================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modelBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close , .service__modal-explore')

let modal = function(modalClick) {
  modalViews[modalClick].classList.add("active-modal")
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
      modal(i)
    })
})

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active-modal')
    })
  })
})



/*==========================  Mixitup Filter ==============================*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card'
  },
  animation: {
    duration: 300
  }
});

/*==== Link Active Work ===*/
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
  linkWork.forEach(l => l.classList.remove("active-work"))
  this.classList.add("active-work")
}

linkWork.forEach(l => l.addEventListener('click', activeWork))



/*==========================  Work Popup ==============================*/document.addEventListener('click', (e) => {
  if (e.target.classList.contains('work__button')) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
    updateGitHubRepoButton(e.target.parentElement); // Add GitHub button functionality
  }
});

function togglePortfolioPopup() {
  document.querySelector('.portfolio__popup').classList.toggle('open');
}

document.querySelector('.portfolio__popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  const image = portfolioItem.querySelector('.work__img').src;

  const thumbnailContainer = document.querySelector('.pp__thumbnail');
  thumbnailContainer.innerHTML = `<img src="${image}" alt="Project Image" class="portfolio__popup-img">`;

  document.querySelector('.portfolio__popup-subtitle span').innerHTML = portfolioItem.querySelector('.work__title').innerHTML;
  document.querySelector('.portfolio__popup-body').innerHTML = portfolioItem.querySelector('.portfolio__item-details').innerHTML;
}

// Function to update the GitHub Repo button
function updateGitHubRepoButton(portfolioItem) {
  const githubLink = portfolioItem.querySelector('.github-link'); // Find GitHub link in the card
  const githubRepoButton = document.querySelector('.github-repo-btn'); // Button in the popup

  if (githubLink) {
    githubRepoButton.href = githubLink.href; // Update the button href
    githubRepoButton.style.display = 'inline-block'; // Make the button visible
  } else {
    githubRepoButton.style.display = 'none'; // Hide the button if no GitHub link
  }
}

// Existing responsive behavior for about section
const aboutToggleButton = document.querySelector('.about-toggle');
const infoSection = document.querySelector('.portfolio__popup-info');

function handleHoverEffect() {
  aboutToggleButton.addEventListener('mouseenter', () => {
    infoSection.classList.remove('about_hidden');
  });

  aboutToggleButton.addEventListener('mouseleave', () => {
    infoSection.classList.toggle('about_hidden');
  });
}

function handleClickEffect() {
  aboutToggleButton.addEventListener('click', () => {
    infoSection.classList.toggle('active');
  });
}

function updateBehaviorBasedOnScreenSize() {
  if (window.innerWidth <= 800) {
    handleClickEffect();
    infoSection.classList.remove('about_hidden');
  } else {
    handleHoverEffect();
    aboutToggleButton.removeEventListener('click', handleClickEffect);
  }
}

window.addEventListener('load', updateBehaviorBasedOnScreenSize);
window.addEventListener('resize', updateBehaviorBasedOnScreenSize);



/*======================  Portfolio Filters Scrolling =============================*/
const workFilters = document.querySelector('.work__filters');

// Optional: Enable dragging for horizontal scroll
let isDown = false;
let startX;
let scrollLeft;

workFilters.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - workFilters.offsetLeft;
    scrollLeft = workFilters.scrollLeft;
});

workFilters.addEventListener('mouseleave', () => {
    isDown = false;
});

workFilters.addEventListener('mouseup', () => {
    isDown = false;
});

workFilters.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - workFilters.offsetLeft;
    const walk = (x - startX) * 2; //scroll speed
    workFilters.scrollLeft = scrollLeft - walk;
});



/* ============================  horizontal scrolling of work card by moving curosr on it ============================ */

document.querySelectorAll('.scrollable').forEach(container => {
  const img = container.querySelector('img');

  const stopScroll = () => {
      img.style.animation = 'none'; 
  };

  const startScroll = () => {
      img.style.animation = 'scroll-image 10s linear infinite'; 
  };

  container.addEventListener('mouseenter', startScroll);

  container.addEventListener('mouseleave', stopScroll);

  stopScroll();
});




/* ============================  skills tabs toggling ============================ */

function openTab(tabName) {
  document.querySelectorAll('.skills__tab-buttons div').forEach(button => button.classList.remove('skills__active'));
  document.querySelectorAll('.skills__tab-content').forEach(content => content.classList.remove('skills__active'));

  document.getElementById(tabName + '-tab').classList.add('skills__active');
  document.getElementById(tabName).classList.add('skills__active');
}

function toggleDetails(skillItem) {
  const details = skillItem.querySelector('.skills-details');
  if (details.style.display === "block") {
      details.style.display = "none";
  } else {
      details.style.display = "block";
  }
}




/*====================================   Email sent form ==========================================*/

    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault(); 
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
  
      emailjs
        .send('service_nzcvjqz', 'template_yhxudk9', {
          name: name,
          email: email,
          subject: subject,
          message: message,
        })
        .then(() => {
          document.getElementById('emailPopup').style.display = 'flex';
          document.getElementById('contactForm').reset();
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Failed to send message. Please try again.');
        });
    });
  
    function closePopup() {
      document.getElementById('emailPopup').style.display = 'none';
    }


