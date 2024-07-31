
async function otherAd(type){
    let res = 'before';
    adBreak({
        type: type,
        beforeAd:() => {
            res = 'started'
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

class Ad {
    constructor() {
        // adConfig({sound: 'on', preloadAdBreaks: 'on'});
        adConfig({sound: 'off', preloadAdBreaks: 'on'});
    }

    async prerollAd(){
        return otherAd('preroll')
    }

    async startAd(){
        return otherAd('start')
    }

    async pauseAd(){
        return otherAd('pause')
    }

    async nextAd(){
        return otherAd('next')
    }

    async browseAd(){
        return otherAd('browse')
    }

    async rewardAd() {
        let res = 'before';
        adBreak({
            type: 'reward',
            beforeAd:() => {
                res = 'started'
            },
            beforeReward: (showAdFn) => {
                showAdFn();
            },
            adDismissed: () => {
                res = 'viewed'
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
