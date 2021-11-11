<template>
  <h1>Filmy według gatunku</h1>
  <div class="card-columns">
    <div v-for="genre in getGenre()" :key="genre">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ genre }}</h5>
          <div v-for="title in getMoviesTitles(genre)" :key="title">
            <p class="card-text">{{ title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmsListByCast",
  props: {
    movies: Array,
  },
  methods: {
    getGenre() {
      let genres = this.movies.flatMap(movie => movie.genres)
      return [...new Set(genres)] // distinct
    },

    getMoviesTitles(genre) {
      return this.movies.filter(movie => movie.genres.includes(genre)).map(movie => movie.title)
    },
  },
};
</script>

<style></style>
