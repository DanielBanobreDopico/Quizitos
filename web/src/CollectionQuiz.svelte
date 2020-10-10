<script>
    import CollectionQuestions from './CollectionQuestions.svelte';

    export var collection;

    var quizList = [];

    collection.orderBy('date','desc')
        .onSnapshot(
            async querySnapshot => {
                quizList = [];
                querySnapshot.forEach(
                    async docSnap => {
                        var quest = docSnap.data();
                        quest.questionsColl = collection.doc(docSnap.id).collection('questions');
                        quizList = [...quizList, quest];
                    }
                )
                console.log('Got updated quizs!');
            }
        );
</script>

<section>
    {#if quizList.length === 0}
    <p>Empieza creando tu primer quiz!</p>
    {:else}
    {#each quizList as quiz}
    <div class="quiz">
        <input value={quiz.title}>
        <CollectionQuestions collection={quiz.questionsColl}/>
    </div>
    {/each}
    {/if}
</section>

<style>
    div.quiz {
        margin: 10px;
        border-style: solid;
        border-radius: 10px;
    }
    div.quiz > input {
        font-weight: bolder;
    }
</style>