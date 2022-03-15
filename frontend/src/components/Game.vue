<script setup>
import NamePrompt from './NamePrompt.vue';
import IconsLegend from './IconsLegend.vue';
import GameLogic from '../assets/GameLogic.js';
import LeaderboardService from '../assets/leaderboard.service.js';
import { sfx } from '../assets/sfx.js';
</script>


<template>
  <NamePrompt v-if="username === null" @set-username="setUsername"/>

  <div v-if="game !== null" class="game-header">
    <div class="username">
      {{ username }}
    </div>

    <div class="game-board">
      <div class="score">
        Score: {{ game.score }}
      </div>

      <div class="time">
        Elapsed time: {{ game.elapsed }}
      </div>

      <button @click="game.init()" :disabled="game.gameOver === false">Restart</button>
    </div>
  </div>

  <div class="game-container">
    <canvas class="game-canvas" width="800" height="500"></canvas>
  </div>

  <div class="info" @mouseenter="legend = true" @mouseleave="legend = false">
    <span>i</span>
    <IconsLegend v-if="legend" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      legend: false,
      game: null
    }
  },
  methods: {
    setUsername(username) {
      sfx["click"].play();
      
      this.username = username;
      this.game.ready = true;
    },
    postScore() {
      LeaderboardService.postScore(this.username, this.game.score);
    }
  },
  mounted() {
    this.game = new GameLogic({
      canvas: document.querySelector(".game-canvas"),
      postScore: this.postScore
    });
    this.game.init();
  }
};
</script>

<style>
.game-container {
  width: 100%;
  height: 100%;
}

.game-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.username {
  margin-bottom: 30px;

  font-size: 35px;
}

.game-board {
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;

  margin-bottom: 10px;

  font-size: 25px;
}

.info {
  position: relative;

  font-size: 20px;
  font-weight: 700;

  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: default;
}
</style>
