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
    for (var i = 0; i < nItems+1; i++) {
      this.items.push(this.templates[getRandomIntInclusive(0, 11)])
   }
    
  },
  computed: {
    //кэшируемые методы
    //когда нужно вычислить один раз и использовать
    //пока что-то не поменялось
  },
  
  methods: {
   
    playItem: (function(e){
      // e.target.classList.add(`selected`);
      e.target.value
      console.log('e.target.value', e.target.value)



      sound[e.target.value] = new Pizzicato.Sound(
        {
          source: "file",
          options: { path: static_url + "intonation/sounds/" + this.items[e.target.value].file + '.wav'},
        },
        function () {
          console.log("sound file loaded!");
          sound[e.target.value].play();
        }
      );

    

      




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