class UndirectedGraph {
    nodeCount: number;
    connections: number[][];
    connectedVertices: number[][];
    components: number[][] = [];

    constructor(
        nodeCount: number,
        connections: number[][],
    ) {
        this.nodeCount = nodeCount;
        this.connections = connections;
        this.setupConnectionMtx(connections);
    }

    private setupConnectionMtx(connections: number[][]): void {
        this.connectedVertices = Array.from({ length: this.nodeCount }, () => []);

        for (const [from, to] of connections) {
            if (this.connectedVertices[from].indexOf(to) == -1) this.connectedVertices[from].push(to);
            if (this.connectedVertices[to].indexOf(from) == -1) this.connectedVertices[to].push(from);
        }
    }

    wcc() {
        const visitedNodes = Array<boolean>(this.nodeCount).fill(false);
        for (let i = 0; i < this.nodeCount; i++) {
            if (!visitedNodes[i]) {
                const component: number[] = [];
                this.dfs(i, visitedNodes, component);
                this.components.push(component);
            }
        }
        
    }

    dfs(src: number, isVisited: boolean[], component: number[]) {
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

for (let i = 0; i < graph.components.length; i ++) {
    console.log(`wcc ${i}: ${graph.components[i].join(" ")}`);
}
