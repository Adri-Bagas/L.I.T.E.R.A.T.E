<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
	import * as Avatar from "$lib/components/ui/avatar/index";
	import { Button } from "$lib/components/ui/button/index";

	export let user: UserSafe;
	
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/avatars/01.png" alt="@shadcn" />
				<Avatar.Fallback>SC</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{user.username}</p>
				<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				Profile
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Settings
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>