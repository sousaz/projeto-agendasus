<template>
  <div class="body">
    <div class="container">
      <form action="#">
        <div class="form-content">
          <div class="form-header">
            <div class="form-name">
              <h1>LOGIN</h1>
            </div>
          </div>

          <div class="form-input">
            <div>
              <div class="textfield">
                <label for="email">E-mail</label>
                <input
                  v-model="user.email"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div class="textfield">
                <label for="password">Senha</label>
                <input
                  v-model="user.password"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Digite sua senha"
                  size="20"
                />
              </div>
            </div>

            <div>
              <button @click="login" type="submit" class="enter-btn">Entrar</button>
            </div>

            <div>
              <p>ou</p>
            </div>

            <div>
              <router-link to="/cadastrar"
                ><button type="button" class="register-btn">Cadastre-se</button></router-link
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
    name: "LoginPage",
    data() {
    return {
        user: {
        email: "",
        password: "",
        },
    };
    },
    methods: {
    async login(e) {
      e.preventDefault()
        const url = "http://localhost:3333/api/auth/login";
        try {
        const response = await axios.post(url, {
            email: this.user.email,
            senha: this.user.password,
        });
        const token = response.data.token;
        const id = response.data.id;

        if (token && id) {
            localStorage.setItem("token", token);
            localStorage.setItem("id", id);
            toast.success('Logado com sucesso!', {
                autoClose: 2000,
                position: 'top-right',
            })
            this.$store.commit('login')
            setTimeout(() => {
                this.$router.push('/');
            }, 2000);
        }

        } catch (error) {
          toast.error(error.response.data["msg"], {autoClose: 2000,})
        return;
        }
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
  align-items: center;
  justify-content: center;
  background-color: #e8ebf9;
  font-family: "coves";
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.212);

  border-radius: 10px;
  background-color: white;
}

.form-header {
  background-color: #e8ebf9;
}

.form-name {
  display: flex;
  flex-direction: row;
  justify-content: center;

  color: #3a58f0;
  background-color: white;
  padding: 30px;

  border-radius: 10px 10px 20px 0;
}

.form-input {
  padding: 30px;
  border-radius: 20px 0 10px 10px;
  background-color: #e8ebf9;
}

.textfield {
  display: flex;
  flex-direction: column;
}

.textfield > input {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background-color: white;
}
.textfield > label {
  color: black;
  margin-top: 10px;
  margin-bottom: 5px;
}

.enter-btn {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: #3a58f0;
  margin-top: 20px;
  transition: 0.25s;
}
.enter-btn:hover {
  transform: scale(1.05);
}

p {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px;
}
.register-btn {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 10px;
  color: #3a58f0;
  background-color: white;
  transition: 0.25s;
}

.register-btn:hover {
  transform: scale(1.05);
}
</style>