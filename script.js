// User preferences object
const userPreferences = {
    theme: 'blue',
    darkMode: false,
    animationSpeed: 'normal'
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    const animateBtn = document.getElementById('animate-btn');
    const cards = document.querySelectorAll('.card');
    const animationSpeedSelect = document.getElementById('animation-speed');

    // Save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        console.log('Preferences saved:', userPreferences);
    }

    // Load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const loadedPrefs = JSON.parse(savedPrefs);
            userPreferences.theme = loadedPrefs.theme || 'blue';
            userPreferences.darkMode = loadedPrefs.darkMode || false;
            userPreferences.animationSpeed = loadedPrefs.animationSpeed || 'normal';
            
            // Apply loaded preferences
            applyTheme(userPreferences.theme);
            applyAnimationSpeed(userPreferences.animationSpeed);
            
            if (userPreferences.darkMode) {
                document.body.classList.add('dark-mode');
                darkModeToggle.checked = true;
            }
            
            if (animationSpeedSelect) {
                animationSpeedSelect.value = userPreferences.animationSpeed;
            }
            
            console.log('Preferences loaded:', userPreferences);
        }
    }

    // Apply theme color
    function applyTheme(theme) {
        let primaryColor;
        let secondaryColor;
        
        switch(theme) {
            case 'green':
                primaryColor = '#2ecc71';
                secondaryColor = '#27ae60';
                break;
            case 'purple':
                primaryColor = '#9b59b6';
                secondaryColor = '#8e44ad';
                break;
            case 'orange':
                primaryColor = '#e67e22';
                secondaryColor = '#d35400';
                break;
            default: // blue
                primaryColor = '#3498db';
                secondaryColor = '#2980b9';
        }
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }

    // Apply animation speed
    function applyAnimationSpeed(speed) {
        let duration;
        
        switch(speed) {
            case 'slow':
                duration = '0.6s';
                break;
            case 'fast':
                duration = '0.15s';
                break;
            default: // normal
                duration = '0.3s';
        }
        
        document.documentElement.style.setProperty('--transition-speed', duration);
    }

    // Toggle animations on cards
    function toggleCardAnimations() {
        cards.forEach((card, index) => {
            // Remove any existing animation classes
            card.classList.remove('floating', 'pulse');
            
            // Force reflow before adding new animation
            void card.offsetWidth;
            
            // Add different animations based on index
            if (index % 2 === 0) {
                card.classList.add('floating');
            } else {
                card.classList.add('pulse');
            }
            
            // Remove animation after it completes
            setTimeout(() => {
                card.classList.remove('floating', 'pulse');
            }, 3000);
        });
    }

    // Event Listeners
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                userPreferences.darkMode = true;
            } else {
                document.body.classList.remove('dark-mode');
                userPreferences.darkMode = false;
            }
            savePreferences();
        });
    }

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            userPreferences.theme = theme;
            applyTheme(theme);
            savePreferences();
            
            // Add pulse animation to the selected theme option
            option.classList.add('pulse');
            setTimeout(() => {
                option.classList.remove('pulse');
            }, 1000);
        });
    });

    if (animateBtn) {
        animateBtn.addEventListener('click', () => {
            toggleCardAnimations();
            
            // Animate the button itself
            animateBtn.classList.add('pulse');
            setTimeout(() => {
                animateBtn.classList.remove('pulse');
            }, 1000);
        });
    }

    if (animationSpeedSelect) {
        animationSpeedSelect.addEventListener('change', () => {
            const speed = animationSpeedSelect.value;
            userPreferences.animationSpeed = speed;
            applyAnimationSpeed(speed);
            savePreferences();
        });
    }

    // Initialize
    loadPreferences();
});