<script>
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { randomShadeOfHue } from '$lib/helpers';
	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	let datas = [12, 19, 3, 5, 2, 3];

	let colors = datas.map(() => randomShadeOfHue(221.2))

	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '% of Votes',
				data: datas,
				backgroundColor: colors,
				borderRadius: 10
			}
		]
	};
</script>

<Bar {data} options={{ responsive: true }} />
