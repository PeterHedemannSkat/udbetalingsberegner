<template>
  <form @submit="next">
    <div class="row">
      <div class="col bg-white py-3">
        <h2>{{texts.SelectionChooseCalculation}}</h2>
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
          <label class="custom-control-label" for="able2pay">{{texts.SelectionCompanyCanPay}}</label>
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
          <label class="custom-control-label" for="employeewant">{{texts.SelectionEmployeeWants}}</label>
        </div>
      </div>
    </div>
    <div class="row bg-white mt-3 py-3">
      <div class="col d-flex justify-content-end">
        <button class="btn btn-primary" :disabled="!value.selection" type="submit">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Selection",
  props: ["value", "texts"],
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
