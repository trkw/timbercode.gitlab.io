<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './to-nie-wiedza-ma-znaczenie.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
