'use strict';

require('jquery');
var THREE = require('three');
var TWEEN = require('tween');

module.exports = function(canvasElement){
  // Triangle作る
  function Triangle(element){
    // 使い回す値はコンストラクタに入れておく
    // 引数
    this.element = element;

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
    this.light2 = new THREE.DirectionalLight(0xffffff, 0.5);

    // シェイプとグループ
    this.triangle1 = new THREE.Shape();
    this.group1 = new THREE.Object3D();

    // アニメーション用の角度
    this.rotateDeg = 0;
    this.rotateFlag = false;
  }

  // 初期化
  Triangle.prototype.init = function(){
    // カメラ
    // ピクセル等倍にする(canvasのサイズでオブジェクトの大きさを変えない)
    // http://ikeryou.jp/log/?p=242
    var cameraZ = -(this.height / 2) / Math.tan( (this.camera.fov * Math.PI/180) / 2 );
    this.camera.position.set(0,0,cameraZ); //手前に
    this.camera.lookAt(this.scene.position);

    // レンダラ
    // レンダラの色やサイズをセット
    this.renderer.setClearColor(this.bgColor, this.bgAlpha);
    this.renderer.setSize(this.width, this.height);

    // ライト
    this.initLight();

    // シェイプとグループ
    this.initObject();

    // this.element以下にcanvasを描画
    this.element.appendChild(this.renderer.domElement);

    // tween発動
    this.tween();
  }

  // オブジェクトの初期化
  Triangle.prototype.initObject = function(){
    // マテリアル・テクスチャ
    var material =  new THREE.MeshLambertMaterial({
      color: 0x76faff
    });
    material.side = THREE.DoubleSide; //裏面も見えるようにする

    // triangle1
    this.triangle1.moveTo(-20,90);
    this.triangle1.lineTo(-50,-80);
    this.triangle1.lineTo(50,50);
    this.triangle1.lineTo(-20,90); //始点に戻る
    this.triangle1 = new THREE.ShapeGeometry(this.triangle1);
    this.triangle1 =  new THREE.Mesh(this.triangle1, material);
    this.triangle1.rotation.set(0, Math.PI*3, 0);

    // group1: 右中央ちょい下くらいに置く
    this.group1.add(this.triangle1);
    this.group1.position.x = -500;
    this.group1.position.y = this.height*0.5;
    this.group1.position.z = 0;
    this.group1.scale.set(2.7,2.7,2.7);

    // シーンにグループを追加
    this.scene.add(this.group1);
  }

  // ライトの初期化
  Triangle.prototype.initLight = function(){
    this.light0.color.multiplyScalar(0.9);

    this.light1.position.set(50,300,-50);
    this.light2.position.set(-50,300,50);

    // シーンにライトを追加
    this.scene.add(this.light0);
    this.scene.add(this.light1);
    this.scene.add(this.light2);
  }

  // レンダリング
  // this.animation()から呼ぶ
  Triangle.prototype.render = function(){
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  // アニメーション
  Triangle.prototype.animation = function(){
    if (this.rotateFlag === true) {
      this.rotateDeg += 0.002; //くるくるの速度
      var rotateRadian = this.rotateDeg * Math.PI / 180;

      this.triangle1.rotation.y = Math.sin(rotateRadian) * 10;
    }

    // 再レンダリング
    this.render();

    // tweenをアップデート
    TWEEN.update();

    // フレームごとに再描画
    // animation()の中で使うthisをbindで固定する
    requestAnimationFrame(this.animation.bind(this));
  }

  // Tween(初回アニメーション)
  Triangle.prototype.tween = function(){
    var self = this;

    TWEEN.removeAll();

    // 三角形を回転
    new TWEEN.Tween(self.triangle1.rotation)
      .to({
        y: 0
      }, 2500)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onComplete(function(){
        self.rotateFlag = true; //無限回転アニメーションを開始する
      })
      .start();

    // グループをスライドダウン
    new TWEEN.Tween(self.group1.position)
      .to({
        y: self.height*-0.035
      }, 2500)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  // リサイズ
  Triangle.prototype.resize = function(){
    // bindでthisを束縛
    // Trignale.prototype内の値を
    // $(window).on('resize',function(){})内からthis.hogeで参照できる
    $(window).on('resize', function(){
      // Trignale.prototype.widthとTrignale.prototype.heightを
      // リサイズごとに上書きする
      this.width = $(window).width();
      this.height = $(window).height();

      // カメラ位置
      this.camera.aspect = this.width/this.height;
      var cameraZ = -(this.height / 2) / Math.tan( (this.camera.fov * Math.PI/180) / 2 );
      this.camera.position.z = cameraZ;
      this.camera.updateProjectionMatrix();

      // groupの位置
      this.group1.position.y = this.height*-0.035;

      // レンダラのサイズ
      this.renderer.setSize(this.width, this.height);
    }.bind(this));
  }


  // triangleという名前のTriangle関数のインスタンスを作成
  // 引数に設定したcanvasElementが、Triangle関数のthis.elementに入る
  // canvasElementは、require元のCanvas.jsxで指定したDOMが入る
  var triangle = new Triangle(canvasElement);

  // triangleの初期化
  triangle.init();

  // アニメーション
  triangle.animation();

  // リサイズ
  triangle.resize();
};