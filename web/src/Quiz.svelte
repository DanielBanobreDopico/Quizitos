<script>
    import CollectionQuestions from './CollectionQuestions.svelte';
    export var quiz;
    var questionsColl = quiz.ref.collection('questions');
</script>

<div class="quizes">
    <input value={quiz.data().title}>
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