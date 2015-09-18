'use strict';

require('jquery');
var THREE = require('three');

module.exports = function(canvasElement){
  function Canvas(element){
    this.element = element;

    // 各メソッドで共通で使うプロパティはコンストラクタ関数に入れておくと良さそう
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
      antialias:true
    });
  };

  // 初期化
  Canvas.prototype.init = function(){
    // シーン
    var scene = this.scene;

    // カメラを設置
    // ピクセル等倍にする(canvasのサイズでオブジェクトの大きさを変えない)
    // http://ikeryou.jp/log/?p=242
    var camera = this.camera;
    var cameraZ = -(this.height / 2) / Math.tan( (camera.fov * Math.PI/180) / 2 );
    camera.position.set(0,0,cameraZ); //手前に
    camera.lookAt(scene.position);
    console.log(cameraZ);

    // レンダラの色やサイズをセット
    var renderer = this.renderer;
    renderer.setClearColor(this.bgColor, this.bgAlpha);
    renderer.setSize(this.width, this.height);

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
  };

  // 描画
  Canvas.prototype.render = function(){
    var renderer = this.renderer;
    var element = this.element;
    element.appendChild(this.renderer.domElement);
    console.log($(element).width());
  };

  var canvas = new Canvas(canvasElement);
  canvas.init();
  canvas.render();
};