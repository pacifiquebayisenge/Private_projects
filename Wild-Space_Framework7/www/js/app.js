var $$ = Dom7;

var app = new Framework7({
  root: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  name: 'Wild Space', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data() {
    return {
      foo: 'bar'
    };
  },
  // App root methods
  methods: {
    doSomething() {
      // ...
    }
  },


  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

const PLAYER = $$("#player")[0];
const gameScreen = $$("#gameScreen");
let x;
let y;

gameScreen.on('touchstart', function (e) {
  // get touch coordinates
  let touchX = e.touches[0].clientX;
  let touchY = e.touches[0].clientY;



  // calculate touch coordinates 
  if (gameScreen[0].offsetWidth > 790 && gameScreen[0].offsetHeight > 1000) {

    x = (100 * touchX / gameScreen[0].offsetWidth) - 15;
    y = (100 * touchY / gameScreen[0].offsetHeight) - 5;

  } else {
    if (gameScreen[0].offsetWidth > 700 && gameScreen[0].offsetHeight > 800) {

      x = (100 * touchX / gameScreen[0].offsetWidth) - 3;
      y = (100 * touchY / gameScreen[0].offsetHeight) - 4;

    } else {

      x = (100 * touchX / gameScreen[0].offsetWidth) - 5;
      y = (100 * touchY / gameScreen[0].offsetHeight) - 4;

    }
  }



  // if player goes to far left
  if (x < -0.1) {
    x = -0.1
  }

  // if player goes to far right
  if (x > 88.42) {
    x = 88.42
  }

  // if player goes too far down
  if (y > 93.08) {
    y = 93.08
  }

  // if player goes too far up
  if (y < 5) {
    y = 5
  }

  // set the coordinates
  PLAYER.style.left = x + '%';
  PLAYER.style.top = y + '%';

  console.log(PLAYER.style.left, PLAYER.style.top)
});

let hoogte = 5;
let hinder1 = $$("#hinder1")[0];
let hinder2 = $$("#hinder2")[0];
let animation;
let score = 0;

//	Hoe hoger de score wordt, hoe sneller de hindernissen zich naar benenden verplaatsen.
let speedUp = function () {

  let speedInt;

  switch (true) {

    case (score < 3):
      speedInt = 0.5;
      break;

    case (score >= 3):
      speedInt = 0.7;
      break;

    case (score >= 15):
      speedInt = 0.9;
      break;

    case (score >= 35):
      speedInt++
      break;

    case (score >= 50):
      speedInt = 1.3;
      break;

    case (score >= 75):
      speedInt = 1.6;
      break;

    case (score >= 100):
      speedInt = 1.8;
      break;

    case (score >= 125):
      speedInt = 2;
      break;

    case (score >= 150):
      speedInt = 2.5;
      break;


  }

  hoogte += speedInt;

   
}

let frame = function () {
  animation = requestAnimationFrame(frame);

  if (hoogte > 100) {
    /* 
              We willen een randam getal berekennen van tussen 0 en 80.
              Met de  Math.random bekomen we een getal tussen 0 en 1 met 0 inbegrepen maar 1 niet.
              Door te vermenigvuldigen met 80 bekomen we een getal tussen 0 en 80 met alle getallen inbegrepen tot 80 dwz 80 niet.
              Met de Math.floor ronden we dit getal af naar beneden om een geheel getal te bekomen.
           */
    randomGetal = Math.floor(Math.random() * 75);

    hinder1.style.width = randomGetal + '%';
    hinder2.style.width = 75 - randomGetal + '%';

    /*
            Wanneer de hindernissen  het einde van het scherm bereiken, plaatsen we ze terug bij het begin.
              En wordt de score met 1 bijgeteld.
          */
    hoogte = 5;
    
    score++;
    //document.getElementById('score').innerHTML = score;
  } else {
    speedUp();

    //	De verticale positie van de hindernissen steeds met 1 vermeerderen om ze naar beneden te doen bewegen.
   
    $$('.hinder').css('top', hoogte + '%');

  }

  //collision();
  //arrowMovement();
};

frame();