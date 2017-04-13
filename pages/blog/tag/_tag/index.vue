<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <h1>
            tag: {{ this.tag }}
        </h1>
        <ul>
            <li v-for="post in posts">
                <nuxt-link :to="post.route"> {{post.title}} </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  const posts = require('~assets/js/posts')

  export default {
    validate ({params}) {
      return posts.filter(post => post.tags.indexOf(params.tag) >= 0).length > 0
    },
    data ({params}) {
      return {
        tag: params.tag,
        posts: posts.filter(post => post.tags.indexOf(params.tag) >= 0)
      }
    },
    head () {
      return {
        title: this.tag
      }
    }
  }
</script>
