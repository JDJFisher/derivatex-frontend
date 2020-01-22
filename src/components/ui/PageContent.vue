<template>
  <div class="w-full h-full relative">
    <PageHeader class="relative z-10" />
    <div class="columns h-full">
      <div id="main-content" class="column is-10" :class="rightSidebarShow ? 'is-10' : 'is-12'">
        <transition name="header-fade" mode="out-in">
          <DerivativesList class="m-8" v-if="page=='derivatives'" />
          <ErrorDetection class="m-8" v-if="page=='error_detection'" />
          <Export class="m-8" v-if="page=='export'" />
          <ReportsList class="m-8" v-if="page=='reports'" />
        </transition>
      </div>
      <div class="column is-2">
        <RightSidebar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import PageHeader from "@/components/ui/PageHeader";
import DerivativesList from "@/views/DerivativesList";
import ErrorDetection from "@/views/ErrorDetection";
import Export from "@/views/Export";
import ReportsList from "@/views/ReportsList";
import RightSidebar from "@/components/ui/RightSidebar";

export default {
  components: {
    PageHeader,
    DerivativesList,
    ErrorDetection,
    Export,
    ReportsList,
    RightSidebar
  },
  computed: {
    ...mapGetters(["page", "rightSidebarShow"])
  }
};
</script>

<style>
  #main-content {
    transition: width 0.3s;
  }
</style>
