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
            <div class="paragraph">
                <p>{{ card.text }}</p>  
            </div>
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
            { url: "/assets/imgs/iconRegister.svg", type: ". Cadastro", text: "Faça seu cadastro para ter acesso aos serviços disponíveis. Se você já possui cadastro, clique em LOGIN."},
            { url: "/assets/imgs/iconConfirmar.svg", type: ". Selecione o Serviço", text: "Escolha o serviço para o qual deseja agendar o atendimento."},
            { url: "/assets/imgs/iconCalendario.svg", type: ". Escolha o dia e horário", text: "Informe o dia e horário, dentre os horários disponíveis e salve o Agendamento."},
            { url: "/assets/imgs/iconFinalizar.svg", type: ". Finalize o agendamento", text: "No dia agendado, dirija-se até o local do atendimento, confirme sua presença e aguarde ser chamado."},
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
    align-items: center;
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
    overflow: hidden;
}

.paragraph {
    width: 100%; 
}

.paragraph p {
    font-size: 1.5rem;
    margin: 0 15px;
    text-align: center;
}

.card-item:hover{
    transform: scale(1.05);
}


</style>