<script>
	import Index from './Index.svelte';
	import Console from './Console.svelte';
	import Play from './Play.svelte';
	const routes = {
		'main': Index,
		'console': Console,
		'play': Play,
	}
	var section = 'main';
	function setSection(sectionStr) {
		console.log("Section:", sectionStr)
		section = sectionStr;
	}
</script>

<main>
	<header>
		<h1>Bienvenido a Quizitos</h1>
		<nav>
			<a href="#" on:click={()=>setSection('main')}>Inicio</a>
			<a href="#" on:click={()=>setSection('console')}>Console</a>
			<a href="#" on:click={()=>setSection('play')}>Play!</a>
		</nav>
	</header>
	<svelte:component this={routes[section]}/>
</main>
	
<style>
</style>