'use strict';

var THREE = require('threejs');
require('jquery');

var canvas = function(){
  // 設定
  var width = $(document).width();
  var height = $(document).height();
  var bgColor = 0xf8f8f8;
  var bgAlpha = 0;


  // シーン
  var scene = new THREE.Scene();


  // カメラ
  var camera = new THREE.PerspectiveCamera(80, width/height, 1, 1000);
  camera.position.set(0,0,-200); //手前に
  camera.lookAt(scene.position);


  // レンダラ
  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias:true
  });
  renderer.setClearColor(bgColor, bgAlpha);
  renderer.setSize(width, height);
  // レンダラをcanvas要素に追加
  document.getElementById('canvas').appendChild(renderer.domElement);


  // ライト
  var light0 = new THREE.AmbientLight(0xffffff);
  var light1 = new THREE.DirectionalLight(0xffffff);
  var light2 = new THREE.DirectionalLight(0xffffff);
  light1.position.set(50,300,-50);
  light2.position.set(-50,300,50);


  // シェイプ
  var geometry = new THREE.Shape();
  geometry.moveTo(-50,100);
  geometry.lineTo(-100,-150);
  geometry.lineTo(30,20);
  geometry.lineTo(-50,100); //始点に戻る
  geometry = new THREE.ShapeGeometry(geometry);


  // マテリアル・テクスチャ
  var material =  new THREE.MeshLambertMaterial({
    color: 0x76faff
  });
  material.side = THREE.DoubleSide; //裏面も見えるようにする
  var triangle =  new THREE.Mesh(geometry,material);


  // グループ
  var group = new THREE.Object3D();
  // グループにtriangle追加
  group.add(triangle);
  group.position.set(0,0,0);


  // シーンに要素を追加
  scene.add(group);
  scene.add(light0);
  scene.add(light1);
  scene.add(light2);


  // アニメーション関数
  // くるくる
  function rotate() {
    // グループを回転
    var rotateX = group.rotation.x + 0.002;
    var rotateY = group.rotation.y + 0.0005;
    var rotateZ = group.rotation.z + 0.0001;
    group.rotation.set( 0, rotateY, rotateZ );

    // レンダリング
    renderer.render(scene,camera);

    // 次のアニメーション呼び出す
    requestAnimationFrame(rotate);
  }

  // ふわふわ
  var degree = 0;
  function position() {
    // グループをふわふわ
    degree = degree + 0.5;
    var radian = degree * Math.PI / 180;
    var positionY = Math.cos(radian) * 10;
    group.position.y = positionY;

    // レンダリング
    renderer.render(scene,camera);

    // 次のアニメーション呼び出す
    requestAnimationFrame(position);
  }


  // アニメーション発火
  rotate();
  position();
  console.log('canvas描画');
}();

module.exports = canvas;