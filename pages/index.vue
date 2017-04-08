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
                <nuxt-link to="/blog/2017/01/01/test"> test bezpośrednio </nuxt-link>
            </li>
            <li>
                <a :href="this.baseUrl + 'version'"> {{this.versionLabel}} </a>
            </li>
            <li v-for="post in posts">
                <nuxt-link :to="post.route"> {{post.title}} </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  const requireFromDir = require.context('./blog', true, /\.md$/)
  const posts = requireFromDir.keys().map(path => {
    const post = requireFromDir(`${path}`)
    return {
      path: '/blog/' + path.substring(0, path.length - 3),
      title: post.title,
      route: post.route
    }
  })

  export default {
    data (context) {
      return {
        versionLabel: 'Version',
        baseUrl: context.base,
        posts
      }
    }
  }
</script>