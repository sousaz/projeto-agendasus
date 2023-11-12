<template>
  <div id="doctorForm">
    <h1 class="title">Cadastre o médico</h1>
    <form class="form-doctor">
      <div class="input-group">
        <div class="input-field">
          <input
            v-model="doctor.nome"
            class="inputs"
            type="text"
            name="name"
            placeholder="Digite o nome do médico"
            id="name"
          />
        </div>
        <div class="input-field">
          <input
            v-model="doctor.cpf"
            class="inputs"
            v-mask="'###.###.###-##'"
            type="text"
            name="cpf"
            placeholder="Digite o cpf do médico"
            id="cpf"
          />
        </div>
        <div class="input-field">
          <input
            v-model="doctor.crm"
            v-mask="'######/##'"
            class="inputs"
            type="text"
            name="crm"
            placeholder="Digite o crm do médico"
            id="crm"
          />
        </div>
        <div class="input-field">
          <input
            v-model="doctor.especialidade"
            class="inputs"
            type="text"
            name="especialidade"
            placeholder="Digite a especialidade do médico"
            id="especialidade"
          />
        </div>

        <input @click="registerDoctor()" class="register-btn" type="button" value="Cadastrar" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
    name: "RegisterDoctorComponent",
    data() {
        return{
            doctor: {
                nome: "",
                cpf: "",
                crm: "",
                especialidade: "",
            }
        }
    },
    methods: {
        async registerDoctor() {
            const url = `http://localhost:3333/api/doctor`
            try {
                const response = await axios.post(url, this.doctor)
                toast.success(response.data["msg"], {
                    autoClose: 2000,
                    position: 'top-center',
                })
            } catch (error) {
                console.log(error.response.data['msg'])
            }
        }
    }
};
</script>

<style scoped>
#doctorForm {
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "coves";
}

.title {
  color: #3a58f0;
}

.form-doctor {
  max-width: 400px;
  margin-top: 20px;
  padding: 20px;
  background-color: #3a58f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 20px;
}

.inputs {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #dadff5;
  border-radius: 4px;
  background-color: #fff;
  color: #3a58f0;
}

.register-btn {
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  color: #3a58f0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.register-btn:hover {
  background-color: #3a58f0;
  color: #fff;
}
</style>