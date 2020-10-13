<script>
    import NewQuiz from './NewQuiz.svelte';
    import Quiz from './Quiz.svelte';

    export var collection;

    var quizzesList = [];
    var newQuizTitle;

    collection.orderBy('date','desc')
        .onSnapshot(
            async quizzesSnapshot => {
                quizzesList = [];
                quizzesSnapshot.forEach(
                    // Algo va mal en la actualización del contenido de la colección de quizzitos
                    // dependiendo del orden natural de los quizzes, el orden en el que solicitan 
                    // y el orden en el que se incorporan al array
                    async quizSnap => quizzesList = [quizSnap, ...quizzesList]
                )
                console.log('Got updated quizzes!');
            }
        );
</script>

<section id="quizzes">
    {#if quizzesList.length === 0}
    <p>Empieza creando tu primer Quizito!</p>
    {:else}
    {#each quizzesList as quiz}
    <Quiz quiz={quiz}/>
    {/each}
    {/if}
    <NewQuiz collection={collection}/>
</section>

<style></style>