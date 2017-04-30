<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './bezpieczny-frontend-0.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
