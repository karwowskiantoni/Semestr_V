import numpy as np


def cross_over(pair):
    return erx(pair[0], pair[1])


def erx(a, b):
    H = calc_adjency_matrix(a)
    H = calc_adjency_matrix(b, H=H)

    _next = np.random.choice(list(H.keys()))

    y = []
    while True:

        y.append(_next)
        if len(y) == len(a):
            break

        neighbors = list(H[_next])
        remove_from_adj_list(H, _next)

        if len(neighbors) == 0:
            _next = np.random.choice(list(H.keys()))
        else:
            n_neighbors = [len(H[e]) for e in neighbors]
            min_n_neighbors = min(n_neighbors)
            _next = [neighbors[k] for k in range(len(neighbors)) if n_neighbors[k] == min_n_neighbors]
            _next = np.random.choice(_next)

    return y


def calc_adjency_matrix(x, H=None):
    H = {} if H is None else H

    for k in range(len(x)):
        prev = (k - 1) % len(x)
        succ = (k + 1) % len(x)

        if x[k] not in H:
            H[x[k]] = set()
        H[x[k]].update([x[prev], x[succ]])

    return H


def remove_from_adj_list(H, val):
    for e in list(H[val]):
        H[e].remove(val)
    del H[val]


