from data.reader import read
from fleet_genetic.f_algorithm import f_algorithm
import matplotlib.pyplot as plt

if __name__ == '__main__':


    first_point, data = read('data/values/C101.txt')

    fitnesses_1 = f_algorithm(data, first_point, v_population_size=50, number_of_iterations=100, vehicles_number=50, population_size=50, mutating_probability=0.5, color='yellow')
    fitnesses_2 = f_algorithm(data, first_point, v_population_size=50, number_of_iterations=100, vehicles_number=50, population_size=50, mutating_probability=0.5, color='red')
    fitnesses_3 = f_algorithm(data, first_point, v_population_size=50, number_of_iterations=100, vehicles_number=50, population_size=50, mutating_probability=0.5, color='blue')

    indexes = [i for i in range(100)]
    plt.plot(indexes, fitnesses_1)
    plt.plot(indexes, fitnesses_2)
    plt.plot(indexes, fitnesses_3)
    plt.xlabel("number of iterations")
    plt.ylabel("best solution found")
    plt.legend(["50 vehicles", "60 vehicles", "70 vehicles"])

    plt.show()
