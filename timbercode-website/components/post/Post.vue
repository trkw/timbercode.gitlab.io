<!-- TODO CLEAN-UP, REFACTORING -->

<template>
    <article>
        <post-header
                :title="post.title"
                :image-url="post.image"
                :publication-date="publicationDate"/>
        <post-content
                :post-html-content="post.body"
                :speaker-deck-presentation-id="post.speakerDeckPresentationId"
                :youtube-video-url="post.youtubeVideoUrl"/>
        <post-comments
                v-if="DISQUS_SHORTNAME"
                :disqus-shortname="DISQUS_SHORTNAME"
                :post-unique-id="post.uniqueId"
                :post-url="post.url"/>
    </article>
</template>

<script>
  import moment from 'moment'
  import PostHeader from './PostHeader.vue'
  import PostContent from './PostContent.vue'
  import PostComments from './PostComments.vue'

  const {
    IMAGES_BASE_URL,
    DISQUS_SHORTNAME
  } = require('../../config')

  export default {
    props: {
      post: {type: Object, required: true}
    },
    components: {
      PostHeader,
      PostContent,
      PostComments
    },
    data () {
      return {
        DISQUS_SHORTNAME,
        publicationDate: moment(this.post.date, moment.ISO_8601)
      }
    },
    head () {
      return {
        title: this.post.title,
        meta: [
          {hid: 'meta_description', name: 'description', content: this.post.description},
          // Twitter
          {hid: 'meta_twitter:card', name: 'twitter:card', content: 'summary_large_image'},
          {hid: 'meta_twitter:site', name: 'twitter:site', content: '@timbercodepl'},
          {hid: 'meta_twitter:title', name: 'twitter:title', content: this.post.title},
          {hid: 'meta_twitter:image', name: 'twitter:image', content: this.post.image},
          {hid: 'meta_twitter:description', name: 'twitter:description', content: this.post.description},
          {hid: 'meta_twitter:creator', name: 'twitter:creator', content: '@nkoder'},
          // Facebook
          {hid: 'meta_og:type', name: 'og:type', content: 'article'},
          {hid: 'meta_og:title', name: 'og:title', content: this.post.title},
          {hid: 'meta_og:url', name: 'og:url', content: this.post.url},
          {hid: 'meta_og:description', name: 'og:description', content: this.post.description},
          {hid: 'meta_og:image', name: 'og:image', content: this.post.image},
          {hid: 'meta_og:site_name', name: 'og:site_name', content: 'Timbercode'},
          {hid: 'meta_article:publisher', name: 'article:publisher', content: 'https://www.facebook.com/timbercode'},
          // TODO keep timezone provided in post?
          {hid: 'meta_article:published_time', name: 'article:published_time', content: this.post.date}
        ],
        link: [
          {hid: 'link_canonical', rel: 'canonical', href: this.post.canonicalUrl}
        ],
        script: [
          {
            // TODO what changes here on other subpages?
            type: 'application/ld+json',
            innerHTML: '{' +
            '"@context": "http://schema.org", ' +
            '"@type": "BlogPosting", ' +
            // TODO w/o 'name'?
            `"headline": ${this.post.title}, ` +
            `"image": ${this.post.image}, ` +
            // TODO keep timezone provided in post?
            `"datePublished": ${this.post.date}, ` +
            `"description": ${this.post.description}, ` +
            '"publisher": {' +
            '"@type": "Organization", ' +
            '"logo": {' +
            '"@type": "ImageObject", ' +
            `"url": "${IMAGES_BASE_URL}/timbercode_sygnet_v1_512x512.png"` +
            '}' +
            '}, ' +
            // TODO canonical URL or regular one?
            `"url": "${this.post.url}"` +
            '}'
          }
        ]
      }
    }
  }
</script>
