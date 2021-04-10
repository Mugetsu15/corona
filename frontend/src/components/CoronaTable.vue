<template>
  <div v-if="!message">
    <v-card>
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        >
        </v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers"
          :items="corona"
          class="elevation-1"
          :search="search"
          v-model="selected"
          @click:row="dialog=true"
          :loading="loading"
          loading-text="Loading... Please wait!">
      </v-data-table>
    </v-card>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="85%" lazy absolute>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
<!--              <ItemLoader v-bind:selected="selected"/>-->
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
  <div v-else>
    <v-alert type="error">
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
// import ItemLoader from './helper/ItemLoader';

export default {
  name: "CoronaTable",
  components: {
    // ItemLoader,
  },
  computed: {
    getCoronaData() {
      return this.$store.state.corona.data;
    },
    existsCoronaData() {
      return this.$store.state.corona.exists;
    }
  },
  watch: {
    search: function () {
      this.$cookies.set("search", this.search, '2d', null, null, true, "Lax")
    }
  },
  data: () => ({
    message: '',
    search: '',
    dialog: false,
    loading: false,
    chart: false,
    fname: '',
    selected: {},
    headers: [
      { text: 'Kreisname', value: 'KreisName' },
      { text: 'Kreisart', value: 'KreisArt' },
      { text: '7-Tage-Inzidenz', value: 'IZ' },
    ],
    corona: [],
  }),
  methods: {

  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('corona/fetchAllData').then(
        onSuccess => {
          if (onSuccess.data) {
            this.corona = onSuccess.data;
            if (this.corona.length === 0) {
              this.corona = this.getCoronaData;
            }
          }
          if (this.$cookies.get('search')) {
            this.search = this.$cookies.get("search");
          }
          this.$forceUpdate();
          this.loading = false;
        }, onError => {
          this.$store.dispatch('corona/fallback').then(
              onSuccess => {
                if (onSuccess.data) {
                  this.corona = JSON.parse(onSuccess.data);
                }
                if (this.$cookies.get('search')) {
                  this.search = this.$cookies.get("search");
                }
                this.$forceUpdate();
                this.loading = false;
              }, onError => {
                this.message = (onError.response && onError.response.data) || onError.message || onError.toString();
                this.loading = false;
              }
          )
        }
    );
  }
}
</script>

<style scoped>

</style>