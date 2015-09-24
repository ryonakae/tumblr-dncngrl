'use strict';

require('jquery');
var THREE = require('three');

module.exports = function(canvasElement){
  // Canvas作る
  // Canvasコンストラクタ関数を作る
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

    // ライト
    this.light0 = new THREE.AmbientLight(0xffffff);
    this.light1 = new THREE.DirectionalLight(0xffffff);
    this.light2 = new THREE.DirectionalLight(0xffffff);

    // シェイプとグループ
    this.triangle1 = new THREE.Shape();
    this.triangle2 = new THREE.Shape();
    this.group1 = new THREE.Object3D();
    this.group2 = new THREE.Object3D();
  }

  // Canvasを初期化
  // Canvasのprototypeに初期化関数を追加
  Canvas.prototype.init = function(){
    // カメラ
    // ピクセル等倍にする(canvasのサイズでオブジェクトの大きさを変えない)
    // http://ikeryou.jp/log/?p=242
    var cameraZ = -(this.height / 2) / Math.tan( (this.camera.fov * Math.PI/180) / 2 );
    this.camera.position.set(0,0,cameraZ); //手前に
    this.camera.lookAt(this.scene.position);
    console.log(cameraZ);

    // レンダラ
    // レンダラの色やサイズをセット
    this.renderer.setClearColor(this.bgColor, this.bgAlpha);
    this.renderer.setSize(this.width, this.height);

    // マテリアル・テクスチャ
    var material =  new THREE.MeshLambertMaterial({
      color: 0x76faff
    });
    material.side = THREE.DoubleSide; //裏面も見えるようにする

    // ライト
    this.light1.position.set(50,300,-50);
    this.light2.position.set(-50,300,50);

    // シェイプとグループ
    // triangle1
    this.triangle1.moveTo(-50,100);
    this.triangle1.lineTo(-100,-150);
    this.triangle1.lineTo(30,20);
    this.triangle1.lineTo(-50,100); //始点に戻る
    this.triangle1 = new THREE.ShapeGeometry(this.triangle1);
    this.triangle1 =  new THREE.Mesh(this.triangle1, material);
    // triangle2
    this.triangle2.moveTo(-20,150);
    this.triangle2.lineTo(10,-50);
    this.triangle2.lineTo(60,20);
    this.triangle2.lineTo(-20,150); //始点に戻る
    this.triangle2 = new THREE.ShapeGeometry(this.triangle2);
    this.triangle2 =  new THREE.Mesh(this.triangle2, material);
    // group1: 右中央ちょい下くらいに置く
    this.group1.add(this.triangle1);
    this.group1.position.x = -450;
    this.group1.position.y = this.height*0.3;
    this.group1.position.z = 0;
    this.group1.scale.set(1.9,1.9,1.9);
    // group2: 左下くらいに置く
    this.group2.add(this.triangle2);
    this.group2.position.x = 550;
    this.group2.position.y = this.height*-0.45;
    this.group2.position.z = 0;
    this.group2.scale.set(2,2,2);
  }

  // Canvasを描画
  // Canvasのprototypeに描画関数を追加
  Canvas.prototype.render = function(){
    // シーンにライトを追加
    this.scene.add(this.light0);
    this.scene.add(this.light1);
    this.scene.add(this.light2);

    // シーンにグループを追加
    this.scene.add(this.group1);
    this.scene.add(this.group2);

    // this.element以下にcanvasを描画
    this.element.appendChild(this.renderer.domElement);

    // レンダリング
    this.renderer.render(this.scene, this.camera);
  }

  // Canvasをアニメーション
  // Canvasのprototypeにアニメーション関数を追加
  Canvas.prototype.animation = function(){
    var rotateDeg = 0;
    var fuwaDeg = 0;

    // Animateコンストラクタ関数を作る
    function Animate(group, triangle, renderer, scene, camera){
      this.rotateDeg = 0;
      this.fuwaDeg = 0;

      this.group = group;
      this.triangle = triangle;

      this.renderer = renderer;
      this.scene = scene;
      this.camera = camera;
    }

    // Animateのprototypeにkurufuwa関数を追加
    Animate.prototype.kurufuwa = function(){
      // くるくるの度合い
      this.rotateDeg = this.rotateDeg + 0.005;
      var rotateRadian = this.rotateDeg * Math.PI / 180;
      var rotateY = Math.sin(rotateRadian) * 1;
      var rotateZ = Math.sin(rotateRadian) * 0.2;

      // ふわふわの度合い
      this.fuwaDeg = this.fuwaDeg + 0.3;
      var fuwaRadian = this.fuwaDeg * Math.PI / 180;
      var positionY = Math.sin(fuwaRadian) * 10;

      // 動かす
      this.group.rotation.set( 0, rotateY, rotateZ );
      this.triangle.position.y = positionY;
      console.log('くるくる きゃわわ');

      // フレームごとに再描画
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.constructor);
    }

    // Animateのインスタンスをそれぞれ作成
    var animate1 = new Animate(this.group1, this.triangle1, this.renderer, this.scene, this.camera);
    var animate2 = new Animate(this.group2, this.triangle2, this.renderer, this.scene, this.camera);

    animate1.kurufuwa();
    animate2.kurufuwa();
  }


  // triangleっていう名前のCanvas関数のインスタンスを作成
  // 引数に設定したcanvasElementが、Canvas関数のthis.elementに入る
  var triangle = new Canvas(canvasElement);

  // triangleの初期化
  // 継承元のCanvas関数で設定したinitメソッドが使える
  triangle.init();

  // triangleの描画
  // 継承元のCanvas関数で設定したrenderメソッドが使える
  triangle.render();

  // triangleの描画
  // 継承元のCanvas関数で設定したrenderメソッドが使える
  // 引数rotateDegとfuwaDegの初期値は0にする
  triangle.animation();
};