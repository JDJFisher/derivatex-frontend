<template>
  <transition name="header-fade" mode="out-in">
    <div
      class="w-full h-10 p-2 pl-6 has-background-white"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px 0px;"
      key="derivatives"
      v-if="page == 'derivatives'"
    >
      <DerivativesPageHeader />
    </div>
    <div
      class="w-full h-10 p-2 pl-6 has-background-white"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px 0px;"
      key="error_detection"
      v-if="page == 'error_detection'"
    >
      <ErrorDetectionPageHeader />
    </div>
    <div
      class="w-full h-10 p-2 pl-6 has-background-white"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px 0px;"
      key="export"
      v-if="page == 'export'"
    >
      <ExportPageHeader />
    </div>
    <div
      class="w-full h-10 p-2 pl-6 has-background-white"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 20px 0px;"
      key="reports"
      v-if="page == 'reports'"
    >
      <ReportsPageHeader />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import DerivativesPageHeader from "@/components/derivatives/DerivativesPageHeader";
import ErrorDetectionPageHeader from "@/components/error_detection/ErrorDetectionPageHeader";
import ExportPageHeader from "@/components/export/ExportPageHeader";
import ReportsPageHeader from "@/components/reports/ReportsPageHeader";

export default {
  components: {
    DerivativesPageHeader,
    ErrorDetectionPageHeader,
    ExportPageHeader,
    ReportsPageHeader
  },
  computed: {
    ...mapGetters(["page"])
  }
};
</script>

<style>
.header-fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.3s;
}
.header-fade-leave-active {
  transition: all 0.3s ease;
}
.header-fade-enter,
.header-fade-leave-to {
  opacity: 0;
}
</style>
