<template>
  <div>
    <div class="row text-center bg-white">
      <div class="col">
        <h2>{{texts.ResultIfEmployeeGets}}</h2>
        <p>{{formatValuta(userInput.udbetaltEfterSkat)}}</p>
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
        <a href="#" @click="showModal = 'payCosts'" class="rounded-icon">?</a>
      </div>
      <div class="col-4 text-right">{{formatValuta(selskabetSkalBetale)}}</div>
      <div class="col-8">
        {{texts.ResultATPEmployer}}
        <a
          href="#"
          @click="showModal = 'atpEmployer'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-4 text-right">-{{formatValuta(atpArbejdsgiver)}}</div>
      <div class="col-12">
        <hr>
      </div>
      <div class="col-8">
        {{texts.ResultPayBeforeTaxes}}
        <a
          href="#"
          @click="showModal = 'payBeforeTaxes'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-8">
        {{texts.ResultATPEmployee}}
        <a
          href="#"
          @click="showModal = 'atpEmployee'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-8">
        {{texts.ResultLabourMarketContributions}} (8% af {{formatValuta(lonForSkat - atpMedarbejder)}})
        <a
          href="#"
          @click="showModal = 'labourMarketContributions'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-8">
        {{texts.ResultATax}} ({{userInput.traekprocent}}% af {{formatValuta(aIndkomst)}})
        <a
          href="#"
          @click="showModal = 'aTax'"
          class="rounded-icon"
        >?</a>
      </div>
      <div class="col-4 text-right">-{{formatValuta(aSkat)}}</div>
      <div class="col-12">
        <hr>
      </div>
      <div class="col-8">{{texts.ResultPayOut}}</div>
      <div class="col-4 text-right">{{formatValuta(userInput.udbetaltEfterSkat)}}</div>
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
      v-bind:fradrag="this.fradrag(this.userInput)"
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
  name: "EmployeeWantsCalculation",
  props: ["texts", "userInput", "atpMedarbejder", "atpArbejdsgiver"],
  components: { ModalCollection },
  data() {
    return {
      showModal: null
    };
  },
  methods: {
    formatValuta,
    fradrag
  },
  computed: {
    aSkat() {
      return (
        ((this.userInput.udbetaltEfterSkat - this.fradrag(this.userInput)) /
          (100 - this.userInput.traekprocent)) *
        this.userInput.traekprocent
      );
    },
    aIndkomst() {
      return (
        this.userInput.udbetaltEfterSkat -
        this.fradrag(this.userInput) +
        this.aSkat
      );
    },
    amBidrag() {
      return ((this.aIndkomst + this.fradrag(this.userInput)) / 92) * 8;
    },
    lonForSkat() {
      return (
        this.aIndkomst +
        this.atpMedarbejder +
        this.amBidrag +
        this.fradrag(this.userInput)
      );
    },
    selskabetSkalBetale() {
      return (
        Number(this.userInput.udbetaltEfterSkat) +
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
