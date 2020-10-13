<script>
    import {firebaseAuth, googleAuthProvider} from './firebase';
    
    export var session = false;
    var user;

	firebaseAuth.onAuthStateChanged(function(usr) {
		if (usr) {
            session = true;
            user = usr;
		} else {
            session = false;
            user = null;
		}
	});
	
	function loginWithPopup () {
		firebaseAuth.signInWithPopup(googleAuthProvider)
			.then(
				result=>{
					var token = result.credential.accessToken;
					user = result.user;
					console.log('User arrives.')
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

<section>
	{#if session}
	<img alt="User avatar" src={user.photoURL}>
	<button on:click={logout}>Logout</button>
	{:else}
	<button on:click={loginWithPopup}>Login with Google</button>
	{/if}
</section>

<style>
    img {
        height: 3em;
        vertical-align: middle;
        border-radius: 50%;
    }
    section {
        position: fixed;
        top: 0px;
        right: 0px;
    }
</style>