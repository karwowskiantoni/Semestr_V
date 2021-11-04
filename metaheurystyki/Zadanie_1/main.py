import time

from queue import Queue

import networkx
from matplotlib import pyplot as plt

from Graph import NeighbourhoodArrayGraph, IncidentMatrixGraph, ArrayGraph, MatrixGraph
from example_graphs import neighbourhood_array_graph, incidents_matrix_graph, matrix_graph, array_graph
import networkx as nx

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
    max_graph_size = 100
    times = []
    for i in range(max_graph_size):
        timers = []
        for j in range(50):
            nx_graph = networkx.fast_gnp_random_graph((i + 1), 1/(i + 1) * 3, seed=j)
            graph = MatrixGraph(nx_graph)
            timer = time.time()
            breadth_first_search(graph)
            timers.append(time.time() - timer)
        times.append(sum(timers)/len(timers))
        print(i)
    plt.plot([x for x in range(max_graph_size)], times)
    plt.show()
    # graph = networkx.fast_gnp_random_graph(100, 0.2)
    # antoni = MatrixGraph(graph)









