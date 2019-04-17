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
            v-model.number="selskabetBetaler"
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
              v-model="udbetalingsFrekvens"
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
              v-model="udbetalingsFrekvens"
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
            v-model.number="arbejdsTimer"
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
              v-model="skattekort"
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
              v-model="skattekort"
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
            v-model.number="traekprocent"
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
            v-model="fradrag"
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
        <button type="button" class="btn btn-primary" @click="changeStep('selection')">Tilbage</button>
        <button type="submit" class="btn btn-primary">Næste</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "AbleToPay",
  data() {
    return {
      formValidated: false
    };
  },
  props: ["texts"],
  computed: {
    selskabetBetaler: {
      get() {
        return this.$store.state.selskabetBetaler;
      },
      set(value) {
        value = Number(value) || null;
        this.setNumber({ field: "selskabetBetaler", value });
      }
    },
    udbetalingsFrekvens: {
      get() {
        return this.$store.state.udbetalingsFrekvens;
      },
      set(value) {
        this.setValue({ field: "udbetalingsFrekvens", value });
      }
    },
    arbejdsTimer: {
      get() {
        return this.$store.state.arbejdsTimer;
      },
      set(value) {
        value = Number(value) || null;
        this.setNumber({ field: "arbejdsTimer", value });
      }
    },
    skattekort: {
      get() {
        return this.$store.state.skattekort;
      },
      set(value) {
        this.setValue({ field: "skattekort", value });
      }
    },
    traekprocent: {
      get() {
        return this.$store.state.traekprocent;
      },
      set(value) {
        value = Number(value) || null;
        this.setNumber({ field: "traekprocent", value });
      }
    },
    fradrag: {
      get() {
        return this.$store.state.fradrag;
      },
      set(value) {
        value = Number(value) || null;
        this.setNumber({ field: "fradrag", value });
      }
    }
  },
  methods: {
    ...mapMutations(["setValue", "setNumber", "changeStep"]),
    next(e) {
      e.preventDefault();
      if (e.target.checkValidity()) {
        this.changeStep("conclusion");
      } else {
        this.formValidated = true;
      }
    }
  }
};
</script>

<style>
</style>
