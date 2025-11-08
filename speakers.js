// Speakers Page Functionality
(function() {
    'use strict';

    let currentZoom = 1;
    let currentSpeakerData = null;

    // Load speakers data
    async function loadSpeakers() {
        try {
            const response = await fetch('speakers-data.json');
            const speakers = await response.json();
            renderSpeakers(speakers);
        } catch (error) {
            console.error('Error loading speakers:', error);
            showError();
        }
    }

    // Render speakers to the page
    function renderSpeakers(speakers) {
        const container = document.getElementById('speakers-container');
        if (!container) return;

        container.innerHTML = speakers.map(speaker => `
            <div class="speaker-detail-card" data-speaker-id="${speaker.id}">
                <div class="speaker-detail-image-container">
                    <img src="${speaker.image}" alt="${speaker.name}" class="speaker-detail-img">
                    ${speaker.poster ? '<div class="has-poster-badge">📄 Poster Available</div>' : ''}
                </div>
                <div class="speaker-detail-content">
                    <h3>${speaker.name}</h3>
                    <p class="speaker-detail-title">${speaker.title}</p>
                    <p class="speaker-detail-org">${speaker.organization}</p>
                    <div class="speaker-detail-talk">
                        <h4>${speaker.talkTitle}</h4>
                        <p class="talk-abstract-preview">${speaker.talkAbstract.substring(0, 120)}${speaker.talkAbstract.length > 120 ? '...' : ''}</p>
                    </div>
                    <div class="speaker-detail-session">
                        <span><span class="icon">🕐</span> ${speaker.sessionTime}</span>
                        <span><span class="icon">📍</span> ${speaker.sessionRoom}</span>
                    </div>
                    <button class="btn-view-details" data-speaker-id="${speaker.id}">
                        View Full Details
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to view details buttons
        document.querySelectorAll('.btn-view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const speakerId = e.target.dataset.speakerId;
                const speaker = speakers.find(s => s.id === speakerId);
                if (speaker) openSpeakerModal(speaker);
            });
        });
    }

    // Open speaker modal
    function openSpeakerModal(speaker) {
        currentSpeakerData = speaker;
        const modal = document.getElementById('speaker-modal');

        // Populate modal content
        document.getElementById('modal-speaker-img').src = speaker.image;
        document.getElementById('modal-speaker-img').alt = speaker.name;
        document.getElementById('modal-speaker-name').textContent = speaker.name;
        document.getElementById('modal-speaker-title').textContent = speaker.title;
        document.getElementById('modal-speaker-org').textContent = speaker.organization;
        document.getElementById('modal-speaker-bio').textContent = speaker.bio;
        document.getElementById('modal-talk-title').textContent = speaker.talkTitle;
        document.getElementById('modal-talk-abstract').textContent = speaker.talkAbstract;
        document.getElementById('modal-session-time').textContent = speaker.sessionTime;
        document.getElementById('modal-session-room').textContent = speaker.sessionRoom;

        // Populate social links
        const socialContainer = document.getElementById('modal-speaker-social');
        socialContainer.innerHTML = '';
        if (speaker.social) {
            if (speaker.social.linkedin && speaker.social.linkedin !== '#') {
                socialContainer.innerHTML += `<a href="${speaker.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>`;
            }
            if (speaker.social.twitter && speaker.social.twitter !== '#') {
                socialContainer.innerHTML += `<a href="${speaker.social.twitter}" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>`;
            }
            if (speaker.social.website && speaker.social.website !== '#') {
                socialContainer.innerHTML += `<a href="${speaker.social.website}" target="_blank" rel="noopener" aria-label="Website">🌐</a>`;
            }
        }

        // Handle poster section
        const posterSection = document.getElementById('modal-poster-section');
        if (speaker.poster) {
            posterSection.style.display = 'block';
            document.getElementById('modal-poster-img').src = speaker.poster;
            document.getElementById('download-poster-btn').href = speaker.poster;
            document.getElementById('download-poster-btn').download = `${speaker.name.replace(/\s+/g, '_')}_poster.pdf`;
        } else {
            posterSection.style.display = 'none';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close speaker modal
    function closeSpeakerModal() {
        const modal = document.getElementById('speaker-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentSpeakerData = null;
    }

    // Open poster lightbox
    function openPosterLightbox() {
        if (!currentSpeakerData || !currentSpeakerData.poster) return;

        const lightbox = document.getElementById('poster-lightbox');
        const lightboxImg = document.getElementById('lightbox-poster-img');

        lightboxImg.src = currentSpeakerData.poster;
        lightbox.classList.add('active');
        currentZoom = 1;
        lightboxImg.style.transform = 'scale(1)';
    }

    // Close poster lightbox
    function closePosterLightbox() {
        const lightbox = document.getElementById('poster-lightbox');
        lightbox.classList.remove('active');
        currentZoom = 1;
    }

    // Zoom controls
    function zoomIn() {
        currentZoom = Math.min(currentZoom + 0.2, 3);
        updateZoom();
    }

    function zoomOut() {
        currentZoom = Math.max(currentZoom - 0.2, 0.5);
        updateZoom();
    }

    function resetZoom() {
        currentZoom = 1;
        updateZoom();
    }

    function updateZoom() {
        const lightboxImg = document.getElementById('lightbox-poster-img');
        lightboxImg.style.transform = `scale(${currentZoom})`;
    }

    // Show error message
    function showError() {
        const container = document.getElementById('speakers-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>Unable to load speakers</h3>
                    <p>Please try refreshing the page or check back later.</p>
                </div>
            `;
        }
    }

    // Initialize everything when DOM is loaded
    function init() {
        loadSpeakers();

        // Modal close buttons
        const modalClose = document.querySelector('#speaker-modal .modal-close');
        const modalOverlay = document.querySelector('#speaker-modal .modal-overlay');
        if (modalClose) modalClose.addEventListener('click', closeSpeakerModal);
        if (modalOverlay) modalOverlay.addEventListener('click', closeSpeakerModal);

        // Lightbox controls
        const viewPosterBtn = document.getElementById('view-poster-btn');
        const lightboxClose = document.querySelector('#poster-lightbox .lightbox-close');
        const lightboxOverlay = document.querySelector('#poster-lightbox .lightbox-overlay');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const resetZoomBtn = document.getElementById('reset-zoom-btn');

        if (viewPosterBtn) viewPosterBtn.addEventListener('click', openPosterLightbox);
        if (lightboxClose) lightboxClose.addEventListener('click', closePosterLightbox);
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closePosterLightbox);
        if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
        if (resetZoomBtn) resetZoomBtn.addEventListener('click', resetZoom);

        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const speakerModal = document.getElementById('speaker-modal');
                const posterLightbox = document.getElementById('poster-lightbox');

                if (posterLightbox.classList.contains('active')) {
                    closePosterLightbox();
                } else if (speakerModal.classList.contains('active')) {
                    closeSpeakerModal();
                }
            }
        });
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
