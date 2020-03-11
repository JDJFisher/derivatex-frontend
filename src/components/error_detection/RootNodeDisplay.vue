<template>
  <div>
    <Vue2OrgTree
      :data="treeData"
      :horizontal="true"
      :label-class-name="labelClassName"
    />
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Decision</p>
          <div class="bg-gray-300 w-8 h-8 m-auto"></div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Valid</p>
          <div class="bg-green-300 w-8 h-8 m-auto"></div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Erroneous</p>
          <div class="bg-red-300 w-8 h-8 m-auto"></div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Action</p>
          <div class="bg-yellow-300 w-8 h-8 m-auto"></div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import Vue2OrgTree from 'vue2-org-tree'

export default {
  components: {
    Vue2OrgTree
  },
  props: {
    node: Object
  },
  computed: {
    treeData() {
      return this.normaliseNode(this.node, true, true);
    }
  },
  methods: {
    labelClassName(x) {
      switch(x.type) {
        case 'action':
          return 'bg-yellow-300 font-bold'
        case 'decision':
          return 'bg-gray-300'
        case 'valid':
          return 'bg-green-300'
        case 'erroneous':
          return 'bg-red-300 font-bold'
      }
    },
    normaliseNode(node, isTrue, isRoot) {
      var children = [];
      if (node.true_node) {
        children.push(this.normaliseNode(node.true_node, true, false));
      } else {
        var newChildren = [];
        if (node.true_label == "ERRONEOUS" && this.node.suggested_feature) {
          newChildren.push({label: `\nChange ${this.node.suggested_feature}`, type: 'action'});
        }
        if (node.true_label == "ERRONEOUS" && this.node.suggested_value) {
          newChildren[0].label += ` to ${this.node.suggested_value}`;
        }
        children.push({
          children: newChildren,
          expand: true,
          id: 'trueLabel',
          label: `(True) ${this.$options.filters.titleCase(node.true_label)}`,
          type: node.true_label == "ERRONEOUS" ? 'erroneous' : 'valid'
        });
      }
      if (node.false_node) {
        children.push(this.normaliseNode(node.false_node, false, false));
      } else {
        newChildren = [];
        if (node.false_label == "ERRONEOUS" && this.node.suggested_feature) {
          newChildren.push({label: `\nChange ${this.node.suggested_feature}`, type: 'action'});
        }
        if (node.false_label == "ERRONEOUS" && this.node.suggested_value) {
          newChildren[0].label += ` to ${this.node.suggested_value}`;
        }
        children.push({
          children: newChildren,
          expand: true,
          id: 'falseLabel',
          label: `(False) ${this.$options.filters.titleCase(node.false_label)}`,
          type: node.false_label == "ERRONEOUS" ? 'erroneous' : 'valid'
        });
      }

      var label = "";
      if (!isRoot) {
        label += `(${isTrue ? 'True' : 'False'}) `;
      }
      label += `${this.$options.filters.titleCase(node.feature)} - ${node.criteria}`;

      return {
        children: children,
        expand: true,
        id: node.id,
        label: label,
        type: 'decision'
      }
    }
  }
};
</script>
