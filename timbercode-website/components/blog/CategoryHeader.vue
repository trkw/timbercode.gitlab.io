<template>
    <header>
        <h1 class="title">
            Kategoria "{{category}}"
        </h1>
    </header>
</template>

<script>
  export default {
    props: {
      category: {type: String, required: true}
    }
  }
</script>

<style scoped lang="less">
    @import "../../assets/styles/theme";

    .title {
        font-size: 3em;
        text-align: center;
        border-bottom: 3px solid @color_brand;
        margin: 0 0 1rem;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
            font-size: 4rem;
        }

        @media all and (max-width: 550px) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
            font-size: 3rem;
        }
    }
</style>
