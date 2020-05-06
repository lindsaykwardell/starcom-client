<template>
  <div v-if="system" class="flex flex-col justify-center items-center">
    <div class="relative">
      <Card class="horizontal" :card="system.card" />
      <div v-if="system.card.developmentLevel > 0" class="development-die">
        <font-awesome size="3x" :icon="['fa', dice]" />
      </div>
    </div>
    <DropZone
      class="dropzone"
      :cardClass="list.length > 5 ? 'xs' : 'sm'"
      :list.sync="list"
      :group="group"
      :loc="system.card.loc"
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
        return this.system.cards
      },
      set(cards) {
        this._system = { ...this.system, cards };
      },
    },
    dice() {
      switch (this.system.card.developmentLevel) {
        case 1:
          return "dice-one";
        case 2:
          return "dice-two";
        case 3:
          return "dice-three";
        case 4:
          return "dice-four";
        case 5:
          return "dice-five";
        case 6:
        default:
          return "dice-six";
      }
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
  height: 25px;
  width: 100%;
}

.development-die {
  @apply rounded-full;
  padding: 5px;
  background: white;
  position: absolute;
  top: 30px;
  left: 20px;
}
</style>
