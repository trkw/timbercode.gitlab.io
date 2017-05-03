<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <h1 class="post_list__header">
            Tag: {{ this.tag }}
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
    validate ({params}) {
      return posts.filter(post => post.tags.indexOf(params.tag) >= 0).length > 0
    },
    asyncData ({params}) {
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

<!-- TODO styling -->
