<template>
    <div id="nav">
        <aside class="aside">
            <nav class="nav">
                <router-link to="/user"><div class="link">Início</div></router-link>
                <router-link to="/user/agendar"><div class="link">Agendar</div></router-link>
                <router-link to="/user/opa"><div class="link">Minhas consultas</div></router-link>
            </nav>
        </aside>
    </div>
</template>

<script>
export default {
    name: "NavComponent"
}
</script>

<style>
.aside {
    grid-area: menu;
    background-color: #ced4eb;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
}

.link {
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 5px;
    color: #3a58f0;
    font-family: "coves";
}

.link:hover {
    color: white;
    background: #3a58f0;
}



</style>