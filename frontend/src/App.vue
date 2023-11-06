<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
@font-face {
  font-family: "coves";
  src: url("/public/assets/fonts/Coves.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

body{
  background-color: #e8ebf9;
}

</style>
