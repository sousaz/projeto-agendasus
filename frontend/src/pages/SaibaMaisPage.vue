<template>
  <div>
    <HeaderComponent />
    <SubtitleComponent
      label1='Siga o passo a passo abaixo na tela de "cadastro".'
    />
    <section class="cards">
        <div v-for="(card, i) in cards" :key="i" class="card-item">
            <div class="text">
                <p>{{ i + 1 }}</p><h6>o</h6>
            </div>
            <h5>{{ card.text }}</h5>
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
            { text: "Faça seu cadastro."},
            { text: "Selecione o serviço."},
            { text: "Escolha o dia e horário."},
            { text: "Finalize o agendamento."},
        ]
    }
  }
};
</script>

<style scoped>
* {
    font-family: "coves";
}

h2 {
  color: #fff;
  font-size: 2rem;
}

h5{
    cursor: default;
    color: #fff;
    font-size: 20px;
}


h6{
    cursor: default;
    color: #fff;
    font-size: 20px;
    padding-top: 20px;
}

p{
    cursor: default;
    color: #fff;
    font-size: 150px;
    padding-bottom: 20px;
}


.text{
    display: flex;
    flex-direction: row;
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
    justify-content: center;
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