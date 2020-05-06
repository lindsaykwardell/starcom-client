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
          <h2 class="text-white">Discard</h2>
          <Dialog :show="showDiscard" @toggle="toggleDiscard">
            <Card
              v-for="card in discard"
              :key="card.id"
              :card="card"
              class="inline lg"
            />
          </Dialog>
          <Card :card="discard[0]" class="md m-auto" />
        </div>
        <div class="flex-shrink relative">
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
          <DamageDice
            v-if="hoveredCard.damage"
            :damage="hoveredCard.damage"
            size="3x"
          />
        </div>
      </div>
    </div>
    <div class="flex-grow bg-black h-screen">
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
      <div class="hand" v-if="showBoard">
        <DropZone :list.sync="hand" group="hand" />
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
import DamageDice from "@/components/Dice/DamageDice";
import Dialog from "@/components/Dialog/Dialog";
import { clickout } from "vuetensils/src/directives";
import Vue from "vue";

import {
  DECK_POLITICS,
  DECK_INDUSTRY,
  DECK_SCIENCE,
  DECK_SYSTEM,
  CARD_LIST,
  HOMEWORLD,
  HAND_CONTEXT_MENU,
} from "@/lib/core-v1";
import Deck from "@/models/Deck";

import EventBus from "@/util/EventBus";

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  data() {
    return {
      nextId: 0,
      showBoard: false,
      showDiscard: false,
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
      discard: [],
      decks: {
        politics: new Deck(DECK_POLITICS),
        industry: new Deck(DECK_INDUSTRY),
        science: new Deck(DECK_SCIENCE),
        system: new Deck(DECK_SYSTEM),
      },
    };
  },
  methods: {
    toggleDiscard(val) {
      this.showDiscard = val;
      this.showBoard = !val;
    },
    getNextId() {
      this.nextId = this.nextId + 1;
      return this.nextId;
    },
    draw(deck) {
      if (this.hand.length < 8) {
        const nextCard = deck.draw();
        this.hand = [
          ...this.hand,
          {
            ...nextCard,
            id: this.getNextId(),
            contextMenu: [
              //...nextCard.contextMenu,
              ...HAND_CONTEXT_MENU,
            ],
          },
        ];
      } else {
        alert("Too many cards in hand!");
      }
    },
    onClickout() {
      this.showContextMenu = false;
    },
    toggleContextMenu(card, event) {
      // Opens the context menu on the specified coordinates,

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
        case "damage":
          this.contextCard.damage =
            this.contextCard.damage + parseInt(keys[1], 10);
          break;
        case "repair":
          this.contextCard.damage =
            this.contextCard.damage - parseInt(keys[1], 10);
          break;
        case "destroy":
          this.systems.forEach((system) => {
            system.cards = system.cards.filter(
              (card) => card.id !== this.contextCard.id
            );
          });
          break;
        case "hand":
          switch (keys[1]) {
            case "discard":
              this.discard = [this.contextCard, ...this.discard];

              this.hand = this.hand.filter(
                (card) => card.id !== this.contextCard.id
              );
              break;
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
      if (!this.showDiscard) this.hoveredCard = card;
    });

    EventBus.$on("card:context", ({ card, event }) => {
      this.toggleContextMenu(card, event);
    });
  },
  components: {
    DropZone,
    System,
    Card,
    DamageDice,
    Dialog,
  },
  directives: {
    clickout,
  },
};
</script>

<style lang="postcss" scoped>
.board {
  padding: 1rem;
  background: linear-gradient(
    rgb(41, 40, 40),
    rgb(24, 18, 36),
    rgb(18, 18, 59)
  );
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
  /* overflow-y: scroll; */
  background: black;
}

.context-menu {
  @apply bg-gray-900 text-white rounded;
  position: absolute;
  border: 1px solid white;
}
</style>
