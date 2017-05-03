<!-- ESLint/Standard for Vue Single-File Components -->

<template>
    <div>
        <h1 class="post_list_category__header">
            Kategoria: {{ this.category }}
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
      return posts.filter(post => post.category === params.category).length > 0
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

<!-- TODO styling -->
