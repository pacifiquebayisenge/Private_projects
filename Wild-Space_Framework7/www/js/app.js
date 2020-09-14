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
const gameScreen = $$("#gameScreen")[0];
let x;
let y;

gameScreen.addEventListener('touchstart', function (e) {
  // get touch coordinates
  let touchX = e.touches[0].clientX;
  let touchY = e.touches[0].clientY;



  // calculate touch coordinates 
  if (gameScreen.offsetWidth > 790 && gameScreen.offsetHeight > 1000) {

    x = (100 * touchX / gameScreen.offsetWidth) - 18;
    y = (100 * touchY / gameScreen.offsetHeight) - 4;

  } else {
    if (gameScreen.offsetWidth > 700 && gameScreen.offsetHeight > 800) {

      x = (100 * touchX / gameScreen.offsetWidth) - 3;
      y = (100 * touchY / gameScreen.offsetHeight) - 4;

    } else {

      x = (100 * touchX / gameScreen.offsetWidth) - 5;
      y = (100 * touchY / gameScreen.offsetHeight) - 4;

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