<script lang="ts">
    import PieChart from '$lib/components/custom/charts/pie-chart.svelte';
	import DonutChart from '$lib/components/custom/charts/donut-chart.svelte';
    import * as Card from "$lib/components/ui/card/index";
	import BarChart from '$lib/components/custom/charts/bar-chart.svelte';
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
    <Card.Root class="col-span-4">
        <Card.Header>
            <Card.Title>Overview</Card.Title>
        </Card.Header>
        <Card.Content>
            <BarChart />
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Title>Try Pie</Card.Title>
            <Card.Description>Lolololololololol trying chart made by me wkwkwkwkwk.</Card.Description>
        </Card.Header>
        <Card.Content>
                <PieChart />
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Title>Try Pie</Card.Title>
            <Card.Description>Lolololololololol trying chart made by me wkwkwkwkwk.</Card.Description>
        </Card.Header>
        <Card.Content>
                <DonutChart />
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Title>Try Pie</Card.Title>
            <Card.Description>Lolololololololol trying chart made by me wkwkwkwkwk.</Card.Description>
        </Card.Header>
        <Card.Content>
                <PieChart />
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Title>Try Pie</Card.Title>
            <Card.Description>Lolololololololol trying chart made by me wkwkwkwkwk.</Card.Description>
        </Card.Header>
        <Card.Content>
                <DonutChart />
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-4">
        <Card.Header>
            <Card.Title>Overview</Card.Title>
        </Card.Header>
        <Card.Content>
            <BarChart />
        </Card.Content>
    </Card.Root>
</div>