let app1 = new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    showContent: false,
    pieces: pieceData,
    choices: [],
    selectedPiece: undefined,
    destinationChoices: [],
    selectedDestination: undefined,
    game: new Game(4), // argument: depth
    gameResult: { show: false, title: "", text: "" },
  },
  methods: {
    changeFromNormalToChoice(row, col) {
      let result = this.pieces[row][col].class;
      result = result.replace(classOfBlackPiece, classOfBlackPieceChoice);
      result = result.replace(classOfRedPiece, classOfRedPieceChoice);
      result = result.replace(classOfEmpty, classOfEmptyChoice);
      this.pieces[row][col].class = result;
    },
    changeFromChoiceToNormal(row, col) {
      let result = this.pieces[row][col].class;
      result = result.replace(classOfBlackPieceChoice, classOfBlackPiece);
      result = result.replace(classOfRedPieceChoice, classOfRedPiece);
      result = result.replace(classOfEmptyChoice, classOfEmpty);
      this.pieces[row][col].class = result;
    },
    clickPiece(row, col) {
      const clickedPiece = new Point(row, col);
      if (clickedPiece.isIn(this.choices)) {
        // -------------------------
        // selected a piece to move
        // -------------------------
        this.selectedPiece = new Point(row, col);
        // clear choices
        for (let p in this.choices) {
          p = this.choices[p];
          this.changeFromChoiceToNormal(p.row, p.col);
        }
        this.choices = [];
        // set move destinations to choice
        this.setDestinationChoices(
          this.game.board.possibleDestinationsOfAPiece(row, col)
        );
      } else if (clickedPiece.isIn(this.destinationChoices)) {
        // -----------------------------
        // selected a destination to go
        // -----------------------------
        this.selectedDestination = new Point(row, col);
        // clear destinationChoices
        for (let p in this.destinationChoices) {
          p = this.destinationChoices[p];
          this.changeFromChoiceToNormal(p.row, p.col);
        }
        this.destinationChoices = [];
        let move = new Move(
          this.selectedPiece,
          this.selectedDestination,
          Move.isJump(this.selectedPiece, this.selectedDestination)
        );
        if (this.game.performMove(move)) {
          // jump again
          this.updateView();
          this.setDestinationChoices(
            this.game.board.possibleDestinationsOfAPiece(
              this.selectedDestination.row,
              this.selectedDestination.col
            )
          );
          this.selectedPiece = this.selectedDestination;
          this.selectedDestination = undefined;
        } else {
          // next turn
          this.game.nextTurn();
          this.playByComputer();
        }
      }
    },
    setChoices(points) {
      this.choices = points;
      for (let p in points) {
        p = points[p];
        this.changeFromNormalToChoice(p.row, p.col);
      }
    },
    setDestinationChoices(points) {
      this.destinationChoices = points;
      for (let p in points) {
        p = points[p];
        this.changeFromNormalToChoice(p.row, p.col);
      }
    },
    updateView() {
      const grid = this.game.board.grid;
      for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
          const piece = grid[i][j];
          if (piece > 0) {
            this.pieces[i][j].class = classOfBlackPiece;
          } else if (piece < 0) {
            this.pieces[i][j].class = classOfRedPiece;
          } else {
            this.pieces[i][j].class = classOfEmpty;
          }
          if (Math.abs(piece) === 2) {
            this.pieces[i][j].class =
              this.pieces[i][j].class + " " + classOfKing;
          }
        }
      }
    },
    playByComputer() {
      if (this.game.isOver()) {
        this.winnerIs("player");
        return;
      }
      this.game.moveByComputer();
      setTimeout(() => {
        this.updateView();
        this.playByPlayer();
      }, 500);
    },
    playByPlayer() {
      if (this.game.isOver()) {
        this.winnerIs("computer");
        return;
      }
      this.setChoices(this.game.board.piecesCanMove());
    },
    winnerIs(winner) {
      if (winner === "player") {
        // player/black wins.
        this.gameResult.title = "WIN!";
        this.gameResult.text =
          "Congratulations on winning. If you want to play again, please refresh the page.";
      } else {
        // computer/red wins.
        this.gameResult.title = "LOSE!";
        this.gameResult.text =
          "You are almost there! Keep trying. If you want to play again, please refresh the page.";
      }
      document.getElementById("gameResultActivator").click();
    },
  },
});

window.onload = function () {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  app1.showContent = true;
  app1.playByPlayer();
};
