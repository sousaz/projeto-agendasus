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
          <td class="table-cell">{{ tableData[i - 1].nome_ubs }}</td>
          <td class="table-cell">{{ tableData[i - 1].nome_medico }}</td>
          <td class="table-cell">{{ tableData[i - 1].tipo }}</td>
          <td class="table-cell">{{ tableData[i - 1].dia }}</td>
          <td class="table-cell">{{ tableData[i - 1].horario }}</td>
          <td class="table-cell">
            <button v-show="buttonView" class="check" @click="makeSchedule(i - 1)">
              Selecionar<fa class="calendar-check" icon="calendar-check" />
            </button>
            <button v-show="this.$route.path === '/paciente/minhasconsultas'" class="cancel" @click="cancelSchedule(i - 1)">
              Cancelar<fa class="xmark-cancel" icon="xmark-circle" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="table-body">
        <tr class="table-row">
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td class="table-cell foot">Página atual: {{currentPage}}</td>
        </tr>
      </tfoot>
    </table>
    <div class="group-btn">
      <button @click="backPage()" class="schedule-btn">Voltar</button>
      <button @click="nextPage()" v-show="tableData.length === 5" class="schedule-btn">Carregar mais</button>
    </div>
  </div>
</template>

<script>
import axios from "../services/api";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
  name: "TableComponent",
  data() {
    return {
      tableHeader: ["UBS", "Médico", "Tipo", "Dia", "Horário", ""],
      buttonView: true,
      currentPage: 1,
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
      const url = `/consulta/${this.tableData[index]._id}`;
      try {
        const response = await axios.put(url, {
          horario: this.tableData[index].horario,
          data: this.tableData[index].data,
          tipo: this.tableData[index].tipo,
          id_medico: this.tableData[index].id_medico,
          id_ubs: this.tableData[index].id_ubs,
          id_paciente: localStorage.getItem("id"),
        });
        await this.$store.dispatch("loadTable");
        toast.success(response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
        
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      } catch (error) {
        toast.error(error.response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
      }
    },
    async cancelSchedule(index) {
      const url = `/cancel/${this.tableData[index]._id}`;
      try {
        const response = await axios.put(url, {
          horario: this.tableData[index].horario,
          data: this.tableData[index].data,
          tipo: this.tableData[index].tipo,
          id_medico: this.tableData[index].id_medico,
          id_ubs: this.tableData[index].id_ubs,
          id_paciente: localStorage.getItem("id"),
        });
        toast.success(response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      } catch (error) {
        toast.error(error.response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
      }
    },
    async loadMyTable() {
      if(this.$route.path === '/paciente/minhasconsultas'){
        try {
          this.buttonView = false
          const id = localStorage.getItem("id");
          const url = `/consulta/${id}/${this.currentPage}`;
          const response = await axios.get(url)
          if(response.data.length) {
            this.$store.commit('setTableData', response.data)
            this.$store.commit('setLoadMore', true)
          }else {
            this.$store.commit('setLoadMore', false)
          }
        } catch (error) {
          toast.error(error.response.data["msg"], {
            autoClose: 5000,
            position: 'top-right',
        })
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
    backPage() {
      this.currentPage--
      this.$store.commit('setPage', (this.currentPage))
      if(this.currentPage < 1) {
        this.$router.push("/")
        return
      }
      this.decideTable()
    },
    nextPage() {
      this.currentPage++
      this.$store.commit('setPage', (this.currentPage))
      this.decideTable()
    },
  },
  mounted() {
    this.loadMyTable()
    this.$store.commit('setPage', (this.currentPage))
  }
};
</script>

<style>
/* #table {
  width: 30%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */

#table {
  width: 45%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.group-btn {
  width: 100%;
  margin-top: 10px; /* Ajuste conforme necessário */
  display: flex;
  justify-content: space-around;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  margin: 10px 0; /* Ajuste as margens conforme necessário */
}

.table-head {
  background-color: #3a58f0;
  color: #fff;
}

.table-row {
  border-bottom: 1px solid #dce2fa;
  text-align: center;
  font-size: 1.1rem;
}

.table-header-content {
  padding: 10px;
}

.table-cell {
  padding: 10px;
}

.table-cell.foot::after {
  content: '';
  height: 2px;
  display: block;
  margin: 0 auto;
  background-color: #3a58f0;
  border-radius: 10px;
}

.table-foot {
  background-color: #dce2fa;
}

.check {
  background-color: #3a58f0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'coves';
  font-size: 1.1rem;
}

.check:hover {
  background-color: #dce2fa;
  color: #3a58f0;
}

.calendar-check {
  margin-left: 5px;
}

.xmark-cancel {
  margin-left: 5px;
}

.cancel {
  display: flex;
  align-items: center;
  background-color: #df6f6f;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-family: 'coves';
  font-size: 1.1rem;
}

.cancel:hover {
  background-color: #dce2fa;
  color: #df6f6f;
}


@media (max-width: 600px) {
  .table-header-content,
  .table-cell {
    padding: 5px;
    font-size: 1rem;
  }

  .check,
  .cancel {
    padding: 5px 8px;
    font-size: 1rem;
  }

  .table {
    margin: 10px;
  }
  #table {
    width: 100%;
  }

  .group-btn {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
  }
}


/* @media (min-width: 800px) {
  #table {
    width: 40%;
  }
} */
</style>