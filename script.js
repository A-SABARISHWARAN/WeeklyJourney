document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navUl.classList.remove('show');
        });
    });

    // Sample data for weeks
    const weeksData = [
        {
            weekNumber: 1,
            startDate: '2025-06-28',
            endDate: '2025-07-05',
            summary: "📊Completed the topic of Time and Space Complexity.🔷 Practiced pattern-based problem.🏭 Attended an industrial visit to ICF (Integral Coach Factory), Avadi.🧩 Participated in Mystic Code, a competitive coding.🌏 Began learning Japanese via Duolingo.",
            achievements: [
                {
                    type: "achievement",
                    title: "Project Building - Website",
                    content: "Built a website as a project WeeklyJourney which stores all my achievements and documents it.",
                    date: "2025-07-05",
                    
                },
                {
                    type: "learning DSA",
                    title: "Time and Space Complexity",
                    content: "📊 Completed the topic of Time and Space Complexity, gaining a solid understanding of algorithm efficiency and performance optimization.",
                    date: "2025-06-28"
                },
                {
                    type: "learning DSA ",
                    title: "Pattern Solving",
                    content: "🔷 Practiced various pattern-based programming problems to strengthen logic building and improve coding structure.",
                    date: "2025-06-30"
                },
                {
                    type: "learning",
                    title: "Industrial Visit",
                    content: "🏭 Participated in an industrial visit to ICF (Integral Coach Factory), Avadi, and explored real-time operations in railway coach manufacturing.",
                    date: "2025-07-01"

                },
                {
                    type: "learning",
                    title: "Language Learning",
                    content: "🌏 Began learning Japanese using Duolingo as a step toward becoming multilingual and understanding Japanese culture and language.",
                    date: "2025-07-02"
                },
                {
                    type: "challenge",
                    title: "Mystic Code - A fun challenge",
                    content: "🧩 Took part in the competitive event ‘Mystic Code,’ enhancing my real-time problem-solving and coding efficiency under pressure.",
                    date: "2025-07-03"
                }
                
            ]
        },
    ];

    // Stats calculation
    document.getElementById('total-weeks').textContent = weeksData.length;
    
    const totalAchievements = weeksData.reduce((acc, week) => {
        return acc + week.achievements.filter(a => a.type === 'achievement').length;
    }, 0);
    document.getElementById('total-achievements').textContent = totalAchievements;
    
    const totalSkills = weeksData.reduce((acc, week) => {
        return acc + week.achievements.filter(a => a.type === 'learning').length;
    }, 0);
    document.getElementById('total-skills').textContent = totalSkills;

    // Weekly navigation
    let currentWeekIndex = 0;
    const weeklyContent = document.getElementById('weekly-content');
    const currentWeekDisplay = document.getElementById('current-week-display');
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');

    function displayWeek(index) {
        const week = weeksData[index];
        currentWeekDisplay.textContent = `Week ${week.weekNumber}`;
        
        // Format dates
        const startDate = new Date(week.startDate);
        const endDate = new Date(week.endDate);
        const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateRange = `${startDate.toLocaleDateString('en-US', dateFormatOptions)} - ${endDate.toLocaleDateString('en-US', dateFormatOptions)}`;
        
        // Generate HTML for the week
        weeklyContent.innerHTML = `
            <div class="week-header">
                <h3 class="week-title">Week ${week.weekNumber}</h3>
                <span class="week-date">${dateRange}</span>
            </div>
            <div class="week-details">
                <div class="week-summary">
                    <h3><i class="fas fa-clipboard-list"></i> Week Summary</h3>
                    <p>${week.summary}</p>
                </div>
                <div class="week-entries">
                    <h3><i class="fas fa-tasks"></i> Weekly Entries</h3>
                    ${week.achievements.map(entry => `
                        <div class="week-entry">
                            <span class="entry-type ${entry.type}">${getTypeIcon(entry.type)} ${entry.type}</span>
                            <h4 class="entry-title">${entry.title}</h4>
                            <p class="entry-content">${entry.content}</p>
                            <div class="entry-date"><i class="far fa-calendar"></i> ${new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Update button states
        prevWeekBtn.disabled = index === 0;
        nextWeekBtn.disabled = index === weeksData.length - 1;
    }

    function getTypeIcon(type) {
        switch(type) {
            case 'achievement': return '<i class="fas fa-trophy"></i>';
            case 'learning': return '<i class="fas fa-lightbulb"></i>';
            case 'challenge': return '<i class="fas fa-exclamation-triangle"></i>';
            default: return '';
        }
    }

    prevWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
            displayWeek(currentWeekIndex);
        }
    });

    nextWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex < weeksData.length - 1) {
            currentWeekIndex++;
            displayWeek(currentWeekIndex);
        }
    });

    // Initial display
    displayWeek(currentWeekIndex);

    // Calendar functionality
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthDisplay = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function generateCalendar(month, year) {
        // Set month display
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                          "July", "August", "September", "October", "November", "December"];
        currentMonthDisplay.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `
                <div class="day-number">${day}</div>
                <div class="day-events">${getDayEvents(dateStr)}</div>
            `;
            
            // Highlight today
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
                dayElement.style.border = `2px solid var(--primary-color)`;
            }
            
            // Add click event to view entries for this day
            dayElement.addEventListener('click', () => {
                viewEntriesForDate(dateStr);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    function getDayEvents(dateStr) {
        // Find all entries for this date
        const events = [];
        
        weeksData.forEach(week => {
            week.achievements.forEach(entry => {
                if (entry.date === dateStr) {
                    events.push(entry.type);
                }
            });
        });
        
        // Only show unique types
        const uniqueEvents = [...new Set(events)];
        
        return uniqueEvents.map(type => 
            `<div class="day-event-dot ${type}"></div>`
        ).join('');
    }

    function viewEntriesForDate(date) {
        const dateObj = new Date(date);
        const dateFormatted = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        // Find all entries for this date
        const entries = [];
        
        weeksData.forEach(week => {
            week.achievements.forEach(entry => {
                if (entry.date === date) {
                    entries.push(entry);
                }
            });
        });
        
        if (entries.length > 0) {
            // Create modal or display in weekly section
            alert(`Entries for ${dateFormatted}:\n\n${
                entries.map(entry => 
                    `• ${entry.title} (${entry.type})\n${entry.content}`
                ).join('\n\n')
            }`);
        } else {
            alert(`No entries found for ${dateFormatted}`);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    // Initial calendar generation
    generateCalendar(currentMonth, currentYear);

    // Display achievements
    const achievementsGrid = document.getElementById('achievements-grid');
    
    // Get all achievement-type entries
    const allAchievements = [];
    weeksData.forEach(week => {
        week.achievements.forEach(entry => {
            if (entry.type === 'achievement') {
                allAchievements.push({
                    ...entry,
                    weekNumber: week.weekNumber
                });
            }
        });
    });
    
    // Display achievements
    achievementsGrid.innerHTML = allAchievements.map(achievement => `
        <div class="achievement-card">
            <div class="achievement-image">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="achievement-content">
                <div class="achievement-week">Week ${achievement.weekNumber}</div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.content}</p>
                <div class="achievement-date">
                    <i class="far fa-calendar"></i>
                    ${new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </div>
        </div>
    `).join('');

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.week-entry, .achievement-card, .about-image img');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.week-entry, .achievement-card, .about-image img').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});