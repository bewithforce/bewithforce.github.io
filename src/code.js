class Game {
    constructor() {
        // Define variables
        this.ad = new Ad();
        this.rewardButton = document.getElementById('reward');
        this.counter = document.getElementById('counter');
        this.Rjomba = document.getElementById('Rjomba');
        this.counter.innerText = Number(localStorage.getItem('sum')).toString() + ' $RJMB';

        adConfig({
            sound: 'on',
        });

        // On click listeners for the game's buttons.
        this.Rjomba.addEventListener('click', () => {
            this.play();
        });

        // On click listeners for the game's buttons.
        this.rewardButton.addEventListener('click', () => {
            this.ad.rewardAd().then(r => console.log(r));
            this.add(100);
        });
    }

    add(quantity){
        let sum = Number(localStorage.getItem('sum'))
        sum += Number(quantity)
        localStorage.setItem('sum', '' + sum)
        this.counter.innerText = sum.toString() + ' $RJMB'
        return sum
    }

    // Start the game
    play() {
        let sum = this.add(1);
        if (sum % 10 === 0) {
            console.log('ad')
            this.ad.nextAd().then(r => console.log(r));
        }
    }
}

const game = new Game();