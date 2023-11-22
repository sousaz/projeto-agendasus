<template>
  <div id="queryForm">
    <form class="form-query">
      <div class="form-header">
        <h1 class="title">Cadastre a consulta</h1>
      </div>
      <div class="input-group">
        <div class="select-group">
          <select name="doctor" id="doctor" class="select" v-model="query.doctor">
            <option value="" selected disabled>Selecione o médico</option>
            <option class="option" v-for="(option, i) in doctorOptions" :key="i" :value="option">{{option.nome }} - {{ option.especialidade}}</option>
          </select>
        </div>
        <div class="input-field">
          <label for="date" class="label">Data</label>
          <input class="inputs" v-model="query.date" type="date" name="date" id="date" />
        </div>
        <div class="input-field">
          <label for="start" class="label"
            >Início do atendimento</label
          >
          <input class="inputs" v-model="query.start" type="time" name="start" id="start" />
        </div>
        <div class="input-field">
          <label for="end" class="label">Término do atendimento</label>
          <input class="inputs" v-model="query.end" type="time" name="end" id="end" />
        </div>
        <div class="input-field">
          <label for="range" class="label"
            >Tempo médio da consulta</label
          >
          <input class="inputs" v-model="query.range" type="number" name="range" id="range" />
        </div>
      <input @click="register()" class="register-btn" type="button" value="Cadastrar" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../services/api"
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { formatDate } from '@vueuse/core'
export default {
  name: "RegisterQueriesComponent",
  data() {
    return {
      doctorOptions: [],
      query: {
        date: "",
        start: "",
        end: "",
        range: Number,
        doctor: "",
      }
    };
  },
  methods: {
    async loadOptions() {
      const url = `/options`;

      try {
        const response = await axios.get(url);
        this.doctorOptions = response.data.medico;
      } catch (error) {
        toast.error(error.response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
      }
    },
    async register() {
      const url = `/query`
      const start = parseInt(this.query.start.split(":")[0] * 60) + parseInt(this.query.start.split(":")[1])
      const end = parseInt(this.query.end.split(":")[0] * 60) + parseInt(this.query.end.split(":")[1])
      try {
        const datas = this.createDataArray(start, end, this.query.range)
        if(!datas) return
        const response = await axios.post(url, {consultas: datas})
        toast.success(response.data["msg"], {
            autoClose: 2000,
            position: 'top-right',
        })
      } catch (error) {
        toast.error(error.response.data["msg"], {
            autoClose: 2000,
            position: 'top-right',
        })
      }
      
    },
    createDataArray(start, end, range) {
      const array = [];
      let currentTime = start;

      while (currentTime <= end) {
        const hour = Math.floor(currentTime / 60)
        const minutes = currentTime % 60
        const hourFormated = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`
        array.push({
          data: formatDate(this.parseDate(this.query.date), "D-MM-YYYY"), 
          id_medico: this.query.doctor._id,
          id_ubs: localStorage.getItem("id"), 
          horario: hourFormated,
        });

        // Incrementa o horário pelo range em milissegundos
        currentTime = currentTime + range;
      }

      return array;
    },
    parseDate(dateString) {
      const [year, month, day] = dateString.split('-');
      return new Date(year, month - 1, day);
    },
  },
  async mounted() {
    this.loadOptions()
  }
};
</script>

<style scoped>
#queryForm {
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "coves";
}

.form-query {
  width: 310px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.212);
}

.input-group {
  background-color: #3a58f0;
  display: flex;
  padding: 20px;
  flex-direction: column;
  border-radius: 20px 0 10px 10px;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin: 5px 20px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3a58f0;
  background-color: #fff;
  width: 100%;
  height: 97px;
  border-radius: 10px 10px 20px 0; 
  text-align: center;
}

.form-header{
  width: 100%;
  height: 97px;
  color: #3a58f0;
  background-color: #3a58f0;
  border-radius: 12px 12px 0 0;
}

.inputs {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #dadff5;
  border-radius: 10px;
  background-color: #fff;
  color: #3a58f0;
}

.register-btn {
  width: calc(100% - 38px);
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #3a58f0;
  cursor: pointer;
  font-family: 'coves';
  margin: 10px 20px;
}

.register-btn:hover {
  transform: scale(1.1);
}

.label {
  color: #fff;
  margin-bottom: 5px;
}

.select {
  color: #3a58f0;
}
</style>