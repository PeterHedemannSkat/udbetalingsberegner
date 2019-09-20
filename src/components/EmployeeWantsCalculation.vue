<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>{{texts.ResultIfEmployeeGets}}</h2>
        <p>{{formatValuta(udbetaltEfterSkat)}}</p>
        <h2>{{texts.ResultCompanyHasToPay}}</h2>
        <p>{{formatValuta(selskabetSkalBetale)}}</p>
      </div>
    </div>
    <div class="row bg-white mt-3 pb-3">
      <div class="col-12">
        <h2>{{texts.ResultCalculation}}</h2>
      </div>
      <div class="col-8">
        {{texts.ResultPayCosts}}
        <button
          type="button"
          @click="showModal = 'payCosts'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">{{formatValuta(selskabetSkalBetale)}}</div>
      <div class="col-8">
        {{texts.ResultATPEmployer}}
        <button
          type="button"
          @click="showModal = 'atpEmployer'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">-{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-12">
        <hr />
      </div>
      <div class="col-8">
        {{texts.ResultPayBeforeTaxes}}
        <button
          type="button"
          @click="showModal = 'payBeforeTaxes'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-8">
        {{texts.ResultATPEmployee}}
        <button
          type="button"
          @click="showModal = 'atpEmployee'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-8">
        {{texts.ResultLabourMarketContributions}} (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})
        <button
          type="button"
          @click="showModal = 'labourMarketContributions'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-8">
        {{texts.ResultATax}} ({{traekprocent}}% af {{formatValuta(aIndkomst)}})
        <button
          type="button"
          @click="showModal = 'aTax'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-4 text-right">-{{formatValuta(aSkat)}}</div>
      <div class="col-12">
        <hr />
      </div>
      <div class="col-8">{{texts.ResultPayOut}}</div>
      <div class="col-4 text-right">{{formatValuta(udbetaltEfterSkat)}}</div>
    </div>
    <div class="row bg-white py-3 mt-3">
      <div class="col">
        <button class="btn btn-primary" @click="changeStep('userinput')">Tilbage</button>
      </div>
    </div>
    <ModalCollection v-on:close="showModal=null" v-bind:showModal="showModal" />
  </div>
</template>
<script>
import ModalCollection from "./ModalCollection";
import { formatValuta } from "../helpers";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "EmployeeWantsCalculation",
  props: ["texts"],
  components: { ModalCollection },
  data() {
    return {
      showModal: null
    };
  },
  methods: {
    ...mapMutations(["changeStep"]),
    formatValuta
  },
  computed: {
    ...mapGetters([
      "traekprocent",
      "beregnetFradrag",
      "aSkat",
      "aIndkomst",
      "amBidrag",
      "lonForSkat",
      "selskabetSkalBetale",
      "atpMedarbejder",
      "atpArbejdsgiver"
    ]),
    ...mapState(["traekprocent", "udbetaltEfterSkat"])
  }
};
</script>

<style>
</style>