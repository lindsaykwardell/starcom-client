<template>
  <div class="flex">
    <div class="bar">
      <div class="bar-content flex flex-col">
        <div class="flex-grow">
          <div class="flex">
            <button
              class="p-1 bg-blue-400 hover:bg-blue-600 duration-200 flex-1"
              @click="draw(activePlayer, decks.politics)"
            >
              Politics ({{ decks.politics.remaining }}/40)
            </button>
            <button
              class="p-1 bg-red-400 hover:bg-red-600 duration-200 flex-1"
              @click="draw(activePlayer, decks.industry)"
            >
              Industry ({{ decks.industry.remaining }}/40)
            </button>
            <button
              class="p-1 bg-green-400 hover:bg-green-600 duration-200 flex-1"
              @click="draw(activePlayer, decks.science)"
            >
              Science ({{ decks.science.remaining }}/40)
            </button>
          </div>

          <Dialog :show="showDiscard" @toggle="toggleDiscard">
            <template v-slot:button
              ><h6 class="text-white">
                Discard ({{ discard.length }})
              </h6></template
            >
            <template v-slot:header>All Discarded Cards</template>
            <p v-if="discard.length <= 0">
              No cards have been placed in discard yet.
            </p>
            <Card
              v-for="card in discard"
              :key="card.id"
              :card="card"
              class="inline lg"
            />
          </Dialog>
          <Card :card="discard[0]" class="m-auto" />
          <Dialog :show="showStack" @toggle="toggleStack">
            <template v-slot:button
              ><h4 class="text-white">
                Current Actions ({{ stack.length }})
              </h4></template
            >
            <template v-slot:header>All Cards to Resolve</template>
            <p v-if="stack.length <= 0">No cards have been played yet.</p>
            <Card
              v-for="card in stack"
              :key="card.id"
              :card="card"
              class="inline lg"
            />
          </Dialog>
          <Card :card="stack[0]" class="md m-auto" />
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
      <div v-if="shouldBoardDisplay" class="board relative">
        <div class="flex justify-around mt-6">
          <System
            :system.sync="systems[0]"
            group="board"
            @explored="onExplore"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system.sync="systems[1]"
            group="board"
            @explored="onExplore"
          />
          <System
            :system.sync="systems[2]"
            group="board"
            @explored="onExplore"
          />
        </div>
        <div class="flex justify-between">
          <System
            :system.sync="systems[3]"
            group="board"
            @explored="onExplore"
          />
          <System
            :system.sync="systems[4]"
            group="board"
            @explored="onExplore"
          />
          <System
            :system.sync="systems[5]"
            group="board"
            @explored="onExplore"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system.sync="systems[6]"
            group="board"
            @explored="onExplore"
          />
          <System
            :system.sync="systems[7]"
            group="board"
            @explored="onExplore"
          />
        </div>
        <div class="flex justify-around">
          <System
            :system.sync="systems[8]"
            group="board"
            @explored="onExplore"
          />
        </div>
        <button class="next-turn-button" @click="nextTurn">Pass Turn</button>
        <div class="active-player-stats flex">
          <div
            class="flex-1 mr-3 bg-red-400 p-1 rounded-lg duration-200"
            :class="
              activePlayer === 'player1' ? 'bg-red-400 shadow-lg' : 'bg-red-900'
            "
          >
            Credits: {{ players.player1.credits }}<br />
            Total Devlopments: {{ getPlayerDevelopmentCount("player1") }}
          </div>
          <div
            class="flex-1 bg-blue-400 p-1 rounded-lg duration-200"
            :class="
              activePlayer === 'player2'
                ? 'bg-blue-400 shadow-lg'
                : 'bg-blue-900'
            "
          >
            Credits: {{ players.player2.credits }}<br />
            Total Devlopments: {{ getPlayerDevelopmentCount("player2") }}
          </div>
          <button class="p-2 bg-gray-700 hover:bg-gray-800 text-white ml-5 rounded-full duration-200 w-48" @click="showTechnology = !showTechnology">
            Show {{showTechnology ? 'Hand' : "Technology"}}
          </button>
        </div>
        <div class="d20">
          <font-awesome size="4x" :icon="['fa', 'dice-d20']" :class="dieRoll" />
        </div>
      </div>
      <div class="hand" v-if="shouldBoardDisplay">
        <DropZone :list.sync="showTechnology ? technology : hand" group="hand" />
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
          v-if="
            !option.condition ||
              option.condition({
                card: contextCard,
                system: systems[contextLoc],
                activePlayer,
                players,
              })
          "
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
  DISCARD_CONTEXT_MENU,
  DAMAGE_CONTEXT_MENU,
  SCOUT,
  POLITICS,
  INDUSTRY,
  SCIENCE,
  TECHNOLOGY,
  generateResolveContextMenu,
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
      dieValue: 0,
      showBoard: false,
      showDiscard: false,
      showTechnology: true,
      showStack: false,
      showContextMenu: false,
      players: {
        player1: {
          credits: 0,
          technology: [],
          hand: [],
          technology: [],
        },
        player2: {
          credits: 0,
          technology: [],
          hand: [],
          technology: [],
        },
      },
      activePlayer: "player1",
      contextCard: null,
      contextLoc: 0,
      contextCoordinates: {
        x: 0,
        y: 0,
      },
      hoveredCard: {
        img: "",
      },
      systems: [],
      discard: [],
      stack: [],
      decks: {
        politics: new Deck(DECK_POLITICS),
        industry: new Deck(DECK_INDUSTRY),
        science: new Deck(DECK_SCIENCE),
        system: new Deck(DECK_SYSTEM),
      },
    };
  },
  computed: {
    shouldBoardDisplay() {
      return this.showBoard && !this.showDiscard && !this.showStack;
    },
    activePlayerDevelopmentCount() {
      return this.systems
        .filter((system) => system.card.controlledBy === this.activePlayer)
        .reduce((total, system) => system.card.developmentLevel + total, 0);
    },
    hand: {
      get() {
        return this.players[this.activePlayer].hand;
      },
      set(val) {
        this.players[this.activePlayer].hand = val;
      },
    },
    technology() {
      return this.players[this.activePlayer].technology
    },
    nonActivePlayer() {
      return this.activePlayer === "player1" ? "player2" : "player1";
    },
    dieRoll() {
      console.log(this.dieValue);

      if (this.dieValue <= 5) {
        return "industry";
      } else if (this.dieValue > 5 && this.dieValue <= 10) {
        return "politics";
      } else if (this.dieValue > 10 && this.dieValue <= 15) {
        return "science";
      } else if (this.dieValue > 15 && this.dieValue <= 18) {
        return "tax";
      } else {
        return "pirates";
      }
    },
  },
  methods: {
    rollDie() {
      this.dieValue = Math.floor(Math.random() * 21);
    },
    playerControlsDomain(player, domain) {
      for (const system of this.systems) {
        if (
          system.card.controlledBy === player &&
          system.card.domain === domain
        ) {
          return true;
        }
      }

      return false;
    },
    toggleDiscard(val) {
      this.showDiscard = val;
      this.showBoard = !val;
    },
    toggleStack(val) {
      this.showStack = val;
      this.showBoard = !val;
    },
    getPlayerDevelopmentCount(player) {
      return this.systems
        .filter((system) => system.card.controlledBy === player)
        .reduce((total, system) => system.card.developmentLevel + total, 0);
    },
    getNextId() {
      this.nextId = this.nextId + 1;
      return this.nextId;
    },
    draw(player, deck) {
      if (typeof deck === "string") {
        if (deck === INDUSTRY) deck = this.decks.industry;
        if (deck === POLITICS) deck = this.decks.politics;
        if (deck === SCIENCE) deck = this.decks.science;
      }

      if (this.players[player].hand.length < 8) {
        const nextCard = deck.draw();
        this.players[player].hand = [
          ...this.players[player].hand,
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
    toggleContextMenu(card, loc, event) {
      // Opens the context menu on the specified coordinates,

      this.contextCoordinates = {
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
      };
      this.showContextMenu = true;
      this.contextCard = card;
      this.contextLoc = loc;
    },
    onExplore(card) {
      card.explored = true;
      if (card.onExplore) {
        card.onExplore({
          card,
          system: this.systems[card.loc],
          activePlayer: this.activePlayer,
          players: this.players,
        });
      }
    },
    performAction(action) {
      const keys = action.split(":");
      switch (keys[0]) {
        case "build":
          const card = { ...CARD_LIST.find((c) => c.id == keys[1]) };
          if (card) {
            this.systems[this.contextLoc][this.activePlayer] = [
              ...this.systems[this.contextLoc][this.activePlayer],
              { ...card, id: this.getNextId() },
            ];
            this.players[this.activePlayer].credits -= card.cost;
          }
          break;
        case "build-in":
          this.systems[keys[1]][this.activePlayer] = [
            ...this.systems[keys[1]][this.activePlayer],
            { ...this.contextCard, contextMenu: [...DAMAGE_CONTEXT_MENU] },
          ];

          this.stack = this.stack.filter(
            (card) => card.id !== this.contextCard.id
          );
          break;
        case "develop":
          this.contextCard.controlledBy = this.activePlayer;

          if (
            this.contextCard.developmentLevel <
            this.contextCard.maxDevelopmentLevel
          ) {
            let cost = this.systems[this.contextLoc].card.developmentLevel * 2;
            if (cost === 0) cost = 1;
            this.players[this.activePlayer].credits -= cost;
            this.systems[this.contextLoc].card.developmentLevel++;
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
          this.discard = [
            {
              ...this.contextCard,
              contextMenu: [...DISCARD_CONTEXT_MENU],
              damage: 0,
            },
            ...this.discard,
          ];

          this.systems.forEach((system) => {
            system[this.activePlayer] = system[this.activePlayer].filter(
              (card) => card.id !== this.contextCard.id
            );

            system[this.nonActivePlayer] = system[this.nonActivePlayer].filter(
              (card) => card.id !== this.contextCard.id
            );
          });
          break;
        case "hand":
          switch (keys[1]) {
            case "play":
              if (
                this.players[this.activePlayer].credits >= this.contextCard.cost
              ) {
                this.players[
                  this.activePlayer
                ].credits -= this.contextCard.cost;

                this.stack = [
                  {
                    ...this.contextCard,
                    contextMenu: generateResolveContextMenu(
                      this.systems,
                      this.contextCard
                    ),
                  },
                  ...this.stack,
                ];

                this.players[this.activePlayer].hand = this.players[
                  this.activePlayer
                ].hand.filter((card) => card.id !== this.contextCard.id);
              } else {
                alert("You don't have enough credits!");
              }

              break;
            case "discard":
              this.discard = [
                { ...this.contextCard, contextMenu: [...DISCARD_CONTEXT_MENU] },
                ...this.discard,
              ];

              this.players[this.activePlayer].hand = this.players[
                this.activePlayer
              ].hand.filter((card) => card.id !== this.contextCard.id);
              break;
            case "return":
              this.players[this.activePlayer].hand = [
                ...this.players[this.activePlayer].hand,
                { ...this.contextCard, contextMenu: [...HAND_CONTEXT_MENU] },
              ];

              this.players[this.activePlayer].credits += this.contextCard.cost;

              this.discard = this.discard.filter(
                (card) => card.id !== this.contextCard.id
              );
              this.stack = this.stack.filter(
                (card) => card.id !== this.contextCard.id
              );
              break;
            case "resolve":
              if (this.contextCard.type === TECHNOLOGY) {
                this.players[this.activePlayer].technology = [
                  ...this.players[this.activePlayer].technology,
                  this.contextCard,
                ];
              } else {
                this.discard = [
                  {
                    ...this.contextCard,
                    contextMenu: [...DISCARD_CONTEXT_MENU],
                  },
                  ...this.discard,
                ];
              }

              this.stack = this.stack.filter(
                (card) => card.id !== this.contextCard.id
              );
          }
          break;
        default:
        // Do nothing
      }

      this.showContextMenu = false;
    },
    nextTurn() {
      this.systems.forEach((system) => {
        if (
          system.card.controlledBy === this.nonActivePlayer &&
          system[this.activePlayer].length > 0 &&
          system[this.nonActivePlayer].length === 0
        ) {
          system.card.controlledBy = this.activePlayer;
          system.card.developmentLevel = 1;
        }
      });

      this.activePlayer =
        this.activePlayer === "player1" ? "player2" : "player1";

      this.players[
        this.activePlayer
      ].credits += this.activePlayerDevelopmentCount;

      this.systems.forEach((system) => {
        if (
          system.card.controlledBy === this.activePlayer &&
          system.card.onTurnStart
        ) {
          system.card.onTurnStart({
            card: system.card,
            system: system,
            activePlayer: this.activePlayer,
            players: this.players,
          });
        }
        system[this.activePlayer].forEach((card) => {
          if (card.onTurnStart) {
            card.onTurnStart({
              card: card,
              system: system,
              activePlayer: this.activePlayer,
              players: this.players,
            });
          }
        });
      });

      this.rollDie();

      let domain;

      switch (this.dieRoll) {
        case "industry":
          domain = INDUSTRY;
          break;
        case "politics":
          domain = POLITICS;
          break;
        case "science":
          domain = SCIENCE;
          break;
      }

      if (domain) {
        if (this.playerControlsDomain("player1", domain)) {
          this.draw("player1", domain);
        }
        if (this.playerControlsDomain("player2", domain)) {
          this.draw("player2", domain);
        }
      }
    },
  },
  mounted() {
    const systems = [];
    for (let i = 0; i < 9; i++) {
      systems.push({
        card:
          i === 0 || i === 8
            ? {
                ...HOMEWORLD,
                loc: i,
                controlledBy: i === 0 ? "player2" : "player1",
                explored: false,
              }
            : { ...this.decks.system.draw(), loc: i, controlledBy: null },
        player1: [],
        player2: [],
      });
    }

    systems[0].player2.push({ ...SCOUT, id: this.getNextId() });
    systems[0].card.explored = true;
    systems[8].player1.push({ ...SCOUT, id: this.getNextId() });
    systems[8].card.explored = true;

    this.systems = systems;
    this.showBoard = true;

    this.players.player1.credits++;

    EventBus.$on("card:hover", (card) => {
      if (!this.showDiscard) this.hoveredCard = card;
    });

    EventBus.$on("card:context", ({ card, loc, event }) => {
      this.toggleContextMenu(card, loc, event);
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

.next-turn-button {
  @apply absolute p-3 bg-green-900 rounded-lg shadow-md text-white duration-200;
  bottom: 10px;
  right: 10px;

  &:hover {
    @apply bg-green-600;
  }
}

.active-player-stats {
  @apply absolute text-white text-left;
  bottom: 10px;
  left: 10px;
}

.d20 {
  @apply absolute bg-white p-2 rounded-full;
  top: 20px;
  right: 20px;

  & .industry {
    @apply text-red-600;
  }

  & .politics {
    @apply text-blue-600;
  }

  & .science {
    @apply text-green-600;
  }

  & .tax {
    @apply text-yellow-600;
  }

  & .pirates {
    @apply text-black;
  }
}
</style>
