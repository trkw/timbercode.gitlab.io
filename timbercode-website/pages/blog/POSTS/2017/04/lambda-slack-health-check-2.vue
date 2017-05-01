<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './lambda-slack-health-check-2.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
