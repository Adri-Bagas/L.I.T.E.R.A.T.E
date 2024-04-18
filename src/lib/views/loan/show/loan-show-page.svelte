<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import DataTable from './data-table.svelte';
	import StatusComponent from '$lib/components/custom/status-component.svelte';

    export let transaction: TransactionLoanReturn;


    const dateTrans =  new Date(transaction.date)
    const dateExpectedReturn = new Date(transaction.expected_return_date as string)

</script>


<div class="h-screen overflow-auto">
    <div class="flex-col md:flex pb-12">
        <div class="flex-1 space-y-4 p-8 pt-6 mb-24">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Detail Loan</h2>
            </div>
            <Card.Root>
                <Card.Header/>
                <Card.Content>
                    <div class="flex gap-x-12">
                        <div class="flex flex-grow">
                            <div class="flex flex-col flex-grow gap-y-3">
                                <div>
                                    <p class="font-semibold text-xl">
                                        Date :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {new Intl.DateTimeFormat('en-US', {dateStyle: "full"}).format(dateTrans)}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Expected Return :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {new Intl.DateTimeFormat('en-US', {dateStyle: "full"}).format(dateExpectedReturn)}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Approval :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {transaction.approval_status}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Returned :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {#if transaction.is_returned}
                                            <StatusComponent variant="link" text="RETURNED" />
                                        {:else}
                                            <StatusComponent variant="destructive" text="NOT RETURNED" />
                                        {/if}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-grow">
                            <div class="flex flex-col flex-grow gap-y-3">
                                <div>
                                    <p class="font-semibold text-xl">
                                        Loaner :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {transaction.member.full_name}
                                    </p>
                                </div>
                                <div>
                                    <p class="font-semibold text-xl">
                                        Approver :
                                    </p>
                                    <p class="font-bold text-2xl">
                                        {transaction.approver.username}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="font-semibold text-xl mt-3">
                            Details :
                        </p>
                        <p class="font-normal text-lg w-full">
                            {transaction.detail}
                        </p>
                    </div>
                </Card.Content>
            </Card.Root>

            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Loaned Books</h2>
            </div>

            <Card.Root>
                <Card.Header/>
                <Card.Content>
                    <DataTable books={transaction.books}/>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>


