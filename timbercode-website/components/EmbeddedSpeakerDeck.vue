<template>
    <div>
        <script async
                class="speakerdeck-embed"
                v-bind:data-id="presentationId"
                data-ratio="1.77777777777778"
                src="//speakerdeck.com/assets/embed.js"/>
    </div>
</template>

<script>
  export default {
    props: {
      presentationId: {
        type: String,
        required: true
      }
    }
  }
</script>
