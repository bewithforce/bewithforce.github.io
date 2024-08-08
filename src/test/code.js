class Game {
    constructor() {
        this.counter = document.getElementById('counter');
        this.Rjomba = document.getElementById('Rjomba');
        this.counter.innerText = Number(localStorage.getItem('sum')).toString() + ' $RJMB';

        this.Rjomba.addEventListener('click', () => {
            this.play();
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
        this.add(1);
    }
}

const game = new Game();