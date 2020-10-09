<script>
    import {firebaseAuth, googleAuthProvider} from './firebase';
    import {firestoreDb} from './firebase';

    const questsCol = firestoreDb.collection('quests');
    const questionsCol = firestoreDb.collection('questions');
    
	var user;
	var questsList = [];

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

	function logout () {
		firebaseAuth.signOut()
			.then(
				console.log('User leave.')
			)
			.catch(
				err=>console.error(err)
			);
	}

	firestoreDb.collection('quests').orderBy('date','desc')
 	   .onSnapshot(
			querySnapshot => {
				var updatedQuests = [];
				querySnapshot.forEach(
					docSnap => {
						var quest = docSnap.data();
						updatedQuests.push(quest);
					}
				)
				questsList = [...updatedQuests];
				console.log('Got updated quests!');
			}
		);

	function addQuest(questObject) {
		questsCol.add(questObject);
		console.log('Quest added.');
	}


</script>

<section>
	<h1>Hello!</h1>
	{#if user}
	<h2>Hola {user.displayName}</h2>
	<img alt="User avatar" src={user.photoURL}>
	<button on:click={logout}>Logout</button>
	{:else}
	<h2>Login</h2>
	<button on:click={loginWithPopup}>Login with Google (popup)</button>
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
</section>