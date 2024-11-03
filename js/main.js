document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let counter = 0;

    function updateSize() {
        return images[0].clientWidth;
    }
    
    function updateCarousel() {
        const size = updateSize();
        slider.style.transform = `translateX(${-size * counter}px)`;
    }

    // Crear dots
    images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Funciones de navegación
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[counter].classList.add('active');
    }
    
    function goToSlide(index) {
        counter = index;
        updateCarousel();
        updateDots();
    }
    
    function nextSlide() {
        if (counter >= images.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        updateCarousel();
        updateDots();
    }
    
    function prevSlide() {
        if (counter <= 0) {
            counter = images.length - 1;
        } else {
            counter--;
        }
        updateCarousel();
        updateDots();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Autoplay
    let interval = setInterval(nextSlide, 5000);
    
    // Pausar autoplay cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
    
    // Ajustar el tamaño del slider cuando cambia el tamaño de la ventana
    window.addEventListener('resize', updateCarousel);
});
