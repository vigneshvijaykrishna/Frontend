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
          <v-list-item :to="ChannelRoute" link>
            <v-list-item-icon>
              <v-icon>mdi-filmstrip-box-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="pulse_primary--text"
                v-text="'All Channel Status'"
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
        <template>
            <v-list-item :to="SettingsRoute" link>
              <v-list-item-icon>
                <v-icon>mdi-cellphone-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="pulse_primary--text"
                  v-text="'User Settings'"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template>
            <v-list-item :to="SupportRoute" link>
              <v-list-item-icon>
                <v-icon>mdi-account-arrow-right </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="pulse_primary--text"
                  v-text="'Contact Support'"
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

export default class AdminMenu extends Vue{

  //routes
  UserRoute = Routes.USER_MANAGEMENT;
  ChannelRoute = Routes.CHANNEL_STATUS;
  SettingsRoute = Routes.USER_SETTINGS;
  SupportRoute = Routes.USER_SUPPORT;
  DashBoardRoute = Routes.USER_DASHBOARD

}
</script>
