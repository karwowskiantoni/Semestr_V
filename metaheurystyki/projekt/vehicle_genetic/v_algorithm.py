import random

from vehicle_genetic.v_cross_over import cross_over
from vehicle_genetic.v_fitness import v_fitness


def v_algorithm(
        data,
        first_point,
        population_size=50,
        number_of_iterations=10,
        survival_probability=0.8,
        mutating_probability=0.1,
):

    if len(data) == 0:
        return 0

    population = [random_individual(len(data)) for _ in range(population_size)]

    # for i in range(number_of_iterations):
    #     survivors, parents = separate_parents(population, survival_probability)
    #     parents = elite_selection(data, first_point, parents)
    #     pairs = select_pairs(parents)
    #     children = cross_genes(pairs)
    #     mutated_children = [mutate_individual(individual, mutating_probability) for individual in children]
    #     population = survivors + mutated_children

    return calculate_population_adaptation_min(data, first_point, population)


def random_individual(size):
    individual = [i for i in range(size)]
    random.shuffle(individual)
    return individual


def calculate_population_adaptation_min(data, first_point, population):
    return min([v_fitness(data, first_point, individual) for individual in population])


def elite_selection(data, first_point, population):
    better_half = sorted(population, key=lambda individual: v_fitness(data, first_point, individual))[:len(population) // 2]
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
        children.append(cross_over(pair))
    return children


def mutate_individual(individual, mutating_probability):
    if random.random() > mutating_probability:
        index_1, index_2 = random.randint(0, len(individual) - 1), random.randint(0, len(individual) - 1)
        individual[index_1], individual[index_2] = individual[index_2], individual[index_1]
    return individual
