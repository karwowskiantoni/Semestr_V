def fitness(data, individual):
    current_time = 0
    distance_sum = 0
    for i in range(len(individual) - 1):
        client = data[individual[i]]
        next_client = data[individual[i + 1]]
        distance = client.distance_between(next_client)

        if current_time + distance > next_client.end_time:
            return 1000000

        elif current_time + distance < next_client.start_time:
            current_time = next_client.start_time
            distance_sum += distance

        else:
            current_time += distance
            distance_sum += distance

    return distance_sum
