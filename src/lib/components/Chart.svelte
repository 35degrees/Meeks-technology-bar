<script>
	import * as d3 from 'd3';
	let { data } = $props();

	let skills = data.skills;
	let count = skills.map((skill) => (skill.count = +skill.count));

	let svg;

	$effect(() => {
		svg = d3.select('.rsvg').append('svg').attr('viewBox', '0 0 600 700');
		// .style('border', '2px solid teal')
		// .style('background-color', '#fff');

		skills.sort((a, b) => b.count - a.count);

		createViz(skills);
	});

	function createViz(skills) {
		const xScale = d3.scaleLinear().domain([0, 1078]).range([0, 450]);
		const yScale = d3
			.scaleBand()
			.domain(skills.map((d) => d.technology))
			.range([0, 700])
			.paddingInner(0.2);
		const barHeight = 20;
		const barAndLabel = svg
			// .selectAll('rect')
			// .data(skills)
			// .join('rect')
			.selectAll('g')
			.data(skills)
			.join('g')
			.attr('transform', (d) => `translate(0,${yScale(d.technology)})`);

		barAndLabel
			.append('rect')
			.attr('width', (d) => xScale(d.count))
			.attr('height', yScale.bandwidth())
			.attr('x', 100)
			.attr('y', 0)
			.attr('fill', (d) => (d.technology === 'D3.js' ? 'orange' : 'teal'));

		barAndLabel
			.append('text')
			.text((d) => d.technology)
			.attr('x', 96)
			.attr('y', 12)
			.style('text-anchor', 'end')
			.style('font-family', 'sans-serif')
			.style('font-size', '11px')
			.style('user-select', 'none');

		barAndLabel
			.append('text')
			.text((d) => d.count)
			.attr('x', (d) => xScale(d.count) + 104)
			.attr('y', 12)
			.style('text-anchor', 'start')
			.style('font-family', 'sans-serif')
			.style('font-size', '9px')
			.style('user-select', 'none');

		svg
			.append('line')
			.attr('x1', 100)
			.attr('y1', 0)
			.attr('x2', 100)
			.attr('y2', 700)
			.style('stroke', 'teal');
	}
</script>

<div class="rsvg"></div>

<style>
	.rsvg {
		margin: auto 0.8rem;
		max-width: 600px;
		width: 100%;
	}
</style>
