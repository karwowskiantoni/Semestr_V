from data import DATA, BAG_MAX_WEIGHT
from bitarray.util import urandom


def calculate_adaptation(individual):
    if len(individual) != len(DATA):
        return "podano osobnika o błędnej długości: " + str(len(individual)) + " wymagana ilość genów: " + str(len(DATA))
    weight_sum = 0
    value_sum = 0
    for i in range(len(individual)):
        if individual[i]:
            weight_sum += DATA[i][1]
            value_sum += DATA[i][2]
    if weight_sum > BAG_MAX_WEIGHT:
        return 0
    else:
        return value_sum


def random_individual():
    return urandom(26)


def roulette_selection(individuals):
    new_individuals = []
    return new_individuals


def tournament_selection(individuals):
    new_individuals = []
    return new_individuals


def ranking_selection(individuals):
    new_individuals = []
    return new_individuals


def marry_individuals(individuals):
    individuals = individuals.shuffle()
    pairs = []
    i = 0
    while i < len(individuals):
        pairs += [individuals[i], individuals[i+1]]
        i += 2
    return pairs


def new_generation(pairs):
    new_individuals = []
    for pair in pairs:
        new_individuals.append(cross_genes(pair, "xd, losowa liczba"))
    return new_individuals


def mutate_population(individuals):
    return individuals


# pair is array with two 26-bits-length bitarrays
# pivot is number in range <1, 25>
def cross_genes(pair, pivot):
    children = []
    return children


def algorithm(population_size, number_of_iterations):

    individuals = []
    for i in range(population_size):
        individuals.append(random_individual())

    for i in range(number_of_iterations):
        individuals = roulette_selection(individuals)
        pairs = marry_individuals(individuals)
        individuals = new_generation(pairs)
        individuals = mutate_population(individuals)
    return  individuals



if __name__ == '__main__':
    print(calculate_adaptation(random_individual()))



