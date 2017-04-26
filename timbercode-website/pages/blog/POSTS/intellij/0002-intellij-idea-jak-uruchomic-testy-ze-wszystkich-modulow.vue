<template>
    <Post :post="post"></Post>
</template>

<script>
  import post from './0002-intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow.md'
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
