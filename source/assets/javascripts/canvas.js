'use strict';

var PIXI = require('pixi');

var canvas = function(){
  console.log('canvas dayo~~');

  var width = 600;
  var height = 400;

  var stage = new PIXI.Container();
  var renderer = new PIXI.autoDetectRenderer(width, height, {
    backgroundColor: 0xffffff,
    antialias: true
  });

  document.getElementById('canvas').appendChild(renderer.view);

  var triangle = new PIXI.Graphics();

  triangle.beginFill(0x00FF00);
  triangle.moveTo(300,0);
  triangle.lineTo(600,400);
  triangle.lineTo(0,400);
  triangle.endFill();

  stage.addChild(triangle);

  renderer.render(stage);
}();

module.exports = canvas;