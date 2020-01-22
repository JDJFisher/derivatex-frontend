<template>
  <div class="absolute w-screen h-screen top-0 left-0 has-background-primary z-50">
    <div class="w-2/3 m-auto h-1/3" style="padding-top: 38vh;">
      <div class="fixed">
        <img class="w-3/4" v-if="showImage" src="@/assets/images/logo.png" />
        <div
          class="parallelogram slide w-1/2 h-full absolute top-0 has-background-primary border-white"
          :style="{left: leftPosition, transform: skewValue, opacity: opacityValue, 'border-left-width': borderWidth}"
        />
        <div
          class="parallelogram slide w-1/2 h-full absolute top-0 has-background-primary border-white"
          :style="{left: secondLeft, transform: skewValue, opacity: opacityValue, 'border-right-width': borderWidth}"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skewValue: "skew(0deg)",
      opacityValue: 1,
      borderWidth: 0,
      leftPosition: "40%",
      secondLeft: "-9%",
      showImage: false
    };
  },
  mounted(){
    this.borderWidth = "8px";
    setTimeout(function() {
        this.skewValue = "skew(-20deg)";
        this.showImage = true;
    }.bind(this), 500);
    setTimeout(function() {
        this.leftPosition = "77%";
        this.secondLeft = "-47%";
    }.bind(this), 1000);
    setTimeout(function() {
        this.opacityValue = 0;
    }.bind(this), 2200);
    setTimeout(function() {
        this.$emit('finish');
    }.bind(this), 3500);
  }
};
</script>

<style>
.parallelogram {
  height: 5em;
  transition: border-left-width 0.5s, border-right-width 0.5s, left 1.2s, transform 0.5s, opacity 0.5s;
}
</style>
