<template>
  <div v-if="tableData" id="table">
    <table class="table">
      <thead class="table-head">
        <tr class="table-row">
          <th
            v-for="(header, i) in tableHeader"
            :key="i"
            class="table-header-content"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="i in tableData.length" :key="i" class="table-row">
          <td class="table-cell">{{ i }}</td>
          <td class="table-cell">{{ tableData[i - 1].id_medico }}</td>
          <td class="table-cell">{{ tableData[i - 1].tipo }}</td>
          <td class="table-cell">{{ tableData[i - 1].data }}</td>
          <td class="table-cell">{{ tableData[i - 1].horario }}</td>
          <td class="table-cell">
            <button v-show="buttonView" class="check" @click="makeSchedule(i - 1)">
              Selecionar<fa class="calendar-check" icon="calendar-check" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="group-btn">
      <button @click="backPage(this.$store.state.currentPage)" v-show="this.$store.state.currentPage > 2 || !loadMore" class="schedule-btn">Voltar</button>
      <button @click="decideTable()" v-show="loadMore" class="schedule-btn">Carregar mais</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TableComponent",
  data() {
    return {
      tableHeader: ["Id", "Medico", "Tipo", "Dia", "Horario", ""],
      buttonView: true,
    };
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    loadMore() {
      return this.$store.state.loadMore;
    },
  },
  methods: {
    async makeSchedule(index) {
      const url = `http://localhost:3333/api/consulta/${this.tableData[index]._id}`;
      try {
        await axios.put(url, {
          horario: this.tableData[index].horario,
          data: this.tableData[index].data,
          tipo: this.tableData[index].tipo,
          id_medico: this.tableData[index].id_medico,
          id_paciente: localStorage.getItem("id"),
        });
        await this.$store.dispatch("loadTable");
      } catch (error) {
        console.log(error);
      }
    },
    async loadMyTable() {
      if(this.$route.path === '/paciente/minhasconsultas'){
        try {
          this.buttonView = false
          const id = localStorage.getItem("id");
          const url = `http://localhost:3333/api/consulta/${id}/${this.$store.state.currentPage}`;
          const response = await axios.get(url)
          console.log(this.$store.state.currentPage)
          console.log(response.data)
          if(response.data.length !== 0) {
            this.$store.commit('setPage', this.$store.state.currentPage + 1)
            this.$store.commit('setTableData', response.data)
            this.$store.commit('setLoadMore', true)
          }else {
            this.$store.commit('setLoadMore', false)
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async decideTable() {
      if(this.$route.path === '/paciente/minhasconsultas'){
        this.loadMyTable()
        return
      }
      
      await this.$store.dispatch('loadTable')
    },
    backPage(current) {
      this.$store.commit('setPage', (current - 2))
      this.decideTable()
    }
  },
  mounted() {
    this.loadMyTable()
  }
};
</script>

<style>
#table {
  width: 30%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.group-btn {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.table-head {
  background-color: #3a58f0;
  color: #fff;
}

.table-row {
  border-bottom: 1px solid #dce2fa;
  text-align: center;
}

.table-header-content {
  padding: 10px;
}

.table-cell {
  padding: 10px;
}

.check {
  background-color: #3a58f0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.check:hover {
  background-color: #fff;
  color: #3a58f0;
}

.calendar-check {
  margin-left: 5px;
}
</style>