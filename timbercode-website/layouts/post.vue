<template>
    <div>
        <header class="header">
            <site-navigation></site-navigation>
        </header>
        <main class="main_content">
            <nuxt/>
        </main>
    </div>
</template>

<script>
  import SiteNavigation from '../components/SiteNavigation.vue'
  export default {
    components: {
      SiteNavigation
    }
  }
</script>

<style lang="less">
    @import "../assets/styles/base";
</style>

<style scoped lang="less">
    @import "../assets/styles/theme";
    .header {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
        }
    }

    .main_content {
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
