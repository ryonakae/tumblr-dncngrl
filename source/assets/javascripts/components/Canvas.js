'use strict';

require('jquery');
var THREE = require('three');

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

    // ライト
    this.light0 = new THREE.AmbientLight(0xffffff);
    this.light1 = new THREE.DirectionalLight(0xffffff);
    this.light2 = new THREE.DirectionalLight(0xffffff);

    // シェイプとグループ
    this.triangle1 = new THREE.Shape();
    this.triangle2 = new THREE.Shape();
    this.group1 = new THREE.Object3D();
    this.group2 = new THREE.Object3D();

    // アニメーション用の角度
    this.rotateDeg = 0;
    this.fuwaDeg = 0;
  }

  // Canvasを初期化
  Canvas.prototype.init = function(){
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

  // Canvasを描画・アニメーション
  Canvas.prototype.animation = function(){
    this.rotateDeg += 0.005;
    var rotateRadian = this.rotateDeg * Math.PI / 180;
    this.fuwaDeg += 0.3;
    var fuwaRadian = this.fuwaDeg * Math.PI / 180;

    // グループと三角形を変数に入れる
    // 即時関数の中からthis.group1などを参照できるように
    var group1 = this.group1;
    var triangle1 = this.triangle1;
    var group2 = this.group2;
    var triangle2 = this.triangle2;

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

    // レンダラの中身を一回クリアしてから再レンダリング
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    // フレームごとに再描画
    // animation()の中で使うthisをbindで固定する
    requestAnimationFrame(this.animation.bind(this));
  }

  // Canvasのリサイズ
  Canvas.prototype.resize = function(){
    // bindでthisを束縛
    // Canvas.prototype内の値を
    // $(window).on('resize',function(){})内からthis.hogeで参照できる
    $(window).on('resize', function(){
      // Canvas.prototype.widthとCanvas.prototype.heightを
      // リサイズごとに上書きする
      this.width = $(window).width();
      this.height = $(window).height();

      // カメラ位置
      this.camera.aspect = this.width/this.height;
      var cameraZ = -(this.height / 2) / Math.tan( (this.camera.fov * Math.PI/180) / 2 );
      this.camera.position.z = cameraZ;
      this.camera.updateProjectionMatrix();

      // groupの位置
      this.group1.position.y = this.height*0.3;
      this.group2.position.y = this.height*-0.45;

      // レンダラのサイズ
      this.renderer.setSize(this.width, this.height);
    }.bind(this));
  }

  // Canvasのマウスオーバー
  Canvas.prototype.mousemove = function(){
    $(window).on('mousemove', function(e){
      // window中心からの座標
      var mouseX = e.clientX - this.width/2;
      var mouseY = e.clientY - this.height/2;

      // カメラ位置
      // マウス座標と逆に動かしてパララックス効果つける
      this.camera.position.x = -(mouseX/60);
      this.camera.position.y = -(mouseY/60);
      // 回転もさせるぜ
      this.camera.rotation.x = -Math.PI + (mouseX * 0.00001);
      this.camera.rotation.y =  mouseY * 0.00001;
      this.camera.updateProjectionMatrix();
    }.bind(this));
  }


  // triangleという名前のCanvas関数のインスタンスを作成
  // 引数に設定したcanvasElementが、Canvas関数のthis.elementに入る
  var triangle = new Canvas(canvasElement);

  // triangleの初期化
  triangle.init();

  // 描画・アニメーション
  triangle.animation();

  // リサイズ
  triangle.resize();

  // マウスムーブ
  triangle.mousemove();
};