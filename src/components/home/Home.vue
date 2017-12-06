<template>
	<div>
		<h1 class="centralizado">{{ titulo }}</h1>

		<p v-show="mensagem" class="centralizado"> {{ mensagem }} </p>

		<input type="search" @input="filtro = $event.target.value" class="filtro" placeholder="filtre por parte do título">
		<ul class="lista-fotos">
			<li class="lista-fotos-item" v-for="(foto,index) of fotosComFiltro" :key="index">
				<meu-painel :titulo="foto.titulo">
					<imagem-responsiva v-meu-transform.animate="1" :url="foto.url" :titulo="foto.titulo"></imagem-responsiva>
					<router-link :to="{name: 'altera', params: {id: foto._id}}">

						<meu-botao tipo="button" rotulo="ALTERAR"></meu-botao>
					</router-link>

                    <meu-botao 
						tipo="button"
						rotulo="REMOVER"
						:confirmacao="true"
						estilo="perigo"
						@botaoAtivado='remove(foto)'>
					</meu-botao>
				</meu-painel>
			</li>
		   
		</ul>
	</div>
</template>

<script>
import Painel from '../shared/painel/Painel';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva';
import Botao from '../shared/botao/Botao';
import FotoService from '../../domain/foto/FotoService';


export default {
	components:{
		'meu-painel': Painel,
		'imagem-responsiva': ImagemResponsiva,
		'meu-botao': Botao
	},
	data() {
		return {
			titulo: "AluraPic",
			fotos: [],
			filtro: '',
			mensagem: ''
		   
		}
    },
    methods:{
        remove(foto){
			
			this.service.apaga(foto._id)
			.then(response => {
				this.mensagem = 'Foto removida com sucesso'

				//localizo a posicao da foto no array
				let indice = this.fotos.indexOf(foto);

				//removo a foto do array, e o vue atualiza automagicamente no dom
				this.fotos.splice(indice,1);
			})
			.catch(err => {
				this.mensagem = err.message;
			});
		}
    },
	created(){
			

		this.service = new FotoService(this.$http);

		this.service
			.lista()
			.then(response => this.fotos = response.data, err => this.mensagem = err.message);


		
	},
	computed: {
		fotosComFiltro() {
			if (this.filtro) {
				let exp = new RegExp(this.filtro.trim(), 'i');
				return this.fotos.filter(foto => exp.test(foto.titulo));
			} else {
				return this.fotos;
			}
		}
	}
}
</script>

<style>
	.centralizado{
		text-align: center;
	}

	.lista-fotos{
		list-style: none;
	}

	.lista-fotos .lista-fotos-item{
		display: inline-block
	}
	.imagem-responsiva{
		width: 100%;
	}
	.filtro{
		display: block;
		width: 100%;
	}

</style>
