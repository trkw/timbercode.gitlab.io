<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '../../../../../components/post/Post.vue'
  import post from './dsp17-redesign-na-czysto.md'
  export default {
    layout: 'post',
    components: {Post},
    asyncData () {
      return {post}
    }
  }
</script>
