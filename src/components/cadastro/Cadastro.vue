<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"> {{ foto.titulo }} </h2>

	<h2 v-if="foto._id" class="centralizado">Alterando</h2>
	<h2 v-else class="centralizado">Incluindo</h2>
	
    <form @submit.prevent="grava()">
		<div class="controle">
			<label for="titulo">TÍTULO</label>
			<input v-model.lazy="foto.titulo" id="titulo" autocomplete="off" v-validate data-vv-rules="required|min:3|max:30" name="titulo" data-vv-as="título">
			<span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
		</div>

		<div class="controle">
			<label for="url">URL</label>
			<input v-model.lazy="foto.url" id="url" autocomplete="off" name="url" v-validate data-vv-rules="required">
			<span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
			
			<imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
		</div>

		<div class="controle">
			<label for="descricao">DESCRIÇÃO</label>
			<textarea v-model.lazy="foto.descricao" id="descricao" autocomplete="off"></textarea>
		</div>

		<div class="centralizado">
			<meu-botao rotulo="GRAVAR" tipo="submit"/>
			<router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
		</div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';


export default {

	components: {

	'imagem-responsiva': ImagemResponsiva, 
	'meu-botao': Botao
	},
	data() {
		return {
			foto: new Foto(),
			id: this.$route.params.id
		}
	},
	methods: {

		grava() {

			this.$validator
				.validateAll()
				.then(success => {
					if (success) {
						
						this.service.cadastra(this.foto)
						.then(response => {
							if (this.id) {
								//redirecionando de volta para o home após alterar
								this.$router.push({name: 'home'});
							} else {
								//senao, limpo o formulario zerando o foto
								this.foto = new Foto()
							}
						})
						.catch(err => {
							this.mensagem = err.message;
						});		
					}
				})
		}
	},
	created(){

		this.service = new FotoService(this.$http);

		if (this.id) {
			this.service
				.busca(this.id)
				.then(response => this.foto = response.data, err => {
					this.mensagem = err.message;
				})
			
		}
	}
}

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

	.erro{
		color: red;
	}

</style>