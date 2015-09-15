'use strict';

var THREE = require('threejs');
require('jquery');

module.exports = function(){
  // 設定
  var width = 2000;
  var height = 2500;
  var bgColor = 0xf8f8f8;
  var bgAlpha = 0;


  // シーン
  var scene = new THREE.Scene();


  // カメラ
  var camera = new THREE.PerspectiveCamera(80, width/height, 1, 1000);
  camera.position.set(0,0,-600); //手前に
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


  // マテリアル・テクスチャ（共通）
  var material =  new THREE.MeshLambertMaterial({
    color: 0x76faff
  });
  material.side = THREE.DoubleSide; //裏面も見えるようにする


  // シェイプ
  var triangle1 = new THREE.Shape();
  triangle1.moveTo(-50,100);
  triangle1.lineTo(-100,-150);
  triangle1.lineTo(30,20);
  triangle1.lineTo(-50,100); //始点に戻る
  triangle1 = new THREE.ShapeGeometry(triangle1);
  var triangle1 =  new THREE.Mesh(triangle1,material);

  var triangle2 = new THREE.Shape();
  triangle2.moveTo(-20,150);
  triangle2.lineTo(10,-50);
  triangle2.lineTo(60,20);
  triangle2.lineTo(-20,150); //始点に戻る
  triangle2 = new THREE.ShapeGeometry(triangle2);
  var triangle2 =  new THREE.Mesh(triangle2,material);


  // グループ
  // triangle1: 右中央ちょい下くらいに置く
  var group1 = new THREE.Object3D();
  group1.add(triangle1);
  group1.position.x = -170;
  group1.position.y = 50;
  group1.position.z = 0;
  // triangle2: 左下くらいに置く
  var group2 = new THREE.Object3D();
  group2.add(triangle2);
  group2.position.x = 220;
  group2.position.y = -450;
  group2.position.z = 0;


  // シーンに要素を追加
  scene.add(group1);
  scene.add(group2);
  scene.add(light0);
  scene.add(light1);
  scene.add(light2);


  // アニメーション関数
  var degree = 0; //角度初期化

  // くるくる
  function kurukuru1() {
    degree = degree + 0.01;
    var radian = degree * Math.PI / 180;
    var rotateX = group1.rotation.x + 0;
    var rotateY = group1.rotation.y + Math.sin(radian) * 0.0005;
    var rotateZ = group1.rotation.z + Math.sin(radian) * 0.0001;

    group1.rotation.set( rotateX, rotateY, rotateZ );
    // レンダリング
    renderer.render(scene,camera);
    // 次のアニメーション呼び出す
    requestAnimationFrame(kurukuru1);
  };
  function kurukuru2() {
    degree = degree + 0.01;
    var radian = degree * Math.PI / 180;
    var rotateX = group2.rotation.x + 0;
    var rotateY = group2.rotation.y + Math.sin(radian) * -0.0005;
    var rotateZ = group2.rotation.z + Math.sin(radian) * -0.0001;

    group2.rotation.set( rotateX, rotateY, rotateZ );
    // レンダリング
    renderer.render(scene,camera);
    // 次のアニメーション呼び出す
    requestAnimationFrame(kurukuru2);
  };

  // ふわふわ
  // groupではなくtriangleをふわらせる
  function fuwafuwa1(){
    degree = degree + 0.3; //頻度
    var radian = degree * Math.PI / 180;
    var positionY = Math.sin(radian) * 10; //幅

    triangle1.position.y = positionY; // ふわふわ
    // レンダリング
    renderer.render(scene,camera);
    // 次のアニメーション呼び出す
    requestAnimationFrame(fuwafuwa1);
  };
  function fuwafuwa2(){
    degree = degree + 0.3; //頻度
    var radian = degree * Math.PI / 180;
    var positionY = Math.sin(radian) * 5; //幅

    triangle2.position.y = positionY; // ふわふわ
    // レンダリング
    renderer.render(scene,camera);
    // 次のアニメーション呼び出す
    requestAnimationFrame(fuwafuwa2);
  };


  // アニメーション発火
  kurukuru1();
  kurukuru2();
  fuwafuwa1();
  fuwafuwa2();
  console.log('canvas描画');
};