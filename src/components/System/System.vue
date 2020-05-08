<template>
  <div v-if="system" class="system">
    <DropZone
      class="dropzone top"
      x:cardClass="player2.length > 5 ? 'xs' : 'sm'"
      cardClass="xs"
      :list.sync="player2"
      :group="`player2-${group}`"
      :loc="system.card.loc"
    />
    <div class="relative">
      <Card class="horizontal" :card="system.card.explored ? system.card : undefined" />
      <div v-if="system.card.developmentLevel > 0" class="development-die">
        <font-awesome size="3x" :icon="['fa', dice]" :class="dieColor" />
      </div>
    </div>
    <DropZone
      class="dropzone bottom"
      x:cardClass="player1.length > 5 ? 'xs' : 'sm'"
      cardClass="xs"
      :list.sync="player1"
      :group="`player1-${group}`"
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
    player1: {
      get() {
        return this.system.player1
      },
      set(player1) {
        this._system = { ...this.system, player1 };
      },
    },
    player2: {
      get() {
        return this.system.player2
      },
      set(player2) {
        this._system = { ...this.system, player2 };
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
    dieColor() {
      if (this.system.card.controlledBy === "player1") return "text-red-400"
      else return "text-blue-400"
    }
  },
  watch: {
    system: {
      deep: true,
      handler() {
        if (!this.system.card.explored) {
          this.$emit('explored', this.system.card)
        }
      },
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
.system {
  @apply flex flex-col justify-center items-center relative my-2;
  /* margin-top: 30px; */
  /* margin-bottom: 50px; */
}

.dropzone {
  position: absolute;
  height: 25px;
  width: 30vw;

  &.top {
    top: -45px;
  }

  &.bottom {
    bottom: -25px;
  }
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
