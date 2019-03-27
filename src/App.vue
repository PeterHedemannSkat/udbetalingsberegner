<template>
  <div class="row" id="app">
    <div class="col">
      <h1>Udbetalingsberegner</h1>
      <Loading v-if="step === 'loading'"/>
      <Selection v-if="step === 'selection'" v-model="userInput" v-on:changeStep="changeStep"/>
      <AbleToPay
        v-if="step === 'userinput' && userInput.selection === 'able'"
        v-model="userInput"
        v-on:changeStep="changeStep"
      />
      <AbleToPayCalculation
        v-if="step === 'conclusion' && userInput.selection === 'able'"
        :userInput="userInput"
        :atpMedarbejder="atpMedarbejder"
        :atpArbejdsgiver="atpArbejdsgiver"
        v-on:changeStep="changeStep"
      />
      <EmployeeWants
        v-if="step === 'userinput' && userInput.selection === 'want'"
        v-model="userInput"
        v-on:changeStep="changeStep"
      />
      <EmployeeWantsCalculation
        v-if="step === 'conclusion' && userInput.selection === 'want'"
        :userInput="userInput"
        :atpMedarbejder="atpMedarbejder"
        :atpArbejdsgiver="atpArbejdsgiver"
        v-on:changeStep="changeStep"
      />
    </div>
  </div>
</template>

<script>
import Loading from "./components/Loading";
import Selection from "./components/Selection";
import AbleToPay from "./components/AbleToPay";
import AbleToPayCalculation from "./components/AbleToPayCalculation";
import EmployeeWants from "./components/EmployeeWants";
import EmployeeWantsCalculation from "./components/EmployeeWantsCalculation";

export default {
  name: "app",
  data() {
    return {
      step: "loading",
      userInput: {
        selection: null,
        selskabetBetaler: 25187,
        udbetaltEfterSkat: 20000,
        udbetalingsFrekvens: "maanedlig",
        skattekort: "hovedkort",
        arbejdsTimer: 160,
        traekprocent: 36,
        fradrag: 6800
      },
      ATPRates: {
        maanedlig: [
          {
            min: 117,
            medarbejder: 94.65,
            arbejdsgiver: 189.35
          },
          {
            min: 78,
            medarbejder: 63.1,
            arbejdsgiver: 126.25
          },
          {
            min: 39,
            medarbejder: 31.55,
            arbejdsgiver: 63.1
          },
          {
            min: 0,
            medarbejder: 0,
            arbejdsgiver: 0
          }
        ],
        fjortendage: [
          {
            min: 54,
            medarbejder: 49.8,
            arbejdsgiver: 99.6
          },
          {
            min: 36,
            medarbejder: 33.2,
            arbejdsgiver: 66.4
          },
          {
            min: 18,
            medarbejder: 16.6,
            arbejdsgiver: 33.2
          }
        ]
      }
    };
  },
  components: {
    Loading,
    Selection,
    AbleToPay,
    AbleToPayCalculation,
    EmployeeWants,
    EmployeeWantsCalculation
  },
  methods: {
    changeStep(step) {
      this.step = step;
    },
    atpRate() {
      if (!this.userInput.arbejdsTimer || !this.userInput.udbetalingsFrekvens) {
        return null;
      }

      if (!this.ATPRates[this.userInput.udbetalingsFrekvens]) {
        return null;
      }

      return this.ATPRates[this.userInput.udbetalingsFrekvens].find(
        rate => rate.min <= this.userInput.arbejdsTimer
      );
    }
  },
  computed: {
    atpArbejdsgiver() {
      let rate = this.atpRate();
      return rate ? rate.arbejdsgiver : null;
    },
    atpMedarbejder() {
      let rate = this.atpRate();
      return rate ? rate.medarbejder : null;
    }
  },
  created() {
    this.step = "selection";
  }
};
</script>

<style>
</style>
