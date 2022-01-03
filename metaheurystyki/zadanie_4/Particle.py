class Particle:
    def __init__(self, x, y, inertia, cognitive_constant, social_constant, adaptation_function):
        self.inertia = inertia
        self.cognitive_constant = cognitive_constant
        self.social_constant = social_constant
        self.adaptation_function = adaptation_function

        self.velocity = 0

        self.x = x
        self.y = y
        self.actual_adaptation = self.adaptation_function(x, y)

        self.best_x = x
        self.best_y = y
        self.best_adaptation = 0

    def calculate_adaptation(self):
        return self.adaptation_function(self.x, self.y)

    def update_velocity(self):
        self.velocity = 0

    def update_position(self):
        self.x += self.velocity
        self.y += self.velocity

    def update_best_adaptation(self):
        self.best_adaptation = max(self.actual_adaptation, self.calculate_adaptation())  # to źle ale chuj wiadomo o co chodzi

