
# Santa's Sleigh
# Santa claus
# Santa's sleigh
# https://www.novelgames.com/en/sleigh/
# https://www.itread01.com/content/1544360780.html


# %%


import copy  # deepcopy
import math  # ceil
import random


random.seed(10)


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


def h(node):
    """estimated cost of the cheapest path from node to goal
        violate1: sleighs not be horizontally, vertically or diagonally
                    adjacent to each other.
        violate2: total number of sleighs in row or col must match the number

    Arguments:
        node {NxN list} -- node state

    Returns:
        int -- cost
    """
    conflictPairs = []
    CTsInRow = [0 for i in range(N)]
    CTsInCol = CTsInRow.copy()

    # sleigh conflict

    for i in range(N):
        for j in range(N):
            if node[i][j] == 's':
                CTsInRow[i] += 1
                CTsInCol[j] += 1
                # 9 grids of a sleigh
                for m in range(max(i-1, 0), min(i+2, N)):
                    for n in range(max(j-1, 0), min(j+2, N)):
                        if node[m][n] == 's' and not(m == i and n == j):
                            if {(i, j), (m, n)} not in conflictPairs:
                                conflictPairs.append({(i, j), (m, n)})

    # mismatched row/col sleighs number

    rowMismatch = 0
    colMismatch = 0
    for i in range(N):
        rowMismatch += abs(CTsInRow[i] - sInRow[i])
        colMismatch += abs(CTsInCol[i] - sInCol[i])

    # return max(math.ceil(rowMismatch/2),
    #            math.ceil(colMismatch/2),
    #            len(conflictPairs))
    return (math.ceil(rowMismatch/2) + math.ceil(colMismatch/2)
            + len(conflictPairs))


def bestSuccessor(node):
    """node expanding function to get best successor

    Arguments:
        node {NxN list} -- node state

    Returns:
        node -- best successor
                if none, return node
    """
    offset = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    success = []
    for i in range(N):
        for j in range(N):
            # find a claus that have not been expanded
            if node[i][j] not in ['.', 's', 'c']:
                d = node[i][j]
                nodeCopy = copy.deepcopy(node)
                nodeCopy[i][j] = 'c'  # mark claus
                nodeCopy[i+offset[d][0]][j+offset[d][1]] = '.'  # clear s
                # expand 4 direction
                for k in range(4):
                    p, q = i+offset[k][0], j+offset[k][1]
                    if -1 < p < N and -1 < q < N:
                        suc = copy.deepcopy(nodeCopy)
                        suc[p][q] = 's'
                        success.append(suc)

    index = 0
    minCost = 9999
    for i in range(len(success)):
        cost = h(success[i])
        if cost < minCost:
            minCost = cost
            index = i
    if len(success) > 0:
        return success[index]
    return node


def isGoal(node):
    """goal test

    Arguments:
        node {NxN list} -- node state

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


def randomInitState(root):
    """generate a random init state

    Arguments:
        root {NxN list} -- root node with no sleigh

    Returns:
        node -- a random init state. all clauses have a sleigh
    """
    offset = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    sleighCt = 0
    while sleighCt != totalSleigh:
        sleighCt = 0
        rv = copy.deepcopy(root)
        for i in range(N):
            for j in range(N):
                if rv[i][j] == 'c':
                    # find a claus and give him a sleigh
                    for _ in range(10):
                        d = random.randrange(0, 4)
                        p, q = i+offset[d][0], j+offset[d][1]
                        if -1 < p < N and -1 < q < N and rv[p][q] == '.':
                            rv[i][j] = d
                            rv[p][q] = 's'
                            sleighCt += 1
                            break
    return rv


def hillClimbing(initState):
    """hill climbing start from init state

    Arguments:
        initState {NxN list} -- init state

    Returns:
        node -- local maximum node
    """
    node = copy.deepcopy(initState)
    for _ in range(totalSleigh):
        if isGoal(node):
            return node
        bestSuc = bestSuccessor(node)
        if h(bestSuc) > h(node):
            return node
        node = bestSuc
    return node


def randomRestartHillClimbing(root, times):
    """random restart hill climbing that repeat hill climbing times

    Arguments:
        root {NxN list} -- root node with no sleigh
        times {int} -- want to repeat hill climbing times

    Returns:
        node -- if success, return a goal state node
                if fail, return the root node
    """
    for i in range(times):
        node = hillClimbing(randomInitState(root))
        print("\ntimes = {}".format(i))
        printNode("final node, h(node) = {}".format(h(node)), node)
        if isGoal(node):
            print("success!")
            return node
    print("fail!")
    return root


def getInput(fileName):
    """get input and do some process in advance

    Arguments:
        fileName {string} -- a file to read input

    Returns:
        int -- size N
        NxN char list -- root node
        int list -- number of sleighs in row
        int list -- number of sleighs in col
        int -- number of total sleighs
    """
    f = open(fileName, "r")
    sInCol = [int(e) for e in f.readline().split()]
    N = sInCol.pop(0)

    sInRow = []
    root = []
    for i in range(N):
        line = f.readline().split()
        sInRow.append(int(line.pop(0)))
        root.append(line)

    totalSleigh = sum(sInRow)
    f.close()
    return (N, root, sInRow, sInCol, totalSleigh)


def outputResult(fileName, node):
    """output result node to a file

    Arguments:
        fileName {string} -- a file that want to write into
        node {NxN list} -- result node
    """
    if isGoal(node):
        # restore clauses c from direction mark [0, 1, 2, 3]
        nodeCopy = copy.deepcopy(node)
        for line in nodeCopy:
            for i in range(len(line)):
                if line[i] not in ['.', 's', 'c']:
                    line[i] = 'c'

        s = ""
        s += str(N)
        for e in sInCol:
            s += " " + str(e)
        for i in range(N):
            s += "\n" + str(sInRow[i])
            for e in nodeCopy[i]:
                s += " " + str(e)

        f = open(fileName, "w")
        f.write(s)
        f.close()

        print("\noutputResult to {}".format(fileName))
        print(s)
    else:
        f = open(fileName, "w")
        f.write("no solution")
        f.close()
    return


inputFileName = "data/input.txt"
outputFileName = "data/output.txt"

(N, root, sInRow, sInCol, totalSleigh) = getInput(inputFileName)
printNode("root", root)
result = randomRestartHillClimbing(root, 1000)
printNode("goal", result)
outputResult(outputFileName, result)
