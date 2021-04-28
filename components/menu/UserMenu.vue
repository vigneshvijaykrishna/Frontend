<template>
   <div id="AdminMenu">
      <v-list dense expand class="pt-0">
      <v-list-item-group color="pulse_primary" class="mt-3">
        <template>
          <v-list-item :to="UserRoute" link>
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="pulse_primary--text"
                v-text="'User Management'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template>
          <v-list-item :to="DashBoardRoute" link>
            <v-list-item-icon>
              <v-icon>mdi-view-grid</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="pulse_primary--text"
                v-text="'DashBoard'"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
      </v-list>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace, mixins } from "nuxt-property-decorator";
import { Routes } from '@/constants/route.constants';


@Component({
  components: {
  },
})

export default class UserMenu extends Vue{

  //routes
  UserRoute = Routes.USER_MANAGEMENT;
  DashBoardRoute = Routes.USER_DASHBOARD

}
</script>

<style scoped>

</style>
