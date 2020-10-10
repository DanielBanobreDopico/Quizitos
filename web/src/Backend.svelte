<script>
	import Backend from './Backend.svelte';
    import {firestoreDb} from './firebase';

    const quizCol = firestoreDb.collection('quiz');
    const questionsCol = firestoreDb.collection('questions');
    
    var quizList = [];
    var newQuizTitle;

    quizCol.orderBy('date','desc')
        .onSnapshot(
			async querySnapshot => {
                quizList = [];
                querySnapshot.forEach(
                    async docSnap => {
                        var quest = docSnap.data();
                        quest.questions = [];
                        var questionsCollSnap = await quizCol.doc(docSnap.id).collection('questions').get();
                        questionsCollSnap.forEach(
                            async questionSnap => {
                                quest.questions = [...quest.questions, questionSnap.data()];
                            }
                        )
                        quizList = [...quizList, quest];
                    }
                )
				console.log('Got updated quizs!');
			}
		);

	function newQuiz() {
        var quizDoc = {
            title: newQuizTitle,
            date: Date.now(),
        }
        quizCol.add(quizDoc);
        newQuizTitle = '';
		console.log('Quiz added.');
	}
</script>

<section>
    <h1>Panel de control</h1>
    <section>
        <h3>Tus quiz:</h3>
        {#if quizList.length === 0}
        <p>Empieza creando tu primer quiz!</p>
        {:else}
        {#each quizList as quiz}
        <div class="quizDiv">
            <input value={quiz.title}>
            <div class="questions">
                {#each quiz.questions as question}
                    <p>{question.title}</p>
                {/each}
            </div>
        </div>
        {/each}
        {/if}
        <input placeholder="Nuevo quiz..." bind:value={newQuizTitle}>
        <button on:click="{newQuiz}">+</button>
    </section>
</section>