<template>
    <div>
        <h1>{{ post.title }}</h1>
        <img :src="post.image"/>
        <div v-html="htmlContent"></div>
    </div>
</template>

<script>
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
    }
  }
</script>
