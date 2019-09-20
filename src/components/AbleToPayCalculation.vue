<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>{{texts.ResultIfCompanyPays}}</h2>
        <p>{{formatValuta(selskabetBetaler)}}</p>
        <h2>{{texts.ResultEmployeeGets}}</h2>
        <p>{{formatValuta(lonEfterSkat)}}</p>
      </div>
    </div>
    <div class="row bg-white py-3 mt-3">
      <div class="col-12">
        <h2>{{texts.ResultCalculation}}</h2>
      </div>
      <div class="col-sm-8">
        {{texts.ResultPayCosts}}
        <button
          type="button"
          @click="showModal = 'payCosts'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">{{formatValuta(selskabetBetaler)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATPEmployer}}
        <button
          type="button"
          @click="showModal = 'atpEmployer'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-12">
        <hr />
      </div>
      <div class="col-sm-8">
        {{texts.ResultPayBeforeTaxes}}
        <button
          type="button"
          @click="showModal = 'payBeforeTaxes'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATPEmployee}}
        <button
          type="button"
          @click="showModal = 'atpEmployee'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-sm-8">
        {{texts.ResultLabourMarketContributions}} (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})
        <button
          type="button"
          @click="showModal = 'labourMarketContributions'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATax}} ({{traekprocent}}% af {{formatValuta(aIndkomst)}})
        <button
          type="button"
          @click="showModal = 'aTax'"
          class="rounded-icon"
        >?</button>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(aSkat)}}</div>
      <div class="col-12">
        <hr />
      </div>
      <div class="col-6">{{texts.ResultPayOut}}</div>
      <div class="col-6 text-right">{{formatValuta(lonEfterSkat)}}</div>
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
  name: "AbleToPayCalculation",
  data() {
    return {
      showModal: null
    };
  },
  props: ["texts"],
  components: { ModalCollection },
  methods: {
    ...mapMutations(["changeStep"]),
    formatValuta
  },
  created() {},
  computed: {
    ...mapGetters([
      "lonEfterSkat",
      "aSkat",
      "aIndkomst",
      "amBidrag",
      "lonForSkat",
      "atpMedarbejder",
      "atpArbejdsgiver"
    ]),
    ...mapState(["traekprocent", "selskabetBetaler"])
  }
};
</script>

<style>
</style>
