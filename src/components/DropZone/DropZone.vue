<template>
  <draggable
    :list="list"
    :group="group"
    ghost-class="ghost"
    chosen-class="chosen"
    drag-class="drag"
  >
    <div
      role="card-list"
      class="list-group-item"
      v-for="element in list"
      :key="element.id"
    >
      &nbsp;
      <Card :class="cardClass" :card="element" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import Card from '@/components/Card/Card'

export default {
  name: "dropzone",
  display: "DropZone",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    group: {
      type: String,
      default: "default"
    },
    cardClass: {
      type: String,
      default: ""
    }
  },
  components: {
    draggable,
    Card
  },
};
</script>

<style lang="postcss" scoped>
.list-group-item {
  display: inline-flex;
  flex-direction: column;
  height: 350px;
}
.ghost {
  opacity: 0.5;
}
.chosen {
  opacity: 0.5;
}
.drag {
  opacity: 0.5;
}
</style>
