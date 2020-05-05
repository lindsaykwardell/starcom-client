<template>
  <img class="card" :src="getImgUrl(card.img)" :alt="card.img" @mouseover="hoverCard" />
</template>

<script>
import EventBus from '@/util/EventBus'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        img: "",
      }),
    },
  },
  methods: {
    getImgUrl(cardName) {
      if (cardName) {
        var images = require.context("@/assets/cards/", false, /\.png$/);
        return images("./" + cardName + ".png");
      } else {
        return require("@/assets/back.jpg")
      }
    },
    hoverCard() {
      EventBus.$emit('card:hover', this.card)
    }
  },
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
    height: 250px;
  }

  &.sm {
    width: 75px;
    height: 105px;
  }

  &.lg {
    width: 300px;
    height: 425px;
  }
}
</style>
