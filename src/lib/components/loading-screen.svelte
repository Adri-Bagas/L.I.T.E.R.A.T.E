<script lang="ts">

    let loadingClass = "fixed z-50 flex h-screen w-screen items-center justify-center bg-primary-foreground bg-opacity-50"

</script>

<div class={loadingClass}>
	<div class="loader"></div>
</div>

<style>
	/* HTML: <div class="loader"></div> */
	.loader {
		width: 150px;
		aspect-ratio: 1;
		display: grid;
	}
	.loader:before,
	.loader:after {
		content: '';
		grid-area: 1/1;
		width: 70px;
		aspect-ratio: 1;
		box-shadow: 0 0 0 3px #fff inset;
		filter: drop-shadow(80px 80px 0 #fff);
		animation: l8 2s infinite alternate;
	}
	.loader:after {
		margin: 0 0 0 auto;
		filter: drop-shadow(-80px 80px 0 #fff);
		animation-delay: -1s;
	}
	@keyframes l8 {
		0%,
		10% {
			border-radius: 0;
		}
		30%,
		40% {
			border-radius: 50% 0;
		}
		60%,
		70% {
			border-radius: 50%;
		}
		90%,
		100% {
			border-radius: 0 50%;
		}
	}

</style>
