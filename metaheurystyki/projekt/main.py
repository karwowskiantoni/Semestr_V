from data.reader import read
from fleet_genetic.f_algorithm import f_algorithm
import matplotlib.pyplot as plt

if __name__ == '__main__':
    data = read('data/values/R203.txt')
    first_point = data[:1][0]
    data = data[1:]

    fitnesses_1 = f_algorithm(data, first_point, number_of_iterations=100, vehicles_number=50, population_size=20, mutating_probability=0.2, color='yellow')
    fitnesses_2 = f_algorithm(data, first_point, number_of_iterations=100, vehicles_number=50, population_size=50, mutating_probability=0.2, color='red')
    fitnesses_3 = f_algorithm(data, first_point, number_of_iterations=100, vehicles_number=50, population_size=100, mutating_probability=0.2, color='blue')

    indexes = [i for i in range(100)]
    plt.plot(indexes, fitnesses_1)
    plt.plot(indexes, fitnesses_2)
    plt.plot(indexes, fitnesses_3)
    plt.xlabel("number of iterations")
    plt.ylabel("best solution found")
    plt.legend(["20 population size", "50 population size", "100 population size"])

    plt.show()
