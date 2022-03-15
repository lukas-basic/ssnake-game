import { Howl } from 'howler';

export const sfx = {
  "regular": new Howl({
    src: [
      "/sfx/regular.wav"
    ]
  }),
  "speedy": new Howl({
    src: [
      "/sfx/speedy.wav"
    ]
  }),
  "bonus": new Howl({
    src: [
      "/sfx/bonus.wav"
    ]
  }),
  "invisible": new Howl({
    src: [
      "/sfx/invisible.wav"
    ]
  }),
  "reverse": new Howl({
    src: [
      "/sfx/reverse.wav"
    ]
  }),
  "earthquake": new Howl({
    src: [
      "/sfx/earthquake.wav"
    ]
  }),
  "gameOver": new Howl({
    src: [
      "/sfx/game-over.wav"
    ]
  }),
  "click": new Howl({
    src: [
      "/sfx/click.wav"
    ]
  }),
  "background": new Howl({
    src: [
      "/sfx/background.mp3"
    ],
    loop: true
  })
};
