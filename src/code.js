

class Game {
    constructor() {
        // Define variables
        this.shouldShowAdOnPlay = false;

        this.counter = document.getElementById('counter');
        this.counter.innerText = Number(localStorage.getItem('sum')).toString() + ' $RJMB';

        adConfig({
            sound: 'on',
        });

        // On click listeners for the game's buttons.
        this.counter.addEventListener('click', () => {
            this.play();
        });
    }

    // Start the game
    play() {
        if (this.shouldShowAdOnPlay) {
            this.shouldShowAdOnPlay = false;
            console.log('ad')
            adBreak({
                type: 'next',  // ad shows at start of next level
                name: 'restart-game',
                beforeAd: () => {
                },  // You may also want to mute the game's sound.
                afterAd: () => {
                },    // resume the game flow.
            });
        }

        let sum = Number(localStorage.getItem('sum'));
        sum += 1
        if (sum % 5 === 0) {
            this.shouldShowAdOnPlay = true;

            adBreak({
                type: 'reward',  // rewarded ad
                name: 'reward-continue',
                beforeReward: (showAdFn) => {
                    this.showRewardedAdFn = () => {
                        showAdFn();
                    };
                    // Rewarded ad available - prompt user for a rewarded ad

                },
                beforeAd: () => {
                },     // You may also want to mute the game's sound.
                adDismissed: () => {

                },
                adViewed: () => {
                },       // Reward granted - continue game at current score.
                afterAd: () => {
                },       // Resume the game flow.
            });
        }
        localStorage.setItem('sum', '' + sum)
        this.counter.innerText = sum.toString() + ' $RJMB';
    }
}

const game = new Game();