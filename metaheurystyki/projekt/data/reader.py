from data.Point import Point


def read(filename):
    file = open(filename)
    return [Point(line.split()) for line in file]
