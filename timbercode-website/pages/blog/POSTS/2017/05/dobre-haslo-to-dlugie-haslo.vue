<template>
    <post :post="post"></post>
</template>

<script>
  import Post from '~components/Post.vue'
  import post from './dobre-haslo-to-dlugie-haslo.md'
  export default {
    asyncData () {
      return {post}
    },
    components: {Post}
  }
</script>
