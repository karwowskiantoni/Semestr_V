import random
import numpy

from Ant import Ant
from Board import Board


def find_best_distance(ants, board):
    best_distance = ants[0].distance_traveled(board)

    for ant in ants:
        if ant.distance_traveled(board) < best_distance:
            best_distance = ant.distance_traveled(board)
    print(best_distance)


def count_occurences(distances):
    values, counts = numpy.unique(distances, return_counts=True)
    return dict(zip(values, counts))


if __name__ == '__main__':
    POPULATION_SIZE = 50
    RANDOM_FACTOR = 0.3
    ALFA = 1
    BETA = 1
    ITERATION_NUMBER = 1000
    PHEROMONES_EVAPORATION_FACTOR = 0.1

    board = Board(
        "C:\\Users\\harry\\Downloads\\Semestr_V\\metaheurystyki\\Zadanie_3\\data\\A-n80-k10.txt")

    # board.print_distances()
    best_distances = []
    for i in range(ITERATION_NUMBER):
        ants = [Ant(random.randint(1, len(board.places)) - 1)
                for _ in range(POPULATION_SIZE)]

        for _ in range(len(board.places) - 1):
            for ant in ants:
                ant.next_step(board, ALFA, BETA, RANDOM_FACTOR)
        board.update_pheromones(PHEROMONES_EVAPORATION_FACTOR, ants)
        best_distances.append(
            min([ant.distance_traveled(board) for ant in ants]))
        print(min([ant.distance_traveled(board) for ant in ants]))
    print()
    print(min(best_distances))
    print(numpy.average(best_distances))
    print(numpy.median(best_distances))

    # board.print_pheromones()
