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


const secretModal = document.getElementById('secretModal');
const secretFloatingHearts = document.getElementById('secretFloatingHearts');
const secretMessage = document.getElementById('secretMessage');
const secretClose = document.getElementById('secretClose');


let heartClickCount = 0;
const SECRET_CODE = 7;


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
        text: 'Люблю тебя, моя родненькая кисинька Викисинька, не смотря на ссоры, не смотря ни на что. Пройдём всё вместе, без расставаний и когда отсчет закончится, приедем в указанное место в указанный час, купим много вкусняшек и поедем домой валяться в кровати.'
    }
];


const secretMessages = [
    "ты - моя квiточка❤️",
    "люблю тебя очень, моя букашенька",
    "хватит ссориться, красотонька💕",
    "электрощиток⚡⚡⚡",
    "бля я в тебя каждый раз влюбляюсь по новой ебен бобен",
    "люби меня вечно",
    "представь, что через 10 лет ты все еще нажимаешь на сердечко 7 раз",
    "а вдруг мы расстались и ты сейчас сидишь скучаешь нажимаешь на сердечко, жду твоего сообщения, номер знаешь",
    "у тебя личико милое давай встречаться",
    "привет познакомимся красоточка моя",
    "нажми еще раз 7 раз",
    "ты украинка на 98%, люблю тебя на 100%",
    "1:37",
    "приветик красотуленька моя маленькая",
    "викися моя третья сися💝",
    "мы ведь навсегда вместе, роднуленька?",
    "я чуть не заснул только что у компа, пока писал этот секрет",
    "кстати тут все на рандом, тут очень много сообщений",
    "если ты это читаешь, значит я тебя очень люблю",
    "скучаю🙁",
    "ты всё такая же любименькая, не смотря ни на что",
    "честно, не зря ёкнуло в июле",
    "сильно люблю тебя",
    "роди мне сына",
    "сделай мне оладушки, пожалуйста, любименькая",
    "какашечкиииии😍",
    "обожаю тебя очень",
    "пачиму ты не пишеш мне люпимая мая куда жи ти прапала, типе миня ни жалка?☹️",
    "люблю тебя больше жизни",
    "не вижу будущего без тебя, оставайся рядом всегда",
    "я старался, поцелуй меня",
    "покорми меня я как тамагочи бедный голодный",
    "ты только моя, навеки",
    "знай, я не оставлю тебя никогда",
    "я тебе кохаю",
    "ich liebe dich",
    "в тяжёлые времени я буду делить с тобой одну сигарету на двоих и не зажмочу, это любовь, цени",
    "дверь ножка мозги кошка",
    "а вивися самая красивенькая девочка",
    "ты моя самая любименькая",
    "я ради тебя пиво бросил😶‍🌫️",
    "люби меня с каждым днем все сильнее",
    "пока ты жмёшь на это сердечко, я все больше начинаю любить тебя",
    "ты мне нравишься))))))))",
    "ПИСЮЛИЧКИИИИИИИИИИИ😍",
    "ты шо та вся в делах теперь занятая школьница такая ни пишиш ни званиш(((",
    "привет сейчас 10 сентября 2026 ты никогда не прочитаешь это сообщение давай поспорим",
    "а спорим ты больше не заходишь на этот сайт, если я проипал я типе робуксов нимнога дам",
    "ты кстати 20 августа пересматривала и надеялась что найдёшь новые сообщения, вдруг ты не нашла",
    "у тебя этот сайт в избранном лежит и пусть лежит до конца времён",
    "давай поссоримся прям ща, огоньку добавим ебать",
    "шо ты вась",
    "я хочу писять, напиши мне",
    "кись кись кись кись рыбонька моя",
    "да, вика, это новое сообщение, ты его увидела, умничка!",
    "гомер бартiв випустив он аткрыл дверь",
    "хлопец шо ти робиш я тоби мигну тоби мигну",
    "девушька мая кросивое🤤",
    "викааа🤤",
    "ОГОНЁК БЛЯТЬ ПРОДЛИ ПАТРИК НАХУЙ",
    "патрик у тебя актив упал, как на счёт упасть на моё лицо?",
    "я восстановил доступ к аккаунту и могу добавлять новые сообщения",
    "а давай мы так всегда будем общаться как по радио, только я тебя не услышу",
    "в бахмуте бахал, вику люблю",
    "І я на небі! Мила моя на небі. Зоре моя на небі, відколи тебе знайшов.",
    "Згадаю я очі твої, і все стає мов навпаки - Теплим таким...",
    "Так у світі повелося — Я люблю її волосся, Я люблю її тонкі вуста.",
    "всем привет сегодня 7 сентября 2026 года, это репортаж с места событий и я по прежнему люблю мою дивчинку викушку кукушку",
];

function createFallingLeaves() {
    const leavesContainer = document.createElement('div');
    leavesContainer.id = 'falling-leaves';
    document.body.appendChild(leavesContainer);

    const leafEmojis = ['🍁', '🍂'];

    // Создаём листья сразу
    for (let i = 0; i < 17; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';

        leaf.textContent =
            leafEmojis[Math.floor(Math.random() * leafEmojis.length)];

        // Распределяем листья по всей высоте экрана,
        // чтобы они были видны сразу после входа
        leaf.style.left = `${Math.random() * 110 - 5}%`;
        leaf.style.top = `${Math.random() * 100}%`;

        // Листья немного крупнее
        const size = 1.1 + Math.random() * 1.1;
        leaf.style.fontSize = `${size}rem`;

        leaf.style.opacity = `${0.5 + Math.random() * 0.35}`;

        // Скорость падения
        const duration = 16 + Math.random() * 10;
        leaf.style.animationDuration = `${duration}s`;

        // Случайная фаза анимации,
        // но БЕЗ задержки появления
        leaf.style.animationDelay = `-${Math.random() * duration}s`;

        // Индивидуальное вращение
        leaf.style.setProperty(
            '--rotation',
            `${Math.random() * 720 - 360}deg`
        );

        // Небольшое индивидуальное отличие
        leaf.style.setProperty(
            '--leaf-offset',
            `${Math.random() * 40 - 20}px`
        );

        leavesContainer.appendChild(leaf);
    }
}

createFallingLeaves();

let wind = 0;
let windTarget = 90;

// Постоянное плавное движение ветра
function updateWind() {
    // Очень медленно приближаемся к текущей силе ветра
    wind += (windTarget - wind) * 0.003;

    document.documentElement.style.setProperty(
        '--wind',
        `${wind}px`
    );

    requestAnimationFrame(updateWind);
}

// Плавно меняем направление ветра
function changeWind() {
    // Сначала ветер постепенно ослабевает
    windTarget = 0;

    // Через 3 секунды начинает плавно дуть в другую сторону
    setTimeout(() => {
        windTarget = Math.random() > 0.5 ? 90 : -90;
    }, 3000);
}

// Первый ветер
windTarget = 90;

// Меняем направление примерно каждые 12–18 секунд
setInterval(() => {
    changeWind();
}, 12000 + Math.random() * 6000);

updateWind();

createFallingLeaves();

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


function createSecretFloatingHearts() {
    if (!secretFloatingHearts) return;
    
    secretFloatingHearts.innerHTML = '';
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-emoji';
        
        const hearts = ['❤️', '💕', '💗', '💓', '💖', '💘', '💝', '🩷'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const top = Math.random() * 100;
        const left = Math.random() * 120 - 15;
        const duration = 10 + Math.random() * 12;
        
        heart.style.top = `${top}%`;
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.transform = `translate(${Math.random() * 80 - 40}px, ${Math.random() * 60 - 30}px)`;
        
        const size = 1.2 + Math.random() * 1.5;
        heart.style.fontSize = `${size}rem`;
        heart.style.opacity = 0.1 + Math.random() * 0.2;
        heart.style.color = ['#ff9eb5', '#ff8da1', '#ff7b9c', '#ff6b8b'][Math.floor(Math.random() * 4)];
        
        secretFloatingHearts.appendChild(heart);
    }
}


function showSecretMessage() {
    if (!secretModal || !secretMessage || !secretFloatingHearts) return;
    
    const randomIndex = Math.floor(Math.random() * secretMessages.length);
    secretMessage.textContent = secretMessages[randomIndex];
    
    createSecretFloatingHearts();
    secretModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function closeSecretModal() {
    if (!secretModal) return;
    
    secretModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    if (secretFloatingHearts) {
        secretFloatingHearts.innerHTML = '';
    }
}


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


heartButton.addEventListener('click', function() {

    countdownContainer.style.display = 'flex';
    updateTimer();
    

    const clickHintLine1 = document.getElementById('clickHintLine1');
    if (clickHintLine1) {
        clickHintLine1.style.opacity = '0';
        setTimeout(() => {
            clickHintLine1.style.display = 'none';
        }, 300);
    }
    
    const clickHintLine2 = document.getElementById('clickHintLine2');
    if (clickHintLine2) {
        clickHintLine2.style.opacity = '0';
        setTimeout(() => {
            clickHintLine2.style.display = 'none';
        }, 300);
    }

    const clickHintLine3 = document.getElementById('clickHintLine3');
    if (clickHintLine3) {
        clickHintLine3.style.opacity = '0';
        setTimeout(() => {
            clickHintLine3.style.display = 'none';
        }, 300);
    }
    
    

    heartClickCount++;
    console.log(`❤️ Нажатий: ${heartClickCount}`);
    
    if (heartClickCount === SECRET_CODE) {
        showSecretMessage();
        heartClickCount = 0; 
        localStorage.setItem('heartClickCount', 0); 
    } else {

        localStorage.setItem('heartClickCount', heartClickCount);
    }
});


memoryItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const memoryIndex = parseInt(this.dataset.index);
        
        if (memories[memoryIndex]) {
            modalPhoto.src = memories[memoryIndex].image;
            modalText.textContent = memories[memoryIndex].text;
            
            if (memoryIndex === 5) {
                modalPhoto.style.maxHeight = '10vh';     
                modalPhoto.style.maxWidth = '50%';       
                modalPhoto.style.margin = '10px auto';   
                modalPhoto.style.borderRadius = '8px';
                modalPhoto.style.border = 'none';
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


if (secretClose) {
    secretClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSecretModal();
    });
}

if (secretModal) {
    secretModal.addEventListener('click', function(e) {
        if (e.target === secretModal) {
            closeSecretModal();
        }
    });
}


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (secretModal && secretModal.style.display === 'block') {
            closeSecretModal();
        }
        if (modal.style.display === 'flex') {
            closeModal();
        }
    }
    

    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 's')) {
        e.preventDefault();
    }
});


window.addEventListener('touchstart', (e) => {
    if (!e.target.closest('button') && 
        !e.target.closest('.memory-item') && 
        !e.target.closest('.modal-close') &&
        !e.target.closest('.secret-close') &&
        !e.target.closest('.modal-photo')) {
        e.preventDefault();
    }
}, { passive: false });


window.addEventListener('load', function() {
    createFloatingHearts();
    

    const savedCount = localStorage.getItem('heartClickCount');
    if (savedCount) {
        heartClickCount = parseInt(savedCount);
    }
});

window.addEventListener('resize', function() {
    if (modal.style.display === 'flex') {
        modal.scrollTop = 0;
    }
});
