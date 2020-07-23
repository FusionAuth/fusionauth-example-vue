<template>
  <form @submit.prevent="update">
    <textarea
      v-model="userData"
      placeholder="Update FusionAuth user data."
    ></textarea>
    <button type="submit" class="button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "Update",
  data() {
    return {
      userData: "",
    };
  },
  methods: {
    update: function() {
      fetch(`http://localhost:9000/set-user-data`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: this.userData,
        }),
      }).catch((err) => {
          console.log(err);
        });

        this.userData=''
    },
  },
};

//
</script>
<style>

textarea {
  display: block;
  margin-left: auto;
  margin-right: auto;

}
button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
}

</style>
