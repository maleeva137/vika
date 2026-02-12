
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault(); 
    }
}, { passive: false });

document.addEventListener('gesturestart', (e) => {
    e.preventDefault(); 
});

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('selectstart', event => event.preventDefault());
document.addEventListener('dragstart', event => event.preventDefault());


const targetDate = new Date(2030, 6, 27, 21, 37, 0);


const heartButton = document.getElementById('heartButton');
const countdownContainer = document.getElementById('countdownContainer');
const timerElement = document.getElementById('timer');
const memoryItems = document.querySelectorAll('.memory-item');
const modal = document.getElementById('memoryModal');
const modalPhoto = document.getElementById('modalPhoto');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');
const floatingHearts = document.getElementById('floatingHearts');


const memories = [
    {
        image: '1.png',  
        text: 'если бы ты не стала ради меня украинкой на 98%, я бы не пережил'
    },
    {
        image: '2.png',  
        text: '—че за хломидия? -ЭТО РОЗА'
    },
    {
        image: '3.png',  
        text: 'мальчики пишут да'
    },
    {
        image: '4.png',  
        text: 'мы такие правильные, уже принадлежим друг другу, но все равно планируем формальный текст на 1:37'
    },
    {
        image: '5.png',  
        text: 'ебать ты согласна'
    },
    {
        image: '6.png', 
        text: 'Люблю тебя, моя сладенькая, моя родная кисинька Викисинька, не смотря на ссоры, не смотря на плохие настроения, не смотря ни на что. Пройдём всё вместе, без расставаний и когда отсчет закончится, приедем в указанное место в указанный час, купим много вкусняшек и поедем домой валяться в кровати.'
    }
];


function createFloatingHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-emoji';
        heart.textContent = '🩷';
        
        const top = Math.random() * 100;
        const left = Math.random() * 120 - 15;
        const duration = 8 + Math.random() * 8;
        
        heart.style.top = `${top}%`;
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `0s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.transform = `translate(${Math.random() * 60 - 30}px, ${Math.random() * 40 - 20}px)`;
        
        const size = 1 + Math.random() * 1.2;
        heart.style.fontSize = `${size}rem`;
        heart.style.opacity = 0.10 + Math.random() * 0.15;
        
        floatingHearts.appendChild(heart);
    }
}


heartButton.addEventListener('click', function() {
    countdownContainer.style.display = 'flex';
    updateTimer();
    
    const clickHint = document.getElementById('clickHint');
    if (clickHint) {
        clickHint.style.opacity = '0';
        setTimeout(() => {
            clickHint.style.display = 'none';
        }, 300);
    }
});


function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        timerElement.textContent = '0д 00ч 00м 00с';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    timerElement.textContent = `${days}д ${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м ${seconds.toString().padStart(2, '0')}с`;
}


setInterval(updateTimer, 1000);


// ОТКРЫТИЕ ВОСПОМИНАНИЙ - С УМЕНЬШЕННЫМ ПОСЛЕДНИМ ФОТО
memoryItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const memoryIndex = parseInt(this.dataset.index);
        
        if (memories[memoryIndex]) {

            modalPhoto.src = memories[memoryIndex].image;

            modalText.textContent = memories[memoryIndex].text;
            


            if (memoryIndex === 5) {
                modalPhoto.style.maxHeight = '15vh';     
                modalPhoto.style.maxWidth = '50%';       
                modalPhoto.style.margin = '10px auto';   
                modalPhoto.style.borderRadius = '16px';
            } else {

                modalPhoto.style.maxHeight = '40vh';
                modalPhoto.style.maxWidth = '100%';
                modalPhoto.style.margin = '0 auto 20px';
                modalPhoto.style.border = 'none';
            }

            modal.style.display = 'flex';

            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                modal.scrollTop = 0;
            }, 50);
        }
    });
});


function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}


modalClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closeModal();
});


modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});


let touchStartY = 0;
let touchStartX = 0;

modal.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
}, { passive: true });

modal.addEventListener('touchmove', function(e) {
    if (!modalPhoto.contains(e.target) && !modalText.contains(e.target)) {
        const touchEndY = e.touches[0].clientY;
        const touchEndX = e.touches[0].clientX;
        const diffY = touchEndY - touchStartY;
        const diffX = Math.abs(touchEndX - touchStartX);
        
 
        if (diffY > 50 && diffX < 50 && modal.scrollTop === 0) {
            closeModal();
        }
    }
}, { passive: true });


modalPhoto.addEventListener('touchstart', function(e) {
    e.stopPropagation();
}, { passive: true });


document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 's')) {
        e.preventDefault();
    }
});


window.addEventListener('touchstart', (e) => {
    if (!e.target.closest('button') && 
        !e.target.closest('.memory-item') && 
        !e.target.closest('.modal-close') &&
        !e.target.closest('.modal-photo')) {
        e.preventDefault();
    }
}, { passive: false });


window.addEventListener('load', function() {
    createFloatingHearts();
});

window.addEventListener('resize', function() {
    if (modal.style.display === 'flex') {
        modal.scrollTop = 0;
    }
});