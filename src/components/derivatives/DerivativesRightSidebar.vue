<template>
  <div class="p-4 w-full flex flex-col">
    <div>
      <p class="subtitle is-5 pt-4 has-text-accent">
        Derivative: {{ derivative.id }}
      </p>
      <div class="content">
        <b>Asset</b>: {{ derivative.asset }}<br>
        <hr>
        <b>Buying Party</b>: {{ derivative.buying_party }}<br>
        <b>Selling Party</b>: {{ derivative.selling_party }}<br>
        <hr>
        <b>Trade Date</b>: {{ derivative.date_of_trade }}<br>
        <b>Maturity Date</b>: {{ derivative.maturity_date }}<br>
        <hr>
        <b>Quantity</b>: {{ derivative.quantity }}<br>
        <b>Strike Price</b>: {{ derivative.strike_price }}<br>
        <b>Underlying Price</b>: {{ derivative.underlying_price }}<br>
        <b>Notional Value</b>: {{ derivative.notional_value }}<br>
      </div>
      <hr />
    </div>
    <div>
      <p class="subtitle is-5 pt-4 has-text-accent">
        Activity
      </p>
      <div class="content overflow-scroll hidden">
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            color="purple lighten-2"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="purple lighten-2">
                <v-icon
                  dark
                  size="42"
                  class="mr-4"
                >
                  mdi-magnify
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 1</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="10">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                  </v-col>
                  <v-col
                    class="hidden-sm-and-down text-right"
                    md="2"
                  >
                    <v-icon size="64">mdi-calendar-text</v-icon>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="amber lighten-1"
            fill-dot
            left
            small
          >
            <v-card>
              <v-card-title class="amber lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Title 2</h2>
                <v-icon
                  dark
                  size="42"
                >mdi-home-outline</v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12" md="8">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                  </v-col>
                  <v-col cols="12" md="4">
                    Lorem ipsum dolor sit amet, no nam oblique veritus.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="cyan lighten-1"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="cyan lighten-1">
                <v-icon
                  class="mr-4"
                  dark
                  size="42"
                >
                  mdi-email-outline
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 3</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col
                    v-for="n in 3"
                    :key="n"
                    cols="12"
                    md="4"
                  >
                    Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="red lighten-1"
            fill-dot
            left
            small
          >
            <v-card>
              <v-card-title class="red lighten-1 justify-end">
                <h2 class="display-1 mr-4 white--text font-weight-light">Title 4</h2>
                <v-icon
                  dark
                  size="42"
                >
                  mdi-account-multiple-outline
                </v-icon>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col class="hidden-sm-and-down" md="2">
                    <v-icon size="64">mdi-server-network</v-icon>
                  </v-col>
                  <v-col cols="12" md="10">
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>

          <v-timeline-item
            color="green lighten-1"
            fill-dot
            right
          >
            <v-card>
              <v-card-title class="green lighten-1">
                <v-icon
                  class="mr-4"
                  dark
                  size="42"
                >
                  mdi-phone-in-talk
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Title 5</h2>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col>
                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({derivative: "rightSidebarData"}),
  }
};
</script>
