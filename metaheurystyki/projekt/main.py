from fitness import fitness
from genetic_algorithm import genetic_algorithm, random_individual
from reader import read

if __name__ == '__main__':
    data = read('data/R1/R101.txt')
    genetic_algorithm(data)
    # print(fitness(data, random_individual(data, 10)))
