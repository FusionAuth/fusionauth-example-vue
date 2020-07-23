<template>
  <h1 v-if="email"><a href='http://localhost:9000/logout'>Sign Out</a></h1>
  <h1 v-else><a href='http://localhost:9000/login'>Sign In</a></h1>
</template>

<script>
export default {
  name: "Login",
  props: ["email"],
};
</script>

