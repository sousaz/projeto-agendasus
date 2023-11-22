<template>
    <div id="schedule">
        <div v-show="!tableView" class="form-select">
            <label class="options-label" for="ubs">UBS</label>
            <select name="ubs" id="ubs" class="select" v-model="selectedUbs">
                <option value="" disabled selected>Selecione uma UBS</option>
                <option class="option" v-for="(option, i) in optionsUbs" :key="i" :value="option._id">{{ option.nome }}</option>
            </select>

            <label class="options-label" for="ubs">Tipo de consulta</label>
            <select name="ubs" id="ubs" class="select" v-model="selectedQuery">
                <option value="" disabled selected>Selecione o tipo de consulta</option>
                <option class="option" v-for="(option, i) in optionsQuery" :key="i" :value="option">{{ option }}</option>
            </select>

            <button @click="loadTable()" class="schedule-btn">Ver consultas</button>

        </div>
        <TableComponent v-show="tableView"/>
    </div>
</template>


<script>
import axios from '../services/api'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import TableComponent from '../components/TableComponent.vue';
export default {
    name: "SchedulePage",
    components: {
        TableComponent,
    },
    data() {
        return{
            selectedUbs: '',
            selectedQuery: '',
            optionsQuery: [],
            optionsUbs: [],
            tableView: false,
        }
    },
    computed: {
        tableData(){
            return this.$store.state.tableData
        },
    },
    methods: {
        async loadOptions() {
            if(this.$route.path === '/paciente/minhasconsultas'){
                this.tableView = true
            }
            const url = `/options`

            try {
                const response = await axios.get(url)
                this.optionsUbs = response.data.nomeUbs
                this.optionsQuery = response.data.tipoConsulta
            } catch (error) {
                toast.error(error.response.data["msg"], {
                    autoClose: 5000,
                    position: 'top-right',
                })
            }
        },
        async loadTable() {
            try {
                this.$store.commit('setUbs', this.selectedUbs)
                this.$store.commit('setQuery', this.selectedQuery)
                await this.$store.dispatch('loadTable')
                this.tableView = true
            } catch (error) {
                toast.error(error.response.data["msg"], {
                    autoClose: 5000,
                    position: 'top-right',
                })
            }
        },
    }, 
    async mounted() {
        this.loadOptions()
    }
};
</script>

<style>
#schedule {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'coves';
}

.form-select {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
}

.form-select {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.options-label {
  display: block;
  margin-bottom: 10px;
  color: #3a58f0;
  font-weight: bold;
}

.select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dce2fa;
  border-radius: 5px;
  margin-bottom: 15px;
}

.option {
  color: #3a58f0;
  width: 100%;
}

.schedule-btn {
  background-color: #3a58f0;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'coves';
  font-size: 1.1rem;
}


.schedule-btn:hover {
  transform: scale(1.1);
}

.schedule-btn:active {
  transition: 0.05s;
  transform: scale(0.99);
}

</style>