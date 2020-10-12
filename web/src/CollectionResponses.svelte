<script>
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
    {#each responsesList as response}
    <div>
        <input value={response.data().title}>
        <input type="checkbox" checked={response.valid}>
    </div>
    {/each}
</div>

<style>
    div.responses {
        margin-left: 20px;
    }
</style>