var group = new Pizzicato.Group()
var sound = []
if (Pizzicato.context.state !== "running") {
  Pizzicato.context.resume();
}

var volA=[]
var volB=[]






const app = Vue.createApp({
  delimiters: ['${', '}'],
  data() {
    return {
      productInfo: {
        name: "Mixer",
        info: "Тренажер по сведению треков. Настройка баланса по референсу. Сначала нужно выбрать треки:",
        infoIn: "Выбрать треки:",
      },
      
      gym: {
        note: "Теперь создать референс и запустить воспроизведение PLAY ",
        buttonSettingsTrack: "Выбор треков и громкости",
        settingsTrack: false,
        buttonSettingsNoise: "Настройка помех",
        settingsNoise: false,
        items: false,
        checkOn: false,

        tracks: [
          {
            title: "Jazz",
            path: static_url + "mixer/sounds/jazz/",
            end: ".mp3",
            enabled: false,
            trackVolume: 70,
            parts: [
              { name: "Kick", 
                file: "01_Kick", 
                enabled: false, 
                settings:{
                  volume:{
                    type: 'controller',
                    value: 22,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
                  
              },
              { name: "Snare", file: "02_Snare", enabled: false, settings:{
                volume:{
                  type: 'controller',
                  value: 48,
                  typeTag: 'range',
                  note: '1-100 /100',
                },
              } },
              {
                name: "Overheads",
                file: "03_Overheads",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 44,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              { name: "Bass", file: "04_Bass", enabled: false, settings:{
                volume:{
                  type: 'controller',
                  value: 51,
                  typeTag: 'range',
                  note: '1-100 /100',
                },
              } },
              { name: "Guitar", file: "05_Guitar", enabled: false, settings:{
                volume:{
                  type: 'controller',
                  value: 47,
                  typeTag: 'range',
                  note: '1-100 /100',
                },
              } },
              { name: "Piano", file: "06_Piano", enabled: false, settings:{
                volume:{
                  type: 'controller',
                  value: 43,
                  typeTag: 'range',
                  note: '1-100 /100',
                },
              } },
              {
                name: "Saxophone1",
                file: "07_Saxophone1",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 25,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                },
              },
              {
                name: "Saxophone2",
                file: "08_Saxophone2",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 2,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              {
                name: "Saxophone3",
                file: "09_Saxophone3",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 2,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              {
                name: "Trumpet1",
                file: "10_Trumpet1",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 10,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              {
                name: "Trumpet2",
                file: "11_Trumpet2",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 6,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              {
                name: "Trombone",
                file: "12_Trombone",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 14,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              { name: "Room", file: "13_Room", enabled: false, settings:{
                volume:{
                  type: 'controller',
                  value: 61,
                  typeTag: 'range',
                  note: '1-100 /100',
                },
              } },
              {
                name: "LeadVoxScratch",
                file: "14_LeadVoxScratch",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 51,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
              {
                name: "LeadVoxOverdub",
                file: "15_LeadVoxOverdub",
                enabled: false,
                settings:{
                  volume:{
                    type: 'controller',
                    value: 9,
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                }
              },
            ],
          },
          //   {
          //     title: "Pop",
          //     path: static_url + "mixer/sounds/pop/",
          //     end: ".mp3",
          //     enabled: false,
          //     parts: [
          //       { name: "KickP", file: "01_Kick", enabled: false },
          //       { name: "SnareP", file: "02_Snare", enabled: false },
          //       { name: "OverheadsP", file: "03_Overheads", enabled: false },
          //       { name: "BassP", file: "04_Bass", enabled: false },
          //       { name: "GuitarP", file: "05_Guitar", enabled: false },
          //       { name: "PianoP", file: "06_Piano", enabled: false },
          //     ],
          //   },
        ],
        noises: [
          {
            title: "Noises",
            path: static_url + "mixer/sounds/noises/",
            end: ".mp3",
            enabled: false,
            trackVolume: 70,
            minNoises: 5,
            maxNoises: 12,
            parts: [
              {
                name: "sin",
                typeSource: "synth",
                file: "",
                enabled: false,
                settings:{
                  
                  volume:{
                    value: 45,
                    min: 12,
                    max: 25,
                    type: 'minmax',
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                  attack:{
                    value: 45,
                    min: 3,
                    max: 20,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },
                  frequency:{
                    value: 45,
                    min: 11,
                    max: 55,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'x10 Hz',
                  },
                  duration:{
                    value: 45,
                    min: 30,
                    max: 80,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },


                }

               
                
              },
              {
                name: "click",
                type: "file",
                file: "click_1",
                enabled: false,
                settings:{
                  
                  volume:{
                    value: 45,
                    min: 12,
                    max: 25,
                    type: 'minmax',
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                  attack:{
                    value: 45,
                    min: 3,
                    max: 20,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },
                  frequency:{
                    value: 45,
                    min: 11,
                    max: 55,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'x10 Hz',
                  },
                  duration:{
                    value: 45,
                    min: 30,
                    max: 80,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },


                }
              },
              {
                name: "noise",
                type: "file",
                file: "noise_1",
                enabled: false,
                settings:{
                  
                  volume:{
                    value: 45,
                    min: 12,
                    max: 25,
                    type: 'minmax',
                    typeTag: 'range',
                    note: '1-100 /100',
                  },
                  attack:{
                    value: 45,
                    min: 3,
                    max: 20,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },
                  frequency:{
                    value: 45,
                    min: 11,
                    max: 55,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'x10 Hz',
                  },
                  duration:{
                    value: 45,
                    min: 30,
                    max: 80,
                    type: 'minmax',
                    typeTag: 'range',
                    note: 'сек /100',
                  },


                }
              },
            ],
          },
        ],
      },
    }
  },
  watch: {





  },
  computed: {
    // items: function(){
    //   return this.gym.tracks
    //   // return this.gym.noises

    // }


  },
  // mounted:{
  //   this.gym.tracks[0].parts[0].enabled=true,
  //   this.gym.tracks[0].parts[5].enabled=true

  // },
  

  methods: {
    showSettingsTrack() {
      this.gym.settingsTrack = !this.gym.settingsTrack
      this.gym.items = this.gym.tracks

    },
    showSettingsNoise() {
      this.gym.settingsTrack = !this.gym.settingsTrack
      this.gym.items = this.gym.noises
    },
    checkedTrackChange() {
      // this.gym.tracks[index].
      // playtrack('04_Bass')
      console.log("valueChange");
    },
    checkedPartChange(index) {
      
      if (this.gym.items[0].title!="Noises"){
        
      

        var track = this.gym.items[0].parts[index];
        if (track.enabled) {
          // console.log('1111111', track.settings.type)
          addGroup(this.gym.items[0].path + track.file + this.gym.items[0].end, track.settings.volume.value / 100, index);
          console.log("!!!!!", sound[index].volume);
        } else {
          console.log(group);
          group.removeSound(sound[index]);
        }
      }
    },
    playStart() {
      console.log("PLAY!!!!!");
      
      group.play();
    },
    playStop() {
      console.log("STOP");
      group.stop();
    },
    volumePartChange(index) {
      console.log('index',index )
      console.log(
        "this.gym.items[0].parts[index].settings.volume.value",
        this.gym.items[0].parts[index].settings.volume.value
      );

      sound[index].volume = this.gym.items[0].parts[index].settings.volume.value / 100;
      console.log("_sound[index].volume", sound[index].volume);
    },
    createAutoMix(){
      
      console.log('AB')

      volA=[]
      volB=[]

      this.gym.tracks[0].parts.forEach((part, index) => {
          part.check=''
          console.log('part', part.name)
          volA.push(part.settings.volume.value)
          var B = getRandomIntInclusive(40, 80)
          volB.push(B)
          console.log('part!', part) 
        
        

      })
      console.log('volA', volA)
      console.log('volB', volB)
    },
    VolumeAB:(function(e){
      console.log('event', e.target.checked)

      if  (e.target.checked){
        this.gym.items[0].parts.forEach((part, index) => {  
          
          if (part.enabled){
            console.log('part1',part) 
            console.log('volA', volA)
            console.log('volB', volB)
            // part.settings.volume.value = volB[index]
            console.log('part2',part)
            sound[index].volume = volB[index]/100 
            // this.volumePartChange(index)
          }
      })
      }  else {
        this.gym.items[0].parts.forEach((part, index) => {   
          if (part.enabled){
            console.log('volA', volA)
            console.log('volB', volB)
            // part.settings.volume.value=volA[index]
            sound[index].volume = part.settings.volume.value/100
            
            
            // volA[index]/100
            // this.volumePartChange(index)
            // volA[index]
          }
          
        })
      }    
    }),
   
    checkMix:(function(){
      this.gym.items[0].parts.forEach((part,index)=>{
        var now = part.settings.volume.value/1
        if (part.enabled){
          console.log('volB-now',volB[index]-now)
          console.log()
          if (volB[index]-now < 3 && volB[index]-now >- 3){
            var message = `volA=${volA[index]}, now=${now}, volB=${volB[index]}: SUPER!`
          } else if (volB[index]-now < 5 && volB[index]-now >- 5){
            var message = `volA=${volA[index]}, now=${now}, volB=${volB[index]}: GOOD!`

          } else {
            var message = 'BAD...'

          }
          part.check=`${message}`
          console.log(part.check)

        }

      })

    }) 

    
    
}
});

function addGroup(file, volume, index) {
  sound[index] = new Pizzicato.Sound(
    {
      source: "file",
      options: { path: file },
    },
    function () {
      console.log("sound file loaded!");
      sound[index].volume = volume ? volume: .5;
      console.log("sound[index].volume", sound[index].volume);
      group.addSound(sound[index]);
    }
  );
  console.log("sound1", sound[index]);
  return sound[index];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
