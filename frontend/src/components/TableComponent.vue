<template>
  <div v-if="tableData.length" id="table">
    <table class="table">
      <thead class="table-head">
        <tr class="table-row">
          <th v-for="(header, i) in  tableHeader" :key="i" class="table-header-content">{{header}}</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="i in tableData.length" :key="i" class="table-row">
          <td  class="table-cell">{{i}}</td>
          <td  class="table-cell" >{{tableData[i-1].id_medico}}</td>
          <td  class="table-cell">{{tableData[i-1].tipo}}</td>
          <td  class="table-cell">{{tableData[i-1].data}}</td>
          <td  class="table-cell">{{tableData[i-1].horario}}</td>
          <td  class="table-cell"><button @click="makeSchedule(i-1)">Selecionar<fa class="calendar-check" icon="calendar-check"/></button></td>
        </tr>
      </tbody>
      <!-- <tfoot class="table-footer">
        <tr class="table-row">
          <td class="table-header-content">aa</td>
          <td class="table-header-content">aa</td>
          <td class="table-header-content">aa</td>
          <td class="table-header-content">aa</td>
        </tr>
      </tfoot> -->
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "TableComponent",
  data() {
    return {
      currentPage: 1,
      tableData: [],
      tableHeader: ['Id','Medico','Tipo','Dia','Horario']
    };
  },
  methods: {
    async loadTable() {
      const url = `http://localhost:3333/api/auth/consulta/${this.currentPage}`
      try {
        const response = await axios.get(url)
        this.tableData = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async makeSchedule(index) {
      const url = `http://localhost:3333/api/consulta/${this.tableData[index]._id}`
      try {
        await axios.put(url, {
          horario: this.tableData[index].horario,
          data: this.tableData[index].data,
          tipo: this.tableData[index].tipo,
          id_medico: this.tableData[index].id_medico,
          id_paciente: localStorage.getItem('id'),
        })
        const response = await this.loadTable()
        this.tableData = response.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    this.loadTable()
  }
};
</script>

<style>
th {
  border: 2px solid red;
}
td {
  border: 2px solid blue;
}

.calendar-check{
  color: #000;
}
</style>