var ld = require('lodash');
var Graph = {};

Graph.UndirectedGraph = function(){
	this.graph = {};
};

Graph.UndirectedGraph.prototype = {
	addVertex:function(vertex){
		this.graph[vertex] = [];
	},
	addEdge:function(from,to){
		this.graph[from].push(to);
		this.graph[to].push(from);
	},
	hasEdgeBetween:function(from,to){
		return this.graph[from].indexOf(to) >= 0;
	},
	order:function(){
		return Object.keys(this.graph).length;
	},
	size:function(){
		var graph = this.graph;
		var vertices = Object.keys(graph);
		var size = 0;
		vertices.forEach(function(vertex){
			size += graph[vertex].length;
		});
		return size/2;
	},
	pathBetween:function(from,to,visiting){
		var graph = this.graph;
		var visited = visiting || [];
		if (from == to)
			return visited.concat(from);
		for (var index in graph[from]){
			var vertex = graph[from][index];
			if (visited.indexOf(vertex) != -1)
				vertex = this.graph[from][index+1];
			var path = this.pathBetween(vertex,to,visited.concat(from));
			if (path.length)
				return path;
		}
		return [];
	},
	farthestVertex:function(vertex){
		var vertices = Object.keys(this.graph);
		var length = 0;
		for (var i = 0; i < vertices.length; i++) { 
			var fartherLength = (this.pathBetween(vertex,vertices[i])).length;
			if (length < fartherLength){
				length = fartherLength;
				var farthestVertex = vertices[i];
			}
		}
		return farthestVertex;
	},
	allPaths:function(from,to,visiting,path){
		var graph = this.graph;
		visiting = visiting || [];
		path = path || [];
		if (from == to)
			return path.push(visiting.concat(from));
		if (visiting.indexOf(from) == -1){
			for (var index in graph[from]){
				var vertex = graph[from][index];
				this.allPaths(vertex,to,visiting.concat(from),path);
			}
		}
		return path;
	}
};

Graph.DirectedGraph = function(){
	this.graph = {};
};

Graph.DirectedGraph.prototype = {
	addVertex:function(vertex){
		this.graph[vertex] = [];
	},
	addEdge:function(from,to){
		this.graph[from].push(to);
	},
	hasEdgeBetween:function(from,to){
		return this.graph[from].indexOf(to) >= 0;
	},
	order:function(){
		return Object.keys(this.graph).length;
	},
	size:function(){
		var graph = this.graph;
		var vertices = Object.keys(graph);
		var size = 0;
		vertices.forEach(function(vertex){
			size += graph[vertex].length;
		});
		return size;
	},
	pathBetween:function(from,to,visiting){
		var graph = this.graph;
		var visited = visiting || [];
		if (from == to)
			return visited.concat(from);
		for (var index in graph[from]){
			var vertex = graph[from][index];
			if (visited.indexOf(vertex) != -1)
				vertex = this.graph[from][index+1];
			var path = this.pathBetween(vertex,to,visited.concat(from));
			if (path.length)
				return path;
		}
		return [];
	},
	farthestVertex:function(vertex){
		var vertices = Object.keys(this.graph);
		var length = 0;
		for (var i = 0; i < vertices.length; i++) { 
			var fartherLength = (this.pathBetween(vertex,vertices[i])).length;
			if (length < fartherLength){
				length = fartherLength;
				var farthestVertex = vertices[i];
			}
		}
		return farthestVertex;
	},
	allPaths:function(from,to,visiting,path){
		var graph = this.graph;
		visiting = visiting || [];
		path = path || [];
		if (from == to)
			return path.push(visiting.concat(from));
		if (visiting.indexOf(from) == -1){
			for (var index in graph[from]){
				var vertex = graph[from][index];
				this.allPaths(vertex,to,visiting.concat(from),path);
			}
		}
		return path;
	}
}

module.exports = Graph;




















