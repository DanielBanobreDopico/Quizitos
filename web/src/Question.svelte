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

</script>

<div class="question">
        <input on:input={startTimer} bind:value={title}/>
        <CollectionResponses collection={responsesColl}/>
</div>