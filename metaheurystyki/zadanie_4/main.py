from numpy import pi, e, sin, exp, sqrt, cos
from tqdm import tqdm
from Particle import Particle

if __name__ == '__main__':

    def ackley_function(x, y):
        return -20.0 * exp(-0.2 * sqrt(0.5 * (pow(x, 2) + pow(y, 2)))) - exp(0.5 * (cos(2 * pi * x) + cos(
            2 * pi * y))) + e + 20


    def mccormic_function(x, y):
        return sin(x + y) + pow(x - y, 2) - 1.5 * x + 2.5 * y + 1


    ITERATION_NUMBER = 100
    POPULATION_SIZE = 50
    INERTIA = 1
    COGNITIVE_CONSTANT = 1
    SOCIAL_CONSTANT = 1
    ADAPTATION_FUNCTION = ackley_function()

    # particles = [Particle() for _ in range(POPULATION_SIZE)]

    for _ in tqdm(range(ITERATION_NUMBER)):
        print("gowno")
