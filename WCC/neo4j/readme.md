# Requirements
In my case I downloaded desktop app but neo4j also have online implementation - [site](https://sandbox.neo4j.com/)

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
![image](https://github.com/makovii/graduate_work/assets/72148650/479b2e96-ae66-4dcb-8fd6-8563a91eda53)

## 2.
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
![image](https://github.com/makovii/graduate_work/assets/72148650/dd38c51d-1ca7-48c6-862a-be47f2daa5af)

## 3.
Neo4j has a built-in function to call this algorithm
```
CALL gds.wcc.stream('friends')
YIELD nodeId, componentId
RETURN gds.util.asNode(nodeId).name AS name, componentId
ORDER BY componentId, name
```
![image](https://github.com/makovii/graduate_work/assets/72148650/d15f6c2b-6c39-466a-ad7b-3e097571768d)

## Component count
The number of components can be determined
```
CALL gds.wcc.stats('friends')
YIELD componentCount
```
![image](https://github.com/makovii/graduate_work/assets/72148650/0e45bfa3-db9d-41b2-a667-c65ab124f9b2)


## Resources estimation
Before running the algorithm, you can estimate the approximate memory loss
```
CALL gds.wcc.write.estimate('friends', { writeProperty: 'component' })
YIELD nodeCount, relationshipCount, bytesMin, bytesMax, requiredMemory
```
![image](https://github.com/makovii/graduate_work/assets/72148650/1da3933c-6966-46af-8bad-cf7e79528a24)

