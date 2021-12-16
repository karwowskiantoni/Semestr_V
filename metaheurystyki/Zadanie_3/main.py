import matplotlib.patches as patches
from matplotlib.path import Path
import matplotlib.pyplot as plt

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
    RANDOM_FACTOR = 0.1
    ALFA = 1
    BETA = 1
    ITERATION_NUMBER = 10
    PHEROMONES_EVAPORATION_FACTOR = 0.1

    board = Board(
        "C:\\Users\\harry\\Downloads\\Semestr_V\\metaheurystyki\\Zadanie_3\\data\\P-n16-k8.txt")

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
    print(max(best_distances))
    print(min(best_distances))
    best_ant = min(best_ants, key=lambda x: x.distance_traveled(board))
    print(best_ant.visited_places)
    print(numpy.average(best_distances))
    print(numpy.median(best_distances))

    verts = [board.positons[place] for place in best_ant.visited_places]

    x_values = [board.positons[place][0] for place in best_ant.visited_places]
    y_values = [board.positons[place][1] for place in best_ant.visited_places]
    plt.plot(x_values, y_values, 'ro-')
    plt.annotate('START', board.positons[best_ant.visited_places[0]],
                 textcoords="offset points", xytext=(5, -5))
    plt.annotate('END', board.positons[best_ant.visited_places[-1]],
                 textcoords="offset points", xytext=(5, -5))
    for place in best_ant.visited_places:
        plt.annotate(
            place + 1, board.positons[place], textcoords="offset points", xytext=(0, 7), ha='center')
    x_values = range(1, ITERATION_NUMBER + 1)
    plt.ylabel("Najlepsza znaleziona trasa")
    plt.show()
    plt.plot(x_values, best_distances)
    plt.xlabel("number_of_iterations")
    plt.ylabel("shortest distance in ant population")
    plt.show()

# board.print_pheromones()
