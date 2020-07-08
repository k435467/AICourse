class Point {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  midPointBetween(p) {
    const newR = (this.row + p.row) / 2;
    const newC = (this.col + p.col) / 2;
    return new Point(newR, newC);
  }

  isIn(points) {
    for (let p in points) {
      p = points[p];
      if (p.row === this.row && p.col === this.col) {
        return true;
      }
    }
    return false;
  }

  static upperDiagonal() {
    return [new Point(-1, -1), new Point(-1, 1)];
  }

  static lowerDiagonal() {
    return [new Point(1, -1), new Point(1, 1)];
  }

  static diagonal() {
    return Point.upperDiagonal().concat(Point.lowerDiagonal());
  }
}
