<template>
    <Post :post="post"></Post>
</template>

<script>
  import post from './dsp17-zmagania-z-designem.md'
  import Post from '~components/Post.vue'
  export default {
    asyncData () {
      return {
        post
      }
    },
    components: {Post}
  }
</script>
