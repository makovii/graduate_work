class UndirectedGraph {
    constructor(nodeCount, connections) {
        this.components = [];
        this.nodeCount = nodeCount;
        this.connections = connections;
        this.setupConnectionMtx(connections);
    }
    setupConnectionMtx(connections) {
        this.connectedVertices = Array.from({ length: this.nodeCount }, () => []);
        for (const [from, to] of connections) {
            if (this.connectedVertices[from].indexOf(to) == -1)
                this.connectedVertices[from].push(to);
            if (this.connectedVertices[to].indexOf(from) == -1)
                this.connectedVertices[to].push(from);
        }
    }
    wcc() {
        const visitedNodes = Array(this.nodeCount).fill(false);
        for (let i = 0; i < this.nodeCount; i++) {
            if (!visitedNodes[i]) {
                const component = [];
                this.dfs(i, visitedNodes, component);
                this.components.push(component);
            }
        }
    }
    dfs(src, isVisited, component) {
        isVisited[src] = true;
        component.push(src);
        for (let v of this.connectedVertices[src]) {
            if (!isVisited[v]) {
                this.dfs(v, isVisited, component);
            }
        }
    }
}
const graph = new UndirectedGraph(8, [[0, 1], [0, 2], [3, 4], [3, 5], [6, 1], [6, 7]]);
graph.wcc();
for (let i = 0; i < graph.components.length; i++) {
    console.log(`wcc ${i}: ${graph.components[i].join(" ")}`);
}
//# sourceMappingURL=typescriptWCC.js.map