import random

from fleet_genetic.f_cross_over import uniform_cross_over
from fleet_genetic.f_fitness import f_fitness, split_into_vehicles


def f_algorithm(
        data,
        start_point,
        vehicles_number=50,
        population_size=100,
        number_of_iterations=100,
        survival_probability=1,
        mutating_probability=0.5,
):
    population = [random_individual(data, vehicles_number) for _ in range(population_size)]

    for i in range(number_of_iterations):
        survivors, parents = separate_parents(population, survival_probability)
        parents = elite_selection(data, start_point, parents)
        pairs = select_pairs(parents)
        children = cross_genes(pairs)
        mutated_children = [mutate_individual(individual, mutating_probability) for individual in children]
        population = survivors + mutated_children
        best = best_individual(data, start_point, population)
        best_fitness = f_fitness(data, start_point, best)
        best_best = 1000000
        if best_fitness < best_best:
            best_best = best
        print(str(best_fitness) + ' vehicles: ' + str(vehicles_in(best)) + ' biggest vehicle: ' + str(biggest_vehicle(best)))
    return best_best


def vehicles_in(individual):
    return len(list(filter(lambda vehicle: len(vehicle) > 0, split_into_vehicles(individual))))


def biggest_vehicle(individual):
    return max([len(vehicle) for vehicle in split_into_vehicles(individual)])


def random_individual(data, vehicles_number):
    return [random.randint(0, vehicles_number - 1) for _ in range(len(data))]


def best_individual(data, start_point, population):
    return sorted(population, key=lambda i: f_fitness(data, start_point, i))[0]


def elite_selection(data, start_point, population):
    better_part = sorted(population, key=lambda individual: f_fitness(data, start_point, individual))[:len(population) // 5]
    return better_part + better_part + better_part + better_part + better_part


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
        children.extend(uniform_cross_over(pair))
    return children


def mutate_individual(individual, mutating_probability):
    if random.random() < mutating_probability:
        index_1, index_2 = random.randint(0, len(individual) - 1), random.randint(0, len(individual) - 1)
        individual[index_1], individual[index_2] = individual[index_2], individual[index_1]
    return individual
