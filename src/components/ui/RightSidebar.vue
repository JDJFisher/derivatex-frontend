<template>
  <transition name="right-slide-fade" mode="out-in">
    <div
      class="has-background-white h-full"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
      key="derivatives"
      v-if="page == 'derivatives' && rightSidebarShow"
    >
      <DerivativesRightSidebar />
    </div>
    <div
      class="has-background-white h-full"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
      key="error_detection"
      v-if="page == 'error_detection' && rightSidebarShow"
    >
      <ErrorDetectionRightSidebar />
    </div>
    <div
      class="has-background-white h-full"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
      key="export"
      v-if="page == 'export' && rightSidebarShow"
    >
      <ExportRightSidebar />
    </div>
    <div
      class="has-background-white h-full"
      style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
      key="reports"
      v-if="page == 'reports' && rightSidebarShow"
    >
      <ReportsRightSidebar />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import DerivativesRightSidebar from "@/components/derivatives/DerivativesRightSidebar";
import ErrorDetectionRightSidebar from "@/components/error_detection/ErrorDetectionRightSidebar";
import ExportRightSidebar from "@/components/export/ExportRightSidebar";
import ReportsRightSidebar from "@/components/reports/ReportsRightSidebar";

export default {
  components: {
    DerivativesRightSidebar,
    ErrorDetectionRightSidebar,
    ExportRightSidebar,
    ReportsRightSidebar
  },
  watch: {
    page: function() {
      this.$store.dispatch("set_right_sidebar_show", false);
    }
  },
  computed: {
    ...mapGetters(["page", "rightSidebarShow"])
  }
};
</script>

<style>
.right-slide-fade-enter-active {
  transition: all 0.3s ease;
}
.right-slide-fade-leave-active {
  transition: all 0.3s ease;
}
.right-slide-fade-enter,
.right-slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
