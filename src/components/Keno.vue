<template>
  <div class="orange">
    <div class="container">
      <div class="row">
        <div class="col s6">
          <div class="row ball-container">
            <div v-for="pick in userPick" :key="pick">
              <div class="col s2 ball-outer">
                <div class="ball" ref="pickedNo">
                  <span class="ball-no" v-if="pick>10">{{pick}}</span>
                  <span class="ball-no small" v-else>{{pick}}</span>
                </div>
              </div>

              <br v-if="userPick.length==5">
            </div>
          </div>  
        </div>

        <div class="col s6">
          <div class="row">
            <div v-for="no in numbers" :key="no">
              <div class="col s1 number-box" ref='number' @click="addUserPick(no)">{{no}}</div>
              <br v-if="no % 10 == 0">
            </div>
          </div>
        </div>
      </div>

      <div class="buttons-container">
          <a class="waves-effect waves-light btn-large btn" @click="playGame">Play</a>
          <a class="waves-effect waves-light btn-large btn" @click.prevent="resetGame">Reset</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      numbers: [],
      userPick: []
    }
  },
  methods:{
    addUserPick(no){
      if(!this.userPick.includes(no)){
        if(this.userPick.length<10){
          this.userPick.push(no)
          this.$refs.number[no-1].classList.add('clicked')     
        }else{
          Swal.fire({
            type: 'info',
            title: 'You can only pick 10 numbers'
          })   
        }
      }else{
        this.userPick = this.userPick.filter(key => key !== no)
        this.$refs.number[no-1].classList.remove('clicked')
      }
    },
    resetGame(){
      if(this.$refs.number){
        for(let no of this.userPick){
          this.$refs.number[no-1].classList.remove('clicked')
        }
        this.userPick=[];
      }
    },
    playGame(){
      if(this.userPick.length!=10){
        Swal.fire({
          type: 'info',
          title: 'Select 10 numbers to play'
        })
      }else{
        this.$emit('user-pick', this.userPick)
      }
    },
  },
  created(){
    Bus.$on('resetGame', (command) => {
      if(command=='stop-game'){
        this.resetGame()
      }
    })     
  },
  mounted(){
    this.numbers = Array.from(Array(80), (_,x) => x + 1);
  },
  watch:{
    stopGame(){
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding: 40px 0;
}

@media only screen and (min-width: 993px){
  .container {

    width: 78%;
  }
}

.ball-container{
  margin: 0;
  margin-left: -25px;
  padding: 0;
  border: 20px solid;
  height: 400px;
  border-radius: 15px;
}

.ball-outer{
  padding: 0 !important;
}

.ball {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: yellow;
  animation: bounce 0.8s;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(.5,0.05,1,.5);
  animation-iteration-count: infinite;
  text-align: center;
}

@keyframes bounce {
  from { transform: translate3d(0, 0, 0);     }
  to   { transform: translate3d(0, 200px, 0); }
}

/* Prefix Support */
ball {
  -webkit-animation-name: bounce;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-direction: alternate;
  -webkit-animation-timing-function: cubic-bezier(.5,0.05,1,.5);
  -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes bounce {
  from { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
  to   { -webkit-transform: translate3d(0, 200px, 0); transform: translate3d(0, 200px, 0); }
}

.ball-no{
  font-size: 40px;
  position: relative;
  top: 15px;
  font-weight: 600;
  background: #fff;
  border-radius: 50%;
  padding: 5px 10px;
}

.small{
  padding: 5px 20px !important;
}

.number-box{
  color: #fff;
  padding: 5px !important;
  text-align: center;
  background: #000;
  margin: 3px 6px;
  font-size: 18px;
  font-weight: 500;
  border: 2px solid;
  border-radius: 5px;
}

.number-box:hover{
  background: red;
  cursor: pointer;
}

.clicked{
  background: #fff;
  border: 2px solid yellow;
  color: #000;
}

.buttons-container{
  display: flex;
  justify-content: center;
}
.btn{
  margin: 10px;
}
</style>
