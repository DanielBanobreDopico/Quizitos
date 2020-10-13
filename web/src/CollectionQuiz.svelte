<script>
    import Quiz from './Quiz.svelte';

    export var collection;

    var quizzesList = [];
    var newQuizTitle;

    collection.orderBy('date','desc')
        .onSnapshot(
            async quizzesSnapshot => {
                quizzesList = [];
                quizzesSnapshot.forEach(
                    quizSnap => quizzesList = [...quizzesList, quizSnap]
                )
                console.log('Got updated quizzes!');
            }
        );

    /*function newQuiz() {
        var quizDoc = {
            title: newQuizTitle,
            date: Date.now(),
        }
        collection.add(quizDoc);
        newQuizTitle = '';
		console.log('Quiz added.');
	}*/
</script>

<section id="quizzes">
    {#if quizzesList.length === 0}
    <p>Empieza creando tu primer Quizito!</p>
    {:else}
    {#each quizzesList as quiz}
    <Quiz quiz={quiz}/>
    {/each}
    {/if}
    <!--input placeholder="Nuevo quiz..." bind:value={newQuizTitle}>
    <button on:click="{newQuiz}">+</button-->
</section>

<style></style>