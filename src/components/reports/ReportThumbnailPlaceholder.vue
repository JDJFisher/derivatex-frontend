<template>
  <div class="border-dashed border-gray-400 border-2">
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <div class="card-content clearfix">
      <div class="w-full flex flex-row flex-wrap">
        <p class="w-full text-center" v-if="otherReports & !noDerivatives">
          All reports are redacted due to errors.
        </p>
        <p
          class="w-full text-center mb-2"
          v-if="!otherReports & !noDerivatives"
        >
          No report has been generated.
        </p>
        <p class="w-full text-center mb-2" v-if="noDerivatives">
          No derivatives have been recorded for this date.
        </p>

        <a class="card-footer-item" v-if="!noDerivatives" @click="generate">
          <Refresh class="mr-2" />
          Generate Report
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Refresh from "vue-material-design-icons/Refresh.vue";

const axios = require("axios");

export default {
  components: {
    Refresh
  },
  props: {
    date: String,
    otherReports: Boolean,
    noDerivatives: Boolean
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    generate() {
      this.loading = true;
      axios
        .get(
          process.env.VUE_APP_API_BASE +
            "/reporting/generate-report/" +
            this.date
        )
        .then(() => {
          this.loading = false;
          this.$emit("refresh");
        });
    }
  }
};
</script>
