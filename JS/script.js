
document.addEventListener('DOMContentLoaded', () => {
    
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      
        if (!anchor.getAttribute('data-bs-toggle')) {
             anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault(); // Stop the default jump

                    // Scroll to the target element smoothly
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

   
    const heroCarouselElement = document.getElementById('heroCarousel');
    if (heroCarouselElement) {
        new bootstrap.Carousel(heroCarouselElement, {
            interval: 3000, 
            wrap: true
        });
    }

    const testimonialCarouselElement = document.getElementById('testimonialCarousel');
    if (testimonialCarouselElement) {
        new bootstrap.Carousel(testimonialCarouselElement, {
            interval: 5000, 
            wrap: true
        });
    }
    
    // --- 3. NUMBER COUNTER ANIMATION ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterBoxes = entry.target.querySelectorAll('.counter-value');
                
                counterBoxes.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2500; // 2.5 seconds
                    const step = target / (duration / 10); // Calculate step size

                    const updateCount = () => {
                        count += step;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target.toLocaleString(); // Add comma separator
                            observer.unobserve(entry.target); // Stop observing once done
                        }
                    };

                    updateCount();
                });
            }
        });
    }, {
        threshold: 0.5 // Start animation when 50% of the section is visible
    });

    const impactSection = document.getElementById('impact-counters');
    if (impactSection) {
        counterObserver.observe(impactSection);
    }
});


// --- 4. TIMELY POPUP ENQUIRY FORM (5 Second Delay) ---
window.onload = function() {
    setTimeout(function() {
        const enquiryModalElement = document.getElementById('enquiryModal');
        // Check if the modal element exists AND the modal is NOT already visible
        if (enquiryModalElement && !document.body.classList.contains('modal-open')) {
            const modal = new bootstrap.Modal(enquiryModalElement);
            modal.show();
        }
    }, 5000); 
}