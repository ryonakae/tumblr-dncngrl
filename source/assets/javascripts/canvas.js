'use strict';

require('jquery');
var THREE = require('three');

module.exports = function(){
  // 設定
  var width = $(window).width();
  var height = $(window).height();
  var bgColor = 0xf8f8f8;
  var bgAlpha = 0;


  // シーン
  var scene = new THREE.Scene();


  // カメラ
  // ピクセル等倍にする(canvasのサイズでオブジェクトの大きさを変えない)
  // http://ikeryou.jp/log/?p=242
  var camera = new THREE.PerspectiveCamera(80, width/height, 1, 1000);
  var cameraZ = -(height / 2) / Math.tan( (camera.fov * Math.PI/180) / 2 )
  camera.position.set(0,0,cameraZ); //手前に
  camera.lookAt(scene.position);
  console.log(cameraZ);


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
  group1.position.x = -450;
  group1.position.y = height*0.3;
  group1.position.z = 0;
  group1.scale.set(1.9,1.9,1.9);

  // triangle2: 左下くらいに置く
  var group2 = new THREE.Object3D();
  group2.add(triangle2);
  group2.position.x = 550;
  group2.position.y = height*-0.45;
  group2.position.z = 0;
  group2.scale.set(2,2,2);


  // シーンに要素を追加
  scene.add(group1);
  scene.add(group2);
  scene.add(light0);
  scene.add(light1);
  scene.add(light2);


  // アニメーション関数
  var rotateDeg = 0;
  var fuwaDeg = 0;

  function animation(){
    rotateDeg = rotateDeg + 0.005; //くるくるの速度
    var rotateRadian = rotateDeg * Math.PI / 180;
    fuwaDeg = fuwaDeg + 0.3; //ふわふわの速度
    var fuwaRadian = fuwaDeg * Math.PI / 180;

    // group1
    (function(){
      var rotateY = Math.sin(rotateRadian) * 1; //くるくるの振れ幅
      var rotateZ = Math.sin(rotateRadian) * 0.2;
      var positionY = Math.sin(fuwaRadian) * 10; //ふわふわの振れ幅

      group1.rotation.set( 0, rotateY, rotateZ );
      triangle1.position.y = positionY;
    })();

    // group2
    (function(){
      var rotateY = Math.sin(rotateRadian) * 1.5; //くるくるの振れ幅
      var rotateZ = Math.sin(rotateRadian) * 0.15;
      var positionY = Math.sin(fuwaRadian) * 5; //ふわふわの振れ幅

      group2.rotation.set( 0, -rotateY, -rotateZ );
      triangle2.position.y = -positionY;
    })();

    renderer.clear();
    renderer.render(scene,camera);
    requestAnimationFrame(animation);
  };


  // アニメーション発火
  animation();
  console.log('canvas描画');


  // リサイズ
  $(window).on('resize', function(){
    width = $(window).width();
    height = $(window).height();
    camera.aspect = width/height
    cameraZ = -(height / 2) / Math.tan( (camera.fov * Math.PI/180) / 2 )
    camera.position.z = cameraZ;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });


  // マウスオーバー
  $(window).on('mousemove', function(e){
    // window中心からの座標
    var mouseX = e.clientX - width/2;
    var mouseY = e.clientY - height/2;

    // カメラ位置
    // マウス座標と逆に動かしてパララックス効果つける
    camera.position.x = -(mouseX/30);
    camera.position.y = -(mouseY/30);
    camera.updateProjectionMatrix();
  });
};