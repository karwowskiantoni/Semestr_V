class Particle:
    def __init__(self, x, y, inertia, cognitive_constant, social_constant, adaptation_function):
        self.inertia = inertia
        self.cognitive_constant = cognitive_constant
        self.social_constant = social_constant
        self.adaptation_function = adaptation_function

        self.x_velocity = 0
        self.y_velocity = 0

        self.x = x
        self.y = y
        self.actual_adaptation = 0

        self.best_x = x
        self.best_y = y
        self.best_adaptation = 0

    def calculate_adaptation(self):
        return self.adaptation_function(self.x, self.y)

    def update_adaptation(self):
        self.actual_adaptation = self.calculate_adaptation()
        if self.actual_adaptation > self.best_adaptation:
            self.best_adaptation = self.actual_adaptation
            self.best_x = self.x
            self.best_y = self.y
        return self.best_adaptation

    def update_velocity(self, best_x_in_population, best_y_in_population):
        self.x_velocity = self.inertia * self.x_velocity + \
                          self.cognitive_constant * (self.best_x - self.x) + \
                          self.social_constant * (best_x_in_population - self.x)

        self.y_velocity = self.inertia * self.y_velocity + \
                          self.cognitive_constant * (self.best_y - self.y) + \
                          self.social_constant * (best_y_in_population - self.y)

    def update_position(self):
        self.x += self.x_velocity
        self.y += self.y_velocity


