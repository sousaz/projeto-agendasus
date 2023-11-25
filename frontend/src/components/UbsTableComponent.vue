<template>
  <div id="ubsTable">
    <table v-if="tableData && !isLoading" class="table">
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
      <tfoot class="table-foot">
        <tr class="table-row">
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td class="table-cell foot">Página atual: {{currentPage}}</td>
          <td class="table-cell"></td>
          <td class="table-cell"></td>
          <td class="table-cell"></td>
        </tr>
      </tfoot>
    </table>
    <LoadingComponent v-else/>
    <div v-if="tableData && !isLoading" class="group-btn">
      <button v-show="currentPage > 1" @click="backPage()" class="schedule-btn">Voltar</button>
      <button
        @click="nextPage()"
        v-show="tableData.length === 5"
        class="schedule-btn"
      >
        Carregar mais
      </button>
    </div>
  </div>
</template>

<script>
import axios from '../services/api';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import LoadingComponent from './LoadingComponent.vue';
export default {
  name: "UbsTableComponent",
  components: {
    LoadingComponent
  },
  data() {
    return {
      tableHeader: ["Médico", "Tipo", "Dia", "Horário", "Paciente", ""],
      tableData: [],
      currentPage: 1,
      isLoading: false
    };
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
          const url = `/consultas/${this.currentPage}/${localStorage.getItem("id")}`
          const response = await axios.get(url)
          this.tableData = response.data
          this.isLoading = false
      } catch (error) {
          this.isLoading = false
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
      this.isLoading = true
        try {
            const url = `/delete/${this.tableData[index]._id}`
            const response = await axios.delete(url)
            this.isLoading = false
            toast.success(response.data["msg"], {
                autoClose: 5000,
                position: 'top-right',
            })
            this.loadData()
        } catch (error) {
            this.isLoading = false
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
  height: calc(100vh - 139px);
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