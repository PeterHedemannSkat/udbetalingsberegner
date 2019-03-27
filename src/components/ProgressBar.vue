<template>
  <div class="row bg-white py-3 mb-3">
    <div class="col">
      <ul class="navbar-wizard">
        <li v-for="n in stepCount" :key="n" :class="n === activeStep ? 'active':''">
          <span>{{n}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    stepCount: Number,
    activeStep: Number
  }
};
</script>

<style>
</style>
