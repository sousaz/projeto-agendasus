<template>
  <div id="home">
    <main class="main">
      <p class="text">Olá, você esta preparado para agendar sua consulta?</p>
      <p class="text">
        Selecione a aba "agendar" selecione o local e o tipo de consulta.
      </p>
      <p class="text">
        Após isso escolha um horário, confirme e agora é só esperar.
      </p>
    </main>
  </div>
</template>

<script>
export default {
    name: "HomePage",    
};
</script>

<style>
#home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8ebf9;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text {
  margin-bottom: 15px;
  font-family: "coves";
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>