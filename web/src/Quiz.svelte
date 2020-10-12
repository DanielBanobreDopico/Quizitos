<script>
    import CollectionQuestions from './CollectionQuestions.svelte';
    export var quiz;
    var title = quiz.data().title;
    var questionsColl = quiz.ref.collection('questions');
    var timer = null;
    async function startTimer () {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(saveQuiz,1000);
    }
    async function saveQuiz () {
        console.log("Aquí se guardaría...")
        quiz.ref.set(
            {title: title},
            {merge: true}
        );
    }
</script>

<div class="quizes">
    <input on:input={startTimer} bind:value={title}>
    <CollectionQuestions collection={questionsColl}/>
</div>

<style>
    div.quizes {
        margin: 10px;
        border-style: solid;
        border-radius: 10px;
    }
    div.quizes > input {
        font-weight: bolder;
    }
</style>