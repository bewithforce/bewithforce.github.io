// Функция для добавления стилей и HTML-разметки для рекламы
function setupAdOverlay() {
    // Создаем стили для рекламы
    const style = document.createElement('style');
    style.textContent = `
        #ad-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: none;
            z-index: 1000;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 24px;
            text-align: center;
            overflow: hidden; /* Добавлено для предотвращения выхода содержимого за пределы экрана */
        }
        #close-ad-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 16px;
            padding: 10px;
            border-radius: 5px;
            cursor: not-allowed; /* Показать курсор, указывающий, что кнопка неактивна */
            display: block; /* Сделать кнопку видимой сразу */
            opacity: 0.5; /* Показать кнопку полупрозрачной, чтобы указать на её неактивность */
            transition: opacity 0.3s ease, cursor 0.3s ease; /* Плавное изменение прозрачности и курсора */
        }
        #close-ad-button.enabled {
            cursor: pointer; /* Изменить курсор на указатель, когда кнопка активна */
            opacity: 1; /* Сделать кнопку полностью непрозрачной, когда она активна */
        }
        #timer {
            display: block;
            font-size: 14px;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);

    // Создаем элемент для рекламы
    const adOverlay = document.createElement('div');
    adOverlay.id = 'ad-overlay';
    adOverlay.innerHTML = '<p id="ad-text">Loading ad...</p>';

    // Создаем кнопку для закрытия рекламы
    const closeButton = document.createElement('button');
    closeButton.id = 'close-ad-button';
    closeButton.textContent = 'Close Ad';

    // Создаем элемент для таймера
    const timer = document.createElement('span');
    timer.id = 'timer';
    timer.textContent = 'You can close in 5 seconds'; // Изначально показываем сообщение о времени

    closeButton.appendChild(timer);
    adOverlay.appendChild(closeButton);
    document.body.appendChild(adOverlay);
}

// Функция для показа полноэкранной рекламы
function showFullScreenAd() {
    const adOverlay = document.getElementById('ad-overlay');
    const adText = document.getElementById('ad-text');
    const closeButton = document.getElementById('close-ad-button');
    const timer = document.getElementById('timer');

    adOverlay.style.display = 'flex'; // Показываем рекламный блок

    // Изначально показываем кнопку закрытия как неактивную
    closeButton.classList.remove('enabled');

    // Имитация задержки загрузки рекламы
    setTimeout(function() {
        adText.textContent = 'Thank you for watching the ad!'; // Замена содержимого рекламы
        // Имитируем закрытие рекламы через некоторое время
        setTimeout(function() {
            adOverlay.style.display = 'none'; // Скрываем рекламный блок
        }, 30000); // Задержка перед скрытием рекламы
    }, 2000); // Имитация времени загрузки рекламы

    // Таймер для активации кнопки
    let remainingTime = 5;
    const countdown = setInterval(function() {
        timer.textContent = `You can close in ${remainingTime} seconds`;
        remainingTime -= 1;

        if (remainingTime < 0) {
            clearInterval(countdown);
            closeButton.classList.add('enabled'); // Делает кнопку активной
            timer.textContent = 'You can now close the ad';
        }
    }, 1000);

    closeButton.addEventListener('click', function() {
        adOverlay.style.display = 'none'; // Скрываем рекламный блок
        clearInterval(countdown); // Очищаем таймер, если реклама была закрыта до истечения времени
    });
}

// Инициализация рекламного блока
setupAdOverlay();

// Слушаем событие клика по кнопке для показа рекламы
document.addEventListener('DOMContentLoaded', function() {
    const showAdButton = document.getElementById('show-ad');
    if (showAdButton) {
        showAdButton.addEventListener('click', showFullScreenAd);
    }
});