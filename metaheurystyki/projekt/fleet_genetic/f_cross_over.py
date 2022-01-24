from random import randint, random


def cross_over(pair):
    pivot = randint(0, len(pair[0]) - 1)
    return [pair[0][:pivot] + pair[1][pivot:], pair[1][:pivot] + pair[0][pivot:]]


def uniform_cross_over(pair):
    return [[pair[0][i] if random() > 0.5 else pair[1][i] for i in range(len(pair[0]))] for _ in range(2)]
