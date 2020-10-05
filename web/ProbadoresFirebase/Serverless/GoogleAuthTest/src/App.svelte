<script>
import {firebaseAuth, googleAuthProvider} from './firebase';
var user;

firebaseAuth.onAuthStateChanged(function(usr) {
	if (usr) {
		user = usr;
	} else {
		user = null;
	}
});

function loginWithPopup () {
	firebaseAuth.signInWithPopup(googleAuthProvider)
		.then(
			result=>{
				var token = result.credential.accessToken;
				user = result.user;
				console.log('User arrives:', user)
			}
		)
		.catch(
			err=>console.error(err)
		);
}

function loginWithRedirect () {
	firebaseAuth.signInWithRedirect(googleAuthProvider).then(
			result=>{
				var token = result.credential.accessToken;
				user = result.user;
				console.log('User arrives:', user)
			}
		)
		.catch(
			err=>console.error(err)
		);
}

function logout () {
	firebaseAuth.signOut()
		.then(
			console.log('User leave.')
		)
		.catch(
			err=>console.error(err)
		);
}

</script>

<main>
	<h1>Hello!</h1>
	{#if user}
	<h2>Hola {user.displayName}</h2>
	<img alt="User picture" src={user.photoURL}>
	<button on:click={logout}>Logout</button>
	{:else}
	<h2>Login</h2>
	<button on:click={loginWithPopup}>Login with Google (popup)</button>
	<button on:click={loginWithRedirect}>Login with Google (redirect)</button>
	{/if}
	<code>
		<p>Recursos:</p> 
		<ul>
			<li>https://firebase.google.com/docs/auth/web/start</li>
			<li>https://firebase.google.com/docs/web/setup#apps-de-node.js</li>
			<li>https://firebase.google.com/docs/auth/web/google-signin</li>
			<li>https://fireship.io/lessons/svelte-v3-overview-firebase/</li>
		</ul>
	</code>
</main>

<style>
</style>