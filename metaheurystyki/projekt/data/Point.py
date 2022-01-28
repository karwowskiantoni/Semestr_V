from math import sqrt


class Point:
    def __init__(self, params):
        self.id = float(params[0])
        self.x = float(params[1])
        self.y = float(params[2])
        self.demand = float(params[3])
        self.start_time = float(params[4])
        self.end_time = float(params[5])
        self.service_time = float(params[6])

    def distance_between(self, client):
        return sqrt((self.x - client.x) ** 2 + (self.y - client.y) ** 2)

    def print(self):
        print('id: ' + str(self.id) +
              ' x: ' + str(self.x) +
              ' y:' + str(self.y) +
              ' demand:' + str(self.demand) +
              ' start_time: ' + str(self.start_time) +
              ' end_time: ' + str(self.end_time) +
              ' service_time: ' + str(self.service_time))
