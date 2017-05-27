<template>
    <div class="playerWrapper">
        <iframe class="player"
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
      videoUrl: {type: String, required: true}
    }
  }
</script>

<style scoped lang="less">
    .playerWrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }

    .player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
