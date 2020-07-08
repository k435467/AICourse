
# Santa's Sleigh
# Santa claus
# Santa's sleigh
# https://www.novelgames.com/en/sleigh/
# https://www.itread01.com/content/1544360780.html


# %%


import copy
import math


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

    return max(math.ceil(rowMismatch/2),
               math.ceil(colMismatch/2),
               len(conflictPairs))
    # return (math.ceil(rowMismatch/2) + math.ceil(colMismatch/2)
    #         + len(conflictPairs))


def successors(node):
    """node expanding function

    Arguments:
        node {NxN list} -- node state

    Returns:
        node list -- expand nodes ordered by g + h(node)
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
                return sorted(success, key=lambda x: h(x))

    return sorted(success, key=lambda x: h(x))


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


def search(path, g, bound):
    """perform a search from current path to goal state

    Arguments:
        path {node list} -- a path from root to current node
        g {int} -- the cost to reach current node
        bound {int} -- the limit of cost

    Returns:
        int -- the min cost that exceed bound,
                or -1 indicate that found a path to reach goal
    """
    node = path[-1]
    f = g + h(node)
    if(f > bound):
        return f
    if(isGoal(node)):
        return -1

    Min = 9999
    for succ in successors(node):
        path.append(succ)
        newBound = search(path, g+1, bound)
        if(newBound == -1):
            return -1
        if(newBound < Min):
            Min = newBound
        path.pop()

    return Min


def idaStar(root, maxBound):
    """perform ida star search

    Arguments:
        root {NxN list} -- node state
        maxBound {int} -- the limit of bound,
                          number of total sleighs + 1 is recommended

    Returns:
        node list -- a path to reach goal
        int -- bound
    """
    # bound = h(root)
    bound = sum(sInRow)
    path = [root]

    while(True):
        print("idaStar current bound:", bound)
        newBound = search(path, 0, bound)
        if(newBound == -1):
            return (path, bound)
        if(newBound > maxBound):
            print("bound is greater than maxBound({})".format(maxBound))
            return ([root], bound)
        bound = newBound

    return (path, bound)


def getInput(fileName):
    """get input and do some process in advance

    Arguments:
        fileName {string} -- a file to read input

    Returns:
        int -- size N
        NxN char list -- root node
        int list -- number of sleighs in row
        int list -- number of sleighs in col
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

    offset = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    for i in range(N):
        for j in range(N):
            if root[i][j] == 'c':
                for k in range(4):
                    p, q = i+offset[k][0], j+offset[k][1]
                    if -1 < p < N and -1 < q < N and root[p][q] == '.':
                        root[i][j] = k
                        root[p][q] = 's'
                        break

    f.close()
    return (N, root, sInRow, sInCol)


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


inputFileName = "data/input8-12.txt"
outputFileName = "data/output.txt"

(N, root, sInRow, sInCol) = getInput(inputFileName)
printNode("root", root)
(path, bound) = idaStar(root, sum(sInRow)*3)
printNode("path[-1]", path[-1])
outputResult(outputFileName, path[-1])
