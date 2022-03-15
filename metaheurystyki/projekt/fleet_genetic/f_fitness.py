from vehicle_genetic.v_algorithm import v_algorithm


def f_fitness(data, first_point, individual, v_population_size, only_estimated=True):
    #  [0 0 1 1 0 0 2 2] <- individual
    #  | | | | | | | | |
    #  v v v v v v v v v
    # fitness([0, 1, 4, 5]), fitness([2, 3]), fitness([6, 7]) <- vehicles
    # fitness(vehicle) <- fitness_optimized_by_vehicle_genetic_algorithm(vehicle)

    vehicles = split_into_vehicles(individual)
    too_bigness = [is_too_big(data, vehicle) for vehicle in vehicles]
    if sum(too_bigness) == 0:
        if only_estimated:
            vehicles_fitness = [v_algorithm([data[i] for i in vehicle], first_point, population_size=v_population_size) for vehicle in vehicles]
        else:
            vehicles_fitness = [v_algorithm([data[i] for i in vehicle], first_point, population_size=v_population_size, only_estimated=False, number_of_iterations=100) for vehicle in vehicles]
    else:
        vehicles_fitness = [10000000000000]

    # print("-------------------------------------------------------------------------")
    # print("-------------------------------------------------------------------------")
    # print("------------------------individual in f_algorithm------------------------")
    # print()
    # print(individual)
    # print()
    # print("-------------------------vehicles in f_algorithm-------------------------")
    # print()
    # print(vehicles)
    # print()
    # print("-------------------------is_too_big for vehicles-------------------------")
    # print()
    # print(too_bigness)
    # print()
    # if sum(too_bigness) == 0:
    #     print("-------------------optimized fitness for every vehicle-------------------")
    #     print()
    #     print(vehicles_fitness)
    #     print()
    # print("--------------------------final fleet fitness----------------------------")
    # print(sum(vehicles_fitness))
    # print("-------------------------------------------------------------------------")
    # print("-------------------------------------------------------------------------")
    # print("-------------------------------------------------------------------------")

    return sum(vehicles_fitness)


def is_too_big(data, vehicle):
    return sum([data[client_id].demand for client_id in vehicle]) > 200


def split_into_vehicles(individual):
    vehicle_fleet_len = max(individual) + 1
    vehicles = [[] for _ in range(vehicle_fleet_len)]
    for i in range(len(individual)):
        vehicles[individual[i]].append(i)
    return vehicles
