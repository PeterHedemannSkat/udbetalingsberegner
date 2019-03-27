<template>
  <form @submit="next">
    <div class="row bg-white py-3">
      <div class="col d-flex align-items-center">
        <label for="udbetaltEfterSkat">Udbetalt efter skat</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            type="text"
            class="form-control text-right"
            id="udbetaltEfterSkat"
            v-model.number="value.udbetaltEfterSkat"
            @input="update('udbetaltEfterSkat', $event.target.value)"
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <fieldset>
          <legend>Udbetalingsfrekvens</legend>
          <div class="custom-control custom-radio">
            <input
              v-model="value.udbetalingsFrekvens"
              @input="update('udbetalingsFrekvens', $event.target.value)"
              type="radio"
              id="maanedlig"
              name="frequency"
              value="maanedlig"
              class="custom-control-input"
            >
            <label class="custom-control-label" for="maanedlig">Måned</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              v-model="value.udbetalingsFrekvens"
              @input="update('udbetalingsFrekvens', $event.target.value)"
              type="radio"
              id="fjortendage"
              name="frequency"
              value="fjortendage"
              class="custom-control-input"
            >
            <label class="custom-control-label" for="fjortendage">14 dage</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col d-flex align-items-center">
        <label for="arbejdsTimer">Arbejdstimer</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model.number="value.arbejdsTimer"
            @input="update('arbejdsTimer', $event.target.value)"
            type="text"
            class="form-control text-right"
            aria-label="Beløb selskabet kan betale"
          >
          <div class="input-group-append">
            <span class="input-group-text">timer</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white mt-3 py-3">
      <div class="col">
        <h2>Oplysninger om den ansattes skattekort</h2>
        <fieldset>
          <legend>skattekort</legend>
          <div class="custom-control custom-radio">
            <input
              v-model="value.skattekort"
              @input="update('skattekort', $event.target.value)"
              type="radio"
              id="hovedkort"
              value="hovedkort"
              name="skattekort"
              class="custom-control-input"
            >
            <label class="custom-control-label" for="hovedkort">Hovedkort</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              v-model="value.skattekort"
              @input="update('skattekort', $event.target.value)"
              type="radio"
              id="bikort"
              value="bikort"
              name="skattekort"
              class="custom-control-input"
            >
            <label class="custom-control-label" for="bikort">Bikort</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <label for="traekprocent">Trækprocent</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model.number="value.traekprocent"
            @input="update('traekprocent', $event.target.value)"
            id="traekprocent"
            type="text"
            class="form-control text-right"
          >
          <div class="input-group-append">
            <span class="input-group-text">%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <label for="fradrag">Månedsfradrag</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model="value.fradrag"
            @input="update('traekprocent', $event.target.value)"
            id="fradrag"
            type="text"
            class="form-control text-right"
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 bg-white py-3">
      <div class="col d-flex justify-content-between">
        <button
          type="button"
          class="btn btn-primary"
          @click="$emit('changeStep', 'selection')"
        >Tilbage</button>
        <button type="submit" :disabled="!canProceed" class="btn btn-primary">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "EmployeeWants",
  props: ["value"],
  computed: {
    canProceed() {
      return this.value.udbetaltEfterSkat &&
        this.value.udbetalingsFrekvens &&
        this.value.arbejdsTimer &&
        this.value.skattekort &&
        this.value.traekprocent &&
        this.value.fradrag
        ? true
        : false;
    }
  },
  methods: {
    next(e) {
      e.preventDefault();
      this.$emit("changeStep", "conclusion");
    },
    update(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
    }
  }
};
</script>

<style>
</style>
