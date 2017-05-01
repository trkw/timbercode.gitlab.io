<template>
    <div>
        <h1 class="post_list__header">
            Timbercode <sup>2</sup>
        </h1>
        <ul class="post_list__list">
            <li v-for="post in published(posts)" class="post_list__post">
                <nuxt-link :to="post.route">
                    {{post.title}}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import moment from 'moment'
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
    },
    methods: {
      published (posts) {
        const timeNow = moment()
        return posts.filter(post => moment(post.date, moment.ISO_8601).isSameOrBefore(timeNow))
      }
    }
  }
</script>
