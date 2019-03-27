<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>Hvis selskabet betaler</h2>
        <p>{{formatValuta(userInput.selskabetBetaler)}}</p>
        <h2>Får modtageren udbetalt</h2>
        <p>{{formatValuta(lonEfterSkat)}}</p>
      </div>
    </div>
    <div class="row bg-white py-3 mt-3">
      <div class="col-12">
        <h2>Beregning</h2>
      </div>
      <div class="col-sm-6">Lønomkostninger</div>
      <div class="col-sm-6 text-right">{{formatValuta(userInput.selskabetBetaler)}}</div>
      <div class="col-sm-6">ATP - Arbejdsgiver</div>
      <div class="col-sm-6 text-right">{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-sm-6">Løn før skat</div>
      <div class="col-sm-6 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-6">ATP - Medarbejder</div>
      <div class="col-sm-6 text-right">{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-sm-6">AM-Bidrag (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})</div>
      <div class="col-sm-6 text-right">{{formatValuta(amBidrag)}}</div>
      <div class="col-sm-6">A-skat ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})</div>
      <div class="col-sm-6 text-right">{{formatValuta(aSkat)}}</div>
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
