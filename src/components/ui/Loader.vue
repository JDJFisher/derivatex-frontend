<template>
  <div
    class="absolute w-screen h-screen top-0 left-0 has-background-primary z-50"
  >
    <div class="w-2/3 m-auto h-1/3" style="padding-top: 38vh;">
      <div class="fixed">
        <img
          class="w-3/4"
          v-if="showImage"
          src="@/assets/images/logo.png"
          :style="{
            marginTop: imageTopPosition
          }"
        />
        <div
          class="parallelogram slide w-1/2 h-full absolute top-0 has-background-primary border-white"
          style="height: 200px;"
          :style="{
            left: leftPosition,
            transform: skewValue,
            opacity: opacityValue,
            'border-left-width': borderWidth
          }"
        />
        <div
          class="parallelogram slide w-1/2 h-full absolute top-0 has-background-primary border-white"
          style="height: 200px;"
          :style="{
            left: secondLeft,
            transform: skewValue,
            opacity: opacityValue,
            'border-right-width': borderWidth
          }"
        />
      </div>
    </div>
    <div
      class="w-1/4 text-white rounded bg-white p-4 shadow m-auto mt-10 clearfix"
      style="color: white!important"
      :style="{
        opacity: loginOpacity
      }"
      id="login"
    >
      <b-field
        label="Username"
        custom-class="has-text-accent"
        :type="message != '' ? 'is-danger' : ''"
      >
        <b-input
          v-model="username"
          placeholder="Enter your Username"
          maxlength="30"
        ></b-input>
      </b-field>

      <b-field
        label="Password"
        custom-class="has-text-accent"
        :type="message != '' ? 'is-danger' : ''"
        :message="message"
      >
        <b-input
          v-model="password"
          type="password"
          placeholder="Enter your Password"
          maxlength="30"
        ></b-input>
      </b-field>

      <b-button @click="authenticateUser" class="is-pulled-right is-accent"
        >Log In</b-button
      >
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      message: "",
      username: "joe.bloggs@gmail.com",
      password: "123",
      skewValue: "skew(0deg)",
      opacityValue: 1,
      borderWidth: 0,
      leftPosition: "40%",
      secondLeft: "-9%",
      showImage: false,
      imageTopPosition: "0px",
      loginOpacity: 0
    };
  },
  mounted() {
    this.borderWidth = "8px";
    setTimeout(
      function() {
        this.skewValue = "skew(-20deg)";
        this.showImage = true;
      }.bind(this),
      500
    );
    setTimeout(
      function() {
        this.leftPosition = "77%";
        this.secondLeft = "-47%";
      }.bind(this),
      1000
    );
    setTimeout(
      function() {
        this.opacityValue = 0;
      }.bind(this),
      2200
    );
    setTimeout(
      function() {
        this.imageTopPosition = "-15em";
      }.bind(this),
      3500
    );
    setTimeout(
      function() {
        this.loginOpacity = 1;
      }.bind(this),
      3700
    );
    /*setTimeout(
      function() {
        this.$emit("finish");
      }.bind(this),
      3500
    );*/
  },
  methods: {
    authenticateUser() {
      axios
        .post(
          `${process.env.VUE_APP_API_BASE}/user-account-control/authenticate-user`,
          {
            username: this.username,
            password: this.password
          }
        )
        .then(response => {
          this.$store.dispatch("set_user", response.data.user);
          this.$emit("finish");
        })
        .catch(() => {
          this.message = "Incorrect credentials";
        });
    }
  }
};
</script>

<style>
.parallelogram {
  height: 5em;
  transition: border-left-width 0.5s, border-right-width 0.5s, left 1.2s,
    transform 0.5s, opacity 0.5s;
}
img {
  transition: margin-top 0.5s;
}
#login {
  transition: opacity 0.5s;
}
</style>
