<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '../../../../../components/post/Post.vue'
  import post from './bezpieczny-frontend-0.md'
  export default {
    layout: 'post',
    components: {Post},
    asyncData () {
      return {post}
    }
  }
</script>
