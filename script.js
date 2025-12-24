// Hero Slider Logic
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000); // Change image every 5 seconds


const counters = document.querySelectorAll('.counter');
const speed = 200; // The lower the slower

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to slow and higher to slow
            const inc = target / speed;

            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger animation on scroll
const observerOptions = {
    threshold: 0.5 // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.about-stats'));


const revealCards = document.querySelectorAll('.road-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a slight delay for each card to create a "wave" effect
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 150); 
        }
    });
}, { threshold: 0.2 });

revealCards.forEach(card => revealObserver.observe(card));

/* Testimonial Slider Module */
(function() {
    let testimonialIndex = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (testimonialSlides.length === 0) return; // Guard clause

    function renderSlide(n) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = "0";
            slide.style.visibility = "hidden";
        });
        
        testimonialIndex = (n + testimonialSlides.length) % testimonialSlides.length;
        
        const activeSlide = testimonialSlides[testimonialIndex];
        activeSlide.classList.add('active');
        activeSlide.style.opacity = "1";
        activeSlide.style.visibility = "visible";
    }

    // Global functions for the button onclick events
    window.moveSlide = function(n) {
        renderSlide(testimonialIndex + n);
    };

    // Auto-slide every 5 seconds
    setInterval(() => {
        moveSlide(1);
    }, 5000);

    // Initialize first slide
    renderSlide(0);
})();
