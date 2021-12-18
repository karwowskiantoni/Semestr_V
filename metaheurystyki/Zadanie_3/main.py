import matplotlib.pyplot as plt
import random
from progress.bar import IncrementalBar

from Ant import Ant
from Board import Board

if __name__ == '__main__':
    POPULATION_SIZE = 10
    RANDOM_FACTOR = 0.0
    ALFA = 3
    BETA = 1
    ITERATION_NUMBER = 50
    PHEROMONES_EVAPORATION_FACTOR = 0.2

    bar = IncrementalBar('progress', max=ITERATION_NUMBER, color='green')
    board = Board("data/P-n76-k5.txt")

    bar.start()
    best_ants = []
    for i in range(ITERATION_NUMBER):
        bar.next()
        last_place = len(board.places) - 1
        ants = [Ant(random.randint(0, last_place)) for _ in range(POPULATION_SIZE)]
        for _ in range(last_place):
            for ant in ants:
                ant.next_step(board, ALFA, BETA, RANDOM_FACTOR)

        board.update_pheromones(PHEROMONES_EVAPORATION_FACTOR, ants)
        best_ants.append(min(ants, key=lambda x: x.distance_traveled(board)))
    bar.finish()
    best_distances = [ant.distance_traveled(board) for ant in best_ants]
    best_ant = min(best_ants, key=lambda x: x.distance_traveled(board))
    print()

    print(best_ant.distance_traveled(board))
    x_values = [board.positions[place][0] for place in best_ant.visited_places]
    y_values = [board.positions[place][1] for place in best_ant.visited_places]
    plt.plot(x_values, y_values, 'ro-')
    plt.annotate('START', board.positions[best_ant.visited_places[0]],
                 textcoords="offset points", xytext=(5, -5))
    plt.annotate('END', board.positions[best_ant.visited_places[-1]],
                 textcoords="offset points", xytext=(5, -5))
    for place in best_ant.visited_places:
        plt.annotate(
            place + 1, board.positions[place], textcoords="offset points", xytext=(0, 7), ha='center')
    x_values = range(1, ITERATION_NUMBER + 1)
    plt.ylabel("Najlepsza znaleziona trasa")
    plt.show()
    plt.plot(x_values, best_distances)
    plt.xlabel("number_of_iterations")
    plt.ylabel("shortest distance in ant population")
    plt.show()
