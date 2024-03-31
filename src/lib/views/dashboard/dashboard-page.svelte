<script lang="ts">
	import Download from 'lucide-svelte/icons/download';
	import { Button } from '$lib/components/ui/button/index';
	import * as Tabs from '$lib/components/ui/tabs/index';
    import DatePickerWithRange from '$lib/components/custom/example/date-picker-wtih-range.svelte';
    import { Overview } from '$lib/views/dashboard/index';
	import Analytic from './partials/analytic.svelte';
	import Reports from './partials/reports.svelte';
</script>

<div class="h-screen overflow-auto">
    <div class="hidden flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div class="flex items-center space-x-2">
                    <DatePickerWithRange />
                    <Button size="sm">
                        <Download class="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>
            <Tabs.Root value="overview" class="space-y-4">
                <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
                    <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="overview" class="space-y-4 pb-16">
                    <Overview />
                </Tabs.Content>
                <Tabs.Content value="analytics" class="space-y-4 pb-16">
                    <Analytic />
                </Tabs.Content>

                <Tabs.Content value="reports" class="space-y-4 pb-16">
                    <Reports />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
</div>