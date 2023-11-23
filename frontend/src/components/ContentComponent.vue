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
    }

    @media (max-width: 886px) {
        .content {
            width: calc(100vw - 0px);
        }
    }
</style>