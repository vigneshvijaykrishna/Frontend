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
              :items="ChannelName"
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
          <v-toolbar-title class="subtitle-1 grey--text text--darken-1">
            {{Channel}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
             <v-badge
            :content="messages"
            :value="messages"
            color="red"
            overlap
            >
             </v-badge>
    <v-col class="text-right pt-2">
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
          <v-col class="text-right pr-0 pt-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon medium v-on="on">
                  <v-icon
                    color="pulse_primary"
                    @click="viewchannelDetails"
                    >info</v-icon
                  >
                </v-btn>
              </template>
              <span>View details</span>
            </v-tooltip>
          </v-col>
          <v-col class="text-right pr-0 pt-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon medium v-on="on">
                  <v-icon
                    color="pulse_primary"
                    @click="addnewchannel"
                    >mdi-table-column-plus-after</v-icon>
                </v-btn>
              </template>
              <span>Add new channel</span>
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
                  <v-text-field
                    placeholder="text"
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
                  <v-text-field
                    placeholder="text"
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
               <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  Monitoring Interval
                </v-row>
                <v-row>
                  <v-select
                    :items="timedata"
                    v-model="selected"
                    placeholder="Select"
                    item-text="time"
                    item-value="time"
                    dense
                    clearable
                    outlined
                    color="pulse_primary"
                    :rules="[(v) => !!v || 'Please fill this field']"
                  ></v-select>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              outlined
              color="pulse_primary"
              class="mr-3"
              :loading="editchannelLoading"
            >
              Update
            </v-btn>
            <v-btn
              text
              color="pulse_primary"
              class="mr-2"
              @click="cleareditForm()"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog scrollable v-model="addDialog" width="400" persistent>
      <v-form ref="editChannelForm">
        <v-card max-height="600" class="overflow-auto scroll-y">
          <v-card-title class="title white pulse_primary--text" fixed>
            Add Channels
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container class="pl-4 pr-4 pt-0 pb-0">
              <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  Channel Name
                </v-row>
                <v-row>
                  <v-text-field
                    placeholder="text"
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
                  <v-text-field
                    placeholder="text"
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
               <v-col class="pt-0 pb-0">
                <v-row class="font-weight-bold black--text mb-1">
                  Monitoring Interval
                </v-row>
                <v-row>
                  <v-select
                    :items="timedata"
                    v-model="selected"
                    placeholder="Select"
                    item-text="time"
                    item-value="time"
                    dense
                    clearable
                    outlined
                    color="pulse_primary"
                    :rules="[(v) => !!v || 'Please fill this field']"
                  ></v-select>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              outlined
              color="pulse_primary"
              class="mr-3"
              :loading="editchannelLoading"
            >
              Add
            </v-btn>
            <v-btn
              text
              color="pulse_primary"
              class="mr-2"
              @click="clearaddForm()"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
     <v-dialog
          scrollable
          v-model="infoDialog"
          width="400"
          persistent
        >
        <v-form ref="viewForm">
          <v-card max-height="600" class="overflow-auto scroll-y">
            <v-card-title class="title white pulse_primary--text" fixed>
              Channel Info
            </v-card-title>
            <v-divider></v-divider>
             <v-card-text>
              <v-container class="pl-4 pr-4 pt-0 pb-0">
                <v-col class="pt-0 pb-0">
                  <v-row class="font-weight-bold black--text mb-1">
                    Channel Name
                  </v-row>
                  <v-row class="font-weight-bold black--text mb-1">
                    <v-text-field
                      :items="ChannelName"
                      dense
                      disabled
                      color="pulse_primary"
                    ></v-text-field>
                  </v-row>
                </v-col>
                <v-col class="pt-0 pb-0">
                  <v-row class="font-weight-bold black--text mb-1">
                    URL
                  </v-row>
                  <v-row class="font-weight-bold black--text mb-1">
                    <v-text-field
                      :items="URL"
                      dense
                      disabled
                      color="pulse_primary"
                    ></v-text-field>
                  </v-row>
                </v-col>
                <v-col class="pt-0 pb-0">
                  <v-row class="font-weight-bold black--text mb-1">
                    Platform
                  </v-row>
                  <v-row class="font-weight-bold black--text mb-1">
                    <v-text-field
                      :items="Platform"
                      dense
                      color="pulse_primary"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <v-col class="pt-0 pb-0">
                  <v-row class="font-weight-bold black--text mb-1">
                    Monitoring Interval
                  </v-row>
                  <v-row class="font-weight-bold black--text mb-1">
                    <v-text-field
                      :items="interval"
                      dense
                      disabled
                      color="pulse_primary"
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-container>
                <v-card-actions class="pt-0 pb-4">
              <v-spacer></v-spacer>
              <v-btn
                class="mr-2"
                color="primary"
                text
                @click.native="clearViewChannelForm"
                >Cancel</v-btn
              >
    </v-card-actions>
             </v-card-text>
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
  infoDialog:boolean = false;
  addDialog: boolean = false;
  ChannelName:Array<string> = ['Channel 1','Channel 2','Channel 3','Channel 4'];
  Channel:Array<string> = ['Channel 1']



  async EditForm() {
    this.editDialog = true;
  }
  cleareditForm(){
    this.editDialog = false;
  }
  viewchannelDetails(){
    this.infoDialog=true
  }
  clearViewChannelForm(){
    this.infoDialog=false
  }
  addnewchannel(){
    this.addDialog=true
  }
  clearaddForm(){
    this.addDialog=false
}

}
</script>

<style scoped>


</style>
