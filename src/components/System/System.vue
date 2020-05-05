<template>
  <div v-if="system" class="flex flex-col justify-center items-center">
    <Card class="horizontal" :card="system.card" />
    <DropZone
      class="dropzone"
      cardClass="card sm"
      :list.sync="list"
      :group="group"
    />
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
    group: {
      type: String,
      default: "default",
    },
  },
  computed: {
    _system: {
      get() {
        return this.system;
      },
      set(system) {
        this.$emit("update:system", system);
      },
    },
    list: {
      get() {
        return this._system.cards;
      },
      set(cards) {
        this._system = { ...this.system, cards };
      },
    },
  },
  watch: {
    system: {
      deep: true,
      handler() {},
    },
    _system: {
      deep: true,
      handler() {},
    },
  },
  components: {
    DropZone,
    Card,
  },
};
</script>

<style lang="postcss" scoped>
.dropzone {
  height: 20px;
  width: 100%;
}
</style>
