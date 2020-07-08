# generate object of piecesBtns

imgs = ["lightwoodUrl", "darkwoodUrl"]
idForImg = 0
redPieces = [(0, 1), (0, 3), (0, 5), (0, 7), (1, 0),
             (1, 2), (1, 4), (1, 6), (1, 8), (2, 1), (2, 3), (2, 5), (2, 7)]
blackPieces = [(5, 0), (5, 2), (5, 4), (5, 6),
               (6, 1), (6, 3), (6, 5), (6, 7), (7, 0), (7, 2), (7, 4), (7, 6)]

writeStr = """
var lightwoodUrl = "url('img/lightwood.png')";
var darkwoodUrl = "url('img/darkwood.png')";

var classOfBlackPiece = "piece p-black";
var classOfBlackPieceChoice = "piece p-black-choice";
var classOfRedPiece = "piece p-red";
var classOfRedPieceChoice = "piece p-red-choice";
var classOfEmpty = "piece p-empty";
var classOfEmptyChoice = "piece p-empty-choice";
var classOfKing = "p-king";

var pieceData = ["""

for i in range(8):
    writeStr += "["
    for j in range(8):
        pieceClassStr = "classOfEmpty"
        if (i, j) in redPieces:
            pieceClassStr = "classOfRedPiece"
        if (i, j) in blackPieces:
            pieceClassStr = "classOfBlackPiece"
        s = "{{ row: {0}, col: {1}, img: {2}, class: {3}}},".format(
            i, j, imgs[idForImg], pieceClassStr)
        idForImg += 1
        idForImg %= 2
        writeStr += s
    idForImg += 1
    idForImg %= 2
    writeStr += "],"
writeStr += "]"

f = open("js/pieceData.js", "w")
f.write(writeStr)
f.close()
