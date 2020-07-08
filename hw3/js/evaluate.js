function heuristicEvaluate(grid) {
  // board
  // empty: 0
  // black pawn: 1
  // black king: 2
  // red pawn: -1
  // red king: -2

  // value for player
  // Index 0: Number of pawns
  // Index 1: Number of kings
  // Index 2: Number in back row
  // Index 3: Number in middle box
  // Index 4: Number in middle 2 rows, not box
  // Index 5: Number that can be taken this turn
  // Index 6: Number that are protected
  let blackNums = [0, 0, 0, 0, 0, 0, 0];
  let redNums = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      const piece = grid[i][j];
      if (piece != 0) {
        if (piece > 0) {
          // ----------
          // black piece
          // ----------

          if (piece === 1) {
            // is a pawn
            ++blackNums[0];
          } else {
            // is a king
            ++blackNums[1];
          }

          if (i === 7) {
            // is in back row
            ++blackNums[2];
            ++blackNums[6];
          } else {
            if (i === 3 || i === 4) {
              // middle rows
              if (j >= 2 && j <= 5) {
                // middle box
                ++blackNums[3];
              } else {
                // middle row, not box
                ++blackNums[4];
              }
            }

            // can be taken this turn
            if (i > 0 && j > 0 && j < 7) {
              if (grid[i - 1][j - 1] < 0 && grid[i + 1][j + 1] === 0) {
                // there is a enemy at (i-1, j-1) and it can jump
                ++blackNums[5];
              }
              if (grid[i - 1][j + 1] < 0 && grid[i - 1][j + 1] === 0) {
                // there is a enemy at (i-1, j+1) and it can jump
                ++blackNums[5];
              }
            }

            // protected
            if (j === 0 || j === 7) {
              ++blackNums[6];
            } else if (
              (grid[i + 1][j - 1] > 0 || Math.abs(grid[i + 1][j - 1]) === 1) &&
              (grid[i + 1][j + 1] > 0 || Math.abs(grid[i + 1][j + 1] === 1))
            ) {
              // there is a friend or enemy pawn prevent enemy jump
              ++blackNums[6];
            }
          }
        } else {
          // ----------
          // red piece
          // ----------

          if (piece === 1) {
            // is a pawn
            ++redNums[0];
          } else {
            // is a king
            ++redNums[1];
          }

          if (i === 0) {
            // is in back row
            ++redNums[2];
            ++redNums[6];
          } else {
            if (i === 3 || i === 4) {
              // middle rows
              if (j >= 2 && j <= 5) {
                // middle box
                ++redNums[3];
              } else {
                // middle row, not box
                ++redNums[4];
              }
            }

            // can be taken this turn
            if (i < 7 && j > 0 && j < 7) {
              if (grid[i + 1][j - 1] > 0 && grid[i - 1][j + 1] === 0) {
                // there is a enemy at (i+1, j-1) and it can jump
                ++redNums[5];
              }
              if (grid[i + 1][j + 1] > 0 && grid[i - 1][j - 1] === 0) {
                // there is a enemy at (i+1, j+1) and it can jump
                ++redNums[5];
              }
            }

            // protected
            if (j === 0 || j === 7) {
              ++redNums[6];
            } else if (
              (grid[i - 1][j - 1] < 0 || Math.abs(grid[i - 1][j - 1]) === 1) &&
              (grid[i - 1][j + 1] < 0 || Math.abs(grid[i - 1][j + 1] === 1))
            ) {
              // there is a friend or enemy pawn prevent enemy jump
              ++redNums[6];
            }
          }
        }
      }
    }
  }

  // compute final value
  let dif = [0, 0, 0, 0, 0, 0, 0];
  const weight = [5, 7.75, 4, 2.5, 0.5, -3, 3];
  for (i = 0; i < blackNums.length; ++i) {
    dif[i] = blackNums[i] - redNums[i];
    dif[i] *= weight[i];
  }
  return dif.reduce((a, b) => a + b, 0);
}
