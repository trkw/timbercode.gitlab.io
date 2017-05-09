<template>
    <div class="navigation">
        <nuxt-link to="/blog" class="home">
            Timbercode
        </nuxt-link>
    </div>
</template>

<script>
  export default {
    props: {
      videoUrl: {type: String, required: true}
    }
  }
</script>

<style scoped lang="less">
    @import "../assets/styles/theme";

    .navigation {
        height: 3 * @font__size__regular;
        line-height: 3 * @font__size__regular;

        .home {
            font-size: 2rem;

            /* <a> */
            text-decoration: none;
            color: @color_font;
        }
        /* <a>:hover */
        .home:hover {
            color: @color_brand;
        }
    }
</style>
