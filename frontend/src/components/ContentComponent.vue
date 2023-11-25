<template>
    <div class="content">
        <router-view name="userContent"/>
    </div>
</template>

<script>
export default {
    name: "ContentPage",
};
</script>

<style>
    .content {
        grid-area: content;
        height: calc(100vh - 139px);
    }

    @media (max-width: 886px) {
        .content {
            width: calc(100vw - 0px);
        }
    }
</style>