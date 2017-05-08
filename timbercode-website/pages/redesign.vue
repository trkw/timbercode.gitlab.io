<template>
    <article>
        <h1 class="post_list__header">
            Timbercode
        </h1>
        <ul class="post_list__list">
            <li v-for="post in posts" class="post_list__post">
                <nuxt-link :to="post.route">
                    {{post.title}}
                </nuxt-link>
            </li>
        </ul>
    </article>
</template>

<script>
  import posts from '~assets/js/posts'
  export default {
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
