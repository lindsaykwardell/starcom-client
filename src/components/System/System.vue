<template>
  <div v-if="system" class="flex flex-col justify-center items-center">
    <Card class="horizontal" :card="system" />
    <DropZone class="dropzone" cardClass="card sm" :list="cards" :group="group" />
  </div>
</template>

<script>
import DropZone from "@/components/DropZone/DropZone";
import Card from "@/components/Card/Card";

export default {
  props: {
    system: {
      type: Object,
      default: null,
    },
    cards: {
      type: Array,
      default: () => [],
    },
    group: {
      type: String,
      default: "default",
    },
  },
  components: {
    DropZone,
    Card
  },
};
</script>

<style lang="postcss" scoped>
.dropzone {
  height: 20px;
  width: 100%;
}
</style>