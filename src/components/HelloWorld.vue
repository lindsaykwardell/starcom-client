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
            v-if="
              hoveredCard &&
                hoveredCard.type &&
                hoveredCard.type.includes('System')
            "
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
          <System :system.sync="systems[0]" group="board" />
        </div>
        <div class="flex justify-around">
          <System :system.sync="systems[1]" group="board" />
          <System :system.sync="systems[2]" group="board" />
        </div>
        <div class="flex justify-between">
          <System :system.sync="systems[3]" group="board" />
          <System :system.sync="systems[4]" group="board" />
          <System :system.sync="systems[5]" group="board" />
        </div>
        <div class="flex justify-around">
          <System :system.sync="systems[6]" group="board" />
          <System :system.sync="systems[7]" group="board" />
        </div>
        <div class="flex justify-around">
          <System :system.sync="systems[8]" group="board" />
        </div>
      </div>
      <div class="hand">
        <DropZone :list.sync="hand" group="board" />
      </div>
    </div>
    <div
      v-if="showContextMenu && contextCard"
      v-clickout="onClickout"
      class="context-menu"
      :style="contextCoordinates"
    >
      <div
        v-for="option in contextCard.contextMenu"
        :key="option.action"
        class=""
      >
        <button
          class="hover:bg-gray-600 p-2 w-full text-left"
          @click="performAction(option.action)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import DropZone from "@/components/DropZone/DropZone";
import System from "@/components/System/System";
import Card from "@/components/Card/Card";
import { clickout } from "vuetensils/src/directives";
import Vue from "vue";

import {
  DECK_POLITICS,
  DECK_INDUSTRY,
  DECK_SCIENCE,
  DECK_SYSTEM,
  CARD_LIST,
  HOMEWORLD,
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
      nextId: 0,
      showBoard: false,
      showContextMenu: false,
      contextCard: null,
      contextCoordinates: {
        x: 0,
        y: 0,
      },
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
    getNextId() {
      this.nextId = this.nextId + 1;
      return this.nextId;
    },
    draw(deck) {
      if (this.hand.length < 8) {
        this.hand = [...this.hand, { ...deck.draw(), id: this.getNextId() }];
      } else {
        alert("Too many cards in hand!");
      }
    },
    onClickout() {
      this.showContextMenu = false;
    },
    toggleContextMenu(card, event) {
      // Opens the context menu on the specified coordinates,
      console.log(card);

      this.contextCoordinates = {
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
      };
      this.showContextMenu = true;
      this.contextCard = card;
    },
    performAction(action) {
      const keys = action.split(":");
      switch (keys[0]) {
        case "build":
          const card = { ...CARD_LIST.find((c) => c.id == keys[1]) };
          if (card) {
            this.systems[this.contextCard.loc].cards = [
              ...this.systems[this.contextCard.loc].cards,
              { ...card, id: this.getNextId() },
            ];
          }
          break;
        case "develop":
          if (
            this.contextCard.developmentLevel <
            this.contextCard.maxDevelopmentLevel
          ) {
            this.systems[this.contextCard.loc].card.developmentLevel++;
          }

          break;
        default:
        // Do nothing
      }

      this.showContextMenu = false;
    },
  },
  mounted() {
    const systems = [];
    for (let i = 0; i < 9; i++) {
      systems.push({
        card:
          i === 0 || i === 8
            ? { ...HOMEWORLD, loc: i }
            : { ...this.decks.system.draw(), loc: i },
        cards: [],
      });
    }
    this.systems = systems;
    this.showBoard = true;

    EventBus.$on("card:hover", (card) => {
      this.hoveredCard = card;
    });

    EventBus.$on("card:context", ({ card, event }) => {
      this.toggleContextMenu(card, event);
    });
  },
  directives: {
    clickout,
  },
};
</script>

<style lang="postcss" scoped>
.board {
  padding: 1rem;
  background: linear-gradient(rgb(41, 40, 40), rgb(24, 18, 36), rgb(18, 18, 59));
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

.context-menu {
  @apply bg-gray-900 text-white rounded;
  position: absolute;
  border: 1px solid white;
}
</style>
