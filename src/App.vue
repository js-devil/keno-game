<template>
  <div id="app">
    <Header />
    <Keno @user-pick='getData' v-if="gamePlay"/>
    <Score :userPick='userPick' @showKeno='stopGame' v-else/>
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
    }
  },
  methods:{
    getData(value){
      this.userPick = value
      this.gamePlay = false
    },
    stopGame(value){
      this.gamePlay = value
      this.userPick.length = 0
    }
  }
}
</script>