<template>
  <q-page class="flex flex-center">
    User Table
  </q-page>
</template>
    
<script>
  export default {
    name: "UserList",
    components: {
    },
    data () {
      return {
        users: [],
      }
    },
    methods: {
      getUsers() {
        this.users = []
      },
      deleteUser() {
        return true
      }
    }
  }
</script>

<style>

</style>
