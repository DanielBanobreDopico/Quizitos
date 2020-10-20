<script>
    import CollectionQuestions from './CollectionQuestions.svelte';
    import QuizCast from './QuizCast.svelte';

    export var quiz;

    var questionsColl = quiz.ref.collection('questions');
    var castsColl = quiz.ref.collection('casts');

    var title = quiz.data().title;
    var cast = null;

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

    async function deleteQuiz () {
        quiz.ref.update(
            {deleted: true}
        );
        console.log("Quiz deleted (not really).");
    }

    async function hashSHA1 (string) {
        const encoder = new TextEncoder();
        const data = encoder.encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function startQuizCasting () {
        const date = Date.now();
        const hash = await hashSHA1(date);
        const hashSlice = hash.slice(0,5);
        const code = hashSlice.toLowerCase();
        const castDoc = {
            date: date,
            publicCode: code,
            currentQuestion: 0,
            running: true,
        }
        var castRef = await castsColl.add(castDoc);
        cast = await castRef.get();
        console.log(`Casting quiz ${title}. Code:${code}`);
    }
</script>

<div class="quiz">
    {#if cast}
    <QuizCast quizSnap={quiz} bind:castSnap={cast}/>
    {:else}
    <input on:input={startTimer} bind:value={title}>
    <button on:click={deleteQuiz}>x</button>
    <button on:click={startQuizCasting}>&gt;</button>
    <CollectionQuestions collection={questionsColl}/>
    {/if}
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