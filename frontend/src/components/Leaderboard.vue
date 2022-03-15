<script setup>
import LeaderboardService from '../assets/leaderboard.service.js';
</script>


<template>
  <div id="leaderboard">
    <span class="notification error">{{ error }}</span>
    <span v-if="leaderboard.length === 0" class="notification">No games played yet!</span>
    <span v-for="(player, index) in leaderboard" :key="index" class="score-row">
      {{ formatScoreRow(player, index) }}
      <br />
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaderboard: [],
      error: null
    }
  },
  methods: {
    formatScoreRow(player, index) {
      let scoreRow = `${index + 1}`;

      if (index < 9) {
        scoreRow = scoreRow.concat(`.\xa0\xa0${player.username}`);
      } else {
        scoreRow = scoreRow.concat(`.\xa0${player.username}`);
      }

      for (let i = scoreRow.length; i < 30; i++) {
        scoreRow = scoreRow.concat('.');
      }

      scoreRow = scoreRow.concat(`score: ${player.score}`);

      return scoreRow;
    },
  },
  created() {
    LeaderboardService.getLeaderboard().then(
      response => {
        this.leaderboard = response.data
      },
      error => {
          this.error = (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();
      }
    );
  }
};
</script>

<style scoped>
#leaderboard {
  margin-top: 5vh;
}

span {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.notification {
  font-size: 35px;
  font-weight: 700;
}

.error {
  color: red;
}

.score-row {
  font-size: 25px;
  font-weight: 700;
}
</style>
