<template>
  <h1>Filmy według obsady</h1>
  <div class="card-columns">
    <div v-for="actor in getCast()" :key="actor">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ actor }}</h5>
          <div v-for="title in getMoviesTitles(actor)" :key="title">
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
    getCast() {
      let cast = this.movies.flatMap(movie => movie.cast)
      return [...new Set(cast)]
    },

    getMoviesTitles(actor) {
      let moviesTitles = this.movies.filter(movie => movie.cast.includes(actor)).map(movie => movie.title)
      return [...new Set(moviesTitles)] // distinct
    },
  },
};
</script>

<style></style>
