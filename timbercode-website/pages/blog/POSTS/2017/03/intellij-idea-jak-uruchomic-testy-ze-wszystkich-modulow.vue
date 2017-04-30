<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './intellij-idea-jak-uruchomic-testy-ze-wszystkich-modulow.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
