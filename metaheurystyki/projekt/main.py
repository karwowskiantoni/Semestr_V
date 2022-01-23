from random import sample

from GeneticAlgorithm import GeneticAlgorithm
from reader import read

if __name__ == '__main__':
    clients = read('data/R1/R101.txt')
    algorithm = GeneticAlgorithm(clients)
    algorithm.calculate()


#  przeszukiwanie grafów
#  genetyczny
#  mrówkowy
#  rój cząstek


