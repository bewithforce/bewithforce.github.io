
class Ad {
    constructor() {
        // adConfig({sound: 'on', preloadAdBreaks: 'on'});
        adConfig({sound: 'off', preloadAdBreaks: 'on'});

        adBreak({
            type: 'preroll',
            name: 'coin_flip_preroll'
        });
    }

    rewardAd(){
        let res = '';
        adBreak({
            type: 'reward',
            name: 'one_more_chance',
            beforeAd: () => {
            },
            afterAd: () => {
            },
            beforeReward: (showAdFn) => {
                /*const r = confirm('Watch this video to get one more chance?');
                if (r) {
                    showAdFn();
                } else {
                    alert('You need to restart the game');
                    this.shouldRestart = true;
                }*/
                showAdFn();
            },
            adDismissed: () => {
            },
            adViewed: () => {
            }
        });
    }

    justAd(){
        adBreak({
            type: 'next',
            name: 'continue_game'
        });
    }
}
