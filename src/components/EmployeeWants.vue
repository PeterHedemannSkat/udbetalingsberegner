<template>
  <form @submit="next" :class="formValidated ? 'was-validated':''" novalidate>
    <div class="row bg-white py-3">
      <div class="col-12">
        <h2>{{texts.UserInputPaymentInfo}}</h2>
      </div>
      <div class="col d-flex align-items-center">
        <label for="udbetaltEfterSkat">Udbetalt efter skat</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            type="number"
            min="1"
            required
            class="form-control text-right"
            id="udbetaltEfterSkat"
            name="udbetaltEfterSkat"
            :value="udbetaltEfterSkat"
            @input="onInput"
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorAmmountHigherThanZero}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <fieldset>
          <legend>{{texts.UserInputPaymentFrequency}}</legend>
          <div class="custom-control custom-radio">
            <input
              value="maanedlig"
              :checked="udbetalingsFrekvens === 'maanedlig'"
              @input="onInput"
              type="radio"
              id="maanedlig"
              name="udbetalingsFrekvens"
              class="custom-control-input"
              required
            >
            <label
              class="custom-control-label"
              for="maanedlig"
            >{{texts.UserInputPaymentFrequencyMonth}}</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              value="fjortendage"
              :checked="udbetalingsFrekvens === 'fjortendage'"
              @input="onInput"
              type="radio"
              id="fjortendage"
              name="udbetalingsFrekvens"
              class="custom-control-input"
              required
            >
            <label
              class="custom-control-label"
              for="fjortendage"
            >{{texts.UserInputPaymentFrequency14Days}}</label>
            <div class="invalid-feedback">{{texts.ErrorChoosePayPeriod}}</div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col d-flex align-items-center">
        <label for="arbejdsTimer">{{texts.UserInputWorkHours}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            :value="arbejdsTimer"
            name="arbejdsTimer"
            @input="onInput"
            type="number"
            required
            min="1"
            class="form-control text-right"
            aria-label="Antal timer den ansatte arbejder i lønperioden"
          >
          <div class="input-group-append">
            <span class="input-group-text">timer</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorNumberHigherThanZero}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white mt-3 py-3">
      <div class="col">
        <h2>{{texts.UserInputEmployeeTaxInfo}}</h2>
        <fieldset>
          <legend>{{texts.UserInputTaxCard}}</legend>
          <div class="custom-control custom-radio">
            <input
              @input="onInput"
              type="radio"
              id="hovedkort"
              :checked="skattekort === 'hovedkort'"
              value="hovedkort"
              name="skattekort"
              class="custom-control-input"
              required
            >
            <label class="custom-control-label" for="hovedkort">{{texts.UserInputPrimaryTaxCard}}</label>
          </div>
          <div class="custom-control custom-radio">
            <input
              @input="onInput"
              type="radio"
              id="bikort"
              :checked="skattekort === 'bikort'"
              value="bikort"
              name="skattekort"
              class="custom-control-input"
              required
            >
            <label class="custom-control-label" for="bikort">{{texts.UserInputSecondaryTaxCard}}</label>
            <div class="invalid-feedback">{{texts.ErrorChooseTaxCard}}</div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <label for="traekprocent">{{texts.UserInputWithholdingRate}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            :value="traekprocent"
            @input="onInput"
            id="traekprocent"
            name="traekprocent"
            type="number"
            min="1"
            required
            class="form-control text-right"
          >
          <div class="input-group-append">
            <span class="input-group-text">%</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorWithholdingRate}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col">
        <label for="fradrag">{{texts.UserInputDeduction}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            :value="fradrag"
            @input="onInput"
            id="fradrag"
            name="fradrag"
            type="number"
            min="0"
            required
            class="form-control text-right"
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorAmmountHigherThanZero}}</div>
        </div>
      </div>
    </div>
    <div class="row mt-3 bg-white py-3">
      <div class="col d-flex justify-content-between">
        <button type="button" class="btn btn-primary" @click="changeStep('selection')">Tilbage</button>
        <button type="submit" class="btn btn-primary">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "EmployeeWants",
  props: ["value", "texts"],
  data() {
    return { formValidated: false };
  },
  computed: mapState([
    "udbetaltEfterSkat",
    "udbetalingsFrekvens",
    "arbejdsTimer",
    "skattekort",
    "traekprocent",
    "fradrag"
  ]),
  methods: {
    ...mapMutations(["setValue", "setNumber", "changeStep"]),
    next(e) {
      e.preventDefault();
      if (e.target.checkValidity()) {
        this.changeStep("conclusion");
      } else {
        this.formValidated = true;
      }
    },
    onInput(e) {
      const { name, value, type, id } = e.target;

      switch (type) {
        case "number":
          this.setNumber({ field: name, value });
          break;
        case "radio":
          this.setValue({ field: name, value: id });
          break;
      }
    }
  }
};
</script>

<style>
</style>
