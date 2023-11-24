<template>
  <div id="doctorForm">
    <form class="form-doctor">
      <div class="form-header">
        <h1 class="title">Cadastre o médico</h1>
      </div>
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
            placeholder="Digite o CPF do médico"
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
            placeholder="Digite o CRM do médico"
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
import axios from "../services/api"
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
                id_ubs: ""
            }
        }
    },
    methods: {
        async registerDoctor() {
            const url = `/doctor`
            try {
                this.doctor.id_ubs = localStorage.getItem("id")
                const response = await axios.post(url, this.doctor)
                toast.success(response.data["msg"], {
                    autoClose: 5000,
                    position: 'top-right',
                })
            } catch (error) {
                toast.error(error.response.data["msg"], {
                    autoClose: 5000,
                    position: 'top-right',
                })
            }
        }
    }
};
</script>

<style scoped>
#doctorForm {
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "coves";
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

.form-doctor {
  margin: 20px auto;  
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
  margin: 10px 20px;
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

@media (max-height: 840px) {
  #doctorForm {
    align-items: flex-start;
  }

  .form-doctor {
    position: block;
    margin-top: 15%;
  }
}

</style>