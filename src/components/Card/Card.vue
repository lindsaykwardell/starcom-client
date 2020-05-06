<template>
  <img
    class="card"
    :src="getImgUrl(card.img)"
    :alt="card.img"
    @mouseover="hoverCard"
    @contextmenu.prevent="openContextMenu($event)"
    :data-damage="card.damage"
    :title="title"
  />
</template>

<script>
import EventBus from "@/util/EventBus";
import { DAMAGEABLE } from '@/lib/core-v1'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        img: "",
      }),
    },
    loc: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getImgUrl(cardName) {
      if (cardName) {
        var images = require.context("@/assets/cards/", false, /\.png$/);
        return images("./" + cardName + ".png");
      } else {
        return require("@/assets/back.jpg");
      }
    },
    hoverCard() {
      EventBus.$emit("card:hover", this.card);
    },
    openContextMenu(event) {
      EventBus.$emit("card:context", {
        card: this.card,
        loc: this.card.loc || this.loc,
        event,
      });
    },
  },
  computed: {
    title() {
      if (DAMAGEABLE.includes(this.card.type)) {
        return `Damage: ${this.card.damage}`
      }

      return "";
    }
  }
};
</script>

<style lang="postcss" scoped>
.card {
  width: 125px;
  height: 175px;

  &.horizontal {
    width: 200px;
    height: 150px;
  }

  &.horizontal-lg {
    width: 300px;
    height: 225px;
  }

  &.sm {
    width: 75px;
    height: 105px;
  }

  &.xs {
    width: 30px;
    height: 50px;
  }

  &.md {
    width: 200px;
    height: 275px;
  }

  &.lg {
    width: 300px;
    height: 425px;
  }
}
</style>
