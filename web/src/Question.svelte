<script>
    import CollectionResponses from './CollectionResponses.svelte'
    export var question;

    var responsesColl = question.ref.collection('responses');

    var title;

    var timeout = 1000;
    var timer = null;

    question.ref.onSnapshot(
        async questionSnapshot => {
            console.log('Got updated question!');
            title = questionSnapshot.data().title;
        }
    );

    async function startTimer () {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(saveQuestion,timeout);
    }

    async function saveQuestion () {
        question.ref.set(
            {title: title},
            {merge: true}
        );
        console.log("Question saved.")
    }

</script>

<div class="question">
        <input on:input={startTimer} bind:value={title}/>
        <CollectionResponses collection={responsesColl}/>
</div>