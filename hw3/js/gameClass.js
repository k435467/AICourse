class Game {
  constructor(depth) {
    this.depth = depth;
    const initGrid = [
      [0, -1, 0, -1, 0, -1, 0, -1],
      [-1, 0, -1, 0, -1, 0, -1, 0],
      [0, -1, 0, -1, 0, -1, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    this.board = new Board(initGrid, 1, 12, 12);
  }

  nextTurn() {
    this.board.turn *= -1;
  }

  isOver() {
    return this.board.possibleMoves().length === 0;
  }

  moveByComputer() {
    const children = this.board.children();
    let value;
    let minValue = posInfinity;
    let bestChild; // best child for red/computer
    for (let child in children) {
      child = children[child];
      value = alphabeta(
        child,
        this.depth,
        negInfinity,
        posInfinity,
        this.board.isBlackTurn
      );
      if (value < minValue) {
        minValue = value;
        bestChild = child;
      }
    }
    this.board = bestChild;
  }

  performMove(move) {
    // return true: jump again
    // return false: next turn
    let from = move.from;
    let to = move.to;
    this.board.grid[to.row][to.col] = this.board.grid[from.row][from.col];
    this.board.grid[from.row][from.col] = 0; // have move to new loc
    if (Board._setToKing(this.board.grid, to.row, to.col)) {
      // if set to king, then next turn
      return false;
    }
    if (move.isJump) {
      // if jump
      const mid = from.midPointBetween(to);
      this.board.grid[mid.row][mid.col] = 0; // been taken
      let moves = this.board.possibleMovesOfAPiece(to.row, to.col);
      if (moves.length > 0 && moves[0].isJump) {
        // jump again
        return true;
      }
    }
    return false;
  }

  moveByPlayer() {}
}
