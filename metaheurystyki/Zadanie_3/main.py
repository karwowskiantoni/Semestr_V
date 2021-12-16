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
    ITERATION_NUMBER = 10000
    PHEROMONES_EVAPORATION_FACTOR = 0.1

    board = Board("data/P-n16-k8.txt")

    best_ants = []
    for i in range(ITERATION_NUMBER):
        ants = [Ant(random.randint(1, len(board.places)) - 1)
                for _ in range(POPULATION_SIZE)]

        for _ in range(len(board.places) - 1):
            for ant in ants:
                ant.next_step(board, ALFA, BETA, RANDOM_FACTOR)
        board.update_pheromones(PHEROMONES_EVAPORATION_FACTOR, ants)
        minimum_distance = min([ant.distance_traveled(board) for ant in ants])
        best_ants.append(min(ants, key=lambda x: x.distance_traveled(board)))
    best_distances = [ant.distance_traveled(board) for ant in best_ants]
    print(best_distances)
    print(max(best_distances))
    print(min(best_distances))
    best_ant = min(best_ants, key=lambda x: x.distance_traveled(board))
    print(best_ant.visited_places)
    print(numpy.average(best_distances))
    print(numpy.median(best_distances))
