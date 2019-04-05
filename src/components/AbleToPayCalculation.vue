<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>{{texts.ResultIfCompanyPays}}</h2>
        <p>{{formatValuta(userInput.selskabetBetaler)}}</p>
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
        <a href="#" @click="showModal = 'payCosts'" class="rounded-icon">?</a>
      </div>
      <div class="col-sm-4 text-right">{{formatValuta(userInput.selskabetBetaler)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATPEmployer}}
        <a
          href="#"
          @click="showModal = 'atpEmployer'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-12">
        <hr>
      </div>
      <div class="col-sm-8">
        {{texts.ResultPayBeforeTaxes}}
        <a
          href="#"
          @click="showModal = 'payBeforeTaxes'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATPEmployee}}
        <a
          href="#"
          @click="showModal = 'atpEmployee'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-sm-8">
        {{texts.ResultLabourMarketContributions}} (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})
        <a
          href="#"
          @click="showModal = 'labourMarketContributions'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-sm-8">
        {{texts.ResultATax}} ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})
        <a
          href="#"
          @click="showModal = 'aTax'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-sm-4 text-right">-{{formatValuta(aSkat)}}</div>
      <div class="col-12">
        <hr>
      </div>
      <div class="col-6">{{texts.ResultPayOut}}</div>
      <div class="col-6 text-right">{{formatValuta(lonEfterSkat)}}</div>
    </div>
    <div class="row bg-white py-3 mt-3">
      <div class="col">
        <button class="btn btn-primary" @click="$emit('changeStep', 'userinput')">Tilbage</button>
      </div>
    </div>
    <ModalCollection
      v-bind:lonForSkat="lonForSkat"
      v-bind:atpArbejdsgiver="atpArbejdsgiver"
      v-bind:atpMedarbejder="atpMedarbejder"
      v-bind:amBidrag="amBidrag"
      v-bind:fradrag="fradrag(this.userInput)"
      v-bind:aIndkomst="aIndkomst"
      v-bind:texts="texts"
      v-bind:showModal="showModal"
      v-on:close="showModal=null"
    />
  </div>
</template>

<script>
import ModalCollection from "./ModalCollection";
import { formatValuta, fradrag } from "../helpers";

export default {
  name: "AbleToPayCalculation",
  data() {
    return {
      showModal: null
    };
  },
  components: { ModalCollection },
  props: ["texts", "userInput", "atpMedarbejder", "atpArbejdsgiver"],
  methods: {
    formatValuta,
    fradrag
  },
  created() {},
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
      const { lonForSkat, atpMedarbejder, amBidrag } = this;
      const aIndkomst =
        lonForSkat - atpMedarbejder - amBidrag - fradrag(this.userInput);

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
