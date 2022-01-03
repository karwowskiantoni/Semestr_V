from numpy import linspace, meshgrid
from tqdm import tqdm
from random import uniform
from Particle import Particle
import matplotlib.pyplot as plt

from functions import mccormic_function, ackley_function


def draw_plot(domain, particles, adaptation_function):
    X, Y = meshgrid(linspace(domain[0], domain[1], num=100), linspace(domain[0], domain[1], num=100))
    Z = adaptation_function(X, Y)

    ax = plt.axes(projection='3d')
    ax.scatter3D([p.x for p in particles],
                 [p.y for p in particles],
                 [p.actual_adaptation for p in particles],
                 edgecolor='red',
                 alpha=1,
                 color='red')
    ax.plot_surface(X, Y, Z, rstride=1, cstride=1, edgecolor="none", alpha=0.4)
    plt.show()


if __name__ == '__main__':
    ITERATION_NUMBER = 100
    POPULATION_SIZE = 50
    INERTIA = 0.3
    COGNITIVE_CONSTANT = 0.3
    SOCIAL_CONSTANT = 0.4
    DOMAIN = [-5, 5]
    ADAPTATION_FUNCTION = mccormic_function

    particles = [Particle(uniform(DOMAIN[0], DOMAIN[1]),
                          uniform(DOMAIN[0], DOMAIN[1]),
                          INERTIA,
                          COGNITIVE_CONSTANT,
                          SOCIAL_CONSTANT,
                          ADAPTATION_FUNCTION)
                 for _ in range(POPULATION_SIZE)]

    for _ in tqdm(range(ITERATION_NUMBER)):

        # begin find best individual
        best_actual_adaptation = particles[0].actual_adaptation
        best_x = particles[0].x
        best_y = particles[0].y

        for particle in particles:
            if particle.actual_adaptation > best_actual_adaptation:
                best_actual_adaptation = particle.actual_adaptation
                best_x = particle.x
                best_y = particle.y
        # end find best individual

        for particle in particles:
            particle.update_velocity(best_x, best_y)
            particle.update_position()
            particle.update_adaptation()

    draw_plot(DOMAIN, particles, ADAPTATION_FUNCTION)

