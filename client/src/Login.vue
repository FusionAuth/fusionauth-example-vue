<template>
  <h1 v-if="boolShowSignOut"><a href='http://localhost:3000/logout'>Sign Out</a></h1>
  <h1 v-else><a href='http://localhost:3000/login'>Sign In</a></h1>
</template>
<script>
export default {
  name: "Login",
  props: ["boolShowSignOut"],
};
</script>
