<template>
  <div class="container-fluid">
    <table class="table table-hover table-bordered">
      <thead class="table-info">
      <tr>
        <th @click="sort('name')">Name</th>
        <th @click="sort('type')">Art</th>
        <th @click="sort('iz')">Inzidenz</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in corona">
        <td>{{item.name}}</td>
        <td>{{item.type}}</td>
        <td>{{item.iz}}</td>
      </tr>
      </tbody>
    </table>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      corona: [{
        'iz': '100',
        'type': 'Landkreis',
        'name': 'Landshut',
      },
        {
          'iz': '50',
          'type': 'Stadt',
          'name': 'Landshut',
        },
        {
          'iz': '50',
          'type': 'Landkreis',
          'name': 'München',
        },
        {
          'iz': '10',
          'type': 'Stadt',
          'name': 'München',
        },
        {
          'iz': '10',
          'type': 'Stadt',
          'name': 'Augsburg',
        }],
      mode: false,
      message: '',
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:3,
      currentPage:1,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.corona.exists;
    },
    sortedItems: function() {
      return this.cats.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
  },
  methods: {
    fetchSpecificData: function(tag, kreis) {
      this.$store.dispatch("corona/fetchSpecificData", kreis).then(
          onSuccess => {
            console.log(onSuccess);
            if (onSuccess.data) {
              this.corona = onSuccess.data.corona;
            }
            this.$forceData();
          }, onError => {
            console.log(onError);
          }
      );
    },
    sort: function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    nextPage: function() {
      if ((this.currentPage * this.pageSize) < this.corona.length) this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  mounted() {
    this.$store.dispatch('corona/fetchAllData').then(
        onSuccess => {
          console.log(onSuccess);
          if (onSuccess.data) {
            this.corona = onSuccess.data.corona;
          }
          this.$forceUpdate();
        }, onError => {
          console.log(onError);
        }
    )
  }
};
</script>

<style>
  .select,
    #locale {
      width: 100%;
    }
  .like {
    margin-right: 10px;
  }
</style>