<script setup>
import Leaderboard from './components/Leaderboard.vue';
import Game from './components/Game.vue';
import SnakeImage from './assets/images/snake.png';
import LeaderboardImage from './assets/images/leaderboard.png';
import { sfx } from './assets/sfx.js';
</script>

<template>
  <header>
    <div class="wrapper">
      <img :src="SnakeImage" 
            alt="Snake game logo" 
            class="header-link game"
            @click="hideLeaderboard" 
      />
      <img :src="LeaderboardImage" 
            alt="Leaderboard image" 
            class="header-link leaderboard"
            @click="showLeaderboard" 
      />
    </div>
  </header>

  <main>
    <Game v-if="!leaderboard" />
    <Leaderboard v-else />
  </main>
</template>

<script>
export default {
  data() {
    return {
      leaderboard: false
    }
  },
  methods: {
    showLeaderboard() {
      sfx["click"].play();

      this.leaderboard = true;
      this.leaderboardActive();
    },
    hideLeaderboard() {
      sfx["click"].play();
      
      this.leaderboard = false;
      this.gameActive();
    },
    gameActive() {
      gsap.to(".game", {duration: 1, scale: 1.3});
      gsap.to(".leaderboard", {duration: 1, scale: 0.8})
    },
    leaderboardActive() {
      gsap.to(".leaderboard", {duration: 1, scale: 1.2});
      gsap.to(".game", {duration: 1, scale: 0.8})
    }
  },
  mounted() {
    this.gameActive();
  }
}
</script>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-family: monospace;
  font-weight: normal;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

header {
  width: 75%;
  line-height: 1.5;

  z-index: 15;
}

.header-link {
  width: 200px;
  max-height: 150px;
  image-rendering: pixelated;

  cursor: pointer;
}

.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

main {
  position: relative;
}

button {
  border: 0;
  color: black;
  background-color: rgb(190, 190, 190);
  border-radius: 0;
  
  width: 170px;
  height: 50px;
}

button:hover {
  border: 2px solid black;
}

button:disabled {
  background-color: rgba(128, 128, 128, 0.74);
  color: rgba(0, 0, 0, 0.637);
}

button:disabled:hover {
  border: 0;
}

input, button {
  font-family: monospace;
}
</style>
