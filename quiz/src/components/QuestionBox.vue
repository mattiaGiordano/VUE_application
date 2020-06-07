<!-- component jumbotron di bv -->
<template>
	<div class="question-box-container">
		<b-jumbotron>
		
			<template v-slot:lead v-text="domanda.question">
				<p v-html="domanda.question" />
			</template>

			<hr class="my-4">

			<!-- component list group di bv -->
			<b-list-group>
				<b-list-group-item 
					v-for="(risposta, index) in risposteMischiate" 
					:key="index"
					@click.prevent="selezionaRisposta(index)"
					:class="stileRisposta(index)"
					v-html="risposta">
					<!--{{ risposta }}-->
				</b-list-group-item>
			</b-list-group>

			<b-button 
				variant="primary"
				@click="confermaRisposta"
				:disabled="indexSelezionato === null || confermata">
				Conferma
			</b-button>
			<b-button 
				@click="successivo" 
				variant="success"
				:disabled="!confermata">
					Successivo
				</b-button>
		</b-jumbotron>
</div>
</template>

<script>
import _ from 'lodash'

export default {
	props: {
		domanda: Object ,
		successivo: Function,
		increment: Function
	} ,
	data() {
		return {
			indexSelezionato : null,
			indexCorretto: null,
			risposteMischiate: [],
			confermata: false
		}
	} ,	
	computed: {
		risposte() {
			let risposte = [...this.domanda.incorrect_answers]
			risposte.push(this.domanda.correct_answer)
			return risposte
		}
	} ,
	watch: {
		domanda: {
			immediate: true,
			handler() {
				this.indexSelezionato = null
				this.confermata = false
				this.mischiaRisposte()
			}			
		}
	} ,
	methods: {
		selezionaRisposta(index) {
			this.indexSelezionato = index
		},
		confermaRisposta() {
			let isCorrect = false

			if(this.indexSelezionato === this.indexCorretto) {
				isCorrect = true
			}
			this.confermata = true

			this.increment(isCorrect)
		},
		mischiaRisposte() {
			let risposte = [...this.domanda.incorrect_answers, this.domanda.correct_answer]
			this.risposteMischiate = _.shuffle(risposte)
			this.indexCorretto = this.risposteMischiate.indexOf(this.domanda.correct_answer)
		},
		stileRisposta(index) {
			let stileRisposta = ''
			if (!this.confermata && this.indexSelezionato === index) {
				stileRisposta = 'selezionata'
			} else if(this.confermata && this.indexCorretto === index) {
				stileRisposta = 'corretta'
			} else if(this.confermata && this.indexSelezionato === index && this.indexCorretto !== index) {
				stileRisposta = 'errata'
			}
			return stileRisposta
		}			
	}
}
</script>

<!-- stile applicato solo all'interno di questo componente-->
<style scoped>
.list-group {
	margin-bottom: 15px;
}
.list-group-item:hover {
	background: #EEE;
	cursor: pointer;
}
.btn {
	margin: 0 5px;
}

.selezionata {
	background-color: lightblue;
}

.corretta {
	background-color: lightgreen;
}

.errata {
	background-color: red;
}
</style>