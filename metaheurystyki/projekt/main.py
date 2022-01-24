from random import sample

from data.reader import read
from fleet_genetic.f_algorithm import f_algorithm

if __name__ == '__main__':
    data = read('data/values/R1/R101.txt')
    first_point = data[:1][0]
    data = data[1:]
    f_algorithm(data, first_point)


