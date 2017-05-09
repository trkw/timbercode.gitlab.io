<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '../../../../components/post/Post.vue'
  import post from './lorem.md'
  export default {
    layout: 'post',
    components: {Post},
    asyncData () {
      return {post}
    }
  }
</script>
