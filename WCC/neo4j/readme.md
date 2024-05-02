# Requirements
In my case I downloaded desktop app but neo4j also have online implementation - site[https://sandbox.neo4j.com/]

# Reproduce
## 1.
Data should be in database. There for I used this code for create nodes and links
```
CREATE
  (nBob:User {name: 'Bob'}),
  (nAlina:User {name: 'Alina'}),
  (nSteave:User {name: 'Steave'}),
  (nMark:User {name: 'Mark'}),
  (nClark:User {name: 'Clark'}),
  (nStefany:User {name: 'Stefany'}),
  (nCarter:User {name: 'Carter'}),
  (nMason:User {name: 'Mason'}),
  (nAvery:User {name: 'Avery'}),

  (nBob)-[:FRIEND {weight: 0.5}]->(nAlina),
  (nBob)-[:FRIEND {weight: 4}]->(nSteave),
  (nMark)-[:FRIEND {weight: 1.1}]->(nClark),
  (nMark)-[:FRIEND {weight: 2}]->(nStefany),
  (nCarter)-[:FRIEND {weight: 4}]->(nMason),
  (nCarter)-[:FRIEND {weight: 1.6}]->(nAvery);
```

## 2
The following statement will project a graph using a native projection and store it in the graph catalog under the name 'friends'
```
CALL gds.graph.project(
  'friends',
  'User',
  'FRIEND',
  {
    relationshipProperties: 'weight'
  }
)
```

## 3
Neo4j has a built-in function to call this algorithm
```
CALL gds.wcc.stream('friends')
YIELD nodeId, componentId
RETURN gds.util.asNode(nodeId).name AS name, componentId
ORDER BY componentId, name
```

## Component count
The number of components can be determined
```
CALL gds.wcc.stats('friends')
YIELD componentCount
```

## Resources estimation
Before running the algorithm, you can estimate the approximate memory loss
```
CALL gds.wcc.write.estimate('friends', { writeProperty: 'component' })
YIELD nodeCount, relationshipCount, bytesMin, bytesMax, requiredMemory
```
