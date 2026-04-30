// 1. פונקציית מעבר לדף הבית (הלוך) - מעודנת
function goToHome() {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // הוספת קלאס CSS לביצוע ה-Fade Out
        splash.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = "home.html";
        }, 10000);
    }
}

// 2. פונקציית חזרה לדף הנחיתה (חזור) - מעודנת
function returnToSplash() {
    const container = document.querySelector('.gallery-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
            window.location.href = "index.html";
        }, 10000);
    } else {
        window.location.href = "index.html";
    }
}

// 3. מנגנון טיימר חוסר פעילות
var idleTimer;

function resetTimer() {
    clearTimeout(idleTimer);
    
    // הפעלת טיימר רק אם אנחנו לא בדף הנחיתה
    if (!window.location.pathname.includes("index.html") && window.location.pathname !== "/") {
        idleTimer = setTimeout(returnToSplash, 100000); // 1 דקה  לבדיקה
    }
}

// האזנה לפעולות משתמש לאיפוס הטיימר
document.addEventListener("mousemove", resetTimer);
document.addEventListener("mousedown", resetTimer);
document.addEventListener("keypress", resetTimer);
document.addEventListener("scroll", resetTimer);

// וודא שהווידאו מתחיל לנגן אוטומטית בטעינה
window.addEventListener('load', () => {
    const video = document.getElementById('bg-video');
    if (video) {
        video.play().catch(error => console.log("Autoplay blocked:", error));
    }
});

resetTimer();

// חסימת קליק ימני על כל האתר
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// חסימת גרירת תמונות (מונע מאנשים לגרור תמונה לשולחן העבודה)
document.addEventListener('dragstart', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
}, false);

// חסימת קיצורי מקלדת נפוצים לשמירה (כמו Ctrl+S או Cmd+S)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        alert('השמירה חסומה להגנה על זכויות יוצרים');
    }
}, false);
