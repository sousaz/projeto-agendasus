<template>
  <div v-if="tableData" id="ubsTable">
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
        <tr v-for="(data, i) in tableData" :key="i" class="table-row" :style="{background: hasMarked(data)}">
          <td class="table-cell">{{ i + (10 * (currentPage - 1)) + 1 }}</td>
          <td class="table-cell">{{ data.nome_ubs }}</td>
          <td class="table-cell">{{ data.nome_medico }}</td>
          <td class="table-cell">{{ data.tipo }}</td>
          <td class="table-cell">{{ data.dia }}</td>
          <td class="table-cell">{{ data.horario }}</td>
          <td class="table-cell">{{ data.nome_paciente }}</td>
          <td class="table-cell">
            <button class="cancel" @click="deleteSchedule(i)">
              Apagar<fa class="xmark-cancel" icon="xmark-circle" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="group-btn">
      <button v-show="currentPage > 1" @click="backPage()" class="schedule-btn">Voltar</button>
      <button
        @click="nextPage()"
        v-show="tableData.length === 10"
        class="schedule-btn"
      >
        Carregar mais
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
  name: "UbsTableComponent",
  data() {
    return {
      tableHeader: ["", "UBS", "Médico", "Tipo", "Dia", "Horário", "Paciente", ""],
      tableData: [],
      currentPage: 1
    };
  },
  methods: {
    async loadData() {
      try {
          const url = `http://localhost:3333/api/consultas/${this.currentPage}`
          const response = await axios.get(url)
          this.tableData = response.data
      } catch (error) {
          toast.error(error.response.data["msg"], {
              autoClose: 5000,
              position: 'top-right',
          })
      }
    },
    nextPage() {
        this.currentPage++
        this.loadData()
    },
    backPage() {
        this.currentPage--
        this.loadData()
    },
    async deleteSchedule(index) {
        try {
            const url = `http://localhost:3333/api/delete/${this.tableData[index]._id}`
            const response = await axios.delete(url)
            toast.success(response.data["msg"], {
                autoClose: 5000,
                position: 'top-right',
            })
            this.loadData()
        } catch (error) {
            toast.error(error.response.data["msg"], {
                autoClose: 5000,
                position: 'top-right',
            })
        }
    },
    hasMarked(data) {
      if(data.nome_paciente)
          return "#8a99e3"
      return "#dce2fa"
    }
  },
  async mounted() {
    this.loadData()
  },
};
</script>

<style>
#ubsTable{
    height: calc(100vh - 155px);
    width: 50%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'coves';
    text-align: center;
}
</style>