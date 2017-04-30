<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './daj-sie-poznac-2017.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
