var getEdges = function(vertices,graph){
	var edges = [];
	vertices.forEach(function(vertex){
		var edgesOfVertex = Object.keys(graph[vertex]);
		edgesOfVertex.forEach(function(edge){
			edges.push(graph[vertex][edge]);
		});
	});
	return edges;
};

var setParentVertex = function(vertices,from,distances,parentVertex){
	vertices.forEach(function(vertex){
		if (vertex == from){
			distances[vertex] = 0;
			parentVertex[vertex] = vertex;
		}else{
			parentVertex[vertex] = '';
			distances[vertex] = Infinity;
		}
	});
	return parentVertex;
};

var deleteVertex = function(shortestDistanceVertex,vertices){
	vertices.splice(vertices.indexOf(shortestDistanceVertex),1);
	return vertices;
};

var shortestPathBetween = function(from,to,path,parentVertex){
	var path = path || [];
	if (parentVertex[to] == from)
		return path.concat(to,from);
	return shortestPathBetween(from,parentVertex[to],path.concat(to),parentVertex);
};

var Graph = {};

Graph.WeightedGraph = function(){
	this.graph = {};
};

Graph.WeightedGraph.prototype = {
	addVertex:function(vertex){
		this.graph[vertex] = this.graph[vertex] || [];
	},
	addEdge:function(edge){
		this.graph[edge.from].push(edge);
	},
	shortestPath:function(from,to){
		var graph = this.graph;
		var path = [];
		var vertices = Object.keys(graph);
		var edges = getEdges(vertices,graph);
		var distances = {};
		var parentVertex = {};
		parentVertex = setParentVertex(vertices,from,distances,parentVertex);
		while(vertices.length > 0){
			var shortestDistanceVertex = vertices.reduce(function(preVertex,curVertex){
				return distances[preVertex] < distances[curVertex] ? preVertex : curVertex;
			});
			var edgesOfShortestDistanceVertex = edges.filter(function(edge){
				return edge.from == shortestDistanceVertex;
			});
			edgesOfShortestDistanceVertex.forEach(function(edge){
				var totalWeight = distances[shortestDistanceVertex] + edge.weight;
				if (totalWeight < distances[edge.to]){
					distances[edge.to] = totalWeight;
					parentVertex[edge.to] = shortestDistanceVertex;
				}
			});
			vertices = deleteVertex(shortestDistanceVertex,vertices);
		};
		var pathVertices = shortestPathBetween(from,to,path,parentVertex).reverse();
		var weights =[];
		edges.forEach(function(edge){
			pathVertices.forEach(function(vertex,i,pathVertices){
				if (edge.from == vertex && edge.to == pathVertices[i+1])
					path.push(edge);
			});
		});
		path.reduce(function(edge1,edge2){
			if (edge1.from == edge2.from)
				return edge1.weight > edge2.weight ? path.splice(path.indexOf(edge1),1) : 
				path.splice(path.indexOf(edge2),1); 
		});
		return path;
	}
}

Graph.Edge = function(edge,from,to,weight){
	this.edge = edge;
	this.from = from;
	this.to = to;
	this.weight = weight;
};

module.exports = Graph;