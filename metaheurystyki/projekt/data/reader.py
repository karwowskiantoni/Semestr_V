from data.Point import Point


def read(filename):
    data = [Point(line.split()) for line in (open(filename))]
    return data[0], data[1:]
