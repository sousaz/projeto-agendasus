<template>
    <div class="user">
        <HeaderComponent />
        <ContentComponent />
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import ContentComponent from '../components/ContentComponent.vue';
export default {
    name: "UserPage",
    components: {
        HeaderComponent,
        ContentComponent
    }
};
</script>

<style>
    .user {
        height: 100vh;
        display: grid;
        grid-template-rows: 115px 1fr;
		grid-template-columns: 300px 1fr;
        grid-template-areas: 
            "header header"
            "content content";
    }
</style>