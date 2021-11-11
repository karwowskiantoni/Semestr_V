<template>
  <div>
    <Search v-on:filter="filterBy"/>
    <FilmTable :movies="filteredMovies"/>
    <GenreList :movies="filteredMovies.slice(0, 100)"/>
    <CastList :movies="filteredMovies.slice(0, 100)"/>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import FilmTable from "./components/FilmTable.vue";
import FilmsListByGenre from "./components/FilmsListByGenre.vue";
import FilmsListByCast from "./components/FilmsListByCast.vue";
import database from "./resources/movies.json";
import _ from "underscore";

export default {
  name: "App",
  components: {Search, FilmTable, GenreList: FilmsListByGenre, CastList: FilmsListByCast},
  data: function () {
    return {
      movies: database.movies,
      filteredMovies: database.movies,
    };
  },
  methods: {
    compareArrays(arrayOne, arrayTwo) {
      let isPresent = false;
      arrayOne.forEach((arOneElement) => {
        if (arrayTwo.includes(arOneElement)) {
          isPresent = true;
        }
      });
      return isPresent;
    },
    filterBy(pattern) {
      this.filteredMovies = _.filter(this.movies, (movie) => {
        return (
            movie.title.toLowerCase().includes(pattern.title.toLowerCase()) &&
            (pattern.beginYear === 0 || pattern.beginYear <= movie.year) &&
            (pattern.endYear === 0 || pattern.endYear >= movie.year) &&
            (pattern.cast.length === 0 ||
                this.compareArrays(pattern.cast, movie.cast) === true)
        );
      });
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";

#app {
  margin-left: 21vw;
  margin-right: 21vw;
}
</style>
