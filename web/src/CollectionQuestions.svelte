<script>
    import Question from './Question.svelte';
    export var collection;

    var questionsList = [];

    collection.onSnapshot(
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
    {#each questionsList as question}
        <Question question={question}/>
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