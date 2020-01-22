<template>
  <div>
    <b-table
      :data="data"
      :columns="columns"
      :selected.sync="selected"
      @select="$store.dispatch('set_right_sidebar_show', true)">
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        underlying_asset: "Housing",
        currency: "GBP",
        date: "2016-10-15 13:43:27",
        value: "£1.40"
      },
      {
        id: 2,
        underlying_asset: "Currency",
        currency: "USB",
        date: "2017-08-07 13:43:27",
        value: "£10.20"
      },
      {
        id: 3,
        underlying_asset: "Assets",
        currency: "USD",
        date: "2018-01-21 13:43:27",
        value: "£25.20"
      },
      {
        id: 4,
        underlying_asset: "Derivatives",
        currency: "JPY",
        date: "2018-03-16 13:43:27",
        value: "£15.10"
      },
      {
        id: 5,
        underlying_asset: "Stock ISA",
        currency: "AFB",
        date: "2019-05-18 13:43:27",
        value: "£9.50"
      }
    ];

    return {
      data,
      selected: null,
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "underlying_asset",
          label: "Underlying Asset"
        },
        {
          field: "currency",
          label: "Currency"
        },
        {
          field: "date",
          label: "Date",
          centered: true
        },
        {
          field: "value",
          label: "Value"
        }
      ]
    };
  }
};
</script>
