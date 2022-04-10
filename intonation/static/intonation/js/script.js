var group = new Pizzicato.Group()
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
        {name: 'До', file: '0'},
        {name: 'До#', file: '2'},
        {name: 'Ре', file: '4'},
        {name: 'Ре#', file: '6'},
        {name: 'Ми', file: '8'},
        {name: 'Фа', file: '10'},
        {name: 'Фа#', file: '12'},
        {name: 'Соль', file: '14'},
        {name: 'Соль#', file: '16'},
        {name: 'Ля', file: '18'},
        {name: 'Ля#', file: '20'},
        {name: 'Си', file: '22'},
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
          options: { path: static_url + "intonation/sounds/" + this.items[i].file + '.wav'},
        },
        () => {
          console.log("sound file loaded!", i);
          

          this.$el.querySelector('.loaded').classList.remove('loaded')
          // console.log('this.$el',this.$el.querySelector('#li0'))
           
        }

        
      );
      
      sound[i].volume = getRandomIntInclusive(30, 100)/100
      this.items[i].volume = sound[i].volume
      console.log(sound[i].volume)

      // sound[i].play()
   }

  
   

   
  },
  computed: {
    //кэшируемые методы
    //когда нужно вычислить один раз и использовать
    //пока что-то не поменялось
  },
  
  methods: {
    play() {

      
    console.log(this.$el)


      for (var i=0;i < sound.length; i++) {
       
        sound[i].play(i*1.5 , 0)

       


      }
      
      


      

    },

    volumeChange() {    
      Pizzicato.volume = this.$el.querySelector('#MasterVolume').value
    },
   
    playItem: (function(e){


      if (Pizzicato.context.state !== "running") {
        Pizzicato.context.resume();
      }
      console.log(sound[e.target.value].volume)
      sound[e.target.value].play();
      
    }),

    dragstart: (function(e){
      e.target.classList.add(`selected`);
    }),

    dragend: (function(e){
      e.target.classList.remove(`selected`);

    }),

    dragover: (function(e){
      e.preventDefault();
      
      // const activeElement = tasksListElement;
      const activeElement = this.$el.querySelector(`.selected`)
      const currentElement = e.target;

      // console.log('activeElement', activeElement);
      // console.log('currentElement', currentElement);
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