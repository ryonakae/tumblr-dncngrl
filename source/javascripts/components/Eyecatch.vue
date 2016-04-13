<template lang='jade'>
.eyecatch(v-el:eyecatch)
  .image#js-eyecatchImage.js-eyecatchImage(v-bind:style='{ backgroundImage:"url("+eyecatch+")" }')
  canvas.grain#js-grain.js-grain
</template>

<script>
import store from '../store/';

export default {
  data() {
    return {
      eyecatch: document.body.dataset.eyecatch
    };
  },

  computed: {
    grainStatus() {
      return store.state.grainStatus;
    }
  },

  ready() {
    store.actions.setEyecatch(this);

    this.$watch('grainStatus', this.grain);
  },

  methods: {
    grain: function() {
      const canvas = document.getElementById('js-grain');
      const ctx = canvas.getContext('2d');

      // resize
      const windowResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      windowResize();
      window.addEventListener('resize', windowResize);

      // noise
      const draw = (ctx) => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const idata = ctx.createImageData(width, height);
        let buffer32 = new Uint32Array(idata.data.buffer);

        for (let i = 0; i < buffer32.length; i++) {
          buffer32[i] = ((150 * Math.random()) | 0) << 24;
        }

        ctx.putImageData(idata, 0, 0);
      };

      // loop
      const loop = () => {
        draw(ctx);

        if (this.grainStatus === 'start') {
          // // console.log('grain started');
          requestAnimationFrame(loop);
        }

        if (this.grainStatus === 'stop') {
          // console.log('grain stopped');
          cancelAnimationFrame(loop);
        }
      };
      loop();
    }
  }
};
</script>