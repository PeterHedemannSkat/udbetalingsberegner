import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    step: "loading",
    selection: null,
    selskabetBetaler: null,
    udbetaltEfterSkat: null,
    udbetalingsFrekvens: null,
    skattekort: null,
    arbejdsTimer: null,
    traekprocent: null,
    fradrag: null,
    texts: {},
    ATPRates: {
      maanedlig: [],
      fjortendage: []
    }
  },
  getters: {
    activeStep(state) {
      switch (state.step) {
        case "loading":
        case "selection":
          return 1;
        case "userinput":
          return 2;
        case "conclusion":
          return 3;
      }
    },
    aSkat(state, getters) {
      switch (state.selection) {
        case "want":
          return (
            ((state.udbetaltEfterSkat - getters.beregnetFradrag) /
              (100 - state.traekprocent)) *
            state.traekprocent
          );
        case "able":
          return getters.aIndkomst * (state.traekprocent / 100);
      }
    },
    aIndkomst(state, getters) {
      switch (state.selection) {
        case "want":
          return (
            state.udbetaltEfterSkat - getters.beregnetFradrag + getters.aSkat
          );
        case "able": {
          const aIndkomst =
            getters.lonForSkat -
            getters.atpMedarbejder -
            getters.amBidrag -
            getters.beregnetFradrag;

          return aIndkomst > 0 ? aIndkomst : 0;
        }
      }
    },
    amBidrag(state, getters) {
      switch (state.selection) {
        case "want":
          return ((getters.aIndkomst + getters.beregnetFradrag) / 92) * 8;
        case "able":
          return (getters.lonForSkat - getters.atpMedarbejder) * 0.08;
      }
    },
    beregnetFradrag(state) {
      let beregnetFradrag =
        state.skattekort === "hovedkort" ? state.fradrag : 0;

      if (state.udbetalingsFrekvens === "fjortendage") {
        beregnetFradrag = beregnetFradrag * 0.4615;
      }

      return beregnetFradrag;
    },
    lonForSkat(state, getters) {
      switch (state.selection) {
        case "want":
          return (
            getters.aIndkomst +
            getters.atpMedarbejder +
            getters.amBidrag +
            getters.beregnetFradrag
          );
        case "able": {
          let lonForSkat = state.selskabetBetaler - getters.atpArbejdsgiver;
          return lonForSkat > 0 ? lonForSkat : 0;
        }
      }
    },
    lonEfterSkat(state, getters) {
      return (
        getters.lonForSkat -
        getters.atpMedarbejder -
        getters.amBidrag -
        getters.aSkat
      );
    },
    selskabetSkalBetale(state, getters) {
      return (
        state.udbetaltEfterSkat +
        getters.atpMedarbejder +
        getters.atpArbejdsgiver +
        getters.amBidrag +
        getters.aSkat
      );
    },
    atpRate(state) {
      if (!state.arbejdsTimer || !state.udbetalingsFrekvens) {
        return null;
      }

      if (!state.ATPRates[state.udbetalingsFrekvens]) {
        return null;
      }

      return state.ATPRates[state.udbetalingsFrekvens].find(
        rate => rate.min <= state.arbejdsTimer
      );
    },
    atpArbejdsgiver(state, getters) {
      let rate = getters.atpRate;
      return rate ? rate.arbejdsgiver : null;
    },
    atpMedarbejder(state, getters) {
      let rate = getters.atpRate;
      return rate ? rate.medarbejder : null;
    }
  },
  actions: {},
  mutations: {
    changeStep(state, step) {
      state.step = step;
    },
    setTexts(state, texts) {
      state.texts = texts;
    },
    setATPRates(state, rates) {
      state.ATPRates = rates;
    },
    setSelection(state, selection) {
      state.selection = selection;
    },
    setNumber(state, payload) {
      payload.value = Number(payload.value) || null;
      state[payload.field] = payload.value;
    },
    setValue(state, payload) {
      state[payload.field] = payload.value;
    }
  }
});

export default store;
