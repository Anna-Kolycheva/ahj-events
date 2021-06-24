export default class Board {
  constructor() {
    this.board = null;
  }

  createBoard(size) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    for (let i = 0; i < size ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      wrapper.appendChild(cell);
    }

    this.board = wrapper;
    return this.board;
  }
}
