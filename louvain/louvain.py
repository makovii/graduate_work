import networkx as nx
import community
import matplotlib.pyplot as plt

from neo4j import GraphDatabase


URI = "neo4j+s://demo.neo4jlabs.com"
AUTH = ("gameofthrones", "gameofthrones")

with GraphDatabase.driver(URI, auth=AUTH) as driver:
    driver.verify_connectivity()

query = """MATCH (c1:Character)-[:INTERACTS]->(c2:Character)
RETURN c1, c2
LIMIT 100"""

movies = driver.session().run(query)

G = nx.Graph()

for record in movies:
    c1 = record['c1']
    c2 = record['c2']
    G.add_node(c1.id, labels=c1.labels, properties=c1._properties)
    G.add_node(c2.id, labels=c2.labels, properties=c2._properties)
    G.add_edge(c1.id, c2.id)

partitions = community.best_partition(G)

pos = nx.spring_layout(G, seed=50)

plt.figure(figsize=(10, 5))
plt.title("Louvain")
plt.axis("off")

nx.draw_networkx_nodes(G, pos, node_color=list(partitions.values()), cmap=plt.cm.Set1, node_size=100)
nx.draw_networkx_edges(G, pos, alpha=0.5)
nx.draw_networkx_labels(G, pos, font_size=8, font_color='black', font_family='monospace')

plt.show()
