"use strict";

let testVal = 7;
let routes = require('../public/js/data').allRoutesUpperStoN
let stationGraph = {};
let searchPath;

console.log("\n\nTHE UPPER ROUTES", routes)

function Graph() {
    this.graph = {};
    this.size = 0;
}

Graph.prototype.addNode = function (node) {
    if (!this.graph[node]) {
       this.size++;
       this.graph[node] = [];
    }
};

Graph.prototype.addEdge = function (node, edge) {
    if (this.graph[node].indexOf(edge) < 0) {
        this.graph[node].push(edge);
    }
};

Graph.prototype.addNodes = function (routeArray) {
    routeArray.forEach((station, idx, route) => {
        if (!this.graph[station]) {
            this.size++;
            this.graph[station] = [];
            if (route[idx] - 1) {
                this.graph[station].addEdge(route[idx] - 1)
            }
            if (route[idx] + 1) {
                this.graph[station].addEdge(route[idx] + 1)
            }
        }
    })
};


// let myGraph = new Graph;

routes.forEach(route => {
    route.forEach((station, index) => {
        let stationBefore = route[index - 1]
        let stationAfter = route[index + 1]

        if (!stationGraph[station]) {
            stationGraph[station] = [];
        }

        if (stationGraph[station]) {
            if (stationBefore && !stationGraph[station].includes(stationBefore)) {
                stationGraph[station].push(stationBefore);
            }
            if (stationAfter && !stationGraph[station].includes(stationAfter)) {
                stationGraph[station].push(stationAfter);
            }
        }
    })
})

class Queue {
    constructor() {
        this.queue = [];
        this.size = 0;
    }

    enqueue(val) {
        this.queue.push(val);
        this.size++;
        return this;
    }

    dequeue() {
        this.size--;
        return this.queue.shift();
    }
}

searchPath = (graph, start, destination) => {
    let currStation = start;
    let edges;
    let frontier = new Queue;
    let visited = [];
    let path = [];

    frontier.enqueue(currStation)
    while (frontier.size > 0) {
        currStation = frontier.dequeue();
        edges = graph[currStation];

        if (visited.includes(currStation)) {
            continue;
        }

        path.push(currStation);

        if (currStation === destination) {
            console.log("######THE path\n", path);
            return path;
        }

        edges.forEach(item => {
            frontier.enqueue(item);
        });

        visited.push(currStation);
    }

    return "Destination not found";
}

module.exports = {
    testVal: testVal,
    stationGraph: stationGraph,
    Graph: Graph,
    Queue: Queue,
    searchPath: searchPath
};
