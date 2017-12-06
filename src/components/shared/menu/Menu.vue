<template>
    <nav>
        <ul>
            <li v-for="(rota, index) in rotas" :key="index">
                <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
            </li>
        </ul>
    </nav>
</template>
<script>

export default {
    props: {
        rotas: {
            //validando  o array recebido, para evitar erros de string
            type: Array, 
            required: true
        }
    }
}
</script>
<style scoped>

</style>
