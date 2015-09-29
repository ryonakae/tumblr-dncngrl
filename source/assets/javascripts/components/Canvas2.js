'use strict';

require('jquery');
var THREE = require('three');
var TWEEN = require('tween');

module.exports = function(canvasElement){
  // Canvas作る
  function Canvas(e){
    // 使い回す値はコンストラクタに入れておく
    this.element = e;

    // サイズや背景色
    this.width = $(window).width();
    this.height = $(window).height();
    this.bgColor = 0xf8f8f8;
    this.bgAlpha = 0;

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
    this.camera = new THREE.PerspectiveCamera(80, this.width/this.height, 1, 1000);

    // レンダラ
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    this.plane = new THREE.Mesh(
     new THREE.PlaneGeometry( 500, 500 , 10 , 10 ),
     new THREE.MeshBasicMaterial( {color: 0xcccccc, wireframe: true} )
    );

    this.cube = new THREE.Mesh(
      new THREE.CubeGeometry(50,50,50),
      new THREE.MeshLambertMaterial({color: 0xff0000})
    );

    this.rotateDeg = 0;
    this.rotateFlag = false;
  }

  // Canvasを初期化
  Canvas.prototype.init = function(){
    // シーン
    this.scene.fog = new THREE.Fog( 0xffffff, 0, 3000 );

    // カメラ
    // ピクセル等倍にする(canvasのサイズでオブジェクトの大きさを変えない)
    // http://ikeryou.jp/log/?p=242
    var cameraZ = -(this.height / 2) / Math.tan( (this.camera.fov * Math.PI/180) / 2 );
    this.camera.position.set(0,0,cameraZ); //手前に
    this.camera.lookAt(this.scene.position);

    this.initObject();

    // レンダラ
    // レンダラの色やサイズをセット
    this.renderer.setClearColor(this.bgColor, this.bgAlpha);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio( window.devicePixelRatio );

    // this.element以下にcanvasを描画
    this.element.appendChild(this.renderer.domElement);

    this.tween();
  }

  Canvas.prototype.initLight = function(){
    var light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set( 100, 100, 200 );
    this.scene.add(light);
  }

  Canvas.prototype.initObject = function(){
    var axis = new THREE.AxisHelper(500);
    this.scene.add(axis);

    this.plane.position.set(0,0,0);
    this.plane.rotation.x = Math.PI/2;
    this.scene.add(this.plane);

    this.cube.position.set(0,0,0);
    this.cube.rotation.set(0,0,0);
    this.scene.add(this.cube);
  }

  // Canvasをレンダリング
  Canvas.prototype.render = function(){
    this.renderer.render(this.scene, this.camera);
  }

  // Canvasをアニメーション
  Canvas.prototype.animation = function(){
    if (this.rotateFlag === true) {
      this.rotateDeg += 0.1; //くるくるの速度
      var rotateRadian = this.rotateDeg * Math.PI / 180;

      this.cube.rotation.y = rotateRadian;
    }
    console.log(this.rotateFlag);

    requestAnimationFrame(this.animation.bind(this));
    TWEEN.update();
    this.render();
  }

  Canvas.prototype.tween = function(){
    var self = this;

    TWEEN.removeAll();

    var tween = new TWEEN.Tween(this.cube.rotation)
      .to({
        z: Math.PI,
        y: Math.PI * 3
      }, 2000)
      .easing(TWEEN.Easing.Quartic.InOut)
      .start();

    var tweenBack = new TWEEN.Tween(this.cube.rotation)
      .delay(300)
      .to({
        z: 0,
        y: 0
      }, 2000)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onComplete(function(){
        console.log('animation chain is complete!');
        self.rotateFlag = true;
      });

    tween.chain(tweenBack);
    // tweenBack.chain(tween);
  }


  // triangleという名前のCanvas関数のインスタンスを作成
  // 引数に設定したcanvasElementが、Canvas関数のthis.elementに入る
  var triangle = new Canvas(canvasElement);

  // triangleの初期化
  triangle.init();

  // アニメーション
  triangle.animation();
};