var sound = []
if (Pizzicato.context.state !== "running") {
  Pizzicato.context.resume();
}


var sound = []


const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
  
  return nextElement;
};



const app = Vue.createApp({
  delimiters: ['${', '}'],
  data() {
    return {
      productInfo: {
        name: "Intonation",
        info: "Тренажер восприятие интонационных связей"
      },
      items:[      
      ],
      templates:[
        {name: 'До', file: '0', frequency: '261.626'},
        {name: 'До#', file: '2', frequency: '277.183'},
        {name: 'Ре', file: '4', frequency: '293.665'},
        {name: 'Ре#', file: '6', frequency: '311.127'},
        {name: 'Ми', file: '8', frequency: '329.628'},
        {name: 'Фа', file: '10', frequency: '349.228'},
        {name: 'Фа#', file: '12', frequency: '369.994'},
        {name: 'Соль', file: '14', frequency: '391.995'},
        {name: 'Соль#', file: '16', frequency: '415.305'},
        {name: 'Ля', file: '18', frequency: '440'},
        {name: 'Ля#', file: '20', frequency: '466.164'},
        {name: 'Си', file: '22', frequency: '493.883'},
      ]
      }
    },
  
  watch: {
    items: function () {
      console.log(this.items);
    }
    
  },
  created: function () {
    nItems = getRandomIntInclusive(2, 5)
    var a =[]
    for (var i = 0; i < nItems+1; i++) {
      m = getRandomIntInclusive(0, 11)
      this.items.push(this.templates[m])
      
      
      sound[i] = new Pizzicato.Sound(
        {
          source: "file",
          options: { path: static_url + "intonation/sounds/" + this.items[i].file + '.wav' },
          detached: true
        },
        () => {
          
          console.log("sound file loaded!");
          this.$el.querySelector('.loaded').classList.remove('loaded')
          for(i=0;i>sound.length;i++) {
            sound[i].on('end', () => {
            sound[i].detached = true
          })
          sound[i].on('stop', () => {
            sound[i].detached = true
          })
          }

          // console.log('this.$el',this.$el.querySelector('#li0'))      
        }
      );
        console.log('sound[i]',sound[i])
     


      // sound[i] = new Pizzicato.Sound(
      //   {
      //     source: "wave",
      //     options: { 
      //       frequency: this.items[i].frequency},
      //       type: 'sawtooth'
      //   }
      // );
      // this.$el.querySelector('.loaded').classList.remove('loaded')
      

      sound[i].volume = getRandomIntInclusive(40, 60)/100
      this.items[i].volume = sound[i].volume
      console.log(sound[i].volume)
      // sound[i].play()
   }},
  computed: {
    //кэшируемые методы
    //когда нужно вычислить один раз и использовать
    //пока что-то не поменялось
  }, 
  methods: {
    play() {
      

      sound.forEach((s, index) => {
        s.detached = false
        // s.relese = .8
        s.play(index*1 , 0)
        s.detached = true
        
      })



      // for (var i=0; i<sound.length; i++) {
      //   sound[i].detached = false
      //   sound[i].relese = .8
      //   sound[i].play(i*1 , 0)
      //   p[i] = setTimeout (function ()  {
      //     console.log('stop', i)
      //     sound[i].stop()
      //   }, 1000)
      // }
    },

    volumeChange() {    
      Pizzicato.volume = this.$el.querySelector('#MasterVolume').value
      console.log('sound',sound)
    },
   
    playItem: ((e) => {
      console.log(sound[e.target.value].volume)
      const a = e.target.value
      sound[a].detached = false
      sound[a].play();
      sound[a].detached = true
       
      
      setTimeout (function ()  {
        console.log('stop')
        sound[a].stop()
      }, 1000)
      
      // if (Pizzicato.context.state !== "running") {
      //   Pizzicato.context.resume();
      // }
      
    }),

    dragstart: ((e) => {
      e.target.classList.add(`selected`);
    }),

    dragend: (function(e){
      e.target.classList.remove(`selected`);

    }),

    dragover: (function(e){
      e.preventDefault();
      const activeElement = this.$el.querySelector(`.selected`)
      const currentElement = e.target;
      const isMoveable = activeElement !== currentElement &&
      currentElement.classList.contains(`tasks__item`);
      if (!isMoveable) {
        return;
      } 
      const nextElement = getNextElement(e.clientY, currentElement);
      if (
        nextElement && 
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        return;
      }
      this.$el.querySelector(`.tasks__list`).insertBefore(activeElement, nextElement);
    }),
  }
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}