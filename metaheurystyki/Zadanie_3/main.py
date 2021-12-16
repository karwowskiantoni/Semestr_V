import random

from Ant import Ant
from Board import Board

def print_best_distance(ants, board):
    best_distance = ants[0].distance_traveled(board)

    for ant in ants:
        if ant.distance_traveled(board) < best_distance:
            best_distance = ant.distance_traveled(board)
    print(best_distance)


if __name__ == '__main__':
    POPULATION_SIZE = 50
    RANDOM_FACTOR = 0.1
    ALFA = 0
    BETA = 1
    ITERATION_NUMBER = 1000
    PHEROMONES_EVAPORATION_FACTOR = 0.2

    board = Board("data/P-n76-k5.txt")

    board.print_pheromones()

    for _ in range(ITERATION_NUMBER):
        ants = [Ant(random.randint(1, len(board.places)) - 1) for _ in range(POPULATION_SIZE)]

        for _ in range(len(board.places) - 1):
            for ant in ants:
                ant.next_step(board, ALFA, BETA, RANDOM_FACTOR)
        board.update_pheromones(PHEROMONES_EVAPORATION_FACTOR, ants)
        print_best_distance(ants, board)

    board.print_pheromones()
