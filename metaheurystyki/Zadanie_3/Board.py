from math import sqrt


def distance(p1, p2):
    return sqrt((p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2)


class Board:
    def __init__(self, file_path):
        file = open(file_path, "r")

        points = [[int(i) for i in line.split(" ")] for line in file]
        pheromones = [[1 for _ in points] for _ in points]
        distances = [[distance(i, j) for j in points] for i in points]

        print(points)
        print(pheromones)
        print(distances)


