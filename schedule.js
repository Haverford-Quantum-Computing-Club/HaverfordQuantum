// Embedded schedule data to ensure it loads
const SCHEDULE_DATA = [
  {
    "date": "Friday, November 14th, 2025",
    "day": "Day 1 - Friday",
    "events": [
      {
        "time": "5:30 PM - 6:00 PM",
        "title": "QBraid Tutorial by Rick Young, COO of QBraid",
        "location": "Zoom",
        "description": "Learning to use and navigate the QBraid platform where you will be running your code.",
        "type": "talk"
      },
      {
        "time": "6:00 PM - 7:00 PM",
        "title": "Kick-Off & Tutorials",
        "location": "TBA",
        "description": "Kick-Off, Tutorials, Level 0 Notebook is up; Team pairings happening; Dinner is happening",
        "type": "ceremony"
      },
      {
        "time": "7:00 PM - 8:00 PM",
        "title": "Keynote: Dr. Gushu Li",
        "location": "TBA",
        "description": "Guest Speaker: Dr. Gushu Li, Assistant Professor at the University of Pennsylvania",
        "type": "talk"
      },
      {
        "time": "8:00 PM - 9:15 PM",
        "title": "Work on Level 0 Notebook",
        "location": "TBA",
        "description": "Work on Level 0 Notebook, We provide feedback",
        "type": "challenge"
      },
      {
        "time": "9:15 PM - 10:00 PM",
        "title": "Tentative: IBM Speaker",
        "location": "TBA",
        "description": "Special guest speaker from IBM (tentative)",
        "type": "talk"
      },
      {
        "time": "10:00 PM - 12:00 AM",
        "title": "Level 0 Submission & Level 1 Release",
        "location": "TBA",
        "description": "Submission for Level 0 Notebook due at 10:00pm; Level 1 Notebook is up. Team pairing for open challenges is happening",
        "type": "challenge"
      }
    ]
  },
  {
    "date": "Saturday, November 15th, 2025",
    "day": "Day 2 - Saturday",
    "events": [
      {
        "time": "9:00 AM - 12:00 PM",
        "title": "Challenges Open",
        "location": "TBA",
        "description": "Challenges open; Teams stay paired as for Level 1; prizes are announced",
        "type": "challenge"
      },
      {
        "time": "12:00 PM - 1:00 PM",
        "title": "Lunch Break",
        "location": "TBA",
        "description": "Lunch and networking",
        "type": "break"
      },
      {
        "time": "1:00 PM - 2:00 PM",
        "title": "Feedback Session",
        "location": "TBA",
        "description": "Feedback is open for Challenge contenders",
        "type": "hands-on"
      },
      {
        "time": "2:00 PM - 3:00 PM",
        "title": "Feedback & Progress Deadline",
        "location": "TBA",
        "description": "Feedback is open for Challenge contenders; Challenges progress due at 3:00pm",
        "type": "challenge"
      },
      {
        "time": "3:00 PM - 4:00 PM",
        "title": "Presentation of Open Challenges",
        "location": "TBA",
        "description": "Teams present their open challenge solutions",
        "type": "presentation"
      },
      {
        "time": "4:00 PM - 5:30 PM",
        "title": "Keynote: Dr. Phalgun Lolur",
        "location": "TBA",
        "description": "Guest Speaker: Dr. Phalgun Lolur, Global Scientific Quantum Development Lead, Capgemini's Quantum Lab",
        "type": "talk"
      },
      {
        "time": "6:00 PM - 6:45 PM",
        "title": "Awards & Closing Ceremony",
        "location": "TBA",
        "description": "Winner Announcements, Certificates of Participates and Certificates of Achievement are distributed",
        "type": "ceremony"
      },
      {
        "time": "7:00 PM",
        "title": "Dinner",
        "location": "TBA",
        "description": "Closing dinner and celebration",
        "type": "break"
      }
    ]
  }
];

// Load and display schedule immediately
document.addEventListener('DOMContentLoaded', function() {
    console.log('Schedule script loaded - v2025-11-12-updated');
    displaySchedule(SCHEDULE_DATA);
});

function displaySchedule(scheduleData) {
    console.log('Displaying schedule with', scheduleData.length, 'days');
    const container = document.getElementById('schedule-container');

    if (!container) {
        console.error('schedule-container element not found!');
        return;
    }

    container.innerHTML = ''; // Clear any existing content

    scheduleData.forEach((dayData, index) => {
        console.log('Adding day:', dayData.day, 'with', dayData.events.length, 'events');
        // Create day section
        const daySection = document.createElement('div');
        daySection.className = 'schedule-day';
        daySection.style.animationDelay = `${index * 0.2}s`;

        // Day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'schedule-day-header';
        dayHeader.innerHTML = `
            <div class="day-badge">${dayData.day}</div>
            <h2 class="day-date">${dayData.date}</h2>
        `;
        daySection.appendChild(dayHeader);

        // Timeline
        const timeline = document.createElement('div');
        timeline.className = 'schedule-timeline';

        dayData.events.forEach((event, eventIndex) => {
            const eventCard = document.createElement('div');
            eventCard.className = `schedule-event ${event.type}`;
            eventCard.style.animationDelay = `${(index * 0.2) + (eventIndex * 0.05)}s`;

            eventCard.innerHTML = `
                <div class="event-time">
                    <span class="time-icon">🕐</span>
                    <span>${event.time}</span>
                </div>
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-location">
                        <span class="location-icon">📍</span>
                        <span>${event.location}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <span class="event-type-badge ${event.type}">${formatEventType(event.type)}</span>
                </div>
            `;

            timeline.appendChild(eventCard);
        });

        daySection.appendChild(timeline);
        container.appendChild(daySection);
    });
}

function formatEventType(type) {
    const typeMap = {
        'logistics': 'Check-in',
        'ceremony': 'Ceremony',
        'workshop': 'Workshop',
        'hands-on': 'Hands-on',
        'networking': 'Networking',
        'talk': 'Keynote',
        'break': 'Break',
        'challenge': 'Challenge',
        'presentation': 'Presentation'
    };
    return typeMap[type] || type;
}

// Add custom CSS for schedule page
const style = document.createElement('style');
style.textContent = `
    .schedule-section {
        padding: 4rem 2rem;
        min-height: 60vh;
    }

    #schedule-container {
        max-width: 1000px;
        margin: 0 auto;
    }

    .schedule-day {
        margin-bottom: 4rem;
        animation: fadeInUp 0.8s ease forwards;
        opacity: 0;
    }

    .schedule-day-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
    }

    .day-badge {
        display: inline-block;
        background: linear-gradient(135deg, var(--primary-purple), var(--primary-pink));
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 2rem;
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    }

    .day-date {
        font-size: 2rem;
        background: linear-gradient(135deg, var(--text-primary), var(--primary-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .schedule-timeline {
        position: relative;
        padding-left: 2rem;
    }

    .schedule-timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(180deg, var(--primary-purple), var(--primary-pink));
        opacity: 0.5;
    }

    .schedule-event {
        position: relative;
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        margin-left: 2rem;
        transition: all 0.3s ease;
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }

    .schedule-event::before {
        content: '';
        position: absolute;
        left: -2.5rem;
        top: 1.5rem;
        width: 12px;
        height: 12px;
        background: var(--primary-purple);
        border: 3px solid var(--dark-bg);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--glow-purple);
    }

    .schedule-event:hover {
        transform: translateX(10px);
        box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        border-color: var(--primary-purple);
    }

    .schedule-event.talk::before {
        background: var(--primary-pink);
        box-shadow: 0 0 10px var(--glow-pink);
    }

    .schedule-event.ceremony::before {
        background: #f59e0b;
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }

    .schedule-event.break::before {
        background: #10b981;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }

    .event-time {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary-purple);
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
    }

    .time-icon {
        font-size: 1.2rem;
    }

    .event-content {
        position: relative;
    }

    .event-title {
        font-size: 1.3rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    .event-location {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
    }

    .location-icon {
        font-size: 1rem;
    }

    .event-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .event-type-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .event-type-badge.workshop {
        background: rgba(139, 92, 246, 0.2);
        color: var(--primary-purple);
    }

    .event-type-badge.talk {
        background: rgba(236, 72, 153, 0.2);
        color: var(--primary-pink);
    }

    .event-type-badge.ceremony {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
    }

    .event-type-badge.break {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
    }

    .event-type-badge.challenge {
        background: rgba(59, 130, 246, 0.2);
        color: var(--primary-blue);
    }

    .event-type-badge.hands-on,
    .event-type-badge.networking,
    .event-type-badge.logistics,
    .event-type-badge.presentation {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .schedule-timeline {
            padding-left: 1rem;
        }

        .schedule-event {
            margin-left: 1rem;
            padding: 1rem;
        }

        .schedule-event::before {
            left: -1.5rem;
        }

        .day-date {
            font-size: 1.5rem;
        }

        .event-title {
            font-size: 1.1rem;
        }
    }
`;
document.head.appendChild(style);
