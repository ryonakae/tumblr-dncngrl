'use strict';

var THREE = require('threejs');
require('jquery');

var canvas = function(){
  console.log('canvas dayo~~');

  var width = 600;
  var height = 400;
  var bgColor = 0xf8f8f8;
  var bgAlpha = 0;

  // シーン
  var scene = new THREE.Scene();

  // カメラ
  var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.set(0,0,-400); //手前に

  // レンダラ
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias:true
  });
  renderer.setClearColor(bgColor, bgAlpha);
  renderer.setSize(width, height);
  // レンダラをcanvas要素に追加
  document.getElementById('canvas').appendChild(renderer.domElement);

  // グループ
  var group = new THREE.Object3D();

  // シェイプ
  var geometry = new THREE.Geometry();
  geometry.vertices[0] = new THREE.Vector3(-50,100,0);
  geometry.vertices[1] = new THREE.Vector3(-100,-150,0);
  geometry.vertices[2] = new THREE.Vector3(30,20,0);
  geometry.faces[0] = new THREE.Face3(0,1,2);

  // マテリアル・テクスチャ
  var material =  new THREE.MeshBasicMaterial({ color: 0x76faff });
  material.side = THREE.DoubleSide; //裏面も見えるようにする
  var triangle =  new THREE.Mesh(geometry,material);

  // グループにtriangle追加
  group.add(triangle);
  group.position.set(-50,0,0);

  // シーンにグループを追加
  scene.add(group);

  // アニメーション関数
  function update() {
    // グループを回転
    // var rotateX = triangle.rotation.x + 0.002;
    // var rotateY = triangle.rotation.y + 0.005;
    // var rotateZ = triangle.rotation.z + 0.01;
    // triangle.rotation.set( rotateX, rotateY, 0 );

    // レンダリング
    camera.lookAt(scene.position);
    renderer.render(scene,camera);

    // 次のアニメーション呼び出す
    // requestAnimationFrame(update);
  }
  update();

  // $(window).on('load resize', function(){
  //   $('#canvas').css({
  //     width: width,
  //     height: height
  //   });
  // });
}();

module.exports = canvas;