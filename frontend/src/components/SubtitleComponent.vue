<template>
  <section class="section1">
    <h2>{{ label1 }}</h2>
    <h2>{{ label2 }}</h2>
  </section>
</template>

<script>
export default {
  name: "SubtitleComponent",
  props: {
    label1: {},
    label2: {},
  },
};
</script>

<style scoped>
* {
  font-family: "coves";
}

.section1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-color: #7f95ff;
  cursor: default;
  transition: 0.8s;
  max-height: 100px;
}

h2 {
  color: #fff;
  font-size: 2rem;
}

.section1:hover {
  background-color: #3a58f0;
}

.section1:hover h2 {
  color: #dce2fa;
}

</style>