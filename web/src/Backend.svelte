<script>
    import Backend from './Backend.svelte';
    import CollectionQuiz from './CollectionQuiz.svelte';
    import {firestoreDb} from './firebase';

    const quizCol = firestoreDb.collection('quiz');
    const questionsCol = firestoreDb.collection('questions');
    
    var quizList = [];
    var newQuizTitle;

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
    <h3>Tus quiz:</h3>
    <CollectionQuiz collection={quizCol}/>
    <input placeholder="Nuevo quiz..." bind:value={newQuizTitle}>
    <button on:click="{newQuiz}">+</button>
</section>