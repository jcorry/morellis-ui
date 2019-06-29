<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-table
        title="Users"
        :data="users"
        :columns="columns"
        row-key="uuid"
      >
        <template v-slot:body-cell-status="props">
          <q-td key="status" class="text-left">
            <q-badge 
              v-bind:color="props.row.status == 'verified' ? 'green-5' : 'amber-5'"
              v-bind:text-color="props.row.status == 'verified' ? 'white' : 'grey-9'"
            >
              {{props.row.status}}
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td key="actions" class="text-left">
            <q-btn
              color="positive"
              size="sm"
              label="Edit"
              @click="editUser(props.row.uuid)"
            >
              <q-icon name="edit" size="1.2em" />
            </q-btn>
            &nbsp;
            <q-btn
              color="warning"
              text-color="grey-9"
              size="sm"
              label="Delete"
              @click="deleteUser(props.row.uuid)"
            >
              <q-icon name="delete" size="1.2em" />
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
    
<script>
  export default {
    name: "UserList",
    components: {
    },
    data () {
      return {
        columns: [
          {
            name: 'firstName',
            required: false,
            label: 'First Name',
            align: 'left',
            field: row => row.firstName,
            format: val => `${val}`,
            sortable: true
          },
          {name: 'lastName', required: false, label: 'Last Name', align: "left", field: row => row.lastName, sortable: true},
          {name: 'email', required: false, label: 'Email', align: "left", field: row => row.email, sortable: true},
          {name: 'phone', required: false, label: 'Phone', align: "left", field: row => row.phone, sortable: true},
          {name: 'status', required: false, label: 'Status', align: "left", field: row => row.status, format: (val) => {
              return `${val}`
            },
            sortable: true},
          {name: 'created', required: false, label: 'Created', align: "left", field: row => row.created, 
            format: (val) => {
              let d = new Date(val)
              let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

              return d.toLocaleDateString('en-US', options);
            },
            sortable: true
          },
          {name: 'actions', required: true, label: null, field: null, sortable: false},
        ],
        users: [],
      }
    },
    methods: {
      getUsers() {
        let uri = `${this.$config.apiBaseURL}/user`
        this.users = []
        window.axios.get(uri, {

        }).then(response => {
          this.users = response.data.items
        }).catch(err => {
          console.error(err)
        })
      },
      editUser(key) {
        console.log(key)
      },
      deleteUser(key) {
        console.log(key)
      }
    },
    mounted: function() {
      this.getUsers()
    },
  }
</script>

<style>

</style>
