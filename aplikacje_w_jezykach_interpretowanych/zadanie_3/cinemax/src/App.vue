<template>
  <div>
    <Search v-on:filter="filterBy" />
    <FilmTable :movies="filteredMovies" />
    <GenreList />
    <CastList />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import FilmTable from "./components/FilmTable.vue";
import GenreList from "./components/FilmsListByGenre.vue";
import CastList from "./components/FilmsListByCast.vue";
import database from "./resources/movies.json";
import _ from "underscore";

export default {
  name: "App",
  components: { Search, FilmTable, GenreList, CastList },
  data: function() {
    return {
      movies: database.movies,
      filteredMovies: database.movies,
    };
  },
  methods: {
    compareArrays(arrayOne, arrayTwo) {
      let counter = 0;
      arrayOne.forEach((arOneElement) => {
        if (arrayTwo.includes(arOneElement)) {
          counter++;
        }
      });
      return counter == 0 ? false : true;
    },
    filterBy(pattern) {
      this.filteredMovies = _.filter(this.movies, (movie) => {
        return (
          movie.title.toLowerCase().includes(pattern.title.toLowerCase()) &&
          (pattern.beginYear == 0 || pattern.beginYear <= movie.year) &&
          (pattern.endYear == 0 || pattern.endYear >= movie.year) &&
          (pattern.cast.length == 0 ||
            this.compareArrays(pattern.cast, movie.cast) === true)
        );
      });
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
