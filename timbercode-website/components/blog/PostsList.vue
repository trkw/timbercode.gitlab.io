<template>
    <section>
        <ul class="list">
            <li v-for="post in posts" class="post">
                <nuxt-link :to="post.route">
                    {{post.title}}
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script>
  export default {
    props: {
      // TODO define type of Array elements?
      posts: {type: Array, required: true}
    }
  }
</script>

<style scoped lang="less">
    @import "../../assets/styles/theme";

    .list {
        margin: 0;
        font-size: 6em;
        padding: 0;
        list-style: none;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
        }
    }

    .post {
        /* TODO 2rem or 2*@font__size__regular */
        font-size: 1.7rem;
        font-weight: @font__weight__bold;
        margin-bottom: 1rem;
        a {
            text-decoration: none;
            color: @color_font;
        }
        a:hover {
            color: @color_brand;
        }

        @media all and (max-width: 550px) {
            font-size: 1rem;
        }
    }
</style>
