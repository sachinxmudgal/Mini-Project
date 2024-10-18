let previewTimeout; // Variable to hold the timeout for the preview
let previewPlayed = false; // Flag to track if the preview has been played

// Function to filter videos based on category
function filterVideos(category) {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to play the video in a modal
function playVideo(videoId) {
    const videoModal = document.createElement('div');
    videoModal.classList.add('video-modal');
    videoModal.setAttribute('aria-hidden', 'false'); // For accessibility
    videoModal.innerHTML = `
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
            <button class="close-modal" aria-label="Close video" onclick="closeVideo()">Close</button>
        </div>
    `;
    document.body.appendChild(videoModal);

    // Allow closing modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeVideo();
        }
    });
}

// Function to close the video modal
function closeVideo() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.remove();
        // Optionally remove the event listener to avoid memory leaks
        document.removeEventListener('keydown', closeVideo);
    }
}

// Event listeners for video previews
document.querySelectorAll('.video-preview').forEach(preview => {
    preview.addEventListener('mouseenter', () => {
        const videoId = preview.getAttribute('data-video-id');
        
        // Reset the preview flag when mouse enters
        previewPlayed = false;

        // Set a timeout for 3 seconds
        previewTimeout = setTimeout(() => {
            if (!previewPlayed) {
                // Show video preview for a short duration
                playPreview(videoId);
                previewPlayed = true; // Set the flag to true after playing the preview
            }
        }, 3000);
    });

    preview.addEventListener('mouseleave', () => {
        clearTimeout(previewTimeout); // Clear the timeout if mouse leaves before 3 seconds
    });

    preview.addEventListener('click', () => {
        const videoId = preview.getAttribute('data-video-id');
        playVideo(videoId); // Play the full video on click
    });
});

// Function to show the video preview
function playPreview(videoId) {
    const previewModal = document.createElement('div');
    previewModal.classList.add('video-modal');
    previewModal.setAttribute('aria-hidden', 'false');
    previewModal.innerHTML = `
        <div class="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1&start=0&end=8" 
                title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(previewModal);

    // Auto-close the preview modal after 8 seconds (or adjust time as needed)
    setTimeout(closePreview, 8000);
}

// Function to close the preview modal
function closePreview() {
    const previewModal = document.querySelector('.video-modal');
    if (previewModal) {
        previewModal.remove();
    }
}
