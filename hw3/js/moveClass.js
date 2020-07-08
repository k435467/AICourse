class Move {
  constructor(from, to, isJump = false) {
    this.from = from;
    this.to = to;
    this.isJump = isJump;
  }

  static isJump(from, to) {
    return Math.abs(from.row - to.row) > 1 || Math.abs(from.col - to.col) > 1;
  }
}
