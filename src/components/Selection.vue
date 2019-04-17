<template>
  <form @submit="next">
    <div class="row">
      <div class="col bg-white py-3">
        <h2>{{texts.SelectionChooseCalculation}}</h2>
        <div class="custom-control custom-radio">
          <input
            v-model="selection"
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
            v-model="selection"
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
        <button class="btn btn-primary" :disabled="selection === null" type="submit">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Selection",
  computed: {
    ...mapState(["texts"]),
    selection: {
      get() {
        return this.$store.state.selection;
      },
      set(value) {
        this.setSelection(value);
      }
    }
  },
  methods: {
    ...mapActions(["setSelection", "changeStep"]),
    next(e) {
      e.preventDefault();
      this.changeStep("userinput");
    }
  }
};
</script>

<style>
</style>
