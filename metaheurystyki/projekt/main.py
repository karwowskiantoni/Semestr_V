from random import sample

from data.reader import read
from vehicle_genetic.algorithm import algorithm

if __name__ == '__main__':
    data = read('data/values/R1/R101.txt')
    algorithm(sample(data, 5))
