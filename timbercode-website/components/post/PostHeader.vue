<template>
    <header>
        <img class="image"
             :src="imageUrl"/>
        <h1 class="title">
            {{ title }}
        </h1>
        <p class="publicationDate">
            {{ publicationDateAsText }}
        </p>
    </header>
</template>

<script>
  import moment from 'moment'

  // TODO CLEAN-UP, REFACTORING
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
      title: {type: String, required: true},
      imageUrl: {type: String, required: true},
      publicationDate: {type: moment, required: true}
    },
    computed: {
      // TODO clean-up
      // TODO what about local time vs time of publication in given timezone?
      publicationDateAsText () {
        const monthNumber = this.publicationDate.month()
        const month = monthNumbersToText[monthNumber]
        if (!month) throw Error(`'${monthNumber}' is not a valid month number`)
        return `${this.publicationDate.date()} ${month} ${this.publicationDate.year()}`
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../../assets/styles/theme";

    .title {
        margin: 0;
        font-size: 4em;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
        }
        @media all and (max-width: 550px) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
            font-size: 2rem;
        }
    }

    .publicationDate {
        margin: 0;
        color: @color_font_secondary;

        /* TODO better way of defining this media query with 2rems? */
        @media all and (max-width: (800px + 2*@font__size__regular)) {
            margin-left: @page__margin__horizontal;
            margin-right: @page__margin__horizontal;
        }
    }

    .image {
        width: 100%;
    }
</style>
