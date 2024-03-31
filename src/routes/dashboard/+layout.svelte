<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable";
	import { ModeSwitch } from '$lib/components/custom/switch/index';
	import { UserNav, Sidebar } from '$lib/components/custom/main/index';
    import { SidebarSize } from "$lib/scripts/stores/sidebar-size";

    export let data

</script>

<Resizable.PaneGroup direction="horizontal" >
    <Resizable.Pane defaultSize={15} maxSize={25} minSize={6.5} onResize={(size, prev) => {SidebarSize.set(size);}}>
        <div class="h-screen overflow-auto">
            <Sidebar />
        </div>
    </Resizable.Pane>
    <Resizable.Handle />
    <Resizable.Pane defaultSize={85}>
        <Resizable.PaneGroup direction="vertical">
            <Resizable.Pane defaultSize={10}>
                <div class="hidden flex-col md:flex">
                    <div class="border-b">
                        <div class="flex h-16 items-center px-4">
                            <div class="ml-auto flex items-center space-x-4">
                                <UserNav user={data.user}/>
                                <ModeSwitch />
                            </div>
                        </div>
                    </div>
                </div>
            </Resizable.Pane>
            <Resizable.Pane>
                <slot />
            </Resizable.Pane>
        </Resizable.PaneGroup>
    </Resizable.Pane>
</Resizable.PaneGroup>