from genetic_algorighm import *
import matplotlib.pyplot as plt

if __name__ == '__main__':

    NUMBERS = 100
    averages = []
    for i in range(NUMBERS):
        sums = []
        for j in range(20):
            individuals = genetic_algorithm(50, i+1, 0.9, 0.1, False)
            sums.append(calculate_population_adaptation(individuals))
        averages.append(sum(sums) / len(sums))
        print(i)

    averages_2 = []
    for i in range(NUMBERS):
        sums = []
        for j in range(20):
            individuals = genetic_algorithm(50, i+1, 0.9, 0.1, True)
            sums.append(calculate_population_adaptation(individuals))
        averages_2.append(sum(sums) / len(sums))
        print(i)
    plt.plot([x for x in range(NUMBERS)], averages)
    plt.plot([x for x in range(NUMBERS)], averages_2)
    plt.show()
