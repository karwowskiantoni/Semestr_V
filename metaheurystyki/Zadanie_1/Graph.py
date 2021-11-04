import networkx


class Graph:
    def __init__(self, nodes, begin_node, end_node):
        self.nodes = nodes
        self.begin_node = begin_node
        self.end_node = end_node

    def is_end(self, node):
        return self.end_node == node


class ArrayGraph(Graph):
    def __init__(self, nx_graph):
        nodes = [[x[0], x[1]] for x in nx_graph.edges]
        super().__init__(nodes, 0, len(nx_graph) - 1)
        # networkx.draw(nx_graph, with_labels=True)
        # plt.show()

    def neighbours(self, actual_node):
        neighbours = []
        for node in self.nodes:
            if node[0] == actual_node:
                neighbours.append(node[1])
            elif node[1] == actual_node:
                neighbours.append(node[0])
        return neighbours


class NeighbourhoodArrayGraph(Graph):
    def __init__(self, nx_graph):
        nodes = [[neighbor for neighbor in nx_graph.neighbors(i)] for i in range(len(nx_graph))]
        super().__init__(nodes, 0, len(nx_graph) - 1)

    def neighbours(self, actual_node):
        return self.nodes[actual_node]


class MatrixGraph(Graph):
    def __init__(self, nx_graph):
        nodes = networkx.to_numpy_array(nx_graph)
        # print(nodes)
        super().__init__(nodes, 0, len(nx_graph) - 1)

    def neighbours(self, actual_node):
        neighbours = []
        node_bindings = self.nodes[actual_node]
        for i in range(len(node_bindings)):
            if node_bindings[i] == 1:
                neighbours.append(i)
        return neighbours


class IncidentMatrixGraph(Graph):
    def connection(self, actual_node, connection_number):
        for i in range(len(self.nodes)):
            if self.nodes[i][connection_number] == 1 and i is not actual_node:
                return i

    def neighbours(self, actual_node):
        neighbours = []
        node_bindings = self.nodes[actual_node]
        for i in range(len(node_bindings)):
            if node_bindings[i] == 1:
                neighbours.append(self.connection(actual_node, i))
        return neighbours
