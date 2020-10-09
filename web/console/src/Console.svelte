<script>
	import Session from './Session.svelte';
	import Backend from './Backend.svelte';

	var session;

</script>

<section>
	<Session bind:session={session}/>
	{#if session}
	<Backend/>
	{:else}
	<p>Necesitas iniciar sesión para acceder al panel de control.</p>
	{/if}
</section>