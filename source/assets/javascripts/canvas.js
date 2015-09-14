'use strict';

var THREE = require('threejs');
require('jquery');

var canvas = function(){
  console.log('canvas dayo~~');

  var width = window.innerWidth;
  var height = window.innerHeight;
  var bgColor = 0xf8f8f8;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000 );
  camera.position.set(0,0,250);

  var renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setClearColor( bgColor );
  renderer.setSize(width, height);
  document.getElementById('canvas').appendChild(renderer.domElement);

  var geometry = new THREE.Geometry();
  geometry.vertices[0] = new THREE.Vector3(150,0,0);
  geometry.vertices[1] = new THREE.Vector3(0,150,0);
  geometry.vertices[2] = new THREE.Vector3(0,0,150);
  geometry.faces[0] = new THREE.Face3(0,1,2);

  var material =  new THREE.MeshBasicMaterial({ color: 0x0000ff });
  var Triangle =  new THREE.Mesh(geometry,material);

  scene.add(Triangle);

  camera.lookAt(scene.position);
  renderer.render(scene,camera);

  $('window').on('load resize', function(){
    $('#canvas').css({
      width: width,
      height: height
    });
  });
}();

module.exports = canvas;