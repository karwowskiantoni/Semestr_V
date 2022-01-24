import numpy as np


def fitness(data, individual):
    # print(car_fitness(data, split_into_cars(individual)[0]))
    return first_distance(data, individual) + \
           sum([car_fitness(data, car) for car in split_into_cars(individual)]) + \
           last_distance(data, individual)


def first_distance(data, individual):
    return data[0].distance_between(data[individual[0]])


def last_distance(data, individual):
    return data[0].distance_between(data[individual[-1]])


def car_fitness(data, car):
    time = 0
    distance_sum = 0
    for i in range(len(car) - 1):
        client = data[car[i]]
        next_client = data[car[i + 1]]
        distance = client.distance_between(next_client)
        delivery_time = time + distance
        if sum(data[gene].demand for gene in car) > 200:
            return 1000000000
        if delivery_time > next_client.end_time:
            return 1000000
        elif delivery_time < next_client.start_time:
            time = next_client.start_time
            distance_sum += distance
        else:
            time += distance
            distance_sum += distance
    return distance_sum


def split_into_cars(individual):
    individual = np.array(individual)
    np_cars = np.split(individual, np.where(individual[:-1] == -1)[0])
    cars = []
    [car.tolist() for car in cars]
    for car in np_cars:
        car = car.tolist()
        if -1 in car:
            car.remove(-1)
        if len(car) > 0:
            cars.append(car)
    return cars
