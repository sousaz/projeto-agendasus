<template>
  <div>
    <HeaderComponent />
    <SubtitleComponent
      label1="Olá usuário, acesse todas as aplicações "
      label2="que nossa plataforma de agendamento de consultas pode oferecer."
    />
    <section class="section2">
      <div v-for="(card, i) in cards" :key="i" class="card" v-show="card.show !== this.isLogged">
        <img :src="card.url" alt="Icon" />
        <router-link :to="card.to">
          <button class="card-btn">{{ card.text }}</button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SubtitleComponent from "../components/SubtitleComponent.vue";
export default {
  name: "MainPage",
  components: {
    HeaderComponent,
    SubtitleComponent,
  },
  data() {
    return{
      cards: [
        { url: "/assets/imgs/iconAgendar.svg", text: "Cadastre-se.", to: "/", show: true},
        { url: "/assets/imgs/iconConsultar.svg", text: "Agende sua consulta.", to: "/"},
        { url: "/assets/imgs/iconSaiba.svg", text: "Minhas consultas.", to: "/saibaMais", show: false},
        { url: "/assets/imgs/iconSaiba.svg", text: "Saiba Mais.", to: "/saibaMais"},
      ],
    }
  },
  methods: {
  },
  computed: {
    isLogged(){
      return this.$store.getters.isLogged
    }
  }
};
</script>

<style scoped>
* {
 font-family: "coves";
}

.section2{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 30px 130px 30px 130px;
}

img{
    width: 100px;
    padding-bottom: 20px;
}

.card{
    width: 300px;
    height: 400px;
    background-color: #3a58f0; 
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    color: #fff;
    transition: 0.5s;
}

.card-btn{
    border: none;
    padding: 8px 22px;
    border-radius: 7px;
    background-color: #778cf8;
    font-size: 20px;
    transition: 0.5s;
    color: white;
}

.card-btn::after:hover{
    opacity: 100%;
}

.card:hover{
    transform: scale(1.05);
}

.card-btn:active{
    transform: scale(0.8);
    transition: 0.1s;
}
</style>