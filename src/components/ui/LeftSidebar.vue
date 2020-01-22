<template>
  <div
    class="w-64 p-2 h-full has-background-primary-dark text-white"
    style="box-shadow: 3px 0px 20px 10px rgba(0,0,0,.25)"
  >
    <DerivativesLeftSidebar />
  </div>
</template>

<script>
import DerivativesLeftSidebar from "@/components/derivatives/DerivativesLeftSidebar";

export default {
  components: {
    DerivativesLeftSidebar
  },
  computed: {}
};
</script>
