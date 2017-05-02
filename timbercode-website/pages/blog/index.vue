<template>
    <div>
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
    </div>
</template>

<script>
  import posts from '~assets/js/posts'
  export default {
    asyncData ({base}) {
      return {
        versionLabel: 'Version',
        baseUrl: base,
        posts
      }
    },
    head () {
      return {
        title: 'Timbercode',
        titleTemplate: null
      }
    }
  }
</script>
