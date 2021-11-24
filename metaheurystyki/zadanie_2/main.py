import data
from genetic_algorighm import *
import matplotlib.pyplot as plt

if __name__ == '__main__':

    coefficients = []
    for item in data.DATA:
        coefficients.append(float(item[2]/item[1]))
    best_value = max(coefficients)*data.BAG_MAX_WEIGHT

    NUMBERS = 50
    x_values = [x+2 for x in range(NUMBERS)]
    averages = []
    for i in range(NUMBERS):
        sums = []
        for j in range(20):
            individuals = genetic_algorithm(is_roulette=False, mutating_probability=i*0.02, is_single_pivot=False)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages.append(sum(sums) / len(sums))
        print(i)

    averages_2 = []
    for i in range(NUMBERS):
        sums = []
        for j in range(20):
            individuals = genetic_algorithm(is_roulette=False, mutating_probability=i*0.02, is_single_pivot=True)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages_2.append(sum(sums) / len(sums))
        print(i)

    print(max(averages))
    print(max(averages_2))
    plt.plot(x_values, averages)
    plt.plot(x_values, averages_2)
    plt.plot(x_values, [best_value for x in range(NUMBERS)])
    plt.show()


