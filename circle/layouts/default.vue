<template>
  <v-app>
    <v-navigation-drawer
      v-model="showDrawer"
      clipped
      fixed
      app
      width="330"
    >
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-content>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <!-- Direct link to 'Charge a card' -->
        <v-list-item to="/flow/charge" router exact>
          <v-list-item-content>
            <v-list-item-title> Settle Up </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app dark color="primary" dense>
      <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="showRightDrawer = !showRightDrawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="showRightDrawer"
      :right="true"
      temporary
      fixed
    >
      <v-content class="pa-3 pt-8">
        <p>Settings</p>
        <v-form class="mt-8">
          <v-text-field v-model="apiKey" label="Your API key" outlined />
          <p class="subtitle-2 font-weight-light mb-8">
            Do not share or record your API keys in publicly accessible mediums such as GitHub, client-side code, etc.
          </p>
          <v-switch v-model="isMarketplace" label="I am using a Circle Marketplaces API key"></v-switch>
        </v-form>
      </v-content>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DefaultLayoutsClass extends Vue {
  showDrawer = false;
  showRightDrawer = false;
  title = "MooneyShare";
  apiKey = '';
  isMarketplace = false;
}
</script>
