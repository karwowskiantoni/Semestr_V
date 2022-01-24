import random

from vehicle_genetic.cross_over import cross_over
from vehicle_genetic.fitness import fitness


def algorithm(
        data,
        population_size=100,
        number_of_iterations=10,
        survival_probability=0.8,
        mutating_probability=0.1,
):
    population = []
    for i in range(population_size):
        population.append(random_individual(len(data)))

    for client in data:
        client.print()

    for individual in population:
        print(individual)

    for i in range(number_of_iterations):
        survivors, parents = separate_parents(population, survival_probability)
        parents = elite_selection(data, parents)
        pairs = select_pairs(parents)
        children = cross_genes(pairs)
        mutated_children = [mutate_individual(individual, mutating_probability) for individual in children]
        population = survivors + mutated_children
        print(calculate_population_adaptation_min(data, population))
    return calculate_population_adaptation_min(data, population)


def random_individual(size):
    individual = [i for i in range(size)]
    random.shuffle(individual)
    return individual


def calculate_population_adaptation_min(data, population):
    return min([fitness(data, individual) for individual in population])


def elite_selection(data, population):
    better_half = sorted(population, key=lambda individual: fitness(data, individual))[:len(population) // 2]
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
