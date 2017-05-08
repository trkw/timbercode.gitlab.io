<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './lorem.md'
  export default {
    components: {
      Post
    },
    asyncData () {
      return {
        post
      }
    }
  }
</script>
