from queue import Queue
from Graph import ArrayGraph, NeighbourhoodArrayGraph, MatrixGraph, IncidentMatrixGraph
from example_graphs import array_graph, neighbourhood_array_graph, matrix_graph, incidents_matrix_graph


class Parents:
    parents = []

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


def bfs(labyrinth):
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


if __name__ == '__main__':
    array_labyrinth = ArrayGraph(array_graph, 'h', 'f')
    neighbourhood_array_labyrinth = NeighbourhoodArrayGraph(neighbourhood_array_graph, 'h', 'f')
    matrix_labyrinth = MatrixGraph(matrix_graph, 'h', 'f')
    incidents_matrix_labyrinth = IncidentMatrixGraph(incidents_matrix_graph, 'h', 'f')

    print(bfs(array_labyrinth))
    print(bfs(neighbourhood_array_labyrinth))
    print(bfs(matrix_labyrinth))
    print(bfs(incidents_matrix_labyrinth))
