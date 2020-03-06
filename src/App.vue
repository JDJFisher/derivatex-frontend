<template>
  <div id="app" class="flex flex-col h-screen">
    <transition name="fade">
      <Loader v-if="showLoader" @finish="showLoader = false" />
    </transition>
    <Header style="position: fixed;" class="w-full" />
    <div class="flex-grow flex flex-row" style="background-color: #F0F0F0; margin-top: 4rem;">
      <LeftSidebar class="relative z-20" style="position: fixed;" />
      <PageContent class="relative z-10" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/Loader";
import PageContent from "@/components/ui/PageContent";
import LeftSidebar from "@/components/ui/LeftSidebar";

export default {
  components: {
    Header,
    Loader,
    PageContent,
    LeftSidebar
  },
  data() {
    return {
      showLoader: true
    };
  }
};
</script>

<style>
.v-timeline-item__body {
  max-width: initial!important;
  margin-left:1rem;
}
.v-timeline-item__divider {
  min-width: initial!important;
}

.v-card::before {
  display:none;
}

.v-timeline::before {
  margin-left: 0.7em;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
// Import Tailwind
@import url("https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css");

// Import work sans font
@import url("https://fonts.googleapis.com/css?family=Work+Sans&display=swap");

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #3a4b62;
$primary-invert: findColorInvert($primary);
$primary-dark: #2f3c4f;
$primary-dark-invert: findColorInvert($primary-dark);
$accent: #2e9cea;
$accent-invert: findColorInvert($accent);

// Set menu colours
$menu-item-color: $white;
$menu-item-hover-color: $white;
$menu-label-color: $accent;
$menu-item-hover-background-color: #3a4b62;

// Set font
$family-primary: "Work Sans";

// Setup $colors to use as bulma classes
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "primary-dark": (
    $primary-dark,
    $primary-dark-invert
  ),
  "accent": (
    $accent,
    $accent-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  )
);

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
