<template>
    <div id="loading">
        <span class="loading"></span>
        <p class="loadingText">Carregando...</p>
    </div>
</template>

<script>
export default {
    name: "LoadingComponent"
};
</script>

<style>
#loading {
    width: 100%;
    min-height: calc(100vh - 139px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loadingText {
    font-family: 'coves';
    font-size: 1.2rem;
    font-weight: bold;
    color: #3a58f0;
    margin-top: 5px;
}

span.loading {
    width: 60px;
    height: 60px;
    background-color: transparent;
    display: block;
    border: 12px solid #3a58f0;
    border-top: 12px solid transparent;
    border-radius: 50%;

    animation: loading 1s ease-in-out infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>