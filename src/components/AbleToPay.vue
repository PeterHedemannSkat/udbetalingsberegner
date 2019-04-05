<template>
  <form @submit="next" :class="formValidated ? 'was-validated' : ''" novalidate>
    <div class="row bg-white pt-3">
      <div class="col-sm-12">
        <h2>{{texts.UserInputPaymentInfo}}</h2>
      </div>
      <div class="col-sm-6 d-flex align-items-center">
        <label for="selskabetBetaler">{{texts.UserInputCompanyCanPay}}</label>
      </div>
      <div class="col-sm-6">
        <div class="input-group">
          <input
            id="selskabetBetaler"
            v-model.number="value.selskabetBetaler"
            @input="update('selskabetBetaler', $event.target.value, true)"
            type="number"
            min="1"
            class="form-control text-right"
            aria-label="Beløb selskabet kan betale"
            required
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorAmmountHigherThanZero}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white pt-3">
      <div class="col">
        <fieldset>
          <legend>{{texts.UserInputPaymentFrequency}}</legend>
          <div class="custom-control custom-radio">
            <input
              v-model="value.udbetalingsFrekvens"
              @input="update('udbetalingsFrekvens', $event.target.value)"
              type="radio"
              id="maanedlig"
              name="frequency"
              value="maanedlig"
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
              v-model="value.udbetalingsFrekvens"
              @input="update('udbetalingsFrekvens', $event.target.value)"
              type="radio"
              id="fjortendage"
              name="frequency"
              value="fjortendage"
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
    <div class="row bg-white pb-3">
      <div class="col d-flex align-items-center">
        <label for="arbejdsTimer">{{texts.UserInputWorkHours}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model.number="value.arbejdsTimer"
            @input="update('arbejdsTimer', $event.target.value, true)"
            type="number"
            min="1"
            class="form-control text-right"
            aria-label="Beløb selskabet kan betale"
            required
          >
          <div class="input-group-append">
            <span class="input-group-text">timer</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorNumberHigherThanZero}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white mt-3">
      <div class="col">
        <h2>{{texts.UserInputEmployeeTaxInfo}}</h2>
        <fieldset>
          <legend>{{texts.UserInputTaxCard}}</legend>
          <div class="custom-control custom-radio">
            <input
              v-model="value.skattekort"
              @input="update('skattekort', $event.target.value)"
              type="radio"
              id="hovedkort"
              value="hovedkort"
              name="skattekort"
              class="custom-control-input"
              required
            >
            <label class="custom-control-label" for="hovedkort">{{texts.UserInputPrimaryTaxCard}}</label>
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
              required
            >
            <label class="custom-control-label" for="bikort">{{texts.UserInputSecondaryTaxCard}}</label>
            <div class="invalid-feedback">{{texts.ErrorChooseTaxCard}}</div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col d-flex align-items-center">
        <label for="traekprocent">{{texts.UserInputWithholdingRate}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model.number="value.traekprocent"
            @input="update('traekprocent', $event.target.value, true)"
            id="traekprocent"
            type="number"
            class="form-control text-right"
            required
            min="25"
            max="55"
          >
          <div class="input-group-append">
            <span class="input-group-text">%</span>
          </div>
          <div class="invalid-feedback">{{texts.ErrorWithholdingRate}}</div>
        </div>
      </div>
    </div>
    <div class="row bg-white py-3">
      <div class="col d-flex align-items-center">
        <label for="fradrag">{{texts.UserInputDeduction}}</label>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model="value.fradrag"
            @input="update('fradrag', $event.target.value, true)"
            id="fradrag"
            type="number"
            min="1"
            required
            class="form-control text-right"
          >
          <div class="input-group-append">
            <span class="input-group-text">kr.</span>
          </div>
          <div class="invalid-feedback">ErrorAmmountHigherThanZero</div>
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
        <button type="submit" class="btn btn-primary">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "AbleToPay",
  data() {
    return {
      formValidated: false
    };
  },
  props: ["value", "texts"],
  computed: {},
  methods: {
    next(e) {
      e.preventDefault();
      if (e.target.checkValidity()) {
        this.$emit("changeStep", "conclusion");
      } else {
        this.formValidated = true;
      }
    },
    update(key, value, isNumber) {
      if (isNumber) {
        value = Number(value) || null;
      }
      this.$emit("input", { ...this.value, [key]: value });
    }
  }
};
</script>

<style>
</style>
