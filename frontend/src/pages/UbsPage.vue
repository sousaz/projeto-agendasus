<template>
    <div id="ubsPage">
        <HeaderComponent/>
        <NavComponent/>
        <ContentComponent/>
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import NavComponent from '../components/NavComponent.vue'
import ContentComponent from '../components/ContentComponent.vue'
export default {
    name: "UbsPage",
    components: {HeaderComponent, NavComponent, ContentComponent}

};
</script>

<style>
#ubsPage {
    height: 100vh;
    display: grid;
    grid-template-rows: 115px 1fr;
    grid-template-columns: 300px 1fr;
    grid-template-areas: 
        "header header"
        "nav content";
}


@media (max-width: 886px) {
    #ubsPage {
        grid-template-columns: 1fr;
    }
}
</style>