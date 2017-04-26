<template>
    <div>
        <h1>
            Config
        </h1>
        <ul>
            <li>router base: '{{base}}'</li>
            <li>C_BASE_URL: '{{C_BASE_URL}}'</li>
            <li>C_IMAGES_BASE_URL: '{{C_IMAGES_BASE_URL}}'</li>
            <li>N_BASE_URL: '{{N_BASE_URL}}'</li>
            <li>N_IMAGES_BASE_URL: '{{N_IMAGES_BASE_URL}}'</li>
            <li>isDev: '{{isDev}}'</li>
            <li>isClient: '{{isClient}}'</li>
            <li>isServer: '{{isServer}}'</li>
        </ul>
        <ul>
            <li>
                <nuxt-link to="/"> Back </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
  const {BASE_URL, IMAGES_BASE_URL} = require('../config')
  export default {
    asyncData ({base, env, isDev, isClient, isServer}) {
      return {
        base,
        C_BASE_URL: BASE_URL,
        C_IMAGES_BASE_URL: IMAGES_BASE_URL,
        N_BASE_URL: env.BASE_URL,
        N_IMAGES_BASE_URL: env.IMAGES_BASE_URL,
        isDev,
        isClient,
        isServer
      }
    }
  }
</script>
