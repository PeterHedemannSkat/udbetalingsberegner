<template>
  <div class="row">
    <div class="col-sm-6">
      <form @submit="next">
        <div class="custom-control custom-radio">
          <input
            v-model="value.selection"
            @input="update('selection', $event.target.value)"
            type="radio"
            id="able2pay"
            value="able"
            name="selection"
            class="custom-control-input"
          >
          <label
            class="custom-control-label"
            for="able2pay"
          >Selskabet kan udbetale følgende beløb - regn ud, hvad den ansatte får udbetalt</label>
        </div>
        <div class="custom-control custom-radio">
          <input
            v-model="value.selection"
            @input="update('selection', $event.target.value)"
            type="radio"
            id="employeewant"
            value="want"
            name="selection"
            class="custom-control-input"
          >
          <label
            class="custom-control-label"
            for="employeewant"
          >Den ansatte vil have følgende udbetalt - regn ud, hvad selskabet skal udbetale</label>
        </div>
        <button class="btn btn-primary" :disabled="!value.selection" type="submit">Næste</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Selection",
  props: ["value"],
  methods: {
    next(e) {
      e.preventDefault();
      this.$emit("changeStep", "userinput");
    },
    update(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    }
  }
};
</script>

<style>
</style>
