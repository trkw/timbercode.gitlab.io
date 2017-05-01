<template>
    <div>
        <header>
            <nuxt-link to="/" class="navigation__back_home"></nuxt-link>
        </header>
        <section class="post__header">
            <h1 class="post__header__title">{{ post.title }}</h1>
            <p class="post__header__date">{{ publicationDate() }}</p>
            <img class="post__header__cover" :src="post.image"/>
        </section>
        <section class="post__content">
            <div v-html="htmlContent"></div>
            <embedded-speaker-deck v-if="post.speakerDeckPresentationId"
                                   :presentation-id="post.speakerDeckPresentationId"/>
        </section>
        <section class="post__comments">
            <!-- TODO Pull Request to disable warning: missing required attribute, which is nor required -->
            <vue-disqus v-if="isProduction"
                        :shortname="DISQUS_SHORTNAME"
                        :identifier="post.uniqueId"
                        :url="post.url"/>
        </section>
    </div>
</template>

<script>
  import moment from 'moment'
  import VueDisqus from 'vue-disqus/VueDisqus.vue'
  import EmbeddedSpeakerDeck from '~components/EmbeddedSpeakerDeck.vue'

  const {
    BASE_URL,
    IMAGES_BASE_URL,
    DISQUS_SHORTNAME,
    isProduction
  } = require('../../timbercode-website/config')

  const monthNumbersToText = {
    0: 'stycznia',
    1: 'lutego',
    2: 'marca',
    3: 'kwietnia',
    4: 'maja',
    5: 'czerwca',
    6: 'lipca',
    7: 'sierpnia',
    8: 'września',
    9: 'października',
    10: 'listopada',
    11: 'grudnia'
  }

  export default {
    props: {
      post: Object
    },
    data () {
      return {
        htmlContent: this.post.body,
        baseUrl: BASE_URL,
        DISQUS_SHORTNAME,
        isProduction
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
    },
    components: {
      VueDisqus,
      EmbeddedSpeakerDeck
    },
    methods: {
      // TODO what about local time vs time of publication in given timezone?
      publicationDate () {
        const date = moment(this.post.date, moment.ISO_8601)
        const monthNumber = date.month()
        const month = monthNumbersToText[monthNumber]
        if (!month) throw Error(`'${monthNumber}' is not a valid month number`)
        return `${date.date()} ${month} ${date.year()}`
      }
    }
  }
</script>

<!-- TODO `scoped` style wasn't working properly for selectors chain, eg. `.content h1` -->
<style>
    .post__header__title {
        margin: 0;
        font-size: 2.4em;
        font-weight: 700;
        line-height: 1.8;
    }

    @media all and (max-width: 600px) {
        .post__header__title {
            font-size: 1.8em;
        }
    }

    .post__header__date {
        /* TODO Why do I have to remove auto-magic top/bottom margin in nearly each element? */
        margin: 1em 0;
    }

    @media all and (max-width: 600px) {
        .post__header__date {
            font-size: 0.8em;
        }
    }

    .post__header__cover {
        max-width: 100%;
    }

    .post__content {
        line-height: 1.7;
    }

    .post__content p,
    .post__content ul {
        margin: 1em 0;
    }

    .post__content em,
    .post__content em a {
        font-style: normal;
        font-weight: 700;
    }

    .post__content a {
        text-decoration: none;
        /* TODO automate things like that: #85cf9b = lighten(#60c17d, 10%) */
        background: -webkit-linear-gradient(transparent 90%, #85cf9b 10%);
        box-shadow: inset 0 0 0 0 #85cf9b;
        -webkit-transition: box-shadow ease 1s;
        -moz-transition: box-shadow ease 1s;
        transition: box-shadow ease 1s;
    }

    .post__content a:hover {
        color: #fff;
        /* TODO automate things like that: #85cf9b = lighten(#60c17d, 10%) */
        box-shadow: inset 0 -100px 0 0 #85cf9b;
    }

    /* TODO Class applied in webpack loader. Can we make those styles below not marked as unused? */
    /*noinspection CssUnusedSymbol*/
    .post__content a:hover .post__content__code_inline {
        color: #fff;
    }

    .post__content h1 {
        margin: 0;
        line-height: 1.7;
        font-weight: 700;
    }

    .post__content blockquote {
        border-left: 2px solid #60c17d;
        padding-left: 1em;
        font-size: 0.9em;
        font-style: italic;
    }

    /* TODO Class applied in webpack loader. Can we make those styles below not marked as unused? */
    /*noinspection CssUnusedSymbol*/
    .post__content__code {
        border: 1px solid #60c17d;
        border-radius: 3px;
        padding: 1em;
        font-size: 0.7em;

        /* vertical scrollbar */
        overflow: auto;
    }

    .post__content__code * {
        font-family: monospace;
    }

    /* TODO Class applied in webpack loader. Can we make those styles below not marked as unused? */
    /*noinspection CssUnusedSymbol*/
    .post__content__code_inline {
        border: 1px solid #60c17d;
        border-radius: 3px;
        font-size: 0.7em;
        font-family: monospace;

        /* Do not break inline code snippets into lines */
        white-space: nowrap;
    }

    /* TODO Class applied in webpack loader. Can we make those styles below not marked as unused? */
    /*noinspection CssUnusedSymbol*/
    .post__content__image {
        /* separate images with whit background from white background of the site */
        border: 1px solid #60c17d;
        border-radius: 3px;

        max-width: 100%;

        /* do not allow vertical images to take too much space */
        max-height: 600px;

        /* center this element inside parent element */
        display: block;
        margin-right: auto;
        margin-left: auto;

        /* gap between elements */
        /*noinspection CssOptimizeSimilarProperties*/
        margin-top: 1em;
        /*noinspection CssOptimizeSimilarProperties*/
        margin-bottom: 1em;
    }

    .navigation__back_home {
        /*noinspection CssOptimizeSimilarProperties,CssUnknownTarget*/
        background-image: url('~assets/svg/left-arrow.svg');
        /*noinspection CssOptimizeSimilarProperties*/
        background-repeat: no-repeat;
        height: 40px;
        width: 40px;
        opacity: 0.9;
        position: fixed;
        top: 50px;
        left: 50px;
    }

    .navigation__back_home:hover {
        opacity: 1;
    }

    @media all and (max-width: 800px) {
        .navigation__back_home {
            top: 90%;
            left: 90%;
            height: 30px;
            width: 30px;
            opacity: 0.6;
        }
    }
</style>
