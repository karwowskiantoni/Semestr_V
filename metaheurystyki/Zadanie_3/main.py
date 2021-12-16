from Ant import Ant
from Board import Board

if __name__ == '__main__':
    POPULATION_SIZE = 1
    RANDOM_FACTOR = 0.1
    ALFA = 1
    BETA = 1
    ITERATION_NUMBER = 1
    PHEROMONES_EVAPORATION_FACTOR = 0.2

    board = Board("data/P-n16-k8.txt")

    board.print_pheromones()

    for _ in range(ITERATION_NUMBER):
        ants = [Ant(0) for _ in range(POPULATION_SIZE)]

        for _ in range(len(board.places) - 2):
            for ant in ants:
                ant.next_step(board, ALFA, BETA, RANDOM_FACTOR)

        board.evaporate_pheromones(PHEROMONES_EVAPORATION_FACTOR)
        for ant in ants:
            board.intensify_pheromones(ant)

        best_distance = ants[0].distance_traveled(board)

        for ant in ants:
            if ant.distance_traveled(board) < best_distance:
                best_distance = ant.distance_traveled(board)
        print(best_distance)

    board.print_pheromones()
