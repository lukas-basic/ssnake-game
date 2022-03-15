<script setup>
import bonusImg from '/images/collectables/bonus.png';
import earthquakeImg from '/images/collectables/earthquake.png';
import invisibleImg from '/images/collectables/invisible.png';
import regularImg from '/images/collectables/regular.png';
import reverseImg from '/images/collectables/reverse.png';
import speedyImg from '/images/collectables/speedy.png';
import wallImg from '/images/wall.png';
</script>

<template>
  <div class="legend-wrapper">
    <div class="legend-header">
      <span>LEGEND</span>
    </div>
    
    <div class="icons-wrapper">
      <div v-for="(icon, index) in icons" :key="index" class="icon-row">
        <img :src="icon.imgSrc" :alt="icon.name + ' icon'" class="icon-img"/>
        <span class="icon-name">{{ " " + icon.name + " " }} </span>
        <span class="icon-desc">{{ icon.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          name: "REGULAR",
          imgSrc: regularImg,
          desc: "Regular food with +1 score."
        },
        {
          name: "BONUS",
          imgSrc: bonusImg,
          desc: "Coin with +2 score."
        },
        {
          name: "SPEEDY",
          imgSrc: speedyImg,
          desc: "Speeds you up."
        },
        {
          name: "INVISIBLE",
          imgSrc: invisibleImg,
          desc: "Walk through walls and borders for 10s."
        },
        {
          name: "REVERSE",
          imgSrc: reverseImg,
          desc: "Commands reversed while collecting next collectable."
        },
        {
          name: "EARTHQUAKE",
          imgSrc: earthquakeImg,
          desc: "Well, earthquake..."
        },
        {
          name: "WALL",
          imgSrc: wallImg,
          desc: "Don't try to collect this."
        },
      ]
    }
  }
};
</script>

<style scoped>
.legend-wrapper {
  position: absolute;
  top: -400px;
  left: -400px;

  width: 800px;
  height: 400px;

  background-color: gray;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.legend-header {
  margin-top: 20px;
  margin-bottom: 10px;

  font-size: 30px;
  font-weight: 600;
}

.icon-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 10px;
}

.icon-img {
  margin-left: 10px;
}

.icon-name {
  margin-left: 15px;
}

.icon-desc {
  padding-left: 10px;
  margin-left: auto;
  margin-right: 10px;
}
</style>
