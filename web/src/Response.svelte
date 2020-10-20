<script>
    export var response;

    var title, valid;

    var timeout = 1000;
    var timer = null;

    response.ref.onSnapshot(
        async responseSnapshot => {
            if (responseSnapshot.exists) {
                console.log('Got updated response!');
                title = responseSnapshot.data().title;
                valid = responseSnapshot.data().valid;
            } else {
                console.log('Response removed.')
            }
        }
    );

    async function startTimer () {
        if ( timer ) clearTimeout(timer);
        timer = setTimeout(saveResponse,timeout);
    }

    async function saveResponse () {
        var responseDoc = {
            title: title,
            valid: valid,
        };
        await response.ref.update(responseDoc);
        console.log("Question saved.")
    }

</script>

<div class="responses">
    <input on:input={startTimer} bind:value={title}>
    <input on:click={startTimer} type="checkbox" bind:checked={valid}>
</div>