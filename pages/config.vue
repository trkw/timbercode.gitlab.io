<template>
    <div>
        <h1>
            Config
        </h1>
        <ul>
            <li>BASE_URL: '{{BASE_URL}}'</li>
            <li>IMAGES_BASE_URL: '{{IMAGES_BASE_URL}}'</li>
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
    data ({isDev, isClient, isServer}) {
      return {
        BASE_URL,
        IMAGES_BASE_URL,
        isDev,
        isClient,
        isServer
      }
    }
  }
</script>
