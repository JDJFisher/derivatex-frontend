<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Description</p>
        <p class="title is-5 pt-2">{{ node.description ? node.description : 'No Description' }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Confidence</p>
        <p class="title">{{ node.confidence }}%</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Flags</p>
        <p class="title">{{ node.last_flag_count }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Corrections</p>
        <p class="title">{{ actions.length }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered" v-if="node.approved">
      <div>
        <p class="heading">Automated</p>
        <div class="field">
            <b-switch v-model="newAutomated" @input="automate" class="pt-2"></b-switch>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered" v-if="!node.approved">
      <div>
        <p class="heading">Approved</p>
        <div class="field">
            <b-switch class="pt-2" @input="approve"></b-switch>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <h2 class="subtitle is-6 has-text-accent cursor-pointer" @click="view">View →</h2>
    </div>
  </nav>
</template>

<script>
const axios = require("axios");
import { EventBus } from "@/event-bus.js";

import TreeModal from "@/components/error_detection/TreeModal";

export default {
  props: {
    node: Object,
    actions: Array
  },
  data() {
    return {
      newAutomated: false
    }
  },
  mounted() {
    this.newAutomated = this.node.automated;
  },
  methods: {
    approve() {
      axios
        .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.node.id}`, {updates: {approved: true}})
        .then(() => {
          EventBus.$emit("refreshLB");
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to update learned behaviour.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    automate() {
      axios
        .post(`${process.env.VUE_APP_API_BASE}/learned-behaviour/update-tree/${this.node.id}`, {updates: {automated: this.newAutomated}})
        .then(() => {
          EventBus.$emit("refreshLB");
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to update learned behaviour.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    view() {
      this.$store.dispatch("set_learned_behaviour", { ...this.node, actions: this.actions });
      this.$buefy.modal.open({
        parent: this,
        component: TreeModal,
        hasModalCard: true,
        trapFocus: true,
        fullScreen: true
      });
    }
  }
};
</script>
