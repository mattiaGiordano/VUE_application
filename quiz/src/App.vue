<template>
  <div id="app">
    <Header :numCorrette="numCorrette" :numTotali="numTotali" />
    <!-- component layout and grid system di bv-->
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <QuestionBox 
            v-if="domande.length && index<domande.length"
            :domanda="domande[index]"
            :successivo="next"
            :increment="incrementa"
          />
          <p v-if="index === domande.length">Hai completato il quiz!</p>
          <p v-if="index === domande.length">Hai ottenuto un punteggio di {{ numCorrette }} su {{ numTotali }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
  name: 'App',
  components: {
    Header,
    QuestionBox
  } ,
  data() {
    return {
      domande: [] ,
      index: 0,
      numCorrette: 0,
      numTotali: 0 
    }    
  } ,
  methods: {
    next() {
      this.index++
    },
    incrementa(isCorrect) {
      if(isCorrect) {
        this.numCorrette++
      }
      this.numTotali++
    }
  } ,
  mounted: function() {
    // utilizzo un'api del sito opentdb.com che mi restuisce un json con 10 domanda
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple', {
      method: 'get'
    })
      .then((res) => {
        return res.json()
      })
      .then((jsonData) => {
        this.domande = jsonData.results        
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
