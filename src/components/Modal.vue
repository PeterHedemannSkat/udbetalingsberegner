<template>
  <div
    class="modal fade"
    v-bind:class="addShow ? 'show' : ''"
    tabindex="-1"
    role="dialog"
    style="display:block; background-color: rgba(25,25,25,0.5)"
    @click="$emit('close')"
  >
    <div class="modal-dialog" role="document" @click="e => e.stopPropagation()">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col" v-html="text"></div>
          </div>
          <div class="row mt-3">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["title", "text"],
  data() {
    return {
      addShow: false,
      scrollTop: null
    };
  },
  created() {
    let scrollTop = document.documentElement.scrollTop;
    this.$nextTick(function() {
      this.addShow = true;
      window.requestAnimationFrame(function() {
        window.scrollTo(0, scrollTop);
      });
    });
  }
};
</script>

<style>
</style>
