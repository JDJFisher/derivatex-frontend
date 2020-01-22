<template>
  <div class="w-full h-full relative" style="background-color: #F0F0F0">
    <PageHeader class="relative z-10" />
    <div class="columns h-full">
      <div class="column is-10">
        <DerivativesList class="m-8" />
      </div>
      <div class="column is-2">
        <DerivativesRightSidebar
          class="has-background-white h-full"
          style="box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 12px 0px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/ui/PageHeader";
import DerivativesList from "@/views/DerivativesList";
import DerivativesRightSidebar from "@/components/derivatives/DerivativesRightSidebar";

export default {
  components: {
    PageHeader,
    DerivativesList,
    DerivativesRightSidebar
  },
  computed: {}
};
</script>
