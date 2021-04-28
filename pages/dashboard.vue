<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="9">
        <h4 class="title font-weight-bold mb-0 pulse_primary--text">
          {{ "DashBoard"}}</h4>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-toolbar flat color="white">
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-col cols="auto" class="pl-0">
            <v-select
              outlined
              dense
              color="pulse_secondary_primary"
              v-model="select"
              append-icon="mdi-quality-high"
              label="Select Channel"
              single-line
              hide-details
              onkeyup
              clearable
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-divider class="mx-1" inset vertical></v-divider>
    <v-col class="text-right pt-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon medium v-on="on">
                  <v-icon
                    color="pulse_primary"
                    @click="EditForm"
                    >edit</v-icon
                  >
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
          </v-col>
          <v-col class="text-right pr-0 pt-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon medium v-on="on">
                  <v-icon
                    color="novo_primary"
                    @click="
                      () => {
                        viewchannelDetails;
                      }
                    "
                    >info</v-icon
                  >
                </v-btn>
              </template>
              <span>View details</span>
            </v-tooltip>
          </v-col>
              </v-toolbar>
      </v-col>
    </v-row>
    <v-dialog scrollable v-model="editDialog" width="400" persistent>
      <v-form ref="editChannelForm">
        <v-card max-height="600" class="overflow-auto scroll-y">
          <v-card-title class="title white pulse_primary--text" fixed>
            Edit Channels
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container class="pl-4 pr-4 pt-0 pb-0">
              <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  Channel Name
                </v-row>
                <v-row>
                  <v-text-field>
                    placeholder="Select"
                    item-text="name"
                    item-value="name"
                    v-model="editable"
                    dense
                    outlined
                    clearable
                    color="pulse_primary"
                    :rules="[(v) => !!v || 'Please fill this field']"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  URL
                </v-row>
                <v-row>
                  <v-text-field>
                    placeholder="Select"
                    v-model=editable
                    dense
                    outlined
                    clearable
                    color="pulse_primary"
                    :rules="[(v) => !!v || 'Please fill this field']"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  Platform
                </v-row>
                <v-row>
                 <v-checkbox
                  v-model="selected"
                  label="FaceBook"
                  value="fb"
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  label="Instagram"
                  value="Insta"
                ></v-checkbox>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="pulse_primary"
              class="mr-2"
              @click="cleareditForm()"
            >
              Cancel
            </v-btn>
            <v-btn
              dark
              outlined
              color="pulse_primary"
              class="mr-3"
              :loading="editchannelLoading"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
@Component({
  layout: "dashboard",
  components: {
  },
})
export default class MainDash extends Vue {
  title: string = "User Management";
  editDialog: boolean = false;

  async EditForm() {
    this.editDialog = true;
  }
  cleareditForm(){
    this.editDialog = false;
  }

}
</script>

<style scoped>


</style>
