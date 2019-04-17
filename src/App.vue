<template>
  <div class="row" id="app">
    <div class="col pt-3">
      <ProgressBar :stepCount="3" :activeStep="activeStep"/>
      <Loading v-if="step === 'loading'"/>
      <Selection v-if="step === 'selection'"/>
      <AbleToPay v-if="step === 'userinput' && selection === 'able'" :texts="texts"/>
      <AbleToPayCalculation v-if="step === 'conclusion' && selection === 'able'" :texts="texts"/>
      <EmployeeWants v-if="step === 'userinput' && selection === 'want'" :texts="texts"/>
      <EmployeeWantsCalculation
        v-if="step === 'conclusion' && selection === 'want'"
        :texts="texts"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

import Loading from "./components/Loading";
import Selection from "./components/Selection";
import AbleToPay from "./components/AbleToPay";
import AbleToPayCalculation from "./components/AbleToPayCalculation";
import EmployeeWants from "./components/EmployeeWants";
import EmployeeWantsCalculation from "./components/EmployeeWantsCalculation";
import ProgressBar from "./components/ProgressBar";

export default {
  name: "app",
  data() {
    return {
      userInput: {
        selection: null,
        selskabetBetaler: null,
        udbetaltEfterSkat: null,
        udbetalingsFrekvens: null,
        skattekort: null,
        arbejdsTimer: null,
        traekprocent: null,
        fradrag: null
      },
      ATPRates: {
        maanedlig: [],
        fjortendage: []
      }
    };
  },
  components: {
    ProgressBar,
    Loading,
    Selection,
    AbleToPay,
    AbleToPayCalculation,
    EmployeeWants,
    EmployeeWantsCalculation
  },
  methods: {
    ...mapMutations(["setTexts", "setATPRates", "changeStep"])
  },
  computed: {
    ...mapState(["step", "texts", "selection"]),
    ...mapGetters(["activeStep"])
  },
  created() {
    const { setTexts, setATPRates, changeStep } = this;
    let url =
      document.location.hostname === "localhost"
        ? "data.json"
        : "/websrv/jsong.ashx?Id=111229";

    // eslint-disable-next-line
    $.ajax({
      type: "GET",
      url: url,
      xhrFields: {
        withCredentials: true
      },
      success: function(data) {
        let texts = {};
        data[0].children.forEach(text => {
          texts[text.id] = text.da;
        });
        setTexts(texts);
        changeStep("selection");

        let atpRates = {
          maanedlig: [],
          fjortendage: []
        };

        // Konverterer ATP rater json data fra DAP om til et mere fornuftigt format
        data[1].children.forEach(periode => {
          periode.children.forEach(rate => {
            let o = {};
            rate.da.split(",").forEach(property => {
              let [key, value] = property.split(":");
              o[key] = Number(value);
            });
            atpRates[periode.id].push(o);
          });
        });
        setATPRates(atpRates);
      },
      dataType: "JSON"
    });
  }
};
</script>

<style>
body.modal-open {
  overflow: visible;
}
</style>
