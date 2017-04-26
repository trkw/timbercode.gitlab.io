<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <h1>
            Timbercode
        </h1>
        <ul>
            <li>
                <nuxt-link to="/about"> About </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/config"> Config </nuxt-link>
            </li>
            <li>
                <a :href="this.baseUrl + 'blog/feed.xml'"> main feed </a>
            </li>
            <li>
                <nuxt-link to="/blog/test"> test bezpośrednio </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/blog/tag/jvm-bloggers"> tag: jvm-bloggers </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/blog/tag/inny"> tag, którego nie ma </nuxt-link>
            </li>
            <li>
                <a :href="this.baseUrl + 'version'"> {{this.versionLabel}} </a>
            </li>
            <hr/>
            <li v-for="post in posts">
                <nuxt-link :to="post.route"> {{post.title}} </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  const posts = require('~assets/js/posts')

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
