<script>
    import NewQuestion from './NewQuestion.svelte';
    import Question from './Question.svelte';
    export var collection;

    var questionsList = [];

    collection.where('deleted', '==', false).onSnapshot(
        async  querySnapshot => {
            questionsList = [];
            querySnapshot.forEach(
                async docSnap => questionsList = [...questionsList, docSnap]
            )
            console.log('Got updated questions!');
        }
    );
</script>

<div class="questions">
    {#each questionsList as question (question.id)}
        <Question question={question}/>
    {/each}
    <NewQuestion collection={collection}/>
</div>

<style>
    div.questions {
        margin-left: 20px;
    }
</style>