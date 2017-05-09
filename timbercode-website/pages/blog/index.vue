<template>
    <div>
        <blog-header></blog-header>
        <posts-list :posts="posts"></posts-list>
    </div>
</template>

<script>
  import posts from '../../assets/js/posts'
  import BlogHeader from '../../components/blog/BlogHeader.vue'
  import PostsList from '../../components/blog/PostsList.vue'
  export default {
    components: {
      BlogHeader,
      PostsList
    },
    asyncData ({base}) {
      return {
        baseUrl: base,
        posts
      }
    },
    head () {
      return {
        title: process.env.TITLE,
        titleTemplate: null
      }
    }
  }
</script>
