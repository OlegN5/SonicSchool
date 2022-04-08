const app = Vue.createApp({
  delimiters: ['${', '}'],
  data() {
    return {
      productInfo: {
        name: "Intonation",
        info: "Тренажер восприятие интонационных связей"
      }

      }
    },
  
  watch: {

  },
  computed: {
    
  },
  
  methods: {
    showSettingsTrack() {
      this.gym.settingsTrack = !this.gym.settingsTrack
      this.gym.items = this.gym.tracks
    },
  }
});

