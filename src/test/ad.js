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
    adOverlay.innerHTML = '<div id="ad-div"></div>';

    // Создаем кнопку для закрытия рекламы
    const closeButton = document.createElement('button');
    closeButton.id = 'close-ad-button';

    // Создаем элемент для таймера
    const timer = document.createElement('span');
    timer.id = 'timer';
    timer.textContent = '5 seconds'; // Изначально показываем сообщение о времени

    closeButton.appendChild(timer);
    adOverlay.appendChild(closeButton);
    document.body.appendChild(adOverlay);
}

export default class Ad {
    constructor(id) {
        this.id = id;
        setupAdOverlay();
    }

    async showAd(elementId) {
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(function () {
            googletag.defineSlot(
                '/21857590943,22960671442/tgads_test/300x250',
                [[300, 300], [300, 250]],
                elementId
            ).addService(googletag.pubads());
            googletag.pubads().set("page_url", "playhop.com");
            googletag.pubads().setTargeting("gameID", this.id)
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });


        googletag.cmd.push(function () {
            googletag.display(elementId);
        });
    }

    async nextAd() {
        const adOverlay = document.getElementById('ad-overlay');
        const adDiv = document.getElementById('ad-div');
        const closeButton = document.getElementById('close-ad-button');
        const timer = document.getElementById('timer');

        adOverlay.style.display = 'flex'; // Показываем рекламный блок

        // Изначально показываем кнопку закрытия как неактивную
        closeButton.classList.remove('enabled');

        this.showAd('ad-div');

        // Таймер для активации кнопки
        let remainingTime = 5;
        const countdown = setInterval(function () {
            timer.textContent = `${remainingTime} seconds`;
            remainingTime -= 1;

            if (remainingTime < 0) {
                clearInterval(countdown);
                closeButton.classList.add('enabled'); // Делает кнопку активной
                timer.textContent = 'Close the ad';
            }
        }, 1000);

        closeButton.addEventListener('click', function () {
            if (this.classList.contains('enabled')) {
                adOverlay.style.display = 'none'; // Скрываем рекламный блок
                clearInterval(countdown); // Очищаем таймер, если реклама была закрыта до истечения времени
            }

        });
    }

    async rewardAd() {
        let res = 'before';
        adBreak({
            type: 'reward',
            beforeAd: () => {
                res = 'started'
            },
            beforeReward: (showAdFn) => {
                showAdFn();
            },
            adDismissed: () => {
                res = 'dismissed'
            },
            adViewed: () => {
                res = 'viewed'
            },
            adBreakDone: (placementInfo) => {
                res = placementInfo.breakStatus;
            }
        });
        while (res === 'before' || res === 'started') {
            await new Promise(r => setTimeout(r, 200));
        }
        return res;
    }
}