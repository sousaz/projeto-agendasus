<template>
  <header class="header">
    <router-link to="/">
    <div class="logo-field">
        <svg
          class="logo"
          xmlns="http://www.w3.org/2000/svg"
          fill="#3a58f0"
          height="1em"
          viewBox="0 0 640 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM288 160c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H352v48c0 8.8-7.2 16-16 16H304c-8.8 0-16-7.2-16-16V272H240c-8.8 0-16-7.2-16-16V224c0-8.8 7.2-16 16-16h48V160z"
          />
        </svg>
        <h1 class="logoName">AGENDASUS</h1>
      </div>
    </router-link>
    <div>
      <router-link v-if="!isLogged" to="/login"><button class="login-btn">Login</button></router-link>
      <button @click="logout()" v-else class="login-btn logout">Sair</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$store.commit('logout')
      this.$router.replace('/');
    }
  },
  computed: {
    isLogged(){
      return this.$store.getters.isLogged
    }
  }
};
</script>
<style>
.header {
  grid-area: header;
}
</style>
<style scoped>
* {
  font-family: "coves";
}

.header{
    display: flex;
    flex-direction: row;
    padding: 30px 60px 30px 60px;
    background-color: #dce2fa;
    justify-content: space-between;
    align-items: center;
}

.logo{
    padding-right: 12px;
    width: 55px;
    height: 55px;
}

.logo-field {
  display: flex;
  align-items: center;
}

.login-btn {
    font-size: 1.2rem;

    color: white;
    border: none;
    padding: 8px 22px;
    border-radius: 7px;
    background-color: #3a58f0;
    transition: 0.4s;
}

.login-btn:hover{
    transform: scale(1.2);
}

.login-btn:active{
    transition: 0.05s;
    transform: scale(0.99);
}

.logoName{
    flex: 1;
    cursor: default;
    color: #3a58f0;
    cursor: pointer;
}

/* h2{
    color:#fff;
} */

.logout {
  background-color: #df6f6f;
  color: black;
  font-size: 1.2rem;
}

/* @media (max-width: 769px) {
  .logoName {
    display: none;
  }
} */

@media (max-width: 481px) {
  .logoName {
    display: none;
  }

  .header{
    padding: 10px 20px;
}
}

</style>