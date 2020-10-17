<script>
    import CollectionResponses from './CollectionResponses.svelte'
    export var question;

    var responsesColl = question.ref.collection('responses');

    var title;

    var timeout = 1000;
    var timer = null;

    question.ref.onSnapshot(
        async questionSnapshot => {
            if (questionSnapshot.exists) {
                console.log('Got updated question!');
                title = questionSnapshot.data().title;
            } else {
                console.log('Question removed.')
            }
        }
    );

    async function startTimer () {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(saveQuestion,timeout);
    }

    async function saveQuestion () {
        question.ref.update(
            {title: title}
        );
        console.log("Question saved.")
    }

    async function deleteQuestion () {
        question.ref.update(
            {deleted: true}
        );
        console.log("Question deleted (not really).");
    }
</script>

<div class="question">
        <input on:input={startTimer} bind:value={title}/>
        <button on:click={deleteQuestion}>x</button>
        <CollectionResponses collection={responsesColl}/>
</div>