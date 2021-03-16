<template>
  <div className="greet">
    <h3 v-if="email">Welcome {{email}} </h3>
    <h3 v-else>You are not logged in</h3>
  <div>
    <u>authState:</u>
  </div>
    <div class="authStateBox"> {{authState}} </div> 
  </div>
</template>
<script>
  export default {
  name: 'Greet',
  props: ["email", "authState"],
};
</script>
<style>
  *{
     margin-top:30px;
     text-align: center;
     font-size: 20px;
     font-family: 'Courier New', Courier, monospace;
  }
  .authStateBox{
     margin: 20px;
     background-color: lightcoral;
     border-radius: 25px;
  }
</style>
