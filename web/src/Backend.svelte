<script>
    import {firestoreDb} from './firebase';
    import CollectionQuiz from './CollectionQuiz.svelte';
    const quizCol = firestoreDb.collection('quiz');
</script>

<section>
    <h1>Panel de control</h1>
    <h3>Tus quiz:</h3>
    <CollectionQuiz collection={quizCol}/>
</section>