<template>
    <div id="schedule">
        <div v-if="!tableView" class="form-select">
            <label for="ubs">Em qual UBS deseja marcar a consulta?</label>
            <select name="ubs" id="ubs" class="select" v-model="selectedUbs">
                <option class="option" v-for="(option, i) in optionsQuery" :key="i" value="">{{ option }}</option>
            </select>

            <label for="ubs">Que tipo de consulta seria?</label>
            <select name="ubs" id="ubs" class="select" v-model="selectedQuery">
                <option class="option" v-for="(option, i) in optionsQuery" :key="i" value="">{{ option }}</option>
            </select>

            <button class="startSchedule-btn">Ver consultas</button>

        </div>
        <TableComponent/>
    </div>
</template>


<script>
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
            optionsQuery: ['opa', 'oi', 'dijawhnd'],
            optionsUbs: ['opa', 'oi', 'dijawhnd'],
            tableView: false,
            teste: { header: ['1','2','3','4','5'], content: ['a','b','c','d','e','f','g','h','i','l']}
        }
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
    gap: 10px;
}

</style>