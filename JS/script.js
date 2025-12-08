// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize the Bootstrap Modal component
    const enquiryModal = new bootstrap.Modal(document.getElementById('enquiryModal'));

    // Check if the user has already dismissed the pop-up in this session
    // We use sessionStorage to avoid annoying the user on every single page refresh
    const hasSeenModal = sessionStorage.getItem('hasSeenEnquiryModal');

    if (!hasSeenModal) {
        // 2. Function to show the modal
        const showModal = () => {
            enquiryModal.show();
            // Once shown, mark it as seen
            sessionStorage.setItem('hasSeenEnquiryModal', 'true');
        };

        // 3. Set the timer to show the modal after 15 seconds (mid-point of your 10-20 sec range)
        const delayInMilliseconds = 15000; // 15 seconds

        setTimeout(showModal, delayInMilliseconds);
    }
    
    // Optional: Add an event listener to reset the session storage if needed, but we'll keep it simple for now.
});