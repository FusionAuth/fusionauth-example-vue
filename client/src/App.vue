<template>
  <div id="app">
    <header>
      <h1>FusionAuth Example Vue</h1>
    </header>
    <div id="container">
      <Greet v-bind:email="email" />
      <Login v-bind:email="email" />
      <Update v-if="email" />
    </div>
  </div>
</template>

<script>
import Greet from "./Greeting";
import Login from "./Login";
import Update from "./Update";

export default {
  name: "app",
  components: {
    Greet,
    Login,
   Update    
  },data() {
    return {
      email: null,
      body: null,
    };
  },
  mounted() {
    fetch(`http://localhost:9000/user`, {
      credentials: "include", // fetch won't send cookies unless you set credentials
    })
      .then((response) => response.json())
      .then((data) => {
        this.email = data.introspectResponse.email;
        this.body= data.body;
      });
  }
};
</script>

<style>
h1 {
  text-align: center;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
}
#container {
  padding-top: 10px;
  box-sizing: border-box;
  border: 5px solid gray;
  border-radius: 15%;
  width: 400px;
  height: 400px;
  margin: auto;
}
</style>
