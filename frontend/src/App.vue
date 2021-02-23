<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="MaxUniverse Logo"
          class="shrink mr-2"
          contain
          src="@/assets/mxu_logo.png"
          transition="scale-transition"
          width="150"
        />
        Corona - Fallzahlen in Deutschland
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <CoronaTable/>
    </v-main>
  </v-app>
</template>

<script>
import CoronaTable from './components/CoronaTable';

export default {
  name: 'App',
  components: {
    CoronaTable,
  },
};
</script>
