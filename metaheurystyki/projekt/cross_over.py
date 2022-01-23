from gownokod_z_neta_2 import erx


def cross_over(pair):
    return erx(pair[0], pair[1])
#     pivot_1, pivot_2 = randint(0, len(male) - 1), randint(0, len(male) - 1)
#     return [sexzzzz(male, female, pivot_1, pivot_2), sexzzzz(female, male, pivot_1, pivot_2)]
#
#
# def sexzzzz(male, female, pivot_1, pivot_2):
#     child = [-1 for _ in range(pivot_1)] + male[pivot_1:pivot_2] + [0 for _ in range(len(male) - pivot_2)]
#     rest = []
#     for i in range(pivot_1):
#         if female[i] not in child:
#             child[i] = female[i]
#
