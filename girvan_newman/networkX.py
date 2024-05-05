import networkx as nx
import matplotlib.pyplot as plt
from networkx.algorithms.community import girvan_newman

G = nx.Graph()

nodes = ['A', 'B', 'C', 'D', 'E', 'F']
G.add_nodes_from(nodes)

edges = [
    ('A', 'C'), ('B', 'C'), ('A', 'B'),
    ('C', 'D'),
    ('D', 'E'), ('D', 'F'), ('E', 'F')
]
G.add_edges_from(edges)

plt.figure(figsize=(10, 5))

plt.subplot(121)
plt.title('Original')
nx.draw(G, with_labels=True, node_color='skyblue', node_size=1000, font_size=10, font_weight='bold')

comp = girvan_newman(G)
first_partition = tuple(sorted(c) for c in next(comp))
subgraphs = [G.subgraph(c) for c in first_partition]

plt.subplot(122)
plt.title('Girvan-Newman Algorithm 1st iteration')
pos = nx.spring_layout(G)
for i, subgraph in enumerate(subgraphs):
    nx.draw(subgraph, pos=pos, with_labels=True, node_color=f'C{i}', node_size=1000, font_size=10, font_weight='bold')

plt.tight_layout()
plt.show()
