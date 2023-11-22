<template>
    <!-- <div id="nav"> -->
        <aside class="aside" :class="{'menu-mobile' : showMenu}">
            <nav v-if="!mobile" class="nav">
                <router-link to="/ubs"><div class="link">Cadastrar médicos</div></router-link>
                <router-link to="/ubs/consulta"><div class="link">Cadastrar consultas</div></router-link>
                <router-link to="/ubs/consultas"><div class="link">Consultas gerais</div></router-link>
            </nav>
            <nav v-else class="nav" :class="{'menu-mobile' : showMenu}">
                <fa @click="toggleMenu()" class="fa-bars" :class="{'rotate-bars': showMenu}" icon="bars" />
                <router-link to="/ubs"><div @click="toggleMenu()" v-show="showMenu" class="link">Cadastrar médicos</div></router-link>
                <router-link to="/ubs/consulta"><div @click="toggleMenu()" v-show="showMenu" class="link">Cadastrar consultas</div></router-link>
                <router-link to="/ubs/consultas"><div @click="toggleMenu()" v-show="showMenu" class="link">Consultas gerais</div></router-link>
            </nav>
        </aside>
    <!-- </div> -->
</template>

<script>
export default {
    name: "NavComponent",
    data() {
        return {
            mobile: false,
            showMenu: false,
            windowWidth: null
        }
    },
    created() {
        window.addEventListener("resize", this.checkScreen)
        this.checkScreen()
        console.log(this.windowWidth)
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 886) {
                this.mobile = true
                return
            }
            this.mobile = false
        }
    }
}
</script>

<style>
.aside {
    grid-area: nav;
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

.fa-bars {
    position: fixed;
    color: #3a58f0;
    margin: 10px 0 0 20px;
    cursor: pointer;
    font-size: 1.5rem;
    transition: transform 0.3s ease-in-out;
}

.nav.menu-mobile {
    width: 100vw;
}

.aside.menu-mobile {
    position: fixed;
    top: 115px;
}

.rotate-bars {
    transform: rotate(90deg);
}

@media (max-width: 886px) {
    .aside {
        background-color: #e8ebf9;
    }

    .link {
        width: 100%;
        border: 2px solid #ced4eb;
        border-radius: 10px;
    }
}

/* @media (max-width: 769px) {
    .link {
        height: 70px;
    }
} */
</style>