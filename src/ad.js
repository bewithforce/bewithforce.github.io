const first_interstitial_slot = '/21857590943,22960671442/tgads_test/300x250';
const first_interstitial_size = [[300, 300], [300, 250]];
const first_interstitial_url = 'playhop.com';

const manual_interstitial_slot = '/21857590943,22960671442/tgads_test/manual_interstitial';
const manual_interstitial_url = 'playhop.com';

const reward_slot = '/21857590943,22960671442/tgads_test/rewarded_ads';
const reward_url = 'playhop.com';

const banner_slot = '/21857590943,22960671442/tgads_test/300x250';
const banner_size = [[300, 300], [300, 250]];
const banner_url = 'playhop.com';


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

async function showManualInterstitialAd(id) {


}

let interstitial_ready_slot;
let interstitial_ad;
let first_ad;
let banner_ad;
let rewarded_ad;
let rewarded_result;

let interstitial_ready = false;

function setupAd(id) {
    window.googletag = window.googletag || {cmd: []};
    googletag.cmd.push(() => {
        banner_ad = googletag.defineOutOfPageSlot(
            banner_slot, googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
        );
        if (banner_ad) {
            banner_ad.addService(googletag.pubads());
        }

        defineGameManualInterstitialSlot();

        rewarded_ad = googletag.defineOutOfPageSlot(
            reward_slot,
            googletag.enums.OutOfPageFormat.REWARDED
        );
        if (rewarded_ad) {
            rewarded_ad.addService(googletag.pubads());
            googletag.pubads().addEventListener('rewardedSlotReady',
                (evt) => {
                    evt.makeRewardedVisible();
                });
            googletag.pubads().addEventListener('rewardedSlotGranted',
                (evt) => {
                    rewarded_result = 'viewed';
                    googletag.destroySlots([rewardedSlot]);
                });
            googletag.pubads().addEventListener('rewardedSlotClosed',
                (evt) => {
                    rewarded_result = 'dismissed';
                    googletag.destroySlots([rewardedSlot]);
                });
        }

        first_ad = googletag.defineSlot(
            first_interstitial_slot,
            first_interstitial_size,
            'div-ad'
        );
        if (first_ad) {
            rewarded_ad.addService(googletag.pubads());
        }
        googletag.pubads().setTargeting("gameID", id);
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
    });
    googletag.cmd.push(() => {
        googletag.pubads().set("page_url", banner_url);
        googletag.display(banner_ad);
    });
}

function defineGameManualInterstitialSlot() {
    let interstitial_ad = googletag.defineOutOfPageSlot(
        manual_interstitial_slot,
        googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL);

    if (interstitial_ad) {
        interstitial_ad.addService(googletag.pubads());
        googletag.pubads().addEventListener('gameManualInterstitialSlotReady',
            (slotReadyEvent) => {
                if (interstitial_ad === slotReadyEvent.slot) {
                    interstitial_ready = true;
                    interstitial_ready_slot = slotReadyEvent;
                }
            });
        googletag.pubads().addEventListener('gameManualInterstitialSlotClosed',
            resumeGame);
    }

}

function resumeGame() {
    document.getElementById('trigger').style.display = 'none';
    googletag.destroySlots([interstitial_ad]);
    defineGameManualInterstitialSlot();
    googletag.display(interstitial_ad);
    interstitial_ready = false;
}

export default class Ad {
    constructor(id) {
        setupAdOverlay();
        setupAd(id);
        this.showFirstInterstitialAd(10);
    }

    async showFirstInterstitialAd(time) {
        const adOverlay = document.getElementById('ad-overlay');
        const closeButton = document.getElementById('close-ad-button');
        const timer = document.getElementById('timer');

        adOverlay.style.display = 'flex'; // Показываем рекламный блок

        // Изначально показываем кнопку закрытия как неактивную
        closeButton.classList.remove('enabled');

        googletag.cmd.push(function () {
            googletag.pubads().set("page_url", first_interstitial_slot);
            googletag.display(elementId);
        });

        // Таймер для активации кнопки
        let remainingTime = time;
        const countdown = setInterval(() => {
            timer.textContent = `${remainingTime} seconds`;
            remainingTime -= 1;

            if (remainingTime < 0) {
                clearInterval(countdown);
                closeButton.classList.add('enabled');
                timer.textContent = 'Close the ad';
            }
        }, 1000);

        closeButton.addEventListener('click', () => {
            if (this.classList.contains('enabled')) {
                adOverlay.style.display = 'none';
                clearInterval(countdown);
            }

        });
    }

    showManualInterstitialAd() {
        if (interstitial_ready === true) {
            interstitial_ready_slot.makeGameManualInterstitialVisible();
        }
    }

    isInterstitialReady() {
        return interstitial_ready;
    }

    showBannerAd() {
        let banner_ad = this.banner_ad;
        googletag.cmd.push(() => {
            googletag.pubads().set("page_url", banner_url);
            googletag.display(banner_ad);
        });
    }

    async rewardAd() {
        rewarded_result = 'before';
        googletag.cmd.push(() => {
            googletag.pubads().set("page_url", reward_url);
            googletag.display(rewarded_ad);
        });
        while (rewarded_result === 'before') {
            await new Promise(r => setTimeout(r, 200));
        }
        return rewarded_result;
    }
}