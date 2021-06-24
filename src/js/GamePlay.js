import Board from './Board';

export default class GamePlay {
  constructor(boardSize = 4) {
    this.board = new Board();
    this.boardSize = boardSize;
    this.index = null;
    this.hit = 0;
    this.miss = 0;
  }

  init() {
    document.body.appendChild(this.board.createBoard(this.boardSize));
    this.cells = [...document.querySelectorAll('.cell')];
    // eslint-disable-next-line prefer-destructuring
    this.img = document.images[0];
    this.start();
  }

  getIndex() {
    this.countCheck = false;
    let index = null;
    do {
      index = Math.floor(Math.random() * (this.boardSize ** 2));
    } while (index === this.index);
    this.index = index;
    return index;
  }

  start() {
    this.eventListener();
    this.interval = setInterval(() => {
      const isNotFirstClick = this.hit !== 0 || this.miss !== 0;
      if (isNotFirstClick && this.countCheck === false) {
        this.miss += 1;
        this.redrowGameScore();
        this.checkGameOver();
      }
      if (this.index || this.index === 0) {
        this.cells[this.index].classList.remove('active');
        this.cells[this.index].innerHTML = '';
      }
      this.getIndex();
      const currentСell = this.cells[this.index];
      currentСell.classList.add('active');
      currentСell.appendChild(this.img);
    }, 1000);
  }

  eventListener() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.addEventListener('click', (event) => this.clickСounter(event.target));
  }

  clickСounter(e) {
    this.checkClick(e);
    this.redrowGameScore();
    this.checkGameOver();
  }

  redrowGameScore() {
    const hit = document.querySelector('.hit');
    if (!hit) {
      return;
    }
    hit.textContent = `попал: ${this.hit}`;
    const miss = document.querySelector('.miss');
    miss.textContent = `промахнулся: ${this.miss}`;
  }

  checkClick(e) {
    let clickOnGoblin = false;
    const img = document.querySelector('img');
    if (e.contains(img)) {
      clickOnGoblin = true;
    }
    if (clickOnGoblin) {
      this.hit += 1;
    } else {
      this.miss += 1;
    }
    this.countCheck = true;
  }

  checkGameOver() {
    if (this.miss === 5) {
      clearInterval(this.interval);
      const text = document.querySelector('.text');
      text.textContent = 'ты проиграл';
    }
  }
}
