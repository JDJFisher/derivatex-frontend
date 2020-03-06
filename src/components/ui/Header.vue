<template>
  <b-navbar class="is-primary overflow-hidden">
    <template slot="brand">
      <div
        class="w-64 py-2 pr-8"
        style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      >
        <img class="" src="@/assets/images/logo.png" />
      </div>
    </template>
    <template slot="start">
      <b-navbar-item
        :active="page == 'derivatives'"
        @click="$store.dispatch('set_page', 'derivatives')"
      >
        <div
          class="mx-6 w-full flex flex-row"
          :class="{ 'has-text-grey-light': page != 'derivatives' }"
        >
          DERIVATIVES
          <chevron-down />
        </div>
      </b-navbar-item>
      <b-navbar-item
        :active="page == 'reports'"
        @click="$store.dispatch('set_page', 'reports')"
      >
        <div
          class="mx-6 w-full flex flex-row"
          :class="{ 'has-text-grey-light': page != 'reports' }"
        >
          REPORTS
          <chevron-down />
        </div>
      </b-navbar-item>
      <b-navbar-item
        :active="page == 'export'"
        @click="$store.dispatch('set_page', 'export')"
      >
        <div
          class="mx-6 w-full flex flex-row"
          :class="{ 'has-text-grey-light': page != 'export' }"
        >
          EXPORT
          <chevron-down />
        </div>
      </b-navbar-item>
      <b-navbar-item
        :active="page == 'error_detection'"
        @click="$store.dispatch('set_page', 'error_detection')"
      >
        <div
          class="mx-6 w-full flex flex-row"
          :class="{ 'has-text-grey-light': page != 'error_detection' }"
        >
          LEARNED BEHAVIOUR
          <chevron-down />
        </div>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <p class="text-right pr-2">
          <span class="font-bold">{{ user.f_name }} {{ user.l_name }}<br></span>
          <span class="text-xs has-text-accent cursor-pointer" @click="logout">Log out</span>
        </p>
        <img class="rounded-full h-12 w-12 object-cover" :src="user.profile_image" style="max-height: 100%!important;">
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

import ChevronDown from "vue-material-design-icons/ChevronDown.vue";

export default {
  components: {
    ChevronDown
  },
  computed: {
    ...mapGetters(["page", "user"])
  },
  methods: {
    logout() {
      location.reload();
    }
  }
};
</script>
