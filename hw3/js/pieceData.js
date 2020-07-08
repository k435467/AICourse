const lightwoodUrl = "url('img/lightwood.png')";
const darkwoodUrl = "url('img/darkwood.png')";

const classOfBlackPiece = "piece p-black";
const classOfBlackPieceChoice = "piece p-black-choice";
const classOfRedPiece = "piece p-red";
const classOfRedPieceChoice = "piece p-red-choice";
const classOfEmpty = "piece p-empty";
const classOfEmptyChoice = "piece p-empty-choice";
const classOfKing = "p-king";

let pieceData = [
  [
    { row: 0, col: 0, img: lightwoodUrl, class: classOfEmpty },
    { row: 0, col: 1, img: darkwoodUrl, class: classOfRedPiece },
    { row: 0, col: 2, img: lightwoodUrl, class: classOfEmpty },
    { row: 0, col: 3, img: darkwoodUrl, class: classOfRedPiece },
    { row: 0, col: 4, img: lightwoodUrl, class: classOfEmpty },
    { row: 0, col: 5, img: darkwoodUrl, class: classOfRedPiece },
    { row: 0, col: 6, img: lightwoodUrl, class: classOfEmpty },
    { row: 0, col: 7, img: darkwoodUrl, class: classOfRedPiece },
  ],
  [
    { row: 1, col: 0, img: darkwoodUrl, class: classOfRedPiece },
    { row: 1, col: 1, img: lightwoodUrl, class: classOfEmpty },
    { row: 1, col: 2, img: darkwoodUrl, class: classOfRedPiece },
    { row: 1, col: 3, img: lightwoodUrl, class: classOfEmpty },
    { row: 1, col: 4, img: darkwoodUrl, class: classOfRedPiece },
    { row: 1, col: 5, img: lightwoodUrl, class: classOfEmpty },
    { row: 1, col: 6, img: darkwoodUrl, class: classOfRedPiece },
    { row: 1, col: 7, img: lightwoodUrl, class: classOfEmpty },
  ],
  [
    { row: 2, col: 0, img: lightwoodUrl, class: classOfEmpty },
    { row: 2, col: 1, img: darkwoodUrl, class: classOfRedPiece },
    { row: 2, col: 2, img: lightwoodUrl, class: classOfEmpty },
    { row: 2, col: 3, img: darkwoodUrl, class: classOfRedPiece },
    { row: 2, col: 4, img: lightwoodUrl, class: classOfEmpty },
    { row: 2, col: 5, img: darkwoodUrl, class: classOfRedPiece },
    { row: 2, col: 6, img: lightwoodUrl, class: classOfEmpty },
    { row: 2, col: 7, img: darkwoodUrl, class: classOfRedPiece },
  ],
  [
    { row: 3, col: 0, img: darkwoodUrl, class: classOfEmpty },
    { row: 3, col: 1, img: lightwoodUrl, class: classOfEmpty },
    { row: 3, col: 2, img: darkwoodUrl, class: classOfEmpty },
    { row: 3, col: 3, img: lightwoodUrl, class: classOfEmpty },
    { row: 3, col: 4, img: darkwoodUrl, class: classOfEmpty },
    { row: 3, col: 5, img: lightwoodUrl, class: classOfEmpty },
    { row: 3, col: 6, img: darkwoodUrl, class: classOfEmpty },
    { row: 3, col: 7, img: lightwoodUrl, class: classOfEmpty },
  ],
  [
    { row: 4, col: 0, img: lightwoodUrl, class: classOfEmpty },
    { row: 4, col: 1, img: darkwoodUrl, class: classOfEmpty },
    { row: 4, col: 2, img: lightwoodUrl, class: classOfEmpty },
    { row: 4, col: 3, img: darkwoodUrl, class: classOfEmpty },
    { row: 4, col: 4, img: lightwoodUrl, class: classOfEmpty },
    { row: 4, col: 5, img: darkwoodUrl, class: classOfEmpty },
    { row: 4, col: 6, img: lightwoodUrl, class: classOfEmpty },
    { row: 4, col: 7, img: darkwoodUrl, class: classOfEmpty },
  ],
  [
    { row: 5, col: 0, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 5, col: 1, img: lightwoodUrl, class: classOfEmpty },
    { row: 5, col: 2, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 5, col: 3, img: lightwoodUrl, class: classOfEmpty },
    { row: 5, col: 4, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 5, col: 5, img: lightwoodUrl, class: classOfEmpty },
    { row: 5, col: 6, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 5, col: 7, img: lightwoodUrl, class: classOfEmpty },
  ],
  [
    { row: 6, col: 0, img: lightwoodUrl, class: classOfEmpty },
    { row: 6, col: 1, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 6, col: 2, img: lightwoodUrl, class: classOfEmpty },
    { row: 6, col: 3, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 6, col: 4, img: lightwoodUrl, class: classOfEmpty },
    { row: 6, col: 5, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 6, col: 6, img: lightwoodUrl, class: classOfEmpty },
    { row: 6, col: 7, img: darkwoodUrl, class: classOfBlackPiece },
  ],
  [
    { row: 7, col: 0, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 7, col: 1, img: lightwoodUrl, class: classOfEmpty },
    { row: 7, col: 2, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 7, col: 3, img: lightwoodUrl, class: classOfEmpty },
    { row: 7, col: 4, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 7, col: 5, img: lightwoodUrl, class: classOfEmpty },
    { row: 7, col: 6, img: darkwoodUrl, class: classOfBlackPiece },
    { row: 7, col: 7, img: lightwoodUrl, class: classOfEmpty },
  ],
];
