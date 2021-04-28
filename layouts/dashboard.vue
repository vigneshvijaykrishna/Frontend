<template>
  <div id="appRoot">
    <v-app>
      <!-- Sidebar Menu -->
      <Navigation></Navigation>
      <!-- Main Content -->
      <v-main class="grey lighten-2">
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
import Navigation from '@/components/Navigation.vue';
import { Vue, Component } from 'nuxt-property-decorator';
@Component({
  components: {
    Navigation
  },
})
export default class dashboard extends Vue {}
</script>
