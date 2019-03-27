<template>
  <div>
    <h2>Hvis medarbejder får</h2>
    <p>{{formatValuta(userInput.udbetaltEfterSkat)}}</p>
    <h2>Skal selskabet betale</h2>
    <p>{{formatValuta(selskabetSkalBetale)}}</p>
    <h2>Beregning</h2>
    <hr>
    <div class="row">
      <div class="col-sm-6">Lønomkostninger</div>
      <div class="col-sm-6">{{formatValuta(selskabetSkalBetale)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">ATP - Arbejdsgiver</div>
      <div class="col-sm-6">{{formatValuta(atpArbejdsgiver)}}</div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-6">Løn før skat</div>
      <div class="col-sm-6">{{formatValuta(lonForSkat)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">ATP - Medarbejder</div>
      <div class="col-sm-6">{{formatValuta(atpMedarbejder)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">AM-Bidrag (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})</div>
      <div class="col-sm-6">{{formatValuta(amBidrag)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">A-skat ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})</div>
      <div class="col-sm-6">{{formatValuta(aSkat)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <button class="btn btn-primary" @click="$emit('changeStep', 'userinput')">Tilbage</button>
      </div>
    </div>
    <hr>
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
