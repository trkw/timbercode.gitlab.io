<template>
    <Post :post="post"></Post>
</template>

<script>
  import post from './0001-yargs.md'
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
