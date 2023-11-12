<template>
  <div id="queryForm">
    <h1 class="title">Cadastre a consulta</h1>
    <form class="form-query">
      <div class="input-group">
        <div class="input-field">
          <label for="type" class="label">Qual o tipo de consulta?</label>
          <input v-model="query.type" type="text" name="type" id="type" />
        </div>
        <div class="input-field">
          <label for="date" class="label">Qual a data?</label>
          <input v-model="query.date" type="date" name="date" id="date" />
        </div>
        <div class="input-field">
          <label for="start" class="label"
            >Quando começara o atendimento?</label
          >
          <input v-model="query.start" type="time" name="start" id="start" />
        </div>
        <div class="input-field">
          <label for="end" class="label">Quando começara o atendimento?</label>
          <input v-model="query.end" type="time" name="end" id="end" />
        </div>
        <div class="input-field">
          <label for="range" class="label"
            >Quanto tempo durará cada consulta em minutos?</label
          >
          <input v-model="query.range" type="number" name="range" id="range" />
        </div>
      </div>
      <div class="select-group">
        <label class="label" for="doctor">Qual o doutor?</label>
        <select v-model="query.doctor" name="doctor" id="doctor" class="select">
          <option class="option" disabled selected value="">Selecione o médico</option>
          <option class="option" v-for="(option, i) in doctorOptions" :key="i" :value="option">{{option.nome}}</option>
        </select>
      </div>
      <input @click="register()" class="register-btn" type="button" value="Cadastrar" />
    </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "RegisterQueriesComponent",
  data() {
    return {
      doctorOptions: [],
      query: {
        type: "",
        date: "",
        start: "",
        end: "",
        range: Number,
        doctor: {},
      }
    };
  },
  methods: {
    async loadOptions() {
      const url = `http://localhost:3333/api/options`;

      try {
        const response = await axios.get(url);
        this.doctorOptions = response.data.nomeMedico;
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      console.log(this.query.type)
      const url = `http://localhost:3333/api/query`
      const start = parseInt(this.query.start.split(":")[0] * 60) + parseInt(this.query.start.split(":")[1])
      const end = parseInt(this.query.end.split(":")[0] * 60) + parseInt(this.query.end.split(":")[1])
      
      const datas = this.createDataArray(start, end, this.query.range)
      if(!datas) return
      const response = await axios.post(url, {consultas: datas})
      console.log(response);
    },
    createDataArray(start, end, range) {
      const array = [];
      let currentTime = start;

      while (currentTime <= end) {
        const hour = Math.floor(currentTime / 60)
        const minutes = currentTime % 60
        const hourFormated = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`
        array.push({
          tipo: this.query.type, // Substitua com as suas informações
          data: this.query.date, 
          id_medico: this.query.doctor._id, 
          id_ubs: "654fc7f21173a198af3f1d17", 
          // id_ubs: localStorage.getItem("id"), 
          horario: hourFormated,
        });

        // Incrementa o horário pelo range em milissegundos
        currentTime = currentTime + range;
      }

      return array;
    },
  },
  async mounted() {
    this.loadOptions()
  }
};
</script>

<style scoped>
#queryForm {
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "coves";
}

.form-query {
  max-width: 400px;
  margin-top: 20px;
  padding: 20px;
  background-color: #3a58f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input-field {
  display: flex;
  flex-direction: column;
}
</style>