'use strict';

var PIXI = require('pixi');

var canvas = function(){
  console.log('canvas dayo~~');

  var width = 600;
  var height = 400;

  var stage = new PIXI.Container(0x000000);
  var renderer = new PIXI.autoDetectRenderer(width, height, {
    antialias: true
  });

  document.getElementById('canvas').appendChild(renderer.view);

  var g = new PIXI.Graphics();

  g.lineStyle(2,0xffffff).moveTo(10,10).lineTo(100,100);

  stage.addChild(g);

  renderer.render(stage);
}();

module.exports = canvas;