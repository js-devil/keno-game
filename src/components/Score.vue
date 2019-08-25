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
                            <span class="ball-no" style="padding: 0 5px" v-else>{{pick}}</span>
                        </div>
                    </div>
                </div>

                <div class="col s12">
                    {{numbers}}
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
            this.$emit('resetGame', true)
        },
        generateRandomNumbers(){
            if(this.numbers.length < 10){
                this.numbers.push(Math.ceil(Math.random() * 80))
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
                    if(this.numbers.includes(n)){
                        count++;
                    }
                }

                let title = count > 1 ? `You got ${count} correct numbers` : `You got ${count} correct number`

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

.ball-no{
    font-size: 20px;
    font-weight: 600;
    background: #fff;
    border-radius: 50%;
    padding: 0 10px;
    position: relative;
    left: -6px;
    top: 3px;
}

.btn-container{
    text-align: center;
    padding: 15px;
}
</style>


