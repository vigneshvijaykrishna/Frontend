<template>
  <div id="navbar">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      width="275"
      fixed
      app
    >
    <v-list class="pb-0">
      <v-list-item class="px-2">
        <v-list-item-content class="px-2 pt-1">
          <v-list-item-title class="display-2 mb-6">{{"MPulse-Digital"}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="pulse_secondary"></v-divider>
    </v-list>
    <v-list dense expand class="pt-0">
      <div id="UserMenu">
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

    </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="pulse_primary"
      :clipped-left="clipped"
      dense
      dark
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="hidden-sm-and-down white--text">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn @click="Logout" fab x-small color="pulse_secondary" v-on="on" :loading="logoutButtonLoading">
            <v-icon color="pulse_primary">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace, mixins } from "nuxt-property-decorator";
var _ = require('lodash');
import { Routes } from '@/constants/route.constants';


@Component({
  components: {

  },
})
export default class Landingpage extends Vue {
  title: string = "MPulse";
  clipped: boolean = false;
  Email:string="";
  drawer: boolean = true;
  fixed: boolean = false;
  miniVariant: boolean = false;
  message: string = "";
  logoutButtonLoading: boolean = false;
  UserRoute = Routes.USER_MANAGEMENT;
  ChannelRoute = Routes.CHANNEL_STATUS;
  SettingsRoute = Routes.USER_SETTINGS;
  SupportRoute = Routes.USER_SUPPORT;
  DashBoardRoute = Routes.USER_DASHBOARD


  Logout() {
    this.logoutButtonLoading = true;
    this.$router.push({name:'login'});
    this.logoutButtonLoading = false;
  }
}
</script>

