def ascii_to_index(char):
    return ord(char) - 97


def index_to_ascii(index):
    return chr(index + 97)


class Graph:
    def __init__(self, nodes, begin_node, end_node):
        self.nodes = nodes
        self.begin_node = begin_node
        self.end_node = end_node

    def is_end(self, node):
        return self.end_node == node


class ArrayGraph(Graph):
    def neighbours(self, actual_node):
        neighbours = []
        for node in self.nodes:
            if node[0] == actual_node:
                neighbours.append(node[1])
            elif node[1] == actual_node:
                neighbours.append(node[0])
        return neighbours


class NeighbourhoodArrayGraph(Graph):
    def neighbours(self, actual_node):
        return self.nodes[ascii_to_index(actual_node)]


class MatrixGraph(Graph):
    def neighbours(self, actual_node):
        neighbours = []
        node_bindings = self.nodes[ascii_to_index(actual_node)]
        for i in range(len(node_bindings)):
            if node_bindings[i] == 1:
                neighbours.append(index_to_ascii(i))
        return neighbours


class IncidentMatrixGraph(Graph):
    def neighbours(self, actual_node):
        neighbours = []
        node_bindings = self.nodes[ascii_to_index(actual_node)]
        for i in range(len(node_bindings)):
            if node_bindings[i] == 1:
                neighbours.append(index_to_ascii(i))
        return neighbours
