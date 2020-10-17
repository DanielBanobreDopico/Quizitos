<script>
    export var collection;
    var newQuestionTitle = '';
    async function newQuestion () {
        var questionDoc = {
            title: newQuestionTitle,
            deleted: false,
        }
        var doc = await collection.add(questionDoc);
        doc.collection('responses').add({title: null, valid: false});
        doc.collection('responses').add({title: null, valid: false});
        doc.collection('responses').add({title: null, valid: false});
        doc.collection('responses').add({title: null, valid: false});
        newQuestionTitle = '';
    }
</script>

<div>
    <input type="text" bind:value={newQuestionTitle} placeholder="Nueva pregunta...">
    <button on:click={newQuestion}>+</button>
</div>