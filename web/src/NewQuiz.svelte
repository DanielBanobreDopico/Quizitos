<script>
    export var collection;
    var newQuizTitle = '';
    function newQuiz() {
        var quizDoc = {
            title: newQuizTitle,
            date: Date.now(),
            deleted: false,
        }
        collection.add(quizDoc);
        newQuizTitle = '';
		console.log('Quiz added.');
	}
</script>

<div>
    <input placeholder="Nuevo quiz..." bind:value={newQuizTitle}>
    <button on:click="{newQuiz}">+</button>
</div>