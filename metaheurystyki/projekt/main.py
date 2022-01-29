from data.reader import read
from fleet_genetic.f_algorithm import f_algorithm
import multiprocessing as mp


def task(name, first_point, data):
    print(name, f_algorithm(data, first_point))


if __name__ == '__main__':

    data = [
        # ["C101", read('data/values/C101.txt')],
        # ["C102", read('data/values/C102.txt')],
        # ["C103", read('data/values/C103.txt')],
        # ["C201", read('data/values/C201.txt')],
        # ["C202", read('data/values/C202.txt')],
        # ["C203", read('data/values/C203.txt')],
        # ["R101", read('data/values/R101.txt')],
        # ["R102", read('data/values/R102.txt')],
        # ["R103", read('data/values/R103.txt')],
        # ["R201", read('data/values/R201.txt')],
        # ["R202", read('data/values/R202.txt')],
        # ["R203", read('data/values/R203.txt')],
        # ["RC101", read('data/values/RC101.txt')],
        # ["RC102", read('data/values/RC102.txt')],
        # ["RC103", read('data/values/RC103.txt')],
        ["RC201", read('data/values/RC201.txt')],
        ["RC202", read('data/values/RC202.txt')],
        ["RC205", read('data/values/RC205.txt')],
    ]

    processes = []

    for dataset in data:
        processes.append(mp.Process(target=task, args=(dataset[0], dataset[1][0], dataset[1][1])))
    for process in processes:
        process.start()
    for process in processes:
        process.join()

