<template>
    <!-- <div id="nav"> -->
        <aside class="aside" :class="{'menu-mobile' : showMenu}">
            <nav v-if="!mobile" class="nav">
                <router-link to="/ubs"><div class="link">Cadastrar médicos</div></router-link>
                <router-link to="/ubs/consulta"><div class="link">Cadastrar consultas</div></router-link>
                <router-link to="/ubs/consultas"><div class="link">Consultas gerais</div></router-link>
            </nav>
            <nav v-else class="nav" :class="{'menu-mobile' : showMenu}">
                <div class="bars" @click="toggleMenu()"><fa class="fa-bars" :class="{'rotate-bars': showMenu}" icon="bars" /></div>
                <div class="button-group">
                    <router-link to="/ubs"><button v-show="showMenu" class="link" @click="toggleMenu()">Cadastrar médicos</button></router-link>
                    <router-link to="/ubs/consulta"><button v-show="showMenu" class="link" @click="toggleMenu()">Cadastrar consultas</button></router-link>
                    <router-link to="/ubs/consultas"><button v-show="showMenu" class="link"  @click="toggleMenu()">Consultas gerais</button></router-link>
                </div>
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
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        checkScreen() {
            this.windowWidth = window.innerWidth
            if(this.windowWidth <= 890) {
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
    color: #3a58f0;
    font-family: "coves";
}

.link:hover {
    color: white;
    background: #3a58f0;
}

.bars {
    max-width: 21px;
    max-height: 24px;
    position: relative;
    top: 10px;
    left: 20px;
}

.fa-bars {
    color: #3a58f0;
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

.button-group {
    height: calc(100vh - 139px);
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-top: 40px;
}

@media (max-width: 890px) {
    .aside {
        background-color: #e8ebf9;
    }

    .link {
        width: 100%;
        border: 2px solid #ced4eb;
        border-radius: 10px;
    }

    .nav.menu-mobile {
        height: calc(100vh - 139px);
    }
}

/* @media (max-width: 769px) {
    .link {
        height: 70px;
    }
} */
</style>