const posInfinity = 10000;
const negInfinity = -10000;

function alphabeta(board, depth, alpha, beta, maximizingPlayer) {
  let children = board.children();
  if (depth <= 0 || children.length <= 0) {
    return heuristicEvaluate(board.grid);
  }
  let v;
  if (maximizingPlayer) {
    v = negInfinity;
    for (let child in children) {
      child = children[child];
      v = Math.max(v, alphabeta(child, depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, v);
      if (beta <= alpha) {
        // pruning
        break;
      }
    }
    return v;
  } else {
    v = posInfinity;
    for (let child in children) {
      child = children[child];
      v = Math.min(v, alphabeta(child, depth - 1, alpha, beta, true));
      beta = Math.min(beta, v);
      if (beta <= alpha) {
        // pruning
        break;
      }
    }
    return v;
  }
}
