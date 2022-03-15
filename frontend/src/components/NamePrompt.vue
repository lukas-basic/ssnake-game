<template>
  <div id="prompt-wrapper">
    <div id="prompt-modal">
      <span id="header">enter your username to ssstart the game!</span>
      <input v-model="username" placeholder="username here..." onkeypress="return event.code !== 'Space'">
      <button @click="setUsername" :disabled="username === ''">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    method: { type: Function },
  },
  data() {
    return { username: '' };
  },
  methods: {
    setUsername() {
      if (this.username !== '')
        this.$emit('set-username', this.username);
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.code === 'Enter')
        this.setUsername();
    });
    
    gsap.from("#prompt-modal", {duration: 1, scale: 0.5})
  }
}
</script>

<style scoped>
#prompt-wrapper {
  position: fixed;
  top: 0;
  left: 0;

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.678);

  color: var(--vt-c-text-light-1);
}

#prompt-modal {
  background-color: white;

  border: 1px solid black;

  width: 600px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

#header {
  font-size: 20px;
  line-height: 4;
  font-weight: 500;
}

input {
  border: 0;
  border-radius: 8px;
	border-bottom: 2px solid #333;
  font-family: monospace;
	font-size: 25px;

  height: 55px;
}

input:focus { 
	border-bottom-color: green;
	outline: none;
}

input:hover {
  box-shadow: 5px 5px 10px #888888;
}
</style>
