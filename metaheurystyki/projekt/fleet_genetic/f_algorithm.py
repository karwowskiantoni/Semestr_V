import random

from tqdm import tqdm
from fleet_genetic.f_cross_over import uniform_cross_over
from fleet_genetic.f_fitness import f_fitness, split_into_vehicles


def f_algorithm(
        data,
        start_point,
        v_population_size=50,
        vehicles_number=50,
        population_size=200,
        number_of_iterations=200,
        survival_probability=1,
        mutating_probability=0.5,
        color='red'
):
    population = [random_individual(data, vehicles_number) for _ in range(population_size)]

    best_fitness_ever = 1000000
    best_individual_ever = None
    for i in tqdm(range(number_of_iterations), ncols=200, colour="#" + "".join([random.choice('0123456789ABCDEF') for j in range(6)])):
        survivors, parents = separate_parents(population, survival_probability)
        parents = elite_selection(data, start_point, parents, v_population_size)
        pairs = select_pairs(parents)
        children = cross_genes(pairs)
        mutated_children = [mutate_individual(individual, mutating_probability) for individual in children]
        population = survivors + mutated_children
        best = best_individual(data, start_point, population, v_population_size)
        best_fitness = f_fitness(data, start_point, best, v_population_size)
        if best_fitness < best_fitness_ever:
            best_fitness_ever = best_fitness
            best_individual_ever = best
    return f" fitness: {best_fitness_ever} number of vehicles: {vehicles_in(best_individual_ever)} biggest vehicle: {biggest_vehicle(best_individual_ever)}"


def vehicles_in(individual):
    return len(list(filter(lambda vehicle: len(vehicle) > 0, split_into_vehicles(individual))))


def biggest_vehicle(individual):
    return max([len(vehicle) for vehicle in split_into_vehicles(individual)])


def random_individual(data, vehicles_number):
    return [random.randint(0, vehicles_number - 1) for _ in range(len(data))]


def best_individual(data, start_point, population, v_population_size):
    return sorted(population, key=lambda i: f_fitness(data, start_point, i, v_population_size))[0]


def elite_selection(data, start_point, population, v_population_size):
    better_part = sorted(population, key=lambda individual: f_fitness(data, start_point, individual, v_population_size))[:len(population) // 5]
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
