<template>
  <transition name="slide-fade" mode="out-in">
    <div
      class="w-64 p-2 h-full has-background-primary-dark text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      v-if="page == 'derivatives'"
      key="derivatives"
    >
      <DerivativesLeftSidebar />
    </div>
    <div
      class="w-64 p-2 h-full has-background-primary-dark text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      v-if="page == 'export'"
      key="export"
    >
      <ExportLeftSidebar />
    </div>
    <div
      class="w-64 p-2 h-full has-background-primary-dark text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      v-if="page == 'reports'"
      key="reports"
    >
      <ReportsLeftSidebar />
    </div>
    <div
      class="w-64 p-2 h-full has-background-primary-dark text-white"
      style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
      v-if="page == 'error_detection'"
      key="error_detection"
    >
      <ErrorDetectionLeftSidebar />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import DerivativesLeftSidebar from "@/components/derivatives/DerivativesLeftSidebar";
import ExportLeftSidebar from "@/components/export/ExportLeftSidebar";
import ReportsLeftSidebar from "@/components/reports/ReportsLeftSidebar";
import ErrorDetectionLeftSidebar from "@/components/error_detection/ErrorDetectionLeftSidebar";

export default {
  components: {
    DerivativesLeftSidebar,
    ExportLeftSidebar,
    ReportsLeftSidebar,
    ErrorDetectionLeftSidebar
  },
  computed: {
    ...mapGetters(["page"])
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
