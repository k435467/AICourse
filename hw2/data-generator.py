
import copy
import random


# random.seed(10)


def printNode(msg, node):
    """print msg and node state

    Arguments:
        msg {string} -- message want to show before node state
        node {NxN list} -- node state
    """
    print("printNode:", msg)
    for line in node:
        for e in line:
            print(e, end=" ")
        print()


def exampleInput(fileName):
    s = """8 3 1 1 2 1 0 2 2
2 . . c . . . . .
1 . . . . . c . c
0 . . . . . . . c
3 . c . c . . . .
0 . . . . . . c .
3 . c . . c . . .
0 c . . c . . . .
3 . . . . . . . c"""
    f = open(fileName, "w")
    f.write(s)
    f.close()
    print("output to {}".format(fileName))
    print(s)
    return


def exampleInput2(fileName):  # generated by website
    s = """8 1 3 0 2 1 3 0 2
2 . . c c . . c .
1 . c . . . . . .
3 . . . . . . c .
0 . . . . . c . .
2 . . . . . c . .
1 . . c . . . . c
1 . . . c . . c .
2 . c . . . . . ."""
    f = open(fileName, "w")
    f.write(s)
    f.close()
    print("output to {}".format(fileName))
    print(s)
    return


def isGoal(node, N, sInRow, sInCol):
    """goal test

    Arguments:
        node {NxN list} -- node state
        N {int} -- size N
        sInRow {int list} -- number of sleighs in row
        sInCol {int list} -- number of sleighs in col

    Returns:
        bool -- is it a goal state?
    """
    CTsInRow = [0 for i in range(N)]
    CTsInCol = CTsInRow.copy()

    # sleigh conflict

    for i in range(N):
        for j in range(N):
            if node[i][j] == 's':
                CTsInRow[i] += 1
                CTsInCol[j] += 1
                for m in range(max(i-1, 0), min(i+2, N)):
                    for n in range(max(j-1, 0), min(j+2, N)):
                        if node[m][n] == 's' and not(m == i and n == j):
                            return False

    # mismatched row/col sleighs number

    mismatch = 0
    for i in range(N):
        mismatch += abs(CTsInRow[i] - sInRow[i])
        mismatch += abs(CTsInCol[i] - sInCol[i])

    return mismatch == 0


def generateRandomInput(fileName, N, totalClaus):
    """generate a random input

    Arguments:
        fileName {string} -- file that want to write
        N {int} -- size N
        totalClaus {int} -- total number of clauses
    """
    while True:
        node = []
        nodeCopy = []
        sleighCt = 0
        while sleighCt < totalClaus:
            # give node clauses
            node = [['.' for i in range(N)] for j in range(N)]
            sleighCt = 0
            clausCt = 0
            while clausCt < totalClaus:
                p, q = random.randrange(0, N), random.randrange(0, N)
                if node[p][q] == '.':
                    node[p][q] = 'c'
                    clausCt += 1

            # give nodeCopy sleighs
            offset = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            nodeCopy = copy.deepcopy(node)
            for i in range(N):
                for j in range(N):
                    # find a claus
                    if nodeCopy[i][j] == 'c':
                        for _ in range(10):
                            d = random.randrange(0, 4)
                            p, q = i+offset[d][0], j+offset[d][1]
                            if (-1 < p < N and -1 < q < N
                                    and nodeCopy[p][q] == '.'):
                                nodeCopy[i][j] = d
                                nodeCopy[p][q] = 's'
                                sleighCt += 1
                                break

        sInCol = [0 for _ in range(N)]
        sInRow = [0 for _ in range(N)]
        for i in range(N):
            for j in range(N):
                if nodeCopy[i][j] == 's':
                    sInCol[j] += 1
                    sInRow[i] += 1

        if isGoal(nodeCopy, N, sInRow, sInCol):
            printNode("sol", nodeCopy)
            s = ""
            s += str(N)
            for e in sInCol:
                s += " " + str(e)
            for i in range(N):
                s += "\n" + str(sInRow[i])
                for e in node[i]:
                    s += " " + str(e)

            f = open(fileName, "w")
            f.write(s)
            f.close()
            print("\noutput random input to {}".format(fileName))
            print(s)
            return


# exampleInput("data/input.txt")
# exampleInput2("data/input.txt")
generateRandomInput("data/input100-20.txt", 100, 20)
