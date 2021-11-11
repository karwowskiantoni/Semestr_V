import time
from queue import Queue
import networkx
from matplotlib import pyplot as plt
from Graph import IncidentMatrixGraph, ArrayGraph, NeighbourhoodMatrixGraph, NeighbourhoodListGraph


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
    arr_times = []
    adj_matrix_times = []
    inc_matrix_times = []
    nei_list_times = []
    for i in range(max_graph_size):
        arr_timers = []
        adj_matrix_timers = []
        inc_matrix_timers = []
        nei_list_timers = []
        for j in range(100):
            nx_graph = networkx.fast_gnp_random_graph(i + 1, 1/(i + 1) * 3)
            arr_graph = ArrayGraph(nx_graph)
            adj_matrix_graph = NeighbourhoodMatrixGraph(nx_graph)
            inc_matrix_graph = IncidentMatrixGraph(nx_graph)
            nei_list_graph = NeighbourhoodListGraph(nx_graph)

            timer = time.time()
            depth_first_search(arr_graph)
            arr_timers.append(time.time() - timer)

            timer = time.time()
            depth_first_search(adj_matrix_graph)
            adj_matrix_timers.append(time.time() - timer)

            timer = time.time()
            depth_first_search(inc_matrix_graph)
            inc_matrix_timers.append(time.time() - timer)

            timer = time.time()
            depth_first_search(nei_list_graph)
            nei_list_timers.append(time.time() - timer)
            
        arr_times.append(sum(arr_timers)/len(arr_timers))
        adj_matrix_times.append(sum(adj_matrix_timers)/len(adj_matrix_timers))
        inc_matrix_times.append(sum(inc_matrix_timers)/len(inc_matrix_timers))
        nei_list_times.append(sum(nei_list_timers)/len(nei_list_timers))
        print(i)
    plt.plot([x for x in range(max_graph_size)], arr_times, 'r')
    plt.plot([x for x in range(max_graph_size)], adj_matrix_times, 'g')
    plt.plot([x for x in range(max_graph_size)], inc_matrix_times, 'b')
    plt.plot([x for x in range(max_graph_size)], nei_list_times, 'm')
    plt.legend(["array", "adjacency matrix", "incident matrix", "adjacency list"])
    plt.xlabel("number of nodes")
    plt.ylabel("average calculation time")
    plt.show()
