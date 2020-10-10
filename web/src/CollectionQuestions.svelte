<script>
    import CollectionResponses from './CollectionResponses.svelte'
    export var collection;
    var questionsList = [];

    collection.onSnapshot(
        async  querySnapshot => {
            questionsList = [];
            querySnapshot.forEach(
                async docSnap => {
                    var question = docSnap.data();
                    question.responsesColl = collection.doc(docSnap.id).collection('responses');
                    questionsList = [...questionsList, question];
                }
            )
            console.log('Got updated questions!');
        }
    );
</script>

<div class="questions">
    {#each questionsList as question}
        <input value={question.title}/>
        <CollectionResponses collection={question.responsesColl}/>
    {/each}
</div>

<style>
    div.questions {
        margin-left: 20px;
    }
    div.questions > input {
        display: block;
    }
</style>