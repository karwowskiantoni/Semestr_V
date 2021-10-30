<template>
  <div>
    <Search v-on:filter="filterBy" :movies="movies" />
    <FilmTable :movies="movies" />
    <GenreList />
    <CastList />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import FilmTable from "./components/FilmTable.vue";
import GenreList from "./components/FilmsListByGenre.vue";
import CastList from "./components/FilmsListByCast.vue";
import "bootstrap";
import database from "./resources/movies.json";
import _ from "underscore";

export default {
  name: "App",
  components: { Search, FilmTable, GenreList, CastList },
  data: function() {
    return {
      movies: database.movies,
    };
  },
  methods: {
    filterBy(arg1) {
      this.movies = _.where(this.movies, arg1);
    },
  },
};
</script>

<style>
#app {
  margin-left: 21vw;
  margin-right: 21vw;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
