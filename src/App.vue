<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>
          Morellis Flavor Notifications
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <div class="q-pa-md" v-if="this.user.authenticated !== true">
        <h6>Login</h6>
        <q-form 
          @submit="login"
        >
          <q-input
            filled
            type="email"
            v-model="user.email"
            label="Email"
            lazy-rules
            :rules="['email']"
          />
          <q-input
            filled
            type="password"
            v-model="user.password"
            label="Password"
            lazy-rules
            :rules="['password']"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
      <div v-if="this.user.authenticated" class="q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{this.user.email}}</div>
            <div class="text-subtitle2">Authenticated</div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="left">
            <q-btn v-show="(this.user.permissions).includes('self:write')" flat><q-icon name="perm_identity"></q-icon>&nbsp;Profile</q-btn>
            <q-btn flat @click="logout()"><q-icon name="verified_user"></q-icon>&nbsp;Logout</q-btn>
          </q-card-actions>
        </q-card>
      </div>
        
      <q-list v-show="this.user.authenticated">
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
              <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="(this.user.permissions).includes('flavor:read')" to="/flavors">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
              <q-item-label>Flavors</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="(this.user.permissions).includes('user:read')" to="/users">
          <q-item-section avatar>
            <q-icon name="supervised_user_circle" />
          </q-item-section>
          <q-item-section>
              <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-show="(this.user.permissions).includes('store:read')" to="/stores">
          <q-item-section avatar>
            <q-icon name="" />
          </q-item-section>
          <q-item-section>
              <q-item-label>Stores</q-item-label>
          </q-item-section>
        </q-item>
        

        <q-item to="/preferences">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
              <q-item-label>Preferences</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { POINT_CONVERSION_COMPRESSED, defaultCoreCipherList } from 'constants'
import { required, minLength, email } from 'vuelidate/lib/validators'


export default {
  name: 'LayoutDefault',

  components: {
  },
  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    login() {
      this.$v.user.$touch()
      if (this.$v.user.$error) {
        console.log(this.$v.user.$error)
        return
      } else {
        let uri = `${this.$config.apiBaseURL}/auth`
        window.axios.post(uri, {
          email: this.user.email,
          password: this.user.password
        }).then(response => {
            let token = response.data.token
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            this.user.authenticated = true
            this.user.uuid = getUuidFromJwt(token)
            this.user.permissions = getPermissionsFromJwt(token)
            window.localStorage.setItem('user', JSON.stringify(this.user))
        }).catch(err => {
          console.table(err)
        })
        console.log("Valid user: ", this.user.email)
      }
    },
    logout() {
      this.user.uuid = ""
      this.user.authenticated = false
      this.user.permissions = []
      window.localStorage.removeItem('user')
      console.log('Logged user out')
    },
  },
  mounted: function () {
    let user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      this.user = user
    }
    console.log(user)
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      user: {
        uuid: "",
        authenticated: false,
        email: "",
        password:"",
        permissions: []
      }
    }
  }
}

function getUuidFromJwt(token) {
  let [headerEncoded, payloadEncoded, signature] = token.split('.')
  let [header, payload] = [headerEncoded, payloadEncoded].map(decodeTokenComponent)
  return payload.uuid
}

function getPermissionsFromJwt(token) {
  let [headerEncoded, payloadEncoded, signature] = token.split('.')
  let [header, payload] = [headerEncoded, payloadEncoded].map(decodeTokenComponent)
  let permissions = []
  payload.userPermissions.forEach(up => {
    permissions.push(up.permission.name)
  })
  return permissions
}

function decodeTokenComponent(value) {
  const buff = new Buffer(value, 'base64')
  const text = buff.toString('ascii')
  return JSON.parse(text)
}
</script>

<style>
</style>
