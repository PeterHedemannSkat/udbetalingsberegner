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
      <hr class="w-100">
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
      <div class="col-sm-4 text-right">-{{formatValuta(fradrag)}}</div>
      <hr class="w-100">
      <div class="col-sm-8">{{texts.ResultAIncome}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(aIndkomst)}}</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
export default {
  name: "ModalCollection",
  props: [
    "lonForSkat",
    "atpArbejdsgiver",
    "atpMedarbejder",
    "amBidrag",
    "fradrag",
    "aIndkomst",
    "texts",
    "showModal"
  ],
  components: { Modal },
  methods: {
    formatValuta(number) {
      number = Number(number);
      return (
        number.toLocaleString("da-DK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + " kr."
      );
    }
  }
};
</script>

<style>
</style>
