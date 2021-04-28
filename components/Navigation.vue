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
        <v-list-item-content class="px-1 pt-1">
          <v-list-item-title class=" mb-2">{{"MPulse-Digital"}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="pulse_secondary"></v-divider>
    </v-list>
      <v-list dense expand class="pt-0">
      <AdminMenu>{{ AdminMenu }}</AdminMenu>
<!--        <UserMenu v-if="userRole.toLowerCase()==usrRole.toLowerCase()">{{UserMenu}}</UserMenu>-->
<!--      <AdminMenu v-if="userRole.toLowerCase()==adminRole.toLowerCase()">{{AdminMenu}}</AdminMenu>-->
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
import AdminMenu from '~/components/menu/AdminMenu.vue';
import UserMenu from '~/components/menu/UserMenu.vue';
import { Roles } from '@/constants/roles.constants';


@Component({
  components: {
    AdminMenu
    // UserMenu

  },
})
export default class Navigation extends Vue {
  title: string = "MPulse";
  clipped: boolean = false;
  usrRole: string = Roles.USR;
  adminRole: string = Roles.ADM;
  drawer: boolean = true;
  fixed: boolean = false;
  miniVariant: boolean = false;
  message: string = "";
  logoutButtonLoading: boolean = false;








  Logout() {
    this.logoutButtonLoading = true;
    this.$router.push({name:'login'});
    this.logoutButtonLoading = false;
  }
}
</script>

