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
  import moment from 'moment'
  const posts = require('~assets/js/posts')

  export default {
    validate ({params}) {
      return published(posts.filter(post => post.tags.indexOf(params.tag) >= 0)).length > 0
    },
    asyncData ({params}) {
      return {
        tag: params.tag,
        posts: published(posts.filter(post => post.tags.indexOf(params.tag) >= 0))
      }
    },
    head () {
      return {
        title: this.tag
      }
    },
    methods: {
      published: published
    }
  }

  function published (posts) {
    const timeNow = moment()
    return posts.filter(post => moment(post.date, moment.ISO_8601).isSameOrBefore(timeNow))
  }

</script>
