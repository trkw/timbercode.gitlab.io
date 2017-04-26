<template>
    <div>
        <h1>
            test wygenerowany po stronie: {{ this.whichSide }}
        </h1>
        <ul>
            <li>
                <nuxt-link to="/"> Back </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    asyncData ({isClient, isServer}) {
      return {
        whichSide: isClient ? 'client' : (isServer ? 'server' : 'UNKNOWN')
      }
    }
  }
</script>
