<script>
    import Quiz from './Quiz.svelte';

    export var collection;

    var quizList = [];

    collection.orderBy('date','desc')
        .onSnapshot(
            async quizSnapshot => {
                quizList = [];
                quizSnapshot.forEach(
                    quizSnap => quizList = [...quizList, quizSnap]
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
    <Quiz quiz={quiz}/>
    {/each}
    {/if}
</section>

<style></style>