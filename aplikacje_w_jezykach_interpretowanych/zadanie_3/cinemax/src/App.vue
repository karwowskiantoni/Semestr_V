<template>
  <div>
    <Search />
    <FilmTable />
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

export default {
  name: "App",
  components: { Search, FilmTable, GenreList, CastList },
};
</script>

<style>
#app {
  margin-left: 21vw;
  margin-right: 21vw;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
