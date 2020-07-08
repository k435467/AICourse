class Board {
  // grid
  // empty: 0
  // black pawn: 1
  // black king: 2
  // red pawn: -1
  // red king: -2

  // turn
  // black: 1
  // red: -1
  constructor(grid, turn) {
    this.grid = grid;
    this.turn = turn;
  }

  get blackTurn() {
    return this.turn > 0;
  }

  get redTurn() {
    return this.turn < 0;
  }

  _isKing(piece) {
    return Math.abs(piece === 2);
  }

  _isEnemy(piece) {
    return piece * this.turn < 0;
  }

  _isEmpty(piece) {
    return piece === 0;
  }

  _isValid(row, col) {
    return row < 8 && col < 8 && row >= 0 && col >= 0;
  }

  static _setToKing(grid, row, col) {
    const piece = grid[row][col];
    if (piece === 1 && row === 0) {
      grid[row][col] = 2;
      return true;
    } else if (piece === -1 && row === 7) {
      grid[row][col] = -2;
      return true;
    }
    return false;
  }

  possibleMovesOfAPiece(row, col) {
    let moves = [];
    let jumps = [];
    const piece = this.grid[row][col];
    if (this._isEnemy(piece) || this._isEmpty(piece)) {
      return moves;
    }

    // set offset by turn and king
    let offset;
    if (this._isKing(piece)) {
      offset = Point.diagonal();
    } else if (this.blackTurn) {
      offset = Point.upperDiagonal();
    } else {
      offset = Point.lowerDiagonal();
    }

    for (let o in offset) {
      o = offset[o];
      const newR = row + o.row;
      const newC = col + o.col;
      if (this._isValid(newR, newC)) {
        const newPiece = this.grid[newR][newC];
        if (this._isEmpty(newPiece)) {
          // a empty grid can go to
          moves.push(new Move(new Point(row, col), new Point(newR, newC)));
        } else if (this._isEnemy(newPiece)) {
          const jumpR = newR + o.row;
          const jumpC = newC + o.col;
          if (this._isValid(jumpR, jumpC)) {
            const jumpPiece = this.grid[jumpR][jumpC];
            if (this._isEmpty(jumpPiece)) {
              // can jump and eat a enemy
              jumps.push(
                new Move(new Point(row, col), new Point(jumpR, jumpC), true)
              );
            }
          }
        }
      }
    }
    if (jumps.length > 0) {
      return jumps;
    }
    return moves;
  }

  possibleDestinationsOfAPiece(row, col) {
    let points = [];
    const moves = this.possibleMovesOfAPiece(row, col);
    for (let move in moves) {
      move = moves[move];
      points.push(move.to);
    }
    return points;
  }

  possibleMoves() {
    let allMoves = [];
    let allJumps = [];
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 8; ++j) {
        const piece = this.grid[i][j];
        if (!this._isEnemy(piece) && !this._isEmpty(piece)) {
          const moves = this.possibleMovesOfAPiece(i, j);
          if (moves.length > 0 && moves[0].isJump) {
            allJumps = allJumps.concat(moves);
          } else {
            allMoves = allMoves.concat(moves);
          }
        }
      }
    }
    if (allJumps.length > 0) {
      return allJumps;
    }
    return allMoves;
  }

  piecesCanMove() {
    let points = [];
    const moves = this.possibleMoves();
    for (let move in moves) {
      move = moves[move];
      if (!move.from.isIn(points)) {
        points.push(move.from);
      }
    }
    return points;
  }

  multipleJumpsChildren(row, col) {
    let newGrid;
    const moves = this.possibleMovesOfAPiece(row, col);
    if (moves.length > 0 && moves[0].isJump) {
      // Multiple jump
      let children = [];
      for (let move in moves) {
        move = moves[move];
        newGrid = _.cloneDeep(this.grid);
        newGrid[move.to.row][move.to.col] =
          newGrid[move.from.row][move.from.col];
        newGrid[move.from.row][move.from.col] = 0; // have move to new loc
        const mid = move.from.midPointBetween(move.to);
        newGrid[mid.row][mid.col] = 0; // been taken
        if (Board._setToKing(newGrid, move.to.row, move.to.col)) {
          children.push(new Board(newGrid, this.turn * -1));
          continue;
        }
        let newBoard = new Board(newGrid, this.turn);
        children = children.concat(
          newBoard.multipleJumpsChildren(move.to.row, move.to.col)
        );
      }
      return children;
    } else {
      // end of jump
      newGrid = _.cloneDeep(this.grid);
      return [new Board(newGrid, this.turn * -1)];
    }
  }

  children() {
    let children = [];
    const moves = this.possibleMoves();
    for (let move in moves) {
      move = moves[move];
      let newGrid = _.cloneDeep(this.grid);
      newGrid[move.to.row][move.to.col] = newGrid[move.from.row][move.from.col];
      newGrid[move.from.row][move.from.col] = 0; // have move to new loc
      if (move.isJump) {
        const mid = move.from.midPointBetween(move.to);
        newGrid[mid.row][mid.col] = 0; // been taken
      }
      if (Board._setToKing(newGrid, move.to.row, move.to.col)) {
        children.push(new Board(newGrid, this.turn * -1));
        continue;
      }
      if (move.isJump) {
        let newBoard = new Board(newGrid, this.turn);
        children = children.concat(
          newBoard.multipleJumpsChildren(move.to.row, move.to.col)
        );
        continue;
      }
      children.push(new Board(newGrid, this.turn * -1));
    }
    return children;
  }
}
