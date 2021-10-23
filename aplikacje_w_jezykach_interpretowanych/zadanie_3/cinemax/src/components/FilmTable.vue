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
        <tr v-for="movie in movies" :key="movie.title">
          <td>{{ movie.title }}</td>
          <td>{{ movie.year }}</td>
          <td>{{ movie.cast }}</td>
          <td>{{ movie.genres }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      movies: [
        {
          title: "Chained for Life",
          year: 1951,
          cast: ["Hilton Twins"],
          genres: [],
        },
        {
          title: "Cheese Chasers",
          year: 1951,
          cast: ["Looney Tunes"],
          genres: ["Animated"],
        },
        {
          title: "Chicago Calling",
          year: 1951,
          cast: ["Dan Duryea", "Mary Anderson"],
          genres: ["Noir"],
        },
        {
          title: "China Corsair",
          year: 1951,
          cast: ["Jon Hall", "Ernest Borgnine"],
          genres: ["Adventure"],
        },
        {
          title: "So This Is Paris",
          year: 1955,
          cast: ["Tony Curtis", "Gloria DeHaven"],
          genres: ["Musical"],
        },
        {
          title: "Soldier of Fortune",
          year: 1955,
          cast: ["Clark Gable", "Susan Hayward"],
          genres: ["Drama"],
        },
        {
          title: "Son of Sinbad",
          year: 1955,
          cast: ["Dale Robertson", "Sally Forrest", "Vincent Price"],
          genres: ["Adventure"],
        },
        {
          title: "Southbound Duckling",
          year: 1955,
          cast: ["Tom and Jerry"],
          genres: ["Animated"],
        },
        {
          title: "Special Delivery",
          year: 1955,
          cast: ["Joseph Cotten", "Eva Bartok"],
          genres: ["Comedy"],
        },
      ],
    };
  },
};
</script>

<style></style>
