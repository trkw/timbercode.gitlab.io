<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './gitignore-2-sztuczki.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
