<template>
  <div id="app">
    <router-view></router-view>
    <date-html :timeArr="timeArr" @timeParse="setTime"></date-html>
    <div>
      {{this.timeData}}
    </div>
  </div>
</template>

<script>
import dateHtml from './components/dateTime.vue'
export default {
  name: 'App',
  components: {
    dateHtml
  },
  data(){
    return{
      timeData:'',
      timeArr:[
        {
          text: "昨日",
          type: 1,
        },
        {
          text: "今日",
          type: 2,
        },
      ]
    }
  },
  methods:{
    setTime(val){
      console.log(val)
      this.timeData=val
    }
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
