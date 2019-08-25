<template>
  <div id="app">
    <Header />
    <Keno @user-pick='getData' :stopGame='stopPlay' v-if="gamePlay"/>
    <Score :userPick='userPick' @resetGame="stopGame" v-else/>
    <Footer />
  </div>
</template>

<script>
import Keno from './components/Keno.vue'
import Score from './components/Score.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Keno, Header, Footer, Score
  },
  data(){
    return{
      gamePlay: true,
      userPick: [],
      stopPlay: false,
    }
  },
  methods:{
    getData(value){
      this.userPick = value
      this.gamePlay = false
    },
    stopGame(value){
      this.stopPlay = true
      console.log(value)
    }
  }
}
</script>