<script>
    import Response from './Response.svelte'
    export var collection;
    var responsesList = [];

    collection.onSnapshot(
        responsesSnapshot => {
            responsesList = [];
            responsesSnapshot.forEach(
                responseSnap => responsesList = [...responsesList, responseSnap]
            )
            console.log('Got updated responses!');
        }
    );
</script>

<div class="responses">
    {#each responsesList as response (response.id)}
    <Response response={response}/>
    {/each}
</div>

<style>
    div.responses {
        margin-left: 20px;
    }
</style>