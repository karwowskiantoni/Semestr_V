from Client import Client


def read(filename):
    file = open(filename)
    return [Client(line.split()) for line in file]


