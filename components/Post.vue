<template>
    <div>
        <h1>{{ post.title }}</h1>
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
          {hid: 'description', name: 'description', content: this.post.description}
        ]
      }
    }
  }
</script>
