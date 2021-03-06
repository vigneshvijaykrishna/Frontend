<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    :loading="dataLoading"
    :search="search"
    class="elevation-3 pulse_primary"
    loader-height="2"
  >
    <template v-slot:top>
      <v-toolbar
        flat>
        <v-toolbar-title class="subtitle-1 grey--text text--darken-1">
            {{desserts.length}} User(s)
          </v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
          <v-col cols="auto" class="pl-0">
            <v-text-field
              outlined
              dense
              color="pulse_primary"
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              onkeyup
              clearable
              rounded
            ></v-text-field>
          </v-col>
        <v-col cols="auto" class="pl-0">
            <v-select
             :items="filteredItems"
                  item-text="name"
                  item-value="name"
                  placeholder="Select"
                  dense
                  multiple
                  :menu-props="{ bottom: true, offsetY: true }"
                  outlined
                  clearable
                  hide-details
                  color="novo_primary"
            ></v-select>
          </v-col>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-form ref="userForm">
            <v-card-text>
            <v-container class="pl-4 pr-4 pt-0 pb-0">
              <v-col class="pt-0 pb-0">
                <v-row>
                 <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                      :rules="[(v) => !!v || 'Please fill this field']"
                    ></v-text-field>
                </v-row>
              </v-col>
               <v-col class="pt-0 pb-0">
                 <v-row>
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                      :rules="[(v) => !!v || 'Please fill this field']"
                    ></v-text-field>
                 </v-row>
                  </v-col>
                  <v-col class="pt-0 pb-0">
                <v-row>
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                      :rules="[(v) => !!v || 'Please fill this field']"
                    ></v-text-field>
                </v-row>
                  </v-col>
                 <v-col class="pt-0 pb-0">
                <v-row>
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                      :rules="[(v) => !!v || 'Please fill this field']"
                    ></v-text-field>
                </v-row>
                  </v-col>
              <v-col class="pt-0 pb-0">
                <v-row>
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                      :rules="[(v) => !!v || 'Please fill this field']"
                    ></v-text-field>
                </v-row>
                  </v-col>
              </v-container>
            </v-card-text>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
          <v-progress-linear
          v-if="dataLoading"
          rounded
          height="3"
          indeterminate
          color="red"
        ></v-progress-linear>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import { Component, Vue, namespace, mixins } from "nuxt-property-decorator";
@Component({
  layout: "dashboard",
  components: {
  },
})
export default class usermanagement extends Vue {
  dialog: boolean = false
  dialogDelete: boolean = false
  search: string = ""
  dataLoading: boolean = false
  headers: object[] = [
    {
      text: 'Dessert (100g serving)',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    {text: 'Calories', value: 'calories', filterable: false},
    {text: 'Fat (g)', value: 'fat', filterable: false},
    {text: 'Carbs (g)', value: 'carbs', filterable: false},
    {text: 'Protein (g)', value: 'protein', filterable: false},
    {text: 'Actions', value: 'actions', sortable: false, filterable: false},
  ]

  editedIndex: number = -1
  editedItem: any = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  }
  defaultItem: any = {
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  }

  desserts: Object[] = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
    },
  ]


  editItem(item: string) {
    this.editedIndex = this.desserts.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dataLoading = true;
    this.dialog = true
  }

  deleteItem(item: string) {
    this.editedIndex = this.desserts.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dataLoading = true;
    this.dialogDelete = true
  }

  deleteItemConfirm() {
    this.desserts.splice(this.editedIndex, 1)
    this.closeDelete()
  }

  close() {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.dataLoading = false;
      this.editedIndex = -1
    })
  }

  closeDelete() {
    this.dialogDelete = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.dataLoading = false;
      this.editedIndex = -1
    })
  }

  save(){
    if ((this.$refs.userForm as Vue & { validate: () => boolean; }).validate()) {
       try {
        this.dataLoading = true
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        alert(this.editedItem.name)
         alert("Added Successfully")
      }catch (e) {
         alert(e)
       }
       this.close()
    }
  }
}
</script>
