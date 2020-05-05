<template>
  <div class="flex">
    <div class="bar">
      <div class="bar-content flex flex-col">
        <div class="flex-grow">
          <button class="p-3 bg-blue-400 w-full" @click="draw(decks.politics)">
            Draw Politics ({{ decks.politics.remaining }} remaining)
          </button>
          <button class="p-3 bg-red-400 w-full" @click="draw(decks.industry)">
            Draw Industry ({{ decks.industry.remaining }} remaining)
          </button>
          <button class="p-3 bg-green-400 w-full" @click="draw(decks.science)">
            Draw Science ({{ decks.science.remaining }} remaining)
          </button>
        </div>
        <div class="flex-shrink">
          <Card
            v-if="hoveredCard && hoveredCard.type && hoveredCard.type.includes('System')"
            class="horizontal-lg"
            :card="hoveredCard"
          />
          <Card v-else class="lg" :card="hoveredCard" />
        </div>
      </div>
    </div>
    <div class="flex-grow">
      <div v-if="showBoard" class="board">
        <div class="flex justify-around">
          <System
            :system="systems[0].card"
            group="board"
            :list="systems[0].cards"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system="systems[1].card"
            group="board"
            :list="systems[1].cards"
          />
          <System
            :system="systems[2].card"
            group="board"
            :list="systems[2].cards"
          />
        </div>
        <div class="flex justify-between">
          <System
            :system="systems[3].card"
            group="board"
            :list="systems[3].cards"
          />
          <System
            :system="systems[4].card"
            group="board"
            :list="systems[4].cards"
          />
          <System
            :system="systems[5].card"
            group="board"
            :list="systems[5].cards"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system="systems[6].card"
            group="board"
            :list="systems[6].cards"
          />
          <System
            :system="systems[7].card"
            group="board"
            :list="systems[7].cards"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system="systems[8].card"
            group="board"
            :list="systems[8].cards"
          />
        </div>
      </div>
      <div class="hand">
        <DropZone :list="hand" group="board" />
      </div>
    </div>
  </div>
</template>
<script>
import DropZone from "@/components/DropZone/DropZone";
import System from "@/components/System/System";
import Card from "@/components/Card/Card";

import {
  DECK_POLITICS,
  DECK_INDUSTRY,
  DECK_SCIENCE,
  DECK_SYSTEM,
} from "@/lib/core-v1";
import Deck from "@/models/Deck";

import EventBus from "@/util/EventBus";

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    DropZone,
    System,
    Card,
  },
  data() {
    return {
      showBoard: false,
      hoveredCard: {
        img: "",
      },
      systems: [],
      hand: [],
      decks: {
        politics: new Deck(DECK_POLITICS),
        industry: new Deck(DECK_INDUSTRY),
        science: new Deck(DECK_SCIENCE),
        system: new Deck(DECK_SYSTEM),
      },
    };
  },
  methods: {
    draw(deck) {
      this.hand = [...this.hand, deck.draw()];
    },
  },
  mounted() {
    const systems = [];
    for (let i = 0; i < 9; i++) {
      systems.push({
        card: this.decks.system.draw(),
        cards: [],
      });
    }
    this.systems = systems;
    this.showBoard = true;

    EventBus.$on("card:hover", (card) => {
      this.hoveredCard = card;
    });
  },
};
</script>

<style lang="postcss" scoped>
.board {
  padding: 1rem;
  background: linear-gradient(
      217deg,
      rgba(0, 0, 0, 0.8),
      rgba(16, 0, 241, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(43, 43, 43, 0.8), rgba(48, 0, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(21, 21, 48, 0.8), rgba(2, 2, 68, 0) 70.71%);
  height: calc(100vh - 175px);
  overflow: hidden;
}

.bar {
  width: 300px;
  position: relative;

  & .bar-content {
    position: fixed;
    left: 0;
    width: 300px;
    height: 100vh;
    background: linear-gradient(0.25turn, black, #222);
  }
}

.hand {
  position: fixed;
  bottom: 0;
  width: calc(100% - 300px);
  height: 175px;
  overflow-y: scroll;
  background: black;
}
</style>
