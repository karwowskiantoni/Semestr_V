<template>
  <div>
    <table class="table-condensed table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Production Year</th>
          <th>Cast</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in getLength()" :key="i">
          <td>{{ movies[i - 1].title }}</td>
          <td>{{ movies[i - 1].year }}</td>
          <td>
            <div v-for="actor in movies[i - 1].cast" :key="actor">
              {{ actor }}
            </div>
          </td>
          <td>
            <div v-for="genre in movies[i - 1].genres" :key="genre">
              {{ genre }}
            </div>
          </td>
        </tr>
      </tbody>
      <button v-on:click="length = length + 10">Pokaż więcej</button>
    </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      length: 10,
    };
  },
  name: "FilmTable",
  props: {
    movies: Array,
  },
  methods: {
    getLength() {
      const newLength =
        this.length > this.movies.length ? this.movies.length : this.length;
      return newLength;
    },
  },
};
</script>

<style></style>
