import data
from genetic_algorighm import *
import matplotlib.pyplot as plt

if __name__ == '__main__':

    NUMBERS = 100
    x_values = [x*135000 for x in range(NUMBERS)]
    averages = []
    averages_2 = []
    averages_3 = []
    averages_4 = []

    for i in range(NUMBERS):
        sums = []
        for j in range(50):
            individuals = genetic_algorithm(is_roulette=False, is_single_pivot=False, wanted_adaptation=i * 135000)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages.append(sum(sums) / len(sums))
        print(i)

    for i in range(NUMBERS):
        sums = []
        for j in range(50):
            individuals = genetic_algorithm(is_roulette=True, is_single_pivot=False, wanted_adaptation=i * 135000)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages_2.append(sum(sums) / len(sums))
        print(i)

    for i in range(NUMBERS):
        sums = []
        for j in range(50):
            individuals = genetic_algorithm(is_roulette=False, is_single_pivot=True, wanted_adaptation=i * 135000)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages_3.append(sum(sums) / len(sums))
        print(i)

    for i in range(NUMBERS):
        sums = []
        for j in range(50):
            individuals = genetic_algorithm(is_roulette=True, is_single_pivot=True, wanted_adaptation=i * 135000)
            sums.append(calculate_population_adaptation_avg(individuals))
        averages_4.append(sum(sums) / len(sums))
        print(i)

    plt.plot(x_values, averages)
    plt.plot(x_values, averages_2)
    plt.plot(x_values, averages_3)
    plt.plot(x_values, averages_4)
    plt.plot(x_values, [BAG_MAX_VALUE for x in range(NUMBERS)])
    plt.legend(["elite selection, two pivots",
                "roulette selection, two pivots",
                "elite selection, single pivot",
                "roulette selection, single pivot",
                "max found single individual adaptation"])
    plt.xlabel("expected adaptation")
    plt.ylabel("average individual adaptation in final population")
    plt.show()
