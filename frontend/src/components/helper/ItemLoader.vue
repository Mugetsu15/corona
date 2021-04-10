<template>
  <v-card>
    <v-toolbar
        flat
        color="primary"
        dark
    >
      <v-toolbar-title>Informationen</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-receipt
        </v-icon>
        Regeln
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-google-maps
        </v-icon>
        Karte
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-chart-line
        </v-icon>
        Graph
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ItemRules v-bind:itemData="fetchItemData('rules')" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ItemMap v-bind:itemData="fetchItemData('map')" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <ItemChart v-bind:itemData="fetchItemData('chart')" />
          </v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </v-card>
</template>

<script>
import ItemRules from '../items/Rules';
import ItemMap from '../items/Map';
import ItemChart from '../items/Chart';

export default {
  name: 'ItemLoader',
  props: ['selected'],
  components: {
    ItemRules,
    ItemMap,
    ItemChart,
  },
  data: () => ({
    message: '',
  }),

  methods: {
    fetchItemData: function(tag) {
      let result = {};
      window.console.log(this.selected);
      if (tag === 'rules') {
        result = this.selected.rules;
      } else if (tag === 'map') {
        result = this.selected.map;
      } else if (tag === 'chart') {
        result = this.selected.chart;
      }
      return result;
    }
  },
}
</script>

<style scoped>
</style>