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
        <tr v-for="i in length" :key="i">
          <td>{{ movies[i].title }}</td>
          <td>{{ movies[i].year }}</td>
          <td>
            <div v-for="actor in movies[i].cast" :key="actor">
              {{ actor }}
            </div>
          </td>
          <td>
            <div v-for="genre in movies[i].genres" :key="genre">
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
import database from "../resources/movies.json";

export default {
  data: function() {
    return {
      movies: database.movies,
      length: 10,
    };
  },
};
</script>

<style></style>
