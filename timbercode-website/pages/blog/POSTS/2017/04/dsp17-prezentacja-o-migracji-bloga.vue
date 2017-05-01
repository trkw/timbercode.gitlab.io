<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './dsp17-prezentacja-o-migracji-bloga.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
