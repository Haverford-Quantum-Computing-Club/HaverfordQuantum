// Announcements System
// Load and display announcements based on date range and dismissal status

document.addEventListener('DOMContentLoaded', function() {
    loadAnnouncements();
});

async function loadAnnouncements() {
    try {
        const response = await fetch('announcements-data.json');
        const announcements = await response.json();
        displayAnnouncements(announcements);
    } catch (error) {
        console.error('Error loading announcements:', error);
    }
}

function displayAnnouncements(announcements) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    // Filter announcements that should be shown
    const activeAnnouncements = announcements.filter(announcement => {
        // Check if manually set to active
        if (!announcement.active) return false;

        // Check date range
        const startDate = new Date(announcement.startDate);
        const endDate = new Date(announcement.endDate);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        if (today < startDate || today > endDate) return false;

        // Check if user has dismissed this announcement
        if (announcement.dismissible && isDismissed(announcement.id)) return false;

        return true;
    });

    if (activeAnnouncements.length === 0) return;

    // Create announcement container if it doesn't exist
    let container = document.getElementById('announcements-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'announcements-container';
        container.className = 'announcements-container';

        // Insert after header
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(container, header.nextSibling);
        } else if (header) {
            header.parentNode.appendChild(container);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }

    // Display each announcement
    activeAnnouncements.forEach(announcement => {
        const banner = createAnnouncementBanner(announcement);
        container.appendChild(banner);
    });
}

function createAnnouncementBanner(announcement) {
    const banner = document.createElement('div');
    banner.className = `announcement-banner announcement-${announcement.type}`;
    banner.setAttribute('data-announcement-id', announcement.id);

    // Create content
    const content = document.createElement('div');
    content.className = 'announcement-content';

    const message = document.createElement('span');
    message.className = 'announcement-message';
    message.textContent = announcement.message;
    content.appendChild(message);

    // Add link if provided
    if (announcement.link) {
        const link = document.createElement('a');
        link.href = announcement.link.url;
        link.className = 'announcement-link';
        link.textContent = announcement.link.text;
        content.appendChild(link);
    }

    banner.appendChild(content);

    // Add close button if dismissible
    if (announcement.dismissible) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'announcement-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Close announcement');
        closeBtn.addEventListener('click', () => {
            dismissAnnouncement(announcement.id, banner);
        });
        banner.appendChild(closeBtn);
    }

    // Add entrance animation
    setTimeout(() => {
        banner.classList.add('announcement-visible');
    }, 100);

    return banner;
}

function dismissAnnouncement(id, bannerElement) {
    // Save dismissal to localStorage
    const dismissed = getDismissedAnnouncements();
    dismissed.push(id);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissed));

    // Animate out
    bannerElement.classList.remove('announcement-visible');
    bannerElement.classList.add('announcement-dismissed');

    setTimeout(() => {
        bannerElement.remove();

        // Remove container if no announcements left
        const container = document.getElementById('announcements-container');
        if (container && container.children.length === 0) {
            container.remove();
        }
    }, 300);
}

function isDismissed(id) {
    const dismissed = getDismissedAnnouncements();
    return dismissed.includes(id);
}

function getDismissedAnnouncements() {
    try {
        const dismissed = localStorage.getItem('dismissedAnnouncements');
        return dismissed ? JSON.parse(dismissed) : [];
    } catch (error) {
        return [];
    }
}

// Utility function to clear dismissed announcements (useful for testing)
function clearDismissedAnnouncements() {
    localStorage.removeItem('dismissedAnnouncements');
    console.log('Dismissed announcements cleared. Refresh the page to see all announcements.');
}

// Export for debugging
window.announcementsDebug = {
    clearDismissed: clearDismissedAnnouncements,
    getDismissed: getDismissedAnnouncements
};

// Add CSS for announcements
const style = document.createElement('style');
style.textContent = `
    .announcements-container {
        position: relative;
        z-index: 999;
    }

    .announcement-banner {
        position: relative;
        padding: 1rem 3rem 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(-100%);
        transition: all 0.3s ease;
    }

    .announcement-banner.announcement-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .announcement-banner.announcement-dismissed {
        opacity: 0;
        transform: translateY(-20px);
    }

    .announcement-banner.announcement-info {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
        border-left: 4px solid var(--primary-blue);
    }

    .announcement-banner.announcement-warning {
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 146, 60, 0.15));
        border-left: 4px solid #f59e0b;
    }

    .announcement-banner.announcement-success {
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15));
        border-left: 4px solid #10b981;
    }

    .announcement-banner.announcement-urgent {
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15));
        border-left: 4px solid #ef4444;
        animation: pulse-urgent 2s ease-in-out infinite;
    }

    @keyframes pulse-urgent {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
        }
    }

    .announcement-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        flex: 1;
    }

    .announcement-message {
        color: var(--text-primary);
        font-size: 0.95rem;
        font-weight: 500;
        line-height: 1.5;
    }

    .announcement-link {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .announcement-link:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .announcement-close {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        line-height: 1;
    }

    .announcement-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) rotate(90deg);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
        .announcement-banner {
            padding: 1rem 2.5rem 1rem 1rem;
        }

        .announcement-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .announcement-message {
            font-size: 0.9rem;
        }

        .announcement-link {
            width: 100%;
            justify-content: center;
        }

        .announcement-close {
            right: 0.5rem;
            top: 1rem;
            transform: translateY(0);
        }

        .announcement-close:hover {
            transform: rotate(90deg);
        }
    }

    /* Add smooth scroll behavior when announcements appear */
    body:has(.announcements-container) {
        scroll-padding-top: 150px;
    }
`;
document.head.appendChild(style);
