//----エンティティ関連の関数 ----------------------------------------------
function updatePosition(entity) {
  entity.x += entity.vx;
  entity.y += entity.vy;
}
   //プレイヤーエンティティ＿画像
  function preload(){
    img = loadImage('./kinoko1.png');    //画像の読み込み
    img2 = loadImage('./crow.png');
    img3 = loadImage('./background.jpg');
    img4 = loadImage('./star.png');
    img5 = loadImage('./kinoko2.png');
    img6 = loadImage('./kinoko3.png');
    img7 = loadImage('./star2.png');
    img8 = loadImage('./crow2.png');
    img9 = loadImage('./crow3.png');


    im = img;
  }




  //starの作成
  function createStar(y) {
    return {
      x: 900,
      y,
      vx: -2,
      vy: -1.5,
    };
  }
  function drawStar(entity){
    image(img4, entity.x, entity.y,90,90)
  }
  function drawStar2(entity) {
    image(img7, entity.x, entity.y,90,90)
  }






  function starIsAlive(entity) {
    // スターの位置が生存圏内なら true を返す。
    // -100 は適当な値（ブロックが見えなくなる位置であればよい）
    return -100 < entity.x;
  }


/** スターを作成し、`stars` に追加する */
function addStarPair() {
  let yy = random(-200, 400);
  stars.push(createStar(yy +300));
}
function addStar2Pair() {
  let yy = random(-200, 400);
  stars2.push(createStar(yy + 300));
}




function createPlayer() {
  return {
    x: 200,
    y: 300,
    vx: 0,
    vy: 0,
  };
}




function applyGravity(entity) {
  entity.vy += 0.15;
}




function applyJump(entity) {
  entity.vy = -5;
}




function drawPlayer(entity) {
  noStroke();
  if(gameState === "play"){
    if (im == img){
      size = 60;
    }
    else if (im == img5){
      size = 100;
    }
    else if (im == img6){
      size = 140;
    }
    image(im, entity.x, entity.y, size,size);
  }
}








function playerIsAlive(entity) {
  // プレイヤーの位置が生存圏内なら true を返す。
  // 600 は画面の下端
  return  entity.y < 600;
}




// ブロックエンティティ用
function createBlock(y) {
  return {
    x: 900,
    y,
    vx: -2,
    vy: -0.5,
  };
}




function drawBlock(entity){
  image(img2, entity.x, entity.y,90,60)
}
function drawBlock2(entity){
  image(img8, entity.x, entity.y,90,60)
}
function drawBlock3(entity){
  image(img9, entity.x, entity.y,90,60)
}




function blockIsAlive(entity) {
  // ブロックの位置が生存圏内なら true を返す。
  // -100 は適当な値（ブロックが見えなくなる位置であればよい）
  return -100 < entity.x;
}








// 複数のエンティティを処理する関数




/**
 * 2つのエンティティが衝突しているかどうかをチェックする
 *
 * @param entityA 衝突しているかどうかを確認したいエンティティ
 * @param entityB 同上
 * @param collisionXDistance 衝突しないギリギリのx距離
 * @param collisionYDistance 衝突しないギリギリのy距離
 * @returns 衝突していたら `true` そうでなければ `false` を返す
 */
function entitiesAreColliding(
  entityA,
  entityB,
  collisionXDistance,
  collisionYDistance
) {
  // xとy、いずれかの距離が十分開いていたら、衝突していないので false を返す




  let currentXDistance = abs(entityA.x - entityB.x); // 現在のx距離
  if (collisionXDistance <= currentXDistance) return false;




  let currentYDistance = abs(entityA.y - entityB.y); // 現在のy距離
  if (collisionYDistance <= currentYDistance) return false;




  return true; // ここまで来たら、x方向でもy方向でも重なっているので true
}




//----ゲーム全体に関わる部分 ----------------------------------------------
let img;//kinoko
let img5;//kinoko2
let img6;//kinoko3


let img2;//crow
let img3;//background
let im;


let size;


let img4;//star
let img7;//star2
let img8;//crow2
let img9;//crow3
let player;








/**let player = {
  x: 200, // 位置 x座標
  y: 350, // 位置 y座標
  vx: 0,  // 速度 x成分
  vy: 0,   // 速度 y成分
};//let:中身書き換えてもいい変数*/




let blocks;
let blocks2;
let blocks3;


let stars;
let stars2;


let record;
let i;
let re;
let max = 0;//max record


let dis;//障害物の登場頻度（距離と連動）
 /** ゲームの状態。"play" か "gameover" を入れるものとする */
let gameState;




/** ボタン作成 */
function createButtons(){
  if(gameState === "gameover"){
   
   
    //stroke(0);
    //strokeWeight(10);
    let c1;
    let c2;
    let c3;
    let c4;
    let c5;
    let c6;
   
   
    noStroke();
    fill(255);
   
   
    rect(400, 280, 280, 50); // トライアゲインボタン生成
    rect(400, 355, 280, 50); // スタート画面に戻るボタン生成


    fill(0);
 
    text("TRY AGAIN", 400, 280);
    text("BACK TO TOP", 400, 355);

    
   
    textSize(40);
    textAlign(CENTER, CENTER); // 横に中央揃え & 縦にも中央揃え




    if (mouseIsPressed){
      if(mouseX >= 260 && mouseX <= 540){
        if(mouseY >= 255 && mouseY <= 305){
          pushStartButton();
        }
      }
      if(mouseX >= 260 && mouseX <= 540){
        if(mouseY >= 330 && mouseY <= 380){
          pushStartScreenButton();
        }
      }
    }


   
  }
  if(gameState === "start"){
    noStroke();
    fill(255);
    rect(400, 375, 200, 50); // スタートボタン生成
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER); // 横に中央揃え & 縦にも中央揃え
    text("START", 400, 375); // 画面中央にテキスト表示
    if (mouseIsPressed){
      if(mouseX >= 300 && mouseX <= 500){
        if(mouseY >= 350 && mouseY <= 400){
          pushStartButton();
        }
      }
    }


  }
}




/** スタートボタンが押されたら */
function pushStartButton(){
 
  // プレイヤーを作成
  player = createPlayer();
  resetGame();
  drawGame();
}




/** スタート画面ボタンが押されたら */
function pushStartScreenButton(){
  resetGame();
  gameState = "start";
  max = 0;
  drawStartScreen()
}






 /** ブロックを上下ペアで作成し、`blocks` に追加する */
function addBlockPair() {
  //let x = random(-100, 100);
  //blocks.push(createBlock(x+300));
  let y = random(-200, 400);
  blocks.push(createBlock(y+300)); // 上のブロック
  //blocks.push(createBlock(y + 600)); // 下のブロック
}
function addBlock2Pair() {
  //let x = random(-100, 100);
  //blocks.push(createBlock(x+300));
  let y = random(-200, 400);
  blocks2.push(createBlock(y+300)); // 上のブロック
  //blocks.push(createBlock(y + 600)); // 下のブロック
}
function addBlock3Pair() {
  //let x = random(-100, 100);
  //blocks.push(createBlock(x+300));
  let y = random(-200, 400);
  blocks3.push(createBlock(y+300)); // 上のブロック
  //blocks.push(createBlock(y + 600)); // 下のブロック
}


 /** ゲームオーバー画面を表示 */
function drawGameoverScreen() {
  createButtons()
  //background(0, 128, 255, 64); // 透明度 192 の黒
  fill(0);
  textSize(90);
  textAlign(CENTER, CENTER); // 横に中央揃え ＆ 縦にも中央揃え
  text("GAME OVER", width / 2, height / 5); // 画面中央にテキスト表示
  textSize(63);
  text("TAP TO TRY AGAIN...", width / 1.9, height / 3); // 画面中央にテキスト表示
}




function drawStartScreen(){
  gameState = "start";
 
  fill(0);
  //strokeWeight(10);
  //stroke(0)
  textSize(90);
  textAlign(CENTER, CENTER); // 横に中央揃え & 縦にも中央揃え
  text("キノコ育成ゲーム", width / 2, 175); // 画面中央にテキスト表示
 
  fill(255);
  rect(400, 375, 200, 50);
  createButtons();
}






 //距離の表示
function displayRecord(){
  if (gameState === "play"){
    record = Math.floor(i/45);
   
    noStroke();
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Record:" + record + "m", 100, 20);
    i += 1
    //re += 1
  }


  if(gameState === "gameover"){


    if(max <= record){
      max = record;


      let we
      let si


      if (record <= 25){
        we = 1;
        si = 45;
      }
      else if (record <= 50){
        we = 2;
        si = 60;
      }
      else if (record <= 100){
        we = 4;
        si = 80;
      }
      else if (record <= 150){
        we = 6;
        si = 80;
      }
      else{
        we = 10;
        si = 100;
      }


      strokeWeight(we);
      stroke(0);
      fill(243,225,0);
      textSize(si);
      textAlign(CENTER, CENTER);
      text("New record!!!", 405, 525);


    }
   
    i = 0;
    noStroke();
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Record:" + record + "m", 400, 440);
   
  }
}
 /** ゲームの初期化・リセット */
function resetGame() {
  ///
  // 状態をリセット
  gameState = "play";
  player = createPlayer();
  blocks = [];
  blocks2 = [];
  blocks3 = [];
  stars = [];
  stars2 = [];
 
  im = img
}




/** ゲームの更新 */
function updateGame() {
  if (gameState === "start") return;


  // ブロックの追加と削除
  let D = Math.floor(i/15)
  if (D < 50) dis = 240;
  else if (D <150) dis = 180;
  else if (D <250) dis = 100;
  else if (D <300) dis = 80;
  else if (D <400) dis = 60;
  else dis = 60;
     //starの追加と削除]
  if (im == img) {
      if (frameCount % 60 === 1) addStarPair(stars); // 一定間隔で追加
      stars = stars.filter(starIsAlive); // 生きているブロックだけ残す
      if (frameCount % dis === 1) addBlockPair(blocks); // 一定間隔で追加
      blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す
  }
  if (im == img5) {
      if (frameCount % 60 === 1) addStar2Pair(stars2); // 一定間隔で追加
      stars2 = stars2.filter(starIsAlive); // 生きているブロックだけ残す
      if (frameCount % dis === 1) addBlock2Pair(blocks2); // 一定間隔で追加
      blocks2 = blocks2.filter(blockIsAlive); // 生きているブロックだけ残す
  }
  if (im == img6) {
      if (frameCount % dis === 1) addBlock3Pair(blocks3); // 一定間隔で追加
      blocks3 = blocks3.filter(blockIsAlive); // 生きているブロックだけ残す
  }




  // 全エンティティの位置を更新
  updatePosition(player);
  for (let block of blocks) updatePosition(block);
  for (let block2 of blocks2) updatePosition(block2);
  for (let block3 of blocks3) updatePosition(block3);
 //star
  for (let star of stars) updatePosition(star);
  for (let star2 of stars2) updatePosition(star2);
  // プレイヤーに重力を適用
  applyGravity(player);
  //記録
  displayRecord();
  // プレイヤーが死んでいたらゲームオーバー
  if (!playerIsAlive(player)) gameState = "gameover";


  // 衝突判定
  for (let block of blocks) {
    if (entitiesAreColliding(player, block, size/2 + 45 - 10, size/2 + 30 - 10)) {
      if (im == img) {
        gameState = 'gameover';
      }
      }
  }
  for (let block2 of blocks2) {
    if (entitiesAreColliding(player, block2, size/2 + 45 - 10, size/2 + 30 - 10)) {
      if (im == img5) {
        im = img;
      }
    }
  }
  for (let block3 of blocks3) {
    if (entitiesAreColliding(player, block3, size/2 + 45 - 10, size/2 + 30 - 10)) {
      if(im == img6){
        im = img5;
      }
    }
  }
 
 
 
 //　kinoko1の時はstar
  for (let star of stars) {
    if (entitiesAreColliding(player, star, size/2 + 45 - 10, size/2 + 30 - 10)) {
      if (im == img) {
        im = img5;
      }
      }
    }
 // kinoko2の時はstar2
  for (let star of stars2) {
    if (entitiesAreColliding(player, star, size/2 + 45 - 10, size/2 + 30 - 10)) {
      if (im == img5) {
        im = img6;
      }
      }
    }
  }
 


/** ゲームの描画 */
function drawGame() {
  image(img3,width /2, height/ 2, width ,height)
  drawPlayer(player);
  for (let block of blocks) drawBlock(block);
  for (let block2 of blocks2) drawBlock2(block2);
  for (let block3 of blocks3) drawBlock3(block3);


  for (let star of stars) drawStar(star);
  for (let star2 of stars2) drawStar2(star2);




  //ゲームオーバーならそれ用の画面を表示
  if (gameState === "gameover") {
    drawGameoverScreen();    
  }
  if(gameState === "start") {
    drawStartScreen();
  }
}




/** マウスボタンが押されたときのゲームへの影響 */
function onMousePress() {
  switch (gameState) {
    case "play":
      // プレイ中の状態ならプレイヤーをジャンプさせる
      applyJump(player);


  }
}
//----setup/draw 他 ------------------------------------------------------




function setup() {//←起動した一回だけ、初期設定
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  imageMode(CENTER);
  //（ここに初期化処理が入る）
  resetGame();
  //プレイヤーを作成
  //player = createPlayer();
  // ブロックの配列準備
  //blocks = [];
 
  drawStartScreen(); //スタート画面表示


  i = 0




}




function draw() {
  //（ここにデータ操作処理が入る）
  updateGame();
  drawGame();




  // ブロックの追加と削除
  ///if (frameCount % 120 === 1) addBlockPair(blocks); // 一定間隔で追加
  ///blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す








  // 全エンティティの位置を更新
  ///updatePosition(player);
  ///for (let block of blocks) updatePosition(block);




  // プレイヤーに重力を適用
  ///applyGravity(player);


  // 全エンティティを描画：最終段階
  ///background(10);//これを書かないと連続した描画になる
  ///drawPlayer(player);
  ///for (let block of blocks) drawBlock(block);
  displayRecord();
}
 function mousePressed() {
  onMousePress();
}


/** 具体案　何回かチャンスを与える
 *         プレイヤーの装飾
 * 　　　　 ブロックの装飾　　
 * 　　　　　得点
 * 　　　　　デザイン
 * 　　　　　draw()の中にデザイン
 */
 /** 変更点
 * 　・色の設定（ーーをモチーフにした）
 * 　・重力の変更(落ちる速度がよりだんだん早くなるように)
 * 　・
 * 　　本当は、何回かチャンスを与えたかった（構造の理解ができなかった）
 * 　　背景の色も変えたかった（updateされ続けているからどうしよう）
 */
 /***変更点5/16
 * crowの適用
 * →最初の位置を下目に設定＋y軸の速度を0.5くらい増加させて、空飛んでる感を出した。
 * backgroundの適用
 *
 *
 * Next To Do
 * ・countの機能を作る
 * ・レベルに応じてプレイヤーの大きさや背景の速度、
 * カラスの速度を変えるため、変数？x.yとかを設定する。　if文？
 * ・ レベルアップのプログラム
 * ・web形式にしたい
 *
 * アイデア
 * ・レベル分け　（障害物の出てくるスピードを変える）
 *
 *
 * レベルアップの仕組みを聞く！
 *
 */
 /****変更点5/17
 * crowの登場頻度を距離ごとに変更できるようになった
 * →距離のカウント機能を付けた（最終的につけるかどうかは要検討、確認程度の機能のため）
 */


 /****変更点5/18
 * starの機能
 * starに当たるとレベルアップできるようになった。（kinoko to kinoko2)
 * ↳kinokoのsize、衝突判定の変数使用
 * ↳ゲームオーバー画面　reset←ココ！　開始画面
 *
 *
 * Next To Do
 * ・2回目のレベルアップの実装（画像、サイズ）  ←　できなかった
 * ・キノコの写真をイラストにする　編集
 * ・鳥にあたったときのレベルダウンの実装（衝突時）　←　できなかった
 * ・ゴールor記録
 *
 * ・ web形式にできるか
 * ・上限の設定　600以上だとgameover
 * ・starの動き
 * ・レベルアップした時の背景、鳥のスピードアップ
 * ・背景
 * ・音
 *
 *
 */
















