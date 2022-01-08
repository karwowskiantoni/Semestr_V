from random import random


class Particle:
    def __init__(self, x, y, inertia, cognitive_constant, social_constant, adaptation_function, domain):
        self.inertia = inertia
        self.cognitive_constant = cognitive_constant
        self.social_constant = social_constant
        self.adaptation_function = adaptation_function
        self.domain = domain

        self.x_velocity = 0
        self.y_velocity = 0

        self.x = x
        self.y = y
        self.actual_adaptation = self.calculate_adaptation()

        self.best_x = x
        self.best_y = y
        self.best_adaptation = self.actual_adaptation


    def calculate_adaptation(self):
        return self.adaptation_function(self.x, self.y)

    def update_adaptation(self):
        self.actual_adaptation = self.calculate_adaptation()
        if self.actual_adaptation > self.best_adaptation:
            self.best_adaptation = self.actual_adaptation
            self.best_x = self.x
            self.best_y = self.y

    def update_velocity(self, best_x_in_population, best_y_in_population):
        self.x_velocity = self.inertia * self.x_velocity + \
                          (self.social_constant * random()) * (best_x_in_population - self.x) + \
                          (self.cognitive_constant * random()) * (self.best_x - self.x)

        self.y_velocity = self.inertia * self.y_velocity + \
                          (self.cognitive_constant * random()) * (self.best_y - self.y) + \
                           (self.social_constant * random()) * (best_y_in_population - self.y)

    def update_position(self):
        if self.x + self.x_velocity < self.domain[0]:
            self.x = self.domain[0]
        elif self.x + self.x_velocity > self.domain[1]:
            self.x = self.domain[1]
        else:
            self.x += self.x_velocity

        if self.y + self.y_velocity < self.domain[0]:
            self.y = self.domain[0]
        elif self.y + self.y_velocity > self.domain[1]:
            self.y = self.domain[1]
        else:
            self.y += self.y_velocity


