<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>Hvis medarbejder får</h2>
        <p>{{formatValuta(userInput.udbetaltEfterSkat)}}</p>
        <h2>Skal selskabet betale</h2>
        <p>{{formatValuta(selskabetSkalBetale)}}</p>
      </div>
    </div>
    <div class="row bg-white mt-3 pb-3">
      <div class="col-12">
        <h2>Beregning</h2>
      </div>
      <div class="col-6">Lønomkostninger</div>
      <div class="col-6 text-right">{{formatValuta(selskabetSkalBetale)}}</div>
      <div class="col-6">ATP - Arbejdsgiver</div>
      <div class="col-6 text-right">{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-6">Løn før skat</div>
      <div class="col-6 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-6">ATP - Medarbejder</div>
      <div class="col-6 text-right">{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-6">AM-Bidrag (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})</div>
      <div class="col-6 text-right">{{formatValuta(amBidrag)}}</div>
      <div class="col-6">A-skat ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})</div>
      <div class="col-6 text-right">{{formatValuta(aSkat)}}</div>
    </div>
    <div class="row bg-white py-3 mt-3">
      <div class="col">
        <button class="btn btn-primary" @click="$emit('changeStep', 'userinput')">Tilbage</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeWantsCalculation",
  props: ["userInput", "atpMedarbejder", "atpArbejdsgiver"],
  methods: {
    formatValuta(number) {
      // const roundedNumber = Math.round(number * 100) / 100;
      return (
        number.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + " kr."
      );
    },
    fradrag() {
      return this.userInput.skattekort === "hovedkort"
        ? this.userInput.fradrag
        : 0;
    }
  },
  computed: {
    aSkat() {
      return (
        ((this.userInput.udbetaltEfterSkat - this.fradrag()) /
          (100 - this.userInput.traekprocent)) *
        this.userInput.traekprocent
      );
    },
    aIndkomst() {
      return this.userInput.udbetaltEfterSkat - this.fradrag() + this.aSkat;
    },
    amBidrag() {
      return ((this.aIndkomst + this.fradrag()) / 92) * 8;
    },
    lonForSkat() {
      return (
        this.aIndkomst + this.atpMedarbejder + this.amBidrag + this.fradrag()
      );
    },
    selskabetSkalBetale() {
      return (
        this.userInput.udbetaltEfterSkat +
        this.atpMedarbejder +
        this.atpArbejdsgiver +
        this.amBidrag +
        this.aSkat
      );
    }
  }
};
</script>

<style>
</style>
