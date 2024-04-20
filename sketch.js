let angle = 0;
let isAdjusting = false; 
let refresh = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  setupUI();
  
  let colorBackground = colorPickerBackground.color();
  background(colorBackground);
    
  frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupUI();
  updateBackgroundColor();
  refreshCanvas();
}

function draw() {
push();
  rectMode(CENTER);
  let flowerRadius = flowerRadiusSlider.value();
  let sliceWidth = sliceWidthSlider.value();
  let rotationSpeed = speedSlider.value();
  let gradSpeed = gradientSpeedSlider.value();
  let colorPrimary = colorPickerPrimary.color();
  let colorSecondary = colorPickerSecondary.color();

let cS = gradientColors(frameCount, gradSpeed, colorPrimary, colorSecondary);
let c1 = gradientColors(frameCount, gradSpeed, colorSecondary, colorPrimary);
let c2 = gradientColors(frameCount, gradSpeed, colorPrimary, colorSecondary);
let c3 = gradientColors(frameCount, gradSpeed, colorSecondary, colorPrimary);
let cE = gradientColors(frameCount, gradSpeed, colorPrimary, colorSecondary);

  translate(width/2,height/2);

  let radius = map(sin(frameCount * 0.1), -1, 1, gradientScaleSlider.value(), gradientScaleSlider.value());
  let centerX = 0;
  let centerY = 0;

  let position = createPosition(centerX, centerY, radius, angle);

  noStroke();
  let gradient = createGradient(position.posX, position.posY, 0, centerX - radius * cos(angle), centerY - radius * sin(angle), gradientAngleSlider.value(), [cS, c1, c2, c3, cE]);
  drawingContext.fillStyle = gradient;

  rotate(radians(frameCount * rotationSpeed));
  rect(0,0,flowerRadius,sliceWidth);
  
  angle += gradientMovementAngleSlider.value(); 

pop();
}

function setupUI() {
    document.getElementById('slider-container').innerHTML = '';

    let yOffset = -10; 
    
    //RADIUS SLITER
    let radiusText = document.getElementById('flowerRadiusSizeText');
    flowerRadiusSlider = createSlider(50, windowHeight, windowHeight/2, 1);
  
    flowerRadiusSlider.position(20, flowerRadiusSizeText.offsetTop + flowerRadiusSizeText.offsetHeight + yOffset);
    
    flowerRadiusSlider.input(() => refreshCanvas());
  
    flowerRadiusSlider.mousePressed(() => isAdjusting = true);
    flowerRadiusSlider.touchStarted(() => isAdjusting = true); 
  
    flowerRadiusSlider.mouseReleased(() => finishAdjusting());
    flowerRadiusSlider.touchEnded(() => finishAdjusting()); 
  
    flowerRadiusSlider.addClass('sliderStyle');
    flowerRadiusSlider.parent('slider-container'); 

    //SLICE WIDTH SLIDER
    let sliceWidthText = document.getElementById('sliceWidthText');
    sliceWidthSlider = createSlider(1, 50, 5, 1);

    sliceWidthSlider.position(20, sliceWidthText.offsetTop + sliceWidthText.offsetHeight + yOffset);

    sliceWidthSlider.input(() => refreshCanvas());

    sliceWidthSlider.mousePressed(() => isAdjusting = true);
    sliceWidthSlider.touchStarted(() => isAdjusting = true);

    sliceWidthSlider.mouseReleased(() => finishAdjusting());
    sliceWidthSlider.touchEnded(() => finishAdjusting());

    sliceWidthSlider.addClass('sliderStyle');
    sliceWidthSlider.parent('slider-container');

    //SPEED SLIDER
    let speedText = document.getElementById('speedText');
    speedSlider = createSlider(-2, 2, 1, 0.1);

    speedSlider.position(20, speedText.offsetTop + speedText.offsetHeight + yOffset);

    speedSlider.input(() => refreshCanvas());

    speedSlider.mousePressed(() => isAdjusting = true);
    speedSlider.touchStarted(() => isAdjusting = true);

    speedSlider.mouseReleased(() => finishAdjusting());
    speedSlider.touchEnded(() => finishAdjusting());

    speedSlider.addClass('sliderStyle');
    speedSlider.parent('slider-container');

    //GRADIENT SPEED SLIDER
    let gradientSpeedText = document.getElementById('gradientSpeedText');
    gradientSpeedSlider = createSlider(0.001, 0.5, 0.2, 0.01);

    gradientSpeedSlider.position(20, gradientSpeedText.offsetTop + gradientSpeedText.offsetHeight + yOffset);

    gradientSpeedSlider.input(() => refreshCanvas());

    gradientSpeedSlider.mousePressed(() => isAdjusting = true);
    gradientSpeedSlider.touchStarted(() => isAdjusting = true);

    gradientSpeedSlider.mouseReleased(() => finishAdjusting());
    gradientSpeedSlider.touchEnded(() => finishAdjusting());

    gradientSpeedSlider.addClass('sliderStyle');
    gradientSpeedSlider.parent('slider-container');

       //GRADIENT MOVEMENT ANGLE SLIDER
       let gradientMovementAngleText = document.getElementById('gradientMovementAngleText');
       gradientMovementAngleSlider = createSlider(-0.2, 0.2, 0.05, 0.01);
   
       gradientMovementAngleSlider.position(20, gradientMovementAngleText.offsetTop + gradientMovementAngleText.offsetHeight + yOffset);
   
       gradientMovementAngleSlider.input(() => refreshCanvas());
   
       gradientMovementAngleSlider.mousePressed(() => isAdjusting = true);
       gradientMovementAngleSlider.touchStarted(() => isAdjusting = true);
   
       gradientMovementAngleSlider.mouseReleased(() => finishAdjusting());
       gradientMovementAngleSlider.touchEnded(() => finishAdjusting());
   
       gradientMovementAngleSlider.addClass('sliderStyle');
       gradientMovementAngleSlider.parent('slider-container');

              //GRADIENT ANGLE SLIDER
              let gradientAngleText = document.getElementById('gradientAngleText');
              gradientAngleSlider = createSlider(500, 3000, 1000, 1);
          
              gradientAngleSlider.position(20, gradientAngleText.offsetTop + gradientAngleText.offsetHeight + yOffset);
          
              gradientAngleSlider.input(() => refreshCanvas());
          
              gradientAngleSlider.mousePressed(() => isAdjusting = true);
              gradientAngleSlider.touchStarted(() => isAdjusting = true);
          
              gradientAngleSlider.mouseReleased(() => finishAdjusting());
              gradientAngleSlider.touchEnded(() => finishAdjusting());
          
              gradientAngleSlider.addClass('sliderStyle');
              gradientAngleSlider.parent('slider-container');

             //GRADIENT SCALE SLIDER
             let gradientScaleText = document.getElementById('gradientScaleText');
             gradientScaleSlider = createSlider(10, 500, 200, 1);
         
             gradientScaleSlider.position(20, gradientScaleText.offsetTop + gradientScaleText.offsetHeight + yOffset);
         
             gradientScaleSlider.input(() => refreshCanvas());
         
             gradientScaleSlider.mousePressed(() => isAdjusting = true);
             gradientScaleSlider.touchStarted(() => isAdjusting = true);
         
             gradientScaleSlider.mouseReleased(() => finishAdjusting());
             gradientScaleSlider.touchEnded(() => finishAdjusting());
         
             gradientScaleSlider.addClass('sliderStyle');
             gradientScaleSlider.parent('slider-container');

    //COLOR PICKER PRIMARY
    let colorPickerPrimaryText = document.getElementById('colorPickerPrimaryText');
    colorPickerPrimary = createColorPicker('#ffffff');

    colorPickerPrimary.position(20, colorPickerPrimaryText.offsetTop + colorPickerPrimaryText.offsetHeight + yOffset);

    colorPickerPrimary.input(() => refreshCanvas());

    colorPickerPrimary.mousePressed(() => isAdjusting = true);
    colorPickerPrimary.touchStarted(() => isAdjusting = true);

    colorPickerPrimary.mouseReleased(() => finishAdjusting());
    colorPickerPrimary.touchEnded(() => finishAdjusting());

    colorPickerPrimary.addClass('colorPickerStyle');
    colorPickerPrimary.parent('slider-container');

    //COLOR PICKER SECONDARY
    let colorPickerSecondaryText = document.getElementById('colorPickerSecondaryText');
    colorPickerSecondary = createColorPicker('#000000');

    colorPickerSecondary.position(20, colorPickerSecondaryText.offsetTop + colorPickerSecondaryText.offsetHeight + yOffset);

    colorPickerSecondary.input(() => refreshCanvas());

    colorPickerSecondary.mousePressed(() => isAdjusting = true);
    colorPickerSecondary.touchStarted(() => isAdjusting = true);

    colorPickerSecondary.mouseReleased(() => finishAdjusting());
    colorPickerSecondary.touchEnded(() => finishAdjusting());

    colorPickerSecondary.addClass('colorPickerStyle');
    colorPickerSecondary.parent('slider-container');

  //COLOR PICKER BACKGROUND
  let colorPickerBackgroundText = document.getElementById('colorPickerBackgroundText');
  colorPickerBackground = createColorPicker('#000000');

  colorPickerBackground.position(20, colorPickerBackgroundText.offsetTop + colorPickerBackgroundText.offsetHeight + yOffset);

  colorPickerBackground.input(updateBackgroundColor);

  colorPickerBackground.mousePressed(() => isAdjusting = true);
  colorPickerBackground.touchStarted(() => isAdjusting = true);

  colorPickerBackground.mouseReleased(() => finishAdjusting());
  colorPickerBackground.touchEnded(() => finishAdjusting());

  colorPickerBackground.addClass('colorPickerStyle');
  colorPickerBackground.parent('slider-container');

  //SAVE IMAGE BUTTON
  let saveImgButtonText = document.getElementById('saveImgButtonText');

  saveImgButton = createButton('SAVE');
  saveImgButton.position(20, saveImgButtonText.offsetTop + saveImgButtonText.offsetHeight + yOffset);

  saveImgButton.mousePressed(() => { saveCanvas('gradient-flower', 'jpeg');});

  saveImgButton.addClass('buttonStyle');
  saveImgButton.parent('slider-container');

  //RESET BUTTON
let resetButtonText = document.getElementById('resetButtonText');

let resetButton = createButton('CLEAR');
resetButton.position(20, resetButtonText.offsetTop + resetButtonText.offsetHeight + yOffset);

resetButton.mousePressed(() => { background(colorPickerBackground.color()); });

resetButton.addClass('buttonStyle');
resetButton.parent('slider-container');
}

function updateBackgroundColor() {
  let colorBackground = colorPickerBackground.color();
  background(colorBackground);
}

function refreshCanvas() {
  refresh = true;
  loop();
}

function finishAdjusting() {
  isAdjusting = false;
  refreshCanvas(); 
}

function gradientColors(frameCount, gradSpeed, colorStart, colorEnd) {
  let cValue = sin(frameCount * gradSpeed) * 0.5 + 0.5; // map sin value to [0, 1]
  return lerpColor(colorStart, colorEnd, cValue);
}

function createPosition(centerX, centerY, radius, angle) {
  let posX = centerX + radius * cos(angle);
  let posY = centerY + radius * sin(angle);
  return { posX, posY };
}

function createGradient(sX, sY, sR, eX, eY, eR, colors) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  for (let i = 0; i < colors.length; i++) {
    gradient.addColorStop(i / (colors.length - 1), colors[i]);
  }
  return gradient;
}