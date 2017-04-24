<template>
    <div>
        <h1>{{ post.title }}</h1>
        <h2>ID : {{ post.uniqueId }}</h2>
        <h2>URL : {{ post.canonicalUrl }}</h2>
        <pre>{{post}}</pre>
        <img :src="post.image"/>
        <div v-html="htmlContent"></div>
        <div class="comments">
            <vue-disqus shortname="timbercode" :identifier="post.uniqueId" :url="post.canonicalUrl"></vue-disqus>
        </div>
    </div>
</template>

<script>
  const VueDisqus = require('vue-disqus/VueDisqus.vue')
  export default {
    props: ['post'],
    data () {
      return {
        htmlContent: this.post.body
      }
    },
    head () {
      return {
        title: this.post.title,
        meta: [
          {hid: 'description', name: 'description', content: this.post.description},
          {hid: 'description', name: 'description', content: 'Blog Timbercode.pl'},
          {hid: 'twitter:title', name: 'twitter:title', content: this.post.title},
          {hid: 'twitter:image', name: 'twitter:image', content: this.post.image},
          {hid: 'twitter:description', name: 'twitter:description', content: this.post.description}
        ]
      }
    },
    components: {
      VueDisqus
    }
  }
</script>
