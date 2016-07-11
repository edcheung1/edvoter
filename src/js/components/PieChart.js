import React from "react";
var d3 = require('d3');

export function create(el, props, data) {
	let canvas = d3.select(el).append("svg")
			.attr("width", props.width + "px")
			.attr("height", props.height + "px")
		.append("g")
			.attr("transform", "translate(" + props.width/2 + "," + props.height/2 + ")");

	this.update(el, props, data);
};

export function update(el, props, data) {
	d3.select(el).selectAll("g > * ").remove();
	drawPie(el, props, data);
}

export function destroy(el) {
	d3.select(el).selectAll("g").selectAll(".arc").remove();
}

function drawPie(el, props, data) {

	let radius = Math.min(props.width, props.height) / 2;

	let pie = d3.pie()
				.value((d) => d.votes);
	let arc = d3.arc()
				.outerRadius(radius - 10)
				.innerRadius(radius - 70);

	let labelArc = d3.arc()
				.outerRadius(radius - 40)
				.innerRadius(radius - 40);

	let colors = d3.scaleOrdinal(d3.schemeCategory10);

	let arcs = pie(data);

	let chart = d3.select(el).selectAll("g").selectAll(".arc")
		.data(arcs);

	chart.enter()
		.append("path")
			.attr("fill", (d, i) => colors(i))
			.attr("d", arc);

	chart.enter()
		.append("text")
			.attr("transform", (d) => "translate(" + labelArc.centroid(d) + ")")
			.attr("dy", ".35em")
			.attr("dx", "-1.5em")
			.text((d) => d.data.votes > 0 ? d.data.choice_name : "")
			.attr("fill", "#c8c8c8");

	chart.exit()
		.remove();

}