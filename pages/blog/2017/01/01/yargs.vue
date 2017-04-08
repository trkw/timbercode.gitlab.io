<template>
    <Post :post="post"></Post>
</template>

<script>
  import post from './yargs.md'
  import Post from '~components/Post.vue'
  export default {
    data () {
      return {
        post
      }
    },
    components: {Post}
  }
</script>
