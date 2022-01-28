def v_fitness(data, first_point, individual):
    current_time = 0
    distance_sum = 0
    for i in range(len(individual) - 1):
        client = data[individual[i]]
        next_client = data[individual[i + 1]]
        distance = client.distance_between(next_client)
        service_time = next_client.service_time

        if current_time + distance + service_time > next_client.end_time:
            return 1000000

        elif current_time + distance + service_time < next_client.start_time:
            current_time = next_client.start_time + service_time
            distance_sum += distance

        else:
            current_time += distance + service_time
            distance_sum += distance

    return first_distance(data, first_point, individual) + distance_sum + last_distance(data, first_point, individual)


def first_distance(data, first_point, individual):
    return first_point.distance_between(data[individual[0]])


def last_distance(data, first_point, individual):
    return first_point.distance_between(data[individual[-1]])
