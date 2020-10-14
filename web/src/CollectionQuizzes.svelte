<script>
    import NewQuiz from './NewQuiz.svelte';
    import Quiz from './Quiz.svelte';

    export var collection;

    var quizzesList = [];
    var newQuizTitle;

    collection.where('deleted', '==', false).orderBy('date','desc')
        .onSnapshot(
            async quizzesSnapshot => {
                quizzesList = [];
                quizzesSnapshot.forEach(
                    async quizSnap => quizzesList = [...quizzesList, quizSnap]
                )
                console.log('Got updated quizzes!');
            }
        );
</script>

<section id="quizzes">
    {#if quizzesList.length === 0}
    <p>Empieza creando tu primer Quizito!</p>
    {:else}
    {#each quizzesList as quiz (quiz.id)}
    <Quiz quiz={quiz}/>
    {/each}
    {/if}
    <NewQuiz collection={collection}/>
</section>

<style></style>