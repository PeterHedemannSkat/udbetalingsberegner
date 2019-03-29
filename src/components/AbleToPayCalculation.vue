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
    <Modal
      v-if="showModal === 'payCosts'"
      :title="texts.ResultPayCosts"
      :text="texts.ResultPayCostExplanation"
      v-on:close="closeModal"
    ></Modal>
    <Modal
      v-if="showModal === 'atpEmployer'"
      :title="texts.ResultATPEmployer"
      :text="texts.ResultATPEmployerExplanation"
      v-on:close="closeModal"
    />
    <Modal
      v-if="showModal === 'payBeforeTaxes'"
      :title="texts.ResultPayBeforeTaxes"
      :text="texts.ResultPayBeforeTaxesExplanation"
      v-on:close="closeModal"
    />
    <Modal
      v-if="showModal === 'atpEmployee'"
      :title="texts.ResultATPEmployee"
      :text="texts.ResultATPEmployeeExplanation"
      v-on:close="closeModal"
    />
    <Modal
      v-if="showModal === 'atpEmployee'"
      :title="texts.ResultATPEmployee"
      :text="texts.ResultATPEmployeeExplanation"
      v-on:close="closeModal"
    />
    <Modal
      v-if="showModal === 'labourMarketContributions'"
      :title="texts.ResultLabourMarketContributions"
      :text="texts.ResultLabourMarketContributionsExplanation"
      v-on:close="closeModal"
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
      v-on:close="closeModal"
    >
      <div class="col-sm-8">{{texts.ResultPayBeforeTaxes}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(lonForSkat)}}</div>
      <div class="col-sm-8">{{texts.ResultATPEmployee}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(atpMedarbejder)}}</div>
      <div class="col-sm-8">{{texts.ResultLabourMarketContributions}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(amBidrag)}}</div>
      <div class="col-sm-8">{{texts.UserInputDeduction}}</div>
      <div class="col-sm-4 text-right">-{{formatValuta(this.userInput.fradrag)}}</div>
      <hr class="w-100">
      <div class="col-sm-8">{{texts.ResultAIncome}}</div>
      <div class="col-sm-4 text-right">{{formatValuta(aIndkomst)}}</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "AbleToPayCalculation",
  data() {
    return {
      showModal: null
    };
  },
  components: { Modal },
  props: ["texts", "userInput", "atpMedarbejder", "atpArbejdsgiver"],
  methods: {
    formatValuta(number) {
      number = Number(number);
      return (
        number.toLocaleString("da-DK", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) + " kr."
      );
    },
    closeModal() {
      this.showModal = null;
    }
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
