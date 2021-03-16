<template>
  <div id='app'>
    <header>
      <h1>FusionAuth Example Vue</h1>
    </header>
    <div id = 'container'>
      <Greet v-bind:email="email" />
    </div>
  </div>
</template>
<script>
import Greet from './Greeting';
export default {
  name: 'app',
  components: {
      Greet,
  },
  data(){
    return {
      // email : 'dinesh@fusionauth.io'
    }
  }
};
</script>
<style>
h1 {
  text-align: center;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
}
#container{
  box-sizing: border-box;
  border: 5px solid gray ;
  border-radius: 15%;
  width: 400px;
  height: 400px;
  margin: auto;
}
</style>