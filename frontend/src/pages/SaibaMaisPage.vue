<template>
  <div>
    <HeaderComponent />
    <SubtitleComponent
      label1='Agendar consultas online nunca foi tão simples.'
      label2='Veja como funciona!'
    />
    <section class="cards">
        <div v-for="(card, i) in cards" :key="i" class="card-item">
            <div class="text">
                <img class="icon" :src="card.url" alt="Icon" />
                <h3>{{ i + 1 + card.type }}</h3>
            </div>
            <p>{{ card.text }}</p>
        </div>
    </section>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SubtitleComponent from "../components/SubtitleComponent.vue";
export default {
  name: "SaibaMaisPage",
  components: {
    HeaderComponent,
    SubtitleComponent,
  },
  data() {
    return {
        cards: [
            { url: "/assets/imgs/iconRegister.svg", type: ". Cadastro", text: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaFaça seu cadastro."},
            { url: "", type: "", text: "Selecione o serviço."},
            { url: "", type: "", text: "Escolha o dia e horário."},
            { url: "", type: "", text: "Finalize o agendamento."},
        ]
    }
  }
};
</script>

<style scoped>
* {
    font-family: "coves";
}

.icon {
    width: 100px;
}


.text{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cards{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 40px;
}

.card-item{
    width: 300px;
    height: 400px;
    background-color: #3a58f0; 
    border-radius: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
    color: #fff;
    transition: 0.5s;
}
.card-item:hover{
    transform: scale(1.05);
}
.card-item:hover h6{
    transform: scale(1.2);
    transition: 1s;
}
.card-item:hover p{
    transform: scale(1.2);
    transition: 1s;
}
.card-item:hover h5{
    transition: 1s;
    transform: scale(1.2);
}

</style>