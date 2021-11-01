import time

from queue import Queue
from Graph import NeighbourhoodArrayGraph, IncidentMatrixGraph, ArrayGraph, MatrixGraph
from example_graphs import neighbourhood_array_graph, incidents_matrix_graph, matrix_graph, array_graph


class Parents:
    def __init__(self):
        self.parents = []

    def push(self, node, parent_node):
        self.parents.append([node, parent_node])

    def parent(self, node):
        for parent in self.parents:
            if parent[0] == node:
                return parent[1]
        return None

    def path(self, end_node):
        path = [end_node]
        iterator = end_node
        while self.parent(iterator) is not None:
            path.append(self.parent(iterator))
            iterator = self.parent(iterator)
        path.reverse()
        return path


def breadth_first_search(labyrinth):
    q = Queue()
    parents = Parents()

    q.put(labyrinth.begin_node)
    visited_nodes = [labyrinth.begin_node]

    while not q.empty():
        c = q.get()
        children = labyrinth.neighbours(c)
        for child in children:
            if child not in visited_nodes:
                visited_nodes.append(child)
                parents.push(child, c)
                q.put(child)
                if labyrinth.is_end(child):
                    return parents.path(child)
    return "Brak ścieżki do celu"


def depth_first_search(labyrinth):
    s = [labyrinth.begin_node]
    parents = Parents()

    visited_nodes = []
    while len(s) > 0:
        c = s.pop()
        visited_nodes.append(c)
        if labyrinth.is_end(c):
            return parents.path(c)
        children = labyrinth.neighbours(c)
        for child in children:
            if child not in visited_nodes:
                parents.push(child, c)
                s.append(child)

    return "Brak ścieżki do celu"


if __name__ == '__main__':
    neighbourhood_array_labyrinth = NeighbourhoodArrayGraph(neighbourhood_array_graph, 'h', 'f')
    incidents_matrix_labyrinth = IncidentMatrixGraph(incidents_matrix_graph, 'h', 'f')
    array_labyrinth = ArrayGraph(array_graph, 'h', 'f')
    matrix_labyrinth = MatrixGraph(matrix_graph, 'h', 'f')

    timer = time.time()

    for i in range(100000):
        xd = breadth_first_search(neighbourhood_array_labyrinth)
        xd = breadth_first_search(incidents_matrix_labyrinth)
        xd = breadth_first_search(array_labyrinth)
        xd = breadth_first_search(matrix_labyrinth)

    print("time:" + str(time.time() - timer))

    # print(breadth_first_search(neighbourhood_array_labyrinth))
    # print(depth_first_search(neighbourhood_array_labyrinth))
    #
    # print(breadth_first_search(incidents_matrix_labyrinth))
    # print(depth_first_search(incidents_matrix_labyrinth))
    #
    # print(breadth_first_search(array_labyrinth))
    # print(depth_first_search(array_labyrinth))
    #
    # print(breadth_first_search(matrix_labyrinth))
    # print(depth_first_search(matrix_labyrinth))

