<template>
  <v-card v-if="!message">
    <v-card-title>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="corona"
        :search="search"
    ></v-data-table>
  </v-card>
  <v-alert v-else type="error">
    {{ message }}
  </v-alert>
</template>

<script>
  export default {
    name: 'CoronaTable',
    computed: {
      getCoronaData() {
        return this.$store.state.corona.data;
      },
      existsCoronaData() {
        return this.$store.state.corona.exists;
      }
    },
    data: () => ({
      message: '',
      search: '',
      headers: [
        { text: 'Kreisname', value: 'KreisName' },
        { text: 'Kreisart', value: 'KreisArt' },
        { text: '7-Tage-Inzidenz', value: 'IZ' },
      ],
      corona: [],
    }),
    mounted() {
      this.$store.dispatch('corona/fetchAllData').then(
          onSuccess => {
            console.log(onSuccess)
            if (onSuccess.data) {
              this.corona = onSuccess.data;
              if (this.corona.length === 0) {
                this.corona = this.getCoronaData;
              }
            }
            this.$forceUpdate();
          }, onError => {
            this.$store.dispatch('corona/fallback').then(
                onSuccess => {
                  console.log(onSuccess.body)
                  console.log(onSuccess.data)
                  console.log(onSuccess.bodyText)
                  console.log(onSuccess)
                  if (onSuccess.body) {
                    this.corona = onSuccess.body;
                  }
                }, onError => {
                  this.message = (onError.response && onError.response.data) || onError.message || onError.toString();
                  console.log(this.message)
                }
            )
            this.message = (onError.response && onError.response.data) || onError.message || onError.toString();
            console.log(this.message)
          }
      );
    }
  }
</script>
