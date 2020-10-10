<script>
    export var collection;
    var responsesList = [];

    collection.onSnapshot(
        async  querySnapshot => {
            responsesList = [];
            querySnapshot.forEach(
                async docSnap => {
                    var response = docSnap.data();
                    responsesList = [...responsesList, response];
                }
            )
            console.log('Got updated responses!');
        }
    );
</script>

<div class="responses">
    {#each responsesList as response}
    <div>
        <input value={response.title}>
        <input type="checkbox" checked={response.valid}>
    </div>
    {/each}
</div>

<style>
    div.responses {
        margin-left: 20px;
    }
</style>