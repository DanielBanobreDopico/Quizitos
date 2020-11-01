<script>
    import {firestoreDb} from "./firebase.js";

    import Error from "./Error.svelte";

    var code = "";
    var castSnap = null;
    var error = null;
    var questions = [];

    async function getQuestions () {
        /**
         * ref -> the cast document.
         * ref.parent -> the casts collection.
         * ref.parent.parent -> the quizito document.
         * ref.parent.parent.collection('questions') -> the quizito questions collection.
         */
        var questionsCollection = castSnap.ref.parent.parent.collection('questions');
        var questionsSnap = await questionsCollection.get();
        questionsSnap.forEach(
            questionSnap => {
                questions = [...questions, questionSnap];
            }
        )
    }

    async function getCast () {
        var documentsCounter = 0;
        const castsQuery = firestoreDb.collectionGroup('casts');
        const currentCastsQuery = castsQuery.where('finished', '==', false);
        const theCodeCastQuery = currentCastsQuery.where('publicCode', '==', code);
        var theCodeDocumentsSnaps = await theCodeCastQuery.get();
        theCodeDocumentsSnaps.forEach(
            docSnap => {
                documentsCounter++;
                castSnap = docSnap
            }
        );
        console.log(`Found ${documentsCounter} quizitos for ${code} code`);
        switch (documentsCounter) {
            case 0:
                error = "No se encontrón ningún quizito activo con ese código.";
                break;
            case 1:
                error = null;
                getQuestions();
                break;
            default:
                error = "Uf... ha pasado algo realmente raro. El universo confabula en tu contra.";
        }
    }
</script>

<div>
    <h2>Play quizito</h2>
    {#if !castSnap}
    <input type="text" bind:value={code} placeholder='Inserta el código del quizzito'>
    <button on:click={getCast}>Join game</button>
    <Error error={error}/>
    {:else}
    Playing...
    {/if}
</div>