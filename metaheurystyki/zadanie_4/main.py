from numpy import pi, e, sin, exp, sqrt, cos, linspace, meshgrid
from tqdm import tqdm
import matplotlib.pyplot as plt
from Particle import Particle
import random


def ackley_function(x, y):
    return -20.0 * exp(-0.2 * sqrt(0.5 * (pow(x, 2) + pow(y, 2)))) - exp(0.5 * (cos(2 * pi * x) + cos(
        2 * pi * y))) + e + 20


def mccormic_function(x, y):
    return sin(x + y) + pow(x - y, 2) - 1.5 * x + 2.5 * y + 1


def rand(domain):
    return random.uniform(domain[0], domain[1])


if __name__ == '__main__':
    ITERATION_NUMBER = 100
    POPULATION_SIZE = 50
    INERTIA = 1
    COGNITIVE_CONSTANT = 1
    SOCIAL_CONSTANT = 1
    DOMAIN = [-5, 5]
    ADAPTATION_FUNCTION = ackley_function

    particles = [Particle(rand(DOMAIN),
                          rand(DOMAIN),
                          INERTIA,
                          COGNITIVE_CONSTANT,
                          SOCIAL_CONSTANT,
                          ADAPTATION_FUNCTION)
                 for _ in range(POPULATION_SIZE)]

    for _ in tqdm(range(ITERATION_NUMBER)):
        pass

    ax = plt.axes(projection='3d')
    x = linspace(-5, 5, num=100)
    y = linspace(-5, 5, num=100)
    X, Y = meshgrid(x, y)
    Z = ADAPTATION_FUNCTION(X, Y)
    ax.scatter3D([p.x for p in particles],
                 [p.y for p in particles],
                 [p.actual_adaptation for p in particles],
                 edgecolor='red',
                 alpha=1,
                 color='red')
    ax.plot_surface(X, Y, Z, rstride=1, cstride=1, edgecolor="none", alpha=0.4)
    plt.show()
