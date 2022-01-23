import random

# from cross_over import cross_over
from cross_over import cross_over
from fitness import fitness

VEHICLE_SEPARATOR = -1
EMPTY = 0


def genetic_algorithm(
        data,
        population_size=1000,
        number_of_iterations=1,
        survival_probability=1,
        vehicle_number=10,
):
    population = []
    for i in range(population_size):
        population.append(random_individual(data, vehicle_number))

    for i in range(number_of_iterations):
        survivors, parents = separate_parents(population, survival_probability)
        parents = elite_selection(data, parents)
        pairs = select_pairs(parents)
        children = cross_genes(pairs)
        population = survivors + children
        for individual in population:
            print(fitness(data, individual))
        print(calculate_population_adaptation_min(data, population))
    return population


def random_individual(data, vehicle_number):
    individual = [i for i in range(len(data))]
    [individual.append(VEHICLE_SEPARATOR) for _ in range(vehicle_number)]
    random.shuffle(individual)
    return individual


def calculate_population_adaptation_min(data, population):
    min = 1000000000000000000
    for individual in population:
        if min > fitness(data, individual):
            min = fitness(data, individual)
    return min


def elite_selection(data, population):
    sorted_population = sorted(population, key=lambda individual: fitness(data, individual))
    better_half = sorted_population[:len(sorted_population)//2]
    return better_half + better_half


def separate_parents(population, crossing_probability):
    random.shuffle(population)
    number_to_selection = int(crossing_probability * len(population))
    return (population[number_to_selection:]), population[:number_to_selection]


def select_pairs(population):
    pairs = []
    random.shuffle(population)

    i = 0
    while i < len(population) - 1:
        pairs.append([population[i], population[i + 1]])
        i += 2

    if len(population) % 2 == 1:
        pairs.append([population[len(population) - 1], population[0]])
    return pairs


def cross_genes(pairs):
    children = []
    for pair in pairs:
        children.append(cross_over(pair))
    return children


# def roulette_selection(population):
#     adaptation_sum = calculate_population_adaptation_sum(population)
#     if adaptation_sum == 0:
#         return population
#     probability_table = {}
#     for i in range(len(population)):
#         probability_table[i] = fitness(population[i]) / adaptation_sum
#     indexes = random.choices(list(probability_table.keys()),
#                              weights=list(probability_table.values()),
#                              k=len(population))
#     return [population[index] for index in indexes]

