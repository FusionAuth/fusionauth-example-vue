
<template>
  <div class="greet">
    <h3 v-if="email">Welcome {{email}} </h3>
    <h3 v-else>You are not logged in.</h3>
  </div>
</template>
<script>
export default {
  name: 'Greet',
  props: ["email"],
};
</script>
<style > 
*{
    margin-top:30px;
    text-align: center;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
}

</style>