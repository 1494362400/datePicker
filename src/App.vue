<template>
  <div id="app">
    <router-view></router-view>
    <date-html @timeParse="setTime"></date-html>
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
      timeData:''
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
