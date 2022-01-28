from data.reader import read
from fleet_genetic.f_algorithm import f_algorithm
from fleet_genetic.f_fitness import f_fitness

if __name__ == '__main__':
    data = read('data/values/R103.txt')
    first_point = data[:1][0]
    data = data[1:]
    best = f_algorithm(data, first_point, number_of_iterations=200, vehicles_number=50, population_size=100, mutating_probability=0.2)
    print("---------------------------")
    print(f_fitness(data, first_point, best))
    print(best)
    print("---------------------------")
    print(min([f_fitness(data, first_point, best) for _ in range(1000)]))
    print(f_fitness(data, first_point, best, only_estimated=False))
