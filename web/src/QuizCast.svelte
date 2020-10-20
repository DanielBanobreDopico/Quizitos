<script>
    import PayersList from './PlayersList.svelte'
    export var quizSnap;
    export var castSnap;

    const quiz = quizSnap.data();
    const cast = castSnap.data();

    var awaiting = true;
</script>

<div id="quizCast">
    <h1>{quiz.title}</h1>
    {#if awaiting}
    <p>Code:</p>
    <h2>{cast.publicCode}</h2>
    <button on:click={()=>{awaiting = false}}>Start</button>
    <PayersList/>
    {:else}
    <h2>Question...</h2>
    {/if}
</div>

<style>
    div#quizCast {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        background-color: white;
        text-align: center;
    }
</style>