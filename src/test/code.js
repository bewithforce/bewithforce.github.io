import Ad from './ad.js';

class Game {
    constructor() {
        this.ad = new Ad('111111');
        this.ad.showBigBannerAd('banner');
        this.rewardButton = document.getElementById('reward');
        this.counter = document.getElementById('counter');
        this.Rjomba = document.getElementById('Rjomba');
        this.counter.innerText = Number(localStorage.getItem('sum')).toString() + ' $RJMB';

        this.Rjomba.addEventListener('click', () => {
            this.play();
        });

        this.rewardButton.addEventListener('click', () => {
            this.ad.rewardAd().then(r => {
                console.log(r);
                if (r === 'viewed'){
                    this.add(100);
                }
            });
        });
    }

    add(quantity){
        let sum = Number(localStorage.getItem('sum'))
        sum += Number(quantity)
        localStorage.setItem('sum', '' + sum)
        this.counter.innerText = sum.toString() + ' $RJMB'
        return sum
    }

    play() {
        let sum = this.add(1);
        if (sum % 10 === 0) {
            console.log('ad')
            this.ad.showManualInterstitialAd().then(r => console.log(r));
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const game = new Game();
});
