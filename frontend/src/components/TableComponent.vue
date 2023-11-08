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
            <button @click="makeSchedule(i - 1)">
              Selecionar<fa class="calendar-check" icon="calendar-check" />
            </button>
          </td>
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
import axios from "axios";
export default {
  name: "TableComponent",
  data() {
    return {
      tableHeader: ["Id", "Medico", "Tipo", "Dia", "Horario"],
    };
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
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
  },
  watch: {
    propTableData: function (newData) {
      this.tableData = newData;
    },
  },
};
</script>

<style>
th {
  border: 2px solid red;
}
td {
  border: 2px solid blue;
}

.calendar-check {
  color: #000;
}
</style>