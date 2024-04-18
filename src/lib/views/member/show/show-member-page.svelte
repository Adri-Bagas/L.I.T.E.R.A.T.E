<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import DataTable from './data-table.svelte';
	import CONFIG from '$lib/config/config';
	import { FileQuestion } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let member: Member;

	let profilePic: string = `${CONFIG.mediaUrl}/${member.profile_pic}`;
</script>

<div class="h-screen overflow-auto">
	<div class="flex-col pb-12 md:flex">
		<div class="mb-24 flex-1 space-y-4 p-8 pt-6">
			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Detail {member.full_name}</h2>
			</div>
			<Card.Root>
				<Card.Header />
				<Card.Content>
					<div class="flex gap-x-12">
						{#if member.profile_pic == null}
							<div>
								<Skeleton class="h-[20rem] w-[20rem] rounded-full"></Skeleton>
								<Tooltip.Root>
									<Tooltip.Trigger><FileQuestion /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>No Profile Pic</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</div>
						{:else}
							<img class="h-[20rem] w-[20rem] rounded-full" alt="profile_pic" src={profilePic} />
						{/if}
						<div class="flex flex-grow">
							<div class="flex flex-grow flex-col gap-y-3">
								<div>
									<p class="text-xl font-semibold">Full Name :</p>
									<p class="text-2xl font-bold">
										{member.full_name}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Username :</p>
									<p class="text-2xl font-bold">
										{member.username}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Email :</p>
									<p class="text-2xl font-bold">
										{member.email}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Phone Number :</p>
									<p class="text-2xl font-bold">
										{member.phone_number}
									</p>
								</div>
								<div>
									<p class="text-xl font-semibold">Address :</p>
									<p class="text-base">
										{member.address}
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<div class="flex items-center justify-between space-y-2">
				<h2 class="text-3xl font-bold tracking-tight">Loan History</h2>
			</div>

			<Card.Root>
				<Card.Header />
				<Card.Content>
					<DataTable datas={member.transactions ?? []} />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>
