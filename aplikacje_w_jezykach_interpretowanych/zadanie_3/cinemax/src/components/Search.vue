<template>
  <div>
    <h1>Baza filmów</h1>
    <form>
      <div class="form-group">
        <label for="inputTitle">Tytuł</label>
        <input
          v-on:change="title = $event.target.value"
          type="text"
          id="inputTitle"
          class="form-control"
          placeholder="Podaj tytuł lub fragment tytułu filmu"
        />
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputProductionFrom"
          >Rok produkcji od:</label
        >
        <div class="col-sm-8">
          <input
            v-on:change="beginYear = $event.target.value"
            type="text"
            id="inputProductionFrom"
            class="form-control"
            placeholder="Liczba naturalna z przedziału 1900-2019"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label" for="inputProductionTo"
          >Rok produkcji do:</label
        >
        <div class="col-sm-8">
          <input
            v-on:change="endYear = $event.target.value"
            type="text"
            id="inputProductionTo"
            class="form-control"
            placeholder="Liczba naturalna z przedziału 1900-2019"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputCast">Obsada</label>
        <input
          v-on:change="cast = $event.target.value == '' ? [] : $event.target.value.split(', ')"
          type="text"
          id="inputCast"
          class="form-control"
          placeholder="Imię i nazwisko"
        />
      </div>
      <div class="form-group row">
        <input
          v-on:click="filterBy"
          type="button"
          class="btn btn-info col-sm-12"
          value="Szukaj"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Search",
  methods: {
    filterBy() {
      this.$emit("filter", {
        title: this.title,
        beginYear: this.beginYear,
        endYear: this.endYear,
        cast: this.cast,
      });
    },
  },
  data: function() {
    return {
      title: "",
      beginYear: 0,
      endYear: 0,
      cast: [],
    };
  },
};
</script>

<style></style>
