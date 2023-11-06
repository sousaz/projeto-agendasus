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
</style>