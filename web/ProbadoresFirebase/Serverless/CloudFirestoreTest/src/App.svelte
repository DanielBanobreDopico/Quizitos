<script>
import {firestoreDb} from './firebase';

var text = '';
var entries = [];

firestoreDb.collection('entries').orderBy('date','desc').limit(6)
    .onSnapshot(
		querySnapshot => {
			var newEntries = [];
			querySnapshot.forEach(
				docSnap => {
					var document = docSnap.data();
					newEntries.push(document);
				}
			)
			entries = [...newEntries];
			console.log('Got updates!');
		}
	);

function add() {
	var doc = {
		text: text,
		date: Date.now(),
	}
	firestoreDb.collection('entries').add(doc);
}
</script>

<main>
	<h1>Someone was here</h1>

	<input bind:value={text} placeholder="Sign in our book...">
	<button on:click={add}>Send</button>

	<div id="book">
	{#each entries as item}
		<div class="entry">
			<img alt='random avatar' src='https://robohash.org/{item.date}.png?set=set5&size=100x100'>
			<div>
				<q>{item.text}</q>
				<p>Date: {Date(item.date)}</p>
			</div>
		</div>
	{/each}
	</div>

	<code>
		<p>Recursos:</p> 
		<ul>
			<li>https://firebase.google.com/docs/auth/web/start</li>
			<li>https://firebase.google.com/docs/web/setup#apps-de-node.js</li>
			<li>https://firebase.google.com/docs/firestore/quickstart </li>
			<li>https://fireship.io/lessons/svelte-v3-overview-firebase/</li>
		</ul>
	</code>
</main>

<style>
	#book {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
	.entry {
		display: flex;
		align-items: center;
		padding: 20px;
		max-width: 400px;
	}
	.entry > div {
		margin: 20px;
	}
	.entry > div > q {
		font-style: italic;
		font-size: xx-large;
	}
	.entry > div > p {
		font-size: xx-small;
	}
</style>