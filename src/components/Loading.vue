<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  margin: auto;
  width: 50px;
  height: 50px;
  border: solid 2px black;
  border-top: none;
  border-right: none;
  border-radius: 50%;
  animation: spin 0.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
