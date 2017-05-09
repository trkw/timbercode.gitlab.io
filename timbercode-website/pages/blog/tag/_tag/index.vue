<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <tag-header :tag="tag"></tag-header>
        <posts-list :posts="posts"></posts-list>
    </div>
</template>

<script>
  import posts from '../../../../assets/js/posts'
  import TagHeader from '../../../../components/blog/TagHeader.vue'
  import PostsList from '../../../../components/blog/PostsList.vue'
  export default {
    validate ({params}) {
      return posts.filter(post => post.tags.indexOf(params.tag) >= 0).length > 0
    },
    components: {
      TagHeader,
      PostsList
    },
    asyncData ({params}) {
      return {
        tag: params.tag,
        posts: posts.filter(post => post.tags.indexOf(params.tag) >= 0)
      }
    },
    head () {
      return {
        title: `Tag: ${this.tag}`
      }
    }
  }

</script>
