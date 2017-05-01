<template>
    <div class="wrapper">
        <iframe class="youtube_player"
                width="800"
                height="450"
                :src="videoUrl"
                frameborder="0"
                allowfullscreen>
        </iframe>
    </div>
</template>

<script>
  export default {
    props: {
      videoUrl: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
    .wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }

    .youtube_player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
