<script>
    import CollectionQuestions from './CollectionQuestions.svelte';
    export var quiz;

    var questionsColl = quiz.ref.collection('questions');

    var title = quiz.data().title;

    var timeout = 1000;
    var timer = null;

    quiz.ref.onSnapshot(
        async quizSnapshot => {
            if (quizSnapshot.exists) {
                console.log('Got updated quiz!');
                title = quizSnapshot.data().title;
            } else {
                console.log('Quiz removed.')
            }
        }
    );

    async function startTimer () {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(saveQuiz,timeout);
    }

    async function saveQuiz () {
        quiz.ref.update(
            {title: title}
        );
        console.log("Quiz saved.")
    }
</script>

<div class="quiz">
    <input on:input={startTimer} bind:value={title}>
    <CollectionQuestions collection={questionsColl}/>
</div>

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