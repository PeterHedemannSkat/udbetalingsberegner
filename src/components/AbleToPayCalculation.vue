<template>
  <div>
    <h2>Hvis selskabet betaler</h2>
    <p>{{formatValuta(userInput.selskabetBetaler)}}</p>
    <h2>Får modtageren udbetalt</h2>
    <p>{{formatValuta(lonEfterSkat)}}</p>
    <h2>Beregning</h2>
    <hr>
    <div class="row">
      <div class="col-sm-3">Lønomkostninger</div>
      <div class="col-sm-3">{{formatValuta(userInput.selskabetBetaler)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-3">ATP - Arbejdsgiver</div>
      <div class="col-sm-3">{{formatValuta(atpArbejdsgiver)}}</div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">Løn før skat</div>
      <div class="col-sm-3">{{formatValuta(lonForSkat)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-3">ATP - Medarbejder</div>
      <div class="col-sm-3">{{formatValuta(atpMedarbejder)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-3">AM-Bidrag (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})</div>
      <div class="col-sm-3">{{formatValuta(amBidrag)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-3">A-skat ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})</div>
      <div class="col-sm-3">{{formatValuta(aSkat)}}</div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <button class="btn btn-primary" @click="$emit('changeStep', 'userinput')">Tilbage</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AbleToPayCalculation",
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
    }
  },
  computed: {
    lonForSkat() {
      let lonForSkat = this.userInput.selskabetBetaler - this.atpArbejdsgiver;
      return lonForSkat > 0 ? lonForSkat : 0;
    },
    lonEfterSkat() {
      return this.lonForSkat - this.atpMedarbejder - this.amBidrag - this.aSkat;
    },
    amBidrag() {
      return (this.lonForSkat - this.atpMedarbejder) * 0.08;
    },
    aIndkomst() {
      const { skattekort, fradrag } = this.userInput;
      const { lonForSkat, atpMedarbejder, amBidrag } = this;
      const aIndkomst =
        lonForSkat -
        atpMedarbejder -
        amBidrag -
        (skattekort === "hovedkort" ? fradrag : 0);

      return aIndkomst > 0 ? aIndkomst : 0;
    },
    aSkat() {
      return this.aIndkomst * (this.userInput.traekprocent / 100);
    }
  }
};
</script>

<style>
</style>
