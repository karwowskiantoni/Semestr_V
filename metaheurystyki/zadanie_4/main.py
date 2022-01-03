from tqdm import tqdm

from Particle import Particle

if __name__ == '__main__':

# no i użyj tu defa tak jak linter krzyczy
    ACKLEY_FUNCTION = lambda x, y: x + y  # jebnij tu dwie funkcje z linka - "Ackley function" i "McCormick function"
    MCCORMICK_FUNCTION = lambda x, y: x + y  # jebnij tu dwie funkcje z linka - "Ackley function" i "McCormick function"

    ITERATION_NUMBER = 100
    POPULATION_SIZE = 50
    INERTIA = 1
    COGNITIVE_CONSTANT = 1
    SOCIAL_CONSTANT = 1
    ADAPTATION_FUNCTION = MCCORMICK_FUNCTION

    # particles = [Particle() for _ in range(POPULATION_SIZE)]

    for _ in tqdm(range(ITERATION_NUMBER)):
        print("gowno")
