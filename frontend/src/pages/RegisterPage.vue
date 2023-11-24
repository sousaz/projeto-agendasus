<template>
  <div class="body">
    <div class="container">
      <form class="form">
        <div class="form-header">
          <div class="title">
            <h1>Cadastre-se</h1>
          </div>
          <div>
            <router-link to="/login"
              ><button class="entrar-botao">Login</button></router-link
            >
          </div>
        </div>
        <div class="form-group">
          <div v-show="currentForm === 0" class="box-dadosPessoais box">
            <legend><p>Dados pessoais</p></legend>
            <label for="firstname">Primeiro Nome</label>
            <input
              :class="{ validacao: !validations.name }"
              v-model="user.name"
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Digite seu primeiro nome"
              class="required"
            />
            <span v-show="!validations.name" class="validacao"
              >Nome deve ter no mínimo 3 caracteres!</span
            >

            <label for="lastname">Sobrenome</label>
            <input
              :class="{ validacao: !validations.lastName }"
              v-model="user.lastName"
              id="lastname"
              type="text"
              name="lastname"
              placeholder="Digite seu sobrenome"
              class="required"
            />
            <span v-show="!validations.lastName" class="validacao"
              >Sobrenome deve ter no mínimo 3 caracteres!</span
            >

            <label for="cpf">CPF</label>
            <input
              :class="{ validacao: !validations.cpf }"
              v-model="user.cpf"
              v-mask="'###.###.###-##'"
              id="cpf"
              type="text"
              name="cpf"
              placeholder="Digite seu CPF"
              maxlength="14"
              class="required"
            />
            <span v-show="!validations.cpf" class="validacao"
              >CPF inválido!</span
            >

            <label for="sus">Número do cartão do SUS</label>
            <input
              :class="{ validacao: !validations.susNumber }"
              v-model="user.susNumber"
              v-mask="'### #### #### ####'"
              id="sus"
              type="text"
              name="sus"
              placeholder="Digite o número do seu cartão SUS"
              maxlength="18"
              class="required"
            />
            <span v-show="!validations.susNumber" class="validacao"
              >Número do seu cartão SUS inválido!</span
            >

            <label for="telefone">Número do telefone</label>
            <input
              :class="{ validacao: !validations.telephone }"
              v-model="user.telephone"
              v-mask="'(##) #####-####'"
              id="telefone"
              type="text"
              name="telefone"
              placeholder="Digite o seu telefone"
              maxlength="15"
              class="required"
            />
            <span v-show="!validations.telephone" class="validacao"
              >Telefone inválido!</span
            >

            <label for="date">Data de Nascimento</label>
            <input
              :class="{ validacao: !validations.birthday }"
              v-model="user.birthday"
              type="date"
              id="start"
              name="date"
              class="required"
            />
            <span v-show="!validations.birthday" class="validacao"
              >Data inválida!</span
            >
          </div>

          <div v-show="currentForm === 1" class="box-endereco box">
            <legend><p>Endereço</p></legend>
            <label for="cep">Cep</label>
            <input
              :class="{ validacao: !validations.cep }"
              v-model="user.cep"
              id="cep"
              type="text"
              name="cep"
              size="10"
              maxlength="9"
              placeholder="Digite seu cep"
              @blur="handleCep()"
              class="required"
            />
            <span v-show="!validations.cep" class="validacao"
              >Cep inválido!</span
            >

            <label for="rua">Rua</label>
            <input
              :class="{ validacao: !validations.street }"
              v-model="user.street"
              id="rua"
              type="text"
              name="rua"
              placeholder="Digite a rua"
              class="required"
            />
            <span v-show="!validations.street" class="validacao"
              >Rua inválida!</span
            >

            <label for="numeroCasa">Número</label>
            <input
              :class="{ validacao: !validations.houseNumber }"
              v-model="user.houseNumber"
              id="numeroCasa"
              type="text"
              name="numeroCasa"
              placeholder="Digite o numero da casa"
              class="required"
            />
            <span v-show="!validations.houseNumber" class="validacao"
              >Número inválido!</span
            >

            <label for="bairro">Bairro</label>
            <input
              :class="{ validacao: !validations.neighborhood }"
              v-model="user.neighborhood"
              id="bairro"
              type="text"
              name="bairro"
              placeholder="Digite o bairro"
              class="required"
            />
            <span v-show="!validations.neighborhood" class="validacao"
              >Bairro inválido!</span
            >

            <label for="city">Cidade</label>
            <input
              :class="{ validacao: !validations.city }"
              v-model="user.city"
              id="cidade"
              type="text"
              name="cidade"
              size="40"
              placeholder="Digite a cidade"
              class="required"
            />
            <span v-show="!validations.city" class="validacao"
              >Cidade inválida!</span
            >

            <label for="state">Estado</label>
            <input
              :class="{ validacao: !validations.state }"
              v-model="user.state"
              id="uf"
              type="text"
              name="uf"
              size="40"
              placeholder="Digite o estado"
              class="required"
            />
            <span v-show="!validations.state" class="validacao"
              >Estado inválido!</span
            >
          </div>

          <div v-show="currentForm === 2" class="box-login box">
            <legend><p>Login</p></legend>
            <label for="email">E-mail</label>
            <input
              :class="{ validacao: !validations.email }"
              v-model="user.email"
              id="email"
              type="email"
              name="email"
              data-mask="email"
              placeholder="Digite seu email"
              class="required"
            />
            <span v-show="!validations.email" class="validacao"
              >Email inválido!</span
            >

            <label for="password">Senha</label>
            <input
              :class="{ validacao: !validations.password }"
              v-model="user.password"
              id="senha"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              size="20"
              class="required"
            />
            <span v-show="!validations.password" class="validacao"
              >A senha deve conter no mínimo 8 caracteres!</span
            >

            <label for="confirmpassword">Confirme sua senha</label>
            <input
              :class="{ validacao: !validations.confirmPassword }"
              v-model="user.confirmPassword"
              id="validacaoSenha"
              type="password"
              name="confirmpassword"
              placeholder="Digite novamente a senha"
              size="20"
              class="required"
            />
            <span v-show="!validations.confirmPassword" class="validacao"
              >As senhas não conferem!</span
            >
          </div>

          <div class="form-gender-group box">
            <div class="divisao">
              <div class="gender-title">
                <legend><p>Gênero</p></legend>
              </div>

              <div class="box-gender">
                <div class="linha-genero">
                  <input type="radio" id="famale" name="gender" />
                  <label for="famale">Feminino</label>
                </div>

                <div class="linha-genero">
                  <input type="radio" id="male" name="gender" />
                  <label for="male">Masculino</label>
                </div>

                <div class="linha-genero">
                  <input type="radio" id="others" name="gender" />
                  <label for="others">Outros</label>
                </div>
              </div>
            </div>
          </div>
          <div class="divisao">
            <div class="div-botao-ok">
              <button type="button" @click="backForm()" class="botao-voltar">
                Voltar
              </button>
              <button
                type="button"
                @click="nextForm()"
                v-if="currentForm < 2"
                class="botao-continuar"
              >
                Continuar
              </button>
              <button type="button" @click="sendForm()" v-else class="botao-ok">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../services/api";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css' 
import { formatDate } from "@vueuse/core"
export default {
  name: "CadastrarPage",
  data() {
    return {
      currentForm: 0,
      user: {
        name: "",
        lastName: "",
        cpf: "",
        susNumber: "",
        telephone: "",
        birthday: "",
        cep: "",
        street: "",
        houseNumber: "",
        neighborhood: "",
        city: "",
        state: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validations: {
        name: true,
        lastName: true,
        cpf: true,
        susNumber: true,
        telephone: true,
        birthday: true,
        cep: true,
        street: true,
        houseNumber: true,
        neighborhood: true,
        city: true,
        state: true,
        email: true,
        password: true,
        confirmPassword: true,
      },
    };
  },
  methods: {
    nextForm() {
      if (this.currentForm === 0 && this.form1Validation() === false) return;
      if (this.currentForm === 1 && this.form2Validation() === false) return;
      return this.currentForm < 2 ? this.currentForm++ : this.currentForm;
    },
    backForm() {
      if(this.currentForm === 0) {
        this.$router.push("/")
      }
      return this.currentForm === 0 ? this.currentForm : this.currentForm--;
    },
    sendForm() {
      if (this.currentForm === 2 && this.form3Validation() === false) return;
      this.register();
    },
    nameValidation() {
      return this.user.name.length < 3
        ? (this.validations.name = false)
        : (this.validations.name = true);
    },
    lastNameValidation() {
      return this.user.lastName.length < 3
        ? (this.validations.lastName = false)
        : (this.validations.lastName = true);
    },
    cpfValidation() {
      return this.user.cpf.length < 14
        ? (this.validations.cpf = false)
        : (this.validations.cpf = true);
    },
    susNumberValidation() {
      return this.user.susNumber.length < 18
        ? (this.validations.susNumber = false)
        : (this.validations.susNumber = true);
    },
    telephoneValidation() {
      return this.user.telephone.length < 15
        ? (this.validations.telephone = false)
        : (this.validations.telephone = true);
    },
    birthdayValidation() {
      const dataRegex = /(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;
      return !dataRegex.test(this.user.birthday)
        ? (this.validations.birthday = false)
        : (this.validations.birthday = true);
    },
    cepValidation() {
      return this.user.cep.length < 8
        ? (this.validations.cep = false)
        : (this.validations.cep = true);
    },
    streetValidation() {
      return this.user.street.length < 3
        ? (this.validations.street = false)
        : (this.validations.street = true);
    },
    houseNumberValidation() {
      return this.user.houseNumber.length < 1
        ? (this.validations.houseNumber = false)
        : (this.validations.houseNumber = true);
    },
    neighborhoodValidation() {
      return this.user.neighborhood.length < 3
        ? (this.validations.neighborhood = false)
        : (this.validations.neighborhood = true);
    },
    cityValidation() {
      return this.user.city.length < 3
        ? (this.validations.city = false)
        : (this.validations.city = true);
    },
    stateValidation() {
      return this.user.state.length < 1
        ? (this.validations.state = false)
        : (this.validations.state = true);
    },
    emailValidation() {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return !emailRegex.test(this.user.email)
        ? (this.validations.email = false)
        : (this.validations.email = true);
    },
    passwordValidation() {
      return this.user.password.length < 8
        ? (this.validations.password = false)
        : (this.validations.password = true);
    },
    confirmPasswordValidation() {
      return this.user.confirmPassword !== this.user.password
        ? (this.validations.confirmPassword = false)
        : (this.validations.confirmPassword = true);
    },
    form1Validation() {
      this.nameValidation();
      this.lastNameValidation();
      this.cpfValidation();
      this.susNumberValidation();
      this.telephoneValidation();
      this.birthdayValidation();
      if (
        !this.validations.name ||
        !this.validations.lastName ||
        !this.validations.cpf ||
        !this.validations.susNumber ||
        !this.validations.telephone ||
        !this.validations.birthday
      )
        return false;
      return true;
    },
    form2Validation() {
      this.cepValidation();
      this.streetValidation();
      this.houseNumberValidation();
      this.neighborhoodValidation();
      this.cityValidation();
      this.stateValidation();
      if (
        !this.validations.cep ||
        !this.validations.street ||
        !this.validations.houseNumber ||
        !this.validations.neighborhood ||
        !this.validations.city ||
        !this.validations.state
      )
        return false;
      return true;
    },
    form3Validation() {
      this.emailValidation();
      this.passwordValidation();
      this.confirmPasswordValidation();
      if (
        !this.validations.email ||
        !this.validations.password ||
        !this.validations.confirmPassword
      )
        return false;
      return true;
    },
    async handleCep() {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${this.user.cep}/json/`
        );
        this.user.street = response.data.logradouro;
        this.user.neighborhood = response.data.bairro;
        this.user.city = response.data.localidade;
        this.user.state = response.data.uf;
      } catch (error) {
        toast.error("Cep não encontrado ou inválido!", {
            autoClose: 5000,
            position: 'top-right',
        })
      }
    },
    async register() {
      const url = "/auth/register";

      try {
        const response = await axios.post(url, {
          email: this.user.email,
          senha: this.user.password,
          cpf: this.user.cpf,
          nome: this.user.name,
          sobrenome: this.user.lastName,
          data_nasc: formatDate(this.parseDate(this.user.birthday), "D-MM-YYYY"),
          numero_sus: this.user.susNumber,
          cep: this.user.cep,
          rua: this.user.street,
          bairro: this.user.neighborhood,
          cidade: this.user.city,
          estado: this.user.state,
          numero: this.user.houseNumber,
          confirmarSenha: this.user.confirmPassword,
        })
        toast.success(response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
        setTimeout(() => {
            this.$router.push('/login');
        }, 2000);
      } catch (error) {
        toast.error(error.response.data["msg"], {
          autoClose: 5000,
          position: 'top-right',
        })
      }
    },
    parseDate(dateString) {
      const [year, month, day] = dateString.split('-');
      return new Date(year, month - 1, day);
    },
  },
};
</script>

<style scoped>
* {
  font-size: 1.1rem;
}

label {
  font-size: 1.5rem;
  font-weight: 400;
}

h1 {
  font-size: 2rem;
}

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #e8ebf9;
  overflow-y: auto;
}

.container {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.212);
  border-radius: 20px;
}

.form {
  background-color: white;
  border-radius: 20px;

  font-family: "coves";
}

.button {
  display: flex;
  flex-direction: column;
}

legend {
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: #ffffff;
  padding: 7px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #3a58f0;

  border: #3a58f0;
}

legend p {
  font-size: 1.5rem;
  font-weight: 700;
}

.div-ok {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

label {
  padding: 3px;
}

.form-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
}

.title {
  font-family: "coves";
  color: #3a58f0;
}

.entrar-botao {
  font-family: "coves";
  font-size: 1.2rem;

  color: white;
  border: none;
  padding: 8px 22px;
  border-radius: 5px;
  background-color: #3a58f0;
  transition: 0.4s;
}
.entrar-botao a {
  color: white;
}

.entrar-botao:hover {
  transform: scale(1.2);
}
.entrar-botao:active {
  transition: 0.05s;
  transform: scale(0.99);
}

.form-group {
  display: flex;
  flex-direction: column;
  padding: 0 100px 15px 100px;
  background-color: #dadff5;
  border-radius: 20px 20px 20px 20px;
  max-width: 550px;
  /* max-height: 500px; */
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #7085ed;
  border-radius: 10px;
  /* background-color: purple; */
}


.box {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.box-dadosPessoais {
  display: flex;
  flex-direction: column;
}

.box-endereco {
  display: flex;
  flex-direction: column;
}

.box-login {
  display: flex;
  flex-direction: column;
}

.form-gender-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: none;
}

.box-gender {
  display: flex;
  flex-direction: column;
}

.linha-genero {
  display: flex;
  flex-direction: row;
}

input {
  padding: 4px;
  border-radius: 15px;
  border-style: none;
  padding: 8px;
}

.divisao {
  display: flex;
  justify-content: center;
}

.div-botao-ok {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 182.4px;
}

.botao-ok,
.botao-voltar,
.botao-continuar {
  font-family: "coves";
  font-size: 1.2rem;

  color: white;
  border: none;

  border-radius: 5px;
  background-color: #3a58f0;
  transition: 0.4s;

  width: 88px;
  height: auto;

  border-style: none;
  padding: 8px;
}
.botao-ok:hover,
.botao-voltar:hover,
.botao-continuar:hover {
  transform: scale(1.2);
}
.botao-ok:active,
.botao-voltar:active,
.botao-continuar:active {
  transition: 0.05s;
  transform: scale(0.99);
}

input.validacao {
  border: 2px solid red;
}

span.validacao {
  color: red;
  padding-left: 10px;
  margin-top: 3px;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }

.botao-ok:hover,
.botao-voltar:hover,
.botao-continuar:hover {
  transform: scale(1.0);
}

  .form-group {
    max-width: 100%;
    max-height: 500px; /* Set a maximum height */
    padding: 0 20px 15px 20px;
    overflow-y: auto;
  }

  .box {
    padding: 10px;
  }

  .div-botao-ok {
    width: 100%;
    flex-direction: column;
  }

  .botao-ok,
  .botao-voltar,
  .botao-continuar {
    width: 100%;
    margin-top: 10px;
  }
}
</style>