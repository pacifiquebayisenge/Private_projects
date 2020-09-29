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
  collision();
});

let height = 5;
let hinder1 = $$("#hinder1")[0];
let hinder2 = $$("#hinder2")[0];
let animation;
let headerScore = $$("#headerScore")[0];
let score = 0;
let speedInt;

//	bars move faster down when score increases
let speedUp = function () {



  switch (true) {

    case (score < 3):
      speedInt = 0.5;
      break;

    case (score < 14):
      speedInt = 0.7;
      break;

    case (score < 34):
      speedInt = 0.9;
      break;

    case (score < 49):
      speedInt = 1
      break;

    case (score < 74):
      speedInt = 1.3;
      break;

    case (score < 99):
      speedInt = 1.6;
      break;

    case (score < 124):
      speedInt = 1.8;
      break;

    case (score < 149):
      speedInt = 2;
      break;

    case (score > 150):
      speedInt = 2.5;
      break;


  }

  // speed of the bars down movement added by speedInt
  // to declare how fast thet come down
  height += speedInt;


}


// collision between the bars and the player
let collision = function () {
  if (
    hinder2.getBoundingClientRect().bottom > PLAYER.getBoundingClientRect().top &&
    hinder2.getBoundingClientRect().bottom < PLAYER.getBoundingClientRect().bottom
  ) {
    if (hinder1.getBoundingClientRect().right > PLAYER.getBoundingClientRect().left + 6) {

      cancelAnimationFrame(animation);
      // updateHighscore();
      // btnStart.innerHTML = 'Restart';
      // btnStart.style.display = 'block';
      score = 0;
      gameOver = true;
      gameOverMenu();

    }

    if (hinder2.getBoundingClientRect().left < PLAYER.getBoundingClientRect().right - 12) {

      cancelAnimationFrame(animation);
      // updateHighscore();
      // btnStart.innerHTML = 'Restart';
      // btnStart.style.display = 'block';
      score = 0;
      gameOver = true;
      gameOverMenu();

    }
  }

};



let frame = function () {
  animation = requestAnimationFrame(frame);

  if (height > 100) {

    // random number 
    randomNum = Math.floor(Math.random() * 75);

    hinder1.style.width = randomNum + '%';
    hinder2.style.width = 75 - randomNum + '%';

    /*
     when the bars reach the end of the screen 
     place them back on top with new with measurements 
     add score by one
     */
    height = 5;

    score++;
    headerScore.innerHTML = score;

    console.log(speedInt);

  } else {
    speedUp();

    //	change height of bars to let them come down

    $$('.hinder').css('top', height + '%');

  }

  collision();
  //arrowMovement();
};


//  Game start

let btnStart = $$('#btnStart');
let gameStarted = false;

btnStart.on('click', function () {

  headerScore.innerHTML = score;

  gameStarted = true;

  gameOnGoing();


  frame();
});

let gameOnGoing = function () {

  if (gameStarted == true) {

    app.popup.close('#popup');

  } else {

    app.popup.open('#popup');

  }
};

gameOnGoing();

// game instructions 

let btnHowTo = $$('#btnHowTo');
let howToTxt = $$('#howToText');


btnHowTo.on('click', function () {

  btnHowTo.css('display', 'none');
  howToTxt.css('display', 'block');

  setTimeout(function () {

    btnHowTo.css('display', 'block');
    howToTxt.css('display', 'none');

  }, 3000);
});


// game over 

let gameOver = false;
let btnRestart = $$('#btnRestart');
let btnMenu = $$('#btnMenu');

let gameOverMenu = function () {

  if (gameOver = true) {
    btnRestart.css('display', 'block');
    btnMenu.css('display', 'block');

  } else {

    btnRestart.css('display', 'none');
    btnMenu.css('display', 'none');
  }



}