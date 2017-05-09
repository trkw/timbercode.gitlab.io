<template>
    <section class="comments">
        <!-- TODO Pull Request to disable warning: missing required attribute, which is not required -->
        <vue-disqus
                :shortname="disqusShortname"
                :identifier="postUniqueId"
                :url="postUrl"/>
    </section>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    props: {
      disqusShortname: {type: String, required: true},
      postUniqueId: {type: String, required: true},
      postUrl: {type: String, required: true}
    },
    components: {
      VueDisqus
    }
  }
</script>

<style scoped lang="less">
    @import "../../assets/styles/theme";

    .comments {
        margin: 0;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
        }
    }
</style>
