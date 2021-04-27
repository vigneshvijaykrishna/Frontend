<template></template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Route } from 'vue-router'
@Component
export default class Index extends Vue {
  mounted() {
    //Set the default landing page
    this.$router.push({name:'login'});
  }
}
</script>
