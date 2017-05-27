<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <category-header :category="category"></category-header>
        <posts-list :posts="posts"></posts-list>
    </div>
</template>

<script>
  import posts from '../../../../assets/js/posts'
  import CategoryHeader from '../../../../components/blog/CategoryHeader.vue'
  import PostsList from '../../../../components/blog/PostsList.vue'
  export default {
    validate ({params}) {
      return posts.filter(post => post.category === params.category).length > 0
    },
    components: {
      CategoryHeader,
      PostsList
    },
    asyncData ({params}) {
      return {
        category: params.category,
        posts: posts.filter(post => post.category === params.category)
      }
    },
    head () {
      return {
        title: `Kategoria: ${this.category}`
      }
    }
  }

</script>
