<template>
    <div class="orange">
        <div class="container">
            <div class="row">
                <div class="col s12" style="background: rgba(51,51,51,0.08)">
                    <div class="col s2 ball-container">
                        <h3 class="title">You picked</h3></div> 

                    <div v-for="pick in userPick" :key="pick">
                        <div class="col s1 ball">
                            <span class="ball-no" v-if="pick<10">{{pick}}</span>
                            <span class="ball-no" style="padding: 0 4px" v-else>{{pick}}</span>
                        </div>
                    </div>
                </div>

                <div class="col s12" style="margin-top: 3%">
                    <div class="row">
                        <div class="col s2 balling" v-for="number in numbers" :key="number">
                            <span class="ball-text" v-if="number>=10">{{number}}</span>
                            <span class="ball-text" style="padding: 25px 40px" v-else>{{number}}</span>
                        </div>
                        <br v-if="numbers.length==5" />
                    </div>
                </div>

                <div class="col s12 btn-container">
                    <a class="waves-effect waves-light btn-large btn" @click.prevent="resetGame">Clear Game</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userPick'],
    data(){
        return{
            numbers: [],
        }
    },
    methods: {
        resetGame(){
            this.$emit('showKeno', true);
            Bus.$emit('resetGame', 'stop-game');
        },
        getNumbers(){
            let no = Math.ceil(Math.random() * 80)
            if(this.numbers.includes(no)){
                this.getNumbers()
            }

            for(let n of this.numbers){
                if(n!=no){
                    return no
                }else{
                    this.getNumbers()
                }
            }
        },
        generateRandomNumbers(){
            if(this.numbers.length < 10){
                let no = Math.ceil(Math.random() * 80)

                if(this.numbers.length && this.numbers.includes(no)){
                    no = this.getNumbers()
                }
                this.numbers.push(no)

                const element =  document.querySelectorAll('.balling')
                
                if(element.length){
                    console.log(element)
                    
                    // element.length%2==0 ? element[element.length - 1].classList.add('animated', 'bounceInLeft') : 
                    // element[element.length - 1].classList.add('animated', 'bounceInRight')                    
                }
            }
        }
    },
    mounted(){
        this.generateRandomNumbers()
        if(this.numbers.length < 10){
            setInterval(() => {
                this.generateRandomNumbers()            
            }, 1000)
        }        
    },
    watch: {
        numbers(){
            if(this.numbers.length==10){
                let count = 0;

                for(let n of this.userPick){
                    this.numbers.includes(n) ? count++ : null
                }

                let title = count > 1 ? `You got ${count} correct numbers` : count == 0 ? `You got no correct numbers` :  `You got ${count} correct number`

                Swal.fire({
                    type: 'info',
                    title: title,
                })
            }
        }
    }
}
</script>

<style scoped>
.container{
    padding: 15px;
}

.ball-container{
    display: flex;
}

.title{
    font-size: 20px;
}

.ball{
    width: 40px !important;
    height: 35px;
    border-radius: 50%;
    background-color: yellow;
    text-align: center;
    margin-top: 2%;
    margin-right: 2%;
}

.balling{
    height: 130px;
    border-radius: 50%;
    background-color: yellow;
    margin-right: 3%;
    /* animation: bounce 0.8s; */
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

.balling:nth-child(5){
    margin-bottom: 3%;    
}

.green-bg{
    background: green;
}

.ball-text{
    font-size: 35px;
    position: relative;
    top: 40px;
    font-weight: 600;
    background: #fff;
    border-radius: 50%;
    padding: 25px 35px;
}

.ball-no{
    font-size: 20px;
    font-weight: 600;
    background: #fff;
    border-radius: 50%;
    padding: 0 9px;
    position: relative;
    left: -6px;
    top: 3px;
}

.btn-container{
    text-align: center;
    padding: 15px;
}
</style>


