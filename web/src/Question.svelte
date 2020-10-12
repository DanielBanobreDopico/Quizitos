<script>
    import CollectionResponses from './CollectionResponses.svelte'
    export var question;
    var responsesColl = question.ref.collection('responses');
</script>

<div class="questions">
        <input value={question.data().title}/>
        <CollectionResponses collection={responsesColl}/>
</div>