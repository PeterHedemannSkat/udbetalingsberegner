<template>
  <div>
    <Modal
      v-if="showModal === 'payCosts'"
      :title="texts.ResultPayCosts"
      :text="texts.ResultPayCostExplanation"
      v-on:close="$emit('close')"
    ></Modal>
    <Modal
      v-if="showModal === 'atpEmployer'"
      :title="texts.ResultATPEmployer"
      :text="texts.ResultATPEmployerExplanation"
      v-on:close="$emit('close')"
    />
    <Modal
      v-if="showModal === 'payBeforeTaxes'"
      :title="texts.ResultPayBeforeTaxes"
      :text="texts.ResultPayBeforeTaxesExplanation"
      v-on:close="$emit('close')"
    />
    <Modal
      v-if="showModal === 'atpEmployee'"
      :title="texts.ResultATPEmployee"
      :text="texts.ResultATPEmployeeExplanation"
      v-on:close="$emit('close')"
    />
    <Modal
      v-if="showModal === 'labourMarketContributions'"
      :title="texts.ResultLabourMarketContributions"
      :text="texts.ResultLabourMarketContributionsExplanation"
      v-on:close="$emit('close')"
    >
      <div class="col-sm-8">{{texts.ResultPayBeforeTaxes}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-8">{{texts.ResultATPEmployee}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-12 p-1">
        <hr class="w-100" />
      </div>
      <div class="col-sm-8">AM grundlag</div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat - atpMedarbejder)}}</div>
    </Modal>
    <Modal
      v-if="showModal === 'aTax'"
      :title="texts.ResultATax"
      :text="texts.ResultATaxExplanation"
      v-on:close="$emit('close')"
    >
      <div class="col-sm-8">{{texts.ResultPayBeforeTaxes}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-8">{{texts.ResultATPEmployee}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-sm-8">{{texts.ResultLabourMarketContributions}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-sm-8">{{texts.UserInputDeduction}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(beregnetFradrag)}}</div>
      <div class="col-12 p-1">
        <hr class="w-100" />
      </div>
      <div class="col-sm-8">{{texts.ResultAIncome}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(aIndkomst)}}</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import { formatValuta } from "../helpers.js";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ModalCollection",
  props: ["showModal"],
  computed: {
    ...mapState(["texts"]),
    ...mapGetters([
      "lonForSkat",
      "atpArbejdsgiver",
      "atpMedarbejder",
      "amBidrag",
      "beregnetFradrag",
      "aIndkomst"
    ])
  },
  components: { Modal },
  methods: {
    formatValuta
  }
};
</script>

<style>
</style>
