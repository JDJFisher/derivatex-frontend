<template>
  <div>
    <div class="clearfix">
      <b-button class="is-accent mr-4 is-pulled-right" :loading="generating" :disabled="generating" @click="generate">
        Generate Learned Behaviours
      </b-button>
    </div>
    <div class="flex flex-row">
      <div class="w-1/2 m-4 box">
        <b-loading :is-full-page="false" :active="loading"></b-loading>
        <h1 class="title is-4">Approved Learned Behaviours</h1>
        <hr>
        <div v-for="node in approvedTrees" :key="node.id">
          <TreeThumbnail
            :node="node"
            :actions="actions[node.id]"
          />
          <hr>
        </div>
        <p class="italic text-center" v-if="!loading && approvedTrees.length == 0">
          There are no approved learned behaviours
        </p>
      </div>
      <div class="w-1/2 m-4 box">
        <h1 class="title is-4">Provisional Learned Behaviours</h1>
        <hr>
        <div v-for="node in provisionalTrees" :key="node.id">
          <TreeThumbnail
            :node="node"
            :actions="actions[node.id]"
          />
          <hr>
        </div>
        <p class="italic text-center" v-if="!loading && provisionalTrees.length == 0">
          There are no provisional learned behaviours
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { EventBus } from "@/event-bus.js";

import TreeThumbnail from "@/components/error_detection/TreeThumbnail"

export default {
  components: {
    TreeThumbnail
  },
  data() {
    return {
      generating: false,
      loading: false,
      trees: [],
      actions: {}
    };
  },
  computed: {
    approvedTrees() {
      return this.trees.filter(x => x.approved);
    },
    provisionalTrees() {
      return this.trees.filter(x => !x.approved);
    }
  },
  methods: {
    generate() {
      this.generating = true;
      axios
        .get(`${process.env.VUE_APP_API_BASE}/learned-behaviour/grow-trees`)
        .then(() => {
          this.generating = false;
          this.refresh();
        })
        .catch(error => {
          this.generating = false;
          this.$buefy.snackbar.open({
            message: "Failed to generate learned behaviours.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    refresh() {
      this.loading = true;
      this.trees = [];
      axios
        .get(`${process.env.VUE_APP_API_BASE}/learned-behaviour/index-trees`)
        .then(response => {
          this.trees = response.data.trees;
          this.actions = response.data.actions;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.$buefy.snackbar.open({
            message: "Failed to fetch learned behaviours.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    }
  },
  mounted() {
    this.refresh();
    EventBus.$on('refreshLB', () => {
      this.refresh();
    });
  }
};
</script>
