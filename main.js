/**
 * enchant.js を使う前に必要な処理。
 */
enchant();



//定数を宣言する
RECOVER_HP = 0.5;	//ステージ終了後の回復倍率
//アニメーションのフレームの配列を宣言する
//ユニット画像の向きで分ける
TO_UP_FRAME = {
		front:[12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15],
    	quarter:[4 , 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7]
};
TO_LOW_FRAME = {
		front:[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3],
		quarter:[0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]
};
TO_SIDE_FRAME = {
		front:[8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11],
		quarter:[8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11]
};

//ユニットやられ時のフレーム
SINK_FRAME = {
		front:[12, 12, null, null, 12, 12, null, null, 12, 12, null, null],
		quarter:[5, 5, null, null, 5, 5, null, null, 5, 5, null, null]
};

//デフォルトプレイヤー名
PLAYER01 = 'player01';

//ゲーム画面の高さと幅の定数を作成する
GAME_SCREEN_WIDTH = 960;
GAME_SCREEN_HEIGHT = 640;

//マス目の1辺の長さ
TIP_LENGTH = 64;
//@add 2015.0527 T.Masuda キャラの画像の高さ。幅は共通の値
HIGH_TIP_HEIGHT = 98;

//味方兵キャラチップの高さ
PLAYER_SOLDIER_HEIGHT = 393 / 4;
//敵兵キャラチップの高さ
ENEMY_SOLDIER_HEIGHT = 418 / 4;
//生体兵器(モンスター)の高さ
MONSTER_HEIGHT = 94;


//ユニットの行動順番を表示する領域の座標の定数2つ
UNITTURN_X = TIP_LENGTH * 11;
UNITTURN_Y = TIP_LENGTH * 9;

//ゲームのフレームレートを定数にする
FRAME_RATE = 30;

//行動順リストの行動待ちユニット画像の透過度
WAITING_UNIT_OPACITY = 0.5;
//行動順リストの背景の透過度
TURNBACK_OPACITY = 0.75;

//ラベルボタン関連の定数
CANCEL_LABEL = "キャンセル";	//キャンセルボタン用のテキスト
MOVE_CONFIRM_LABEL = "待機";	//待機ボタン用のテキスト
BUTTON_WIDTH = 100;	//ボタンの幅


//フォント設定
//フォントの設定データを作成する
NORMAL_FONT_STYLE = "32px 'ＭＳ ゴシック', arial, sans-serif";
//ステージデモのフォントを作成する
DEMO_FONT_STYLE = "24px 'ＭＳ Pゴシック', arial, sans-serif";
//ステージデモのフォントを作成する
MOVE_BUTTON_FONT_STYLE = "20px 'ＭＳ Pゴシック', arial, sans-serif";
//スキル仕様時メッセージのフォントを作成する
SKILL_MESSAGE_FONT = "28px 'ＭＳ Pゴシック', arial, sans-serif";
//黄色のフォントカラー
FONT_YELLOW = "rgba(255, 255, 105, 1.0)";
//白抜き文字
FONT_WHITE = "rgba(255, 255, 255, 1.0)";


//ステージデモのメッセージ1行の文字数
MESSAGE_NUMBER_PER_LINE = 10;
//ステージデモのメッセージ1行分の高さ
DEMOWINDOW_LABEL_HEIGHT = 30;
//ウィンドウのマージン
WINDOW_MARGIN = 40;
//メッセージウィンドウの顔グラフィックのサイズ
FACE_IMAGE_SIZE = 100;

//マップデータ。ステージデータのJSファイルから読み込む
MAP_DATA = MapData;


//ウィンドウロード時のイベント
window.onload = function(){
	
	//ゲームのそのもののオブジェクトを作る。この時に解像度も指定する
    var game = new Core(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
    game.fps = FRAME_RATE; //fps 一秒に何回を画面更新する
    //BGMその2
    var sndBGM            = "resources/music/openfire.mp3";
    game.preload(sndBGM);

    /**
     * 必要なファイルを相対パスで引数に指定する。 ファイルはすべて、ゲームが始まる前にロードされる。
     */
    //マップの枠の画像パスを取得する
    //@mod 2015.0527 T.Masuda 画像を差し替えました。 木テーブルと地図 → 鉄格子状壁 
    var mapFrame  = "resources/ui/frame_metaltile.jpg";
    game.preload(mapFrame);	//マップ画像をプリロードする。
    //以下同様に画像をプリロードしていく
    
    //ステージの背景画像の設定の配列
    var stageBackground = [StageData.length];
    for(var i = 0; i < StageData.length; i++){
    	stageBackground[i] = StageData[i]["stageBackground"];
    }
    //石畳ダンジョンの背景
    var stoneTile  = "resources/pipo-battlebg009.jpg";
    game.preload(stoneTile);
    //ミステリアス背景
    var mystery  = "resources/pipo-battlebg010.jpg";
    game.preload(mystery);
    
    
    //マップのマス目のスプライトシート
    //@mod 2015.0528 T.Masuda 画像パスを変更しました
//    var mapTiles  = "resources/ui/grayTiles.jpg";
//    game.preload(mapTiles);

    //@mod 2015.0528 T.Masuda 画像パスを変更しました
    var mapTiles  = "resources/ui/cyberTile.png";
    game.preload(mapTiles);
    
    //マップの移動可否のタイルの画像
    var mapUI02  = "resources/ui/coverTile.jpg";
    game.preload(mapUI02);

    //@add 2015.0529 T.Masuda 移動の可否を示すアイコンの画像を読み込む
    var mapUI01  = "resources/ui/mapui01.png";
    game.preload(mapUI01);
    

    //爆発アニメのスプライトシート
    //@mod 2015.0529 T.Masuda 爆発アニメーションを銃撃アニメーションに差し替えました。
    var explosionSpriteSheet  = "resources/animation/shot.png";
    game.preload(explosionSpriteSheet);

    //オーバーレイ用の画像
    var ui1x1Black    = "resources/1x1black.png";
    game.preload(ui1x1Black);

    //スタート画面
    var uiStartScreen   = "resources/ui/startScreen.png";
    game.preload(uiStartScreen);

    //@add 2015.0529 T,Masuda タイトルロゴ画像を追加
    var titleLogo   = "resources/ui/titleLogo.png";
    game.preload(titleLogo);
    
    //システムメッセージのウィンドウ
    var uiAlertScreen   = "resources/ui/alertScreen.png";
    game.preload(uiAlertScreen);

    //ウィンドウのスプライト
    //@mod 2015.0529 画像変更
    var uiWindowSprite    = "resources/ui/window.png";
    game.preload(uiWindowSprite);

    //コンテニューボタンのスプライト
    var uiContinueBtnSprite = "resources/ui/btnContinue.gif";
    game.preload(uiContinueBtnSprite);

    //新規開始ボタンのスプライト
    var uiNewBtnSprite = "resources/ui/btnNew.gif";
    game.preload(uiNewBtnSprite);

    //設定画面のスプライト
    var uiSettingsSprite    = "resources/ui/settings.png";
    game.preload(uiSettingsSprite);

    //キャンセルボタンのスプライト
    var uiCancelBtnSprite = "resources/ui/btnCancel.gif";
    game.preload(uiCancelBtnSprite);

    //スキルボタンのスプライト
    var uiSkillBtnSprite = "resources/ui/btnSkill.gif";
    game.preload(uiSkillBtnSprite);

    //矢印ボタンのスプライト
    var uiArrowSprite = "resources/ui/arrow.png";
    game.preload(uiArrowSprite);

    //HPバーの背景
    var uiHealthBack      = "resources/healthBack.png";
    game.preload(uiHealthBack);

    //HPバーのレッドゾーンの画像
    var uiHealthRed       = "resources/healthRed.png";
    game.preload(uiHealthRed);

    //HPバーの通常ゾーンの画像
    var uiHealthGreen     = "resources/healthGreen.png";
    game.preload(uiHealthGreen);

    //プレイヤー1のバナー
    var uiPlayerBanner1   = "resources/ui/player1.png";
    game.preload(uiPlayerBanner1);

    //プレイヤー2のバナー
    var uiPlayerBanner2   = "resources/ui/player2.png";
    game.preload(uiPlayerBanner2);

    //勝利のバナー
    //@mod 2015.0529 T.Masuda フォルダ移動しました
    var uiWin             = "resources/ui/win.png";
    game.preload(uiWin);

    //負けのバナー
    //@mod 2015.0529 T.Masuda フォルダ移動しました
    var uiLose            = "resources/ui/lose.png";
    game.preload(uiLose);

    //プレイヤー01兵のキャラチップ(スプライトシート)
    var player01 = "resources/character/player01.png";
    game.preload(player01);
    //プレイヤー02兵のキャラチップ(スプライトシート)
    var player02 = "resources/character/player02.png";
    game.preload(player02);
    //エネミー01兵のキャラチップ(スプライトシート)
    var enemy01 = "resources/character/enemy01.png";
    game.preload(enemy01);
    //エネミー02兵のキャラチップ(スプライトシート)
    var enemy02 = "resources/character/enemy02.png";
    game.preload(enemy02);
    //エネミー03兵のキャラチップ(スプライトシート)
    var enemy03 = "resources/character/enemy03.png";
    game.preload(enemy03);
    //エネミー04兵(モンスター)のキャラチップ(スプライトシート)
    var enemy04 = "resources/character/enemy04.png";
    game.preload(enemy04);
    
    /**
     * 音関連のデータをプリロードする
     */
    //BGM
//    var sndBGM            = "resources/music/highseas.mp3";
//    game.preload(sndBGM);
    

    //クリック音
    var sndClick          = "resources/sound/select.wav";
    game.preload(sndClick);

    //爆発音
    var sndExplosion      = "resources/sound/shot.wav";
    game.preload(sndExplosion);

    //射撃音
    var sndShot      = "resources/sound/shot.wav";
    game.preload(sndShot);
    
    //船の沈没音
    //@mod 2015.0530 T.Masuda やられ音更新。パス書き換え
    var sndSinkShip       = "resources/sound/defeat.mp3";
    game.preload(sndSinkShip);


    /**
     * 頻繁に使う関数群
     */
    var utils = {
    	//ユークリッド距離を算出する関数
        getEuclideanDistance: function(startI, startJ, endI, endJ) {
        	//距離を計算して返す
            var distanceSq = Math.pow(startI -endI, 2) +Math.pow(startJ -endJ, 2);
            var distance   = Math.sqrt(distanceSq);
            return distance;
        },

    	//マンハッタン距離を算出する関数
        getManhattanDistance: function(startI, startJ, endI, endJ) {
        	//距離を計算して返す
            var distance = Math.abs(startI -endI) +Math.abs(startJ -endJ);
            return distance;
        },

        //チェビシェフ距離を算出する関数
        getChebyshevDistance: function(startI, startJ, endI, endJ) {
        	//距離を計算して返す
            var distance = Math.max(Math.abs(startI -endI), Math.abs(startJ -endJ));
            return distance;
        },

        //UIを一時操作不能にするための関数
        beginUIShield: function() {
        	//すでに操作不能状態にしていなければ
            if (!utils.shieldSprite) {
            	//操作不能のベールのスプライトを作る
                var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
                //真っ黒の画像をセットする
                shieldSprite.image = game.assets[ui1x1Black];
                //透過度を0にする
                shieldSprite.opacity = 0.0;
                //一番上のレイヤーに作成したスプライトをセットする
                game.currentScene.addChild(shieldSprite);
                //utilsにこのスプライトへの参照を持たせる
                utils.shieldSprite = shieldSprite;
            }
        },

    	//一時操作不能を解除する関数
        endUIShield: function() {
        	//操作不能状態にしていれば
            if (utils.shieldSprite) {
            	//utilsに持たせた参照から操作不能のベールを消す
                utils.shieldSprite.parentNode.removeChild(utils.shieldSprite);
                //操作不能ベールの参照をnullに変える
                utils.shieldSprite = null;
            }
        },
    };

    /**
     * Map のマスの定義
     */
    //@mod 2015.0528 T.Masuda マスの定義を大幅変更
    var tileTypes = {
    		normal:  {id:0, name:"normal"},	//通常のマス
    		object: {id:1, name:"object"},	//障害物のマス
    };

    /**
     * GameMap クラスの定義
     */
    var GameMap = Class.create({
    	//コンストラクタ
        initialize: function(scene, mapData, gm) {
        	//シーンへの参照を登録する
        	this.scene = scene;
        	//GameManagerへの参照を登録する
        	this.gm = gm;
            // 枠のスプライトを作り、画像をセットする
            var frame = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            frame.image = game.assets[mapFrame];
            
            //シーンに枠のスプライトを追加する
            scene.addChild(frame);
            //GameMapクラスのインスタンスに枠のスプライトへの参照を持たせる。
            this.frame = frame;
            //以下、同様の手順でスプライトを作成していく
            
            
            // 背景
            var background = new Sprite(TIP_LENGTH*13, TIP_LENGTH*9);
            //ステージデータから背景のパスを持ってきてセットする
            background.image = game.assets[StageData[0]["stageBackground"]];
            //枠の位置を考慮した座標をセットする
            background.x = TIP_LENGTH;
            background.y = 10;
            
            scene.addChild(background);
            this.background = background;

            // マス。Mapクラスを利用してマス目状にスプライトを配置できるようにする
            var tiles = new Map(TIP_LENGTH, TIP_LENGTH);
            tiles.image = game.assets[mapTiles];
            tiles.x = TIP_LENGTH;
            tiles.y = 10;
            this.tiles = tiles;
            //マップデータをロードする
            this.setStageMap(mapData, 1);            
            scene.addChild(tiles);

            //各レイヤーのデータを作り、シーンに追加する
            // underLayer
            var underLayer = new Group();
            //タッチ不能設定
            underLayer.touchEnabled = false;
            //シーンに追加する
            scene.addChild(underLayer);
            //GameMapクラスのインスタンスに参照を持たせる
            this.underLayer = underLayer;
            //以下のレイヤー定義も同様に行う
            
            // playLayer
            var playLayer = new Group();
            playLayer.touchEnabled = false;
            scene.addChild(playLayer);
            this.playLayer = playLayer;

            // overLayer
            var overLayer = new Group();
            overLayer.touchEnabled = false;
            scene.addChild(overLayer);
            this.overLayer = overLayer;

            //GameMapクラス自身の設定を行う
            var self = this;			//自身を変数に格納する
            tiles.touchEnabled = true;	//タッチを有効にする
            //タッチイベントを登録する
            tiles.addEventListener(enchant.Event.TOUCH_END, function(params){
                self.ontouchend(params);	//タッチ後に任意のコードを実行する関数を設定する
            });

            //タッチ開始のイベント。touch_moveのイベントと合わせてフリックのイベントを定義する
            tiles.addEventListener(enchant.Event.TOUCH_START, function(params){
                self.ontouchupdate(params);	//touch_moveイベントに設定するものと共通の関数をコールする
            });
            //タッチしながら移動するイベント
            tiles.addEventListener(enchant.Event.TOUCH_MOVE, function(params){
                self.ontouchupdate(params);	//touch_moveイベントに設定するものと共通の関数をコールする
            });

            //フレーム更新時のイベント
            tiles.addEventListener(enchant.Event.ENTER_FRAME, function(params){
                self.zsort();	//zsortを行う
            })
        },

        //操作プレイヤーをセットする関数
        setController: function(controller) {
            this.controller = controller;	//GameMapに操作プレイヤーを登録する
        },

        //ワールド座標をローカル座標に変換する関数
        toLocalSpace:function(worldX, worldY) {
        	//ワールド座標からマス目の0 0番目の座標を引いてローカル座標を割り出す
            var localX = worldX -this.tiles.x;
            var localY = worldY -this.tiles.y;
            //オブジェクト形式で座標データを返す
            return {x:localX, y:localY};
        },

        //ローカル座標をワールド座標に変換する関数
        toWorldSpace:function(localX, localY) {
        	//ローカル座標にマス目の0 0番目の座標を足してワールド座標を割り出す
            var worldX = localX +this.tiles.x;
            var worldY = localY +this.tiles.y;
            //オブジェクト形式で座標データを返す
            return {x:worldX, y:worldY};
        },

        //ローカル座標からマス目を取得する関数
        getMapTileAtPosition: function(localX, localY) {
        	//ローカル座標をマス目の大きさで割ってマス目を割り出し、オブジェクトで返す
        	return {
                i: Math.floor(localX/TIP_LENGTH),
                j: Math.floor(localY/TIP_LENGTH)
            };
        },

        //マス目からローカル座標を割り出し返す関数
        getMapPositionAtTile: function(i,j) {
        	//マス目の大きさとマス目の座標をかけて座標を割り出し、オブジェクトで返す
            return {
                localX: i *TIP_LENGTH,
                localY: j *TIP_LENGTH
            };
        },

        //マス目の情報を取得して返す関数
        getTileInfo:function(id) {
        	//マス目のデータの存在チェックを行うループ
            for(t in tileTypes) {
            	//指定したIDがマス目情報の連想配列にあれば
                if (tileTypes[t].id == id) {
                    return tileTypes[t];	//該当するデータを返す
                }
            }
        },

        //GameMapの子を追加する関数
        addChild: function(object) {
        	//引数に指定したオブジェクトをGameMapに追加する
            this.playLayer.addChild(object);
        },

        //位置情報のオブジェクトを作成する関数
        positonObject: function(object, i, j) {
        	//マス目数値からローカル座標を割り出す
            var postion = this.getMapPositionAtTile(i, j);
            //ローカル座標からワールド座標を割り出す
            var worldPosition = this.toWorldSpace(postion.localX, postion.localY);

            //ワールド座標をオブジェクトに登録する
            object.x = worldPosition.x;
            object.y = worldPosition.y;

            //マス目の座標をオブジェクトに登録する
            object.i = i;
            object.j = j;
            
            //@add 2015.0526 T.Masuda スプライトの縦サイズの違いへの対応のためのコードを追加しました
            //オブジェクトにY座標補正用のメンバがあれば
            if('replaceY' in object){
            	//Y座標から補正値を引く
            	object.y -= object.replaceY;
            }
        },

        //船の座標をセットする関数
        positionFune: function(fune, i, j) {
            this.positonObject(fune, i, j);	//座標を計算してマップにセットする
            //プレイヤー1のユニットなら
            if(fune.player.id == 1){
            	//右向きに直す
            	this.changeDirection(fune, 20, fune.j);
            }
        },

        //ユニットの向きを変える関数
        changeDirection:function(fune, i, j){
        	var unit = fune.fune;		//ユニットのデータを変数に入れる
        	//前のマスの座標を得る
        	var beforeI = unit.parentNode.i;
        	var beforeJ = unit.parentNode.j;
        	
        	//@mod 2015.05.27 T.Masuda ユニットの歩行アニメ素材の形式が統一されているので
        	//全てのユニットで同じフレームを設定するようにしました。
        	//上に進むなら
        	if(beforeJ > j){
        		//@mod 2015.0526 T.Masuda フレームをユニット毎に用意するように変更したため、
        		//ユニット名でフレームリストを取得するように変更しました
        		unit.frame = TO_UP_FRAME[fune.getImageDirection()];	//ユニットのアニメのフレームを上向きのものにする
        	//下に進むなら
        	} else if(beforeJ < j){
        		//@mod 2015.0526 T.Masuda フレームをユニット毎に用意するように変更したため、
        		//ユニット名でフレームリストを取得するように変更しました
        		unit.frame = TO_LOW_FRAME[fune.getImageDirection()];	//ユニットのアニメのフレームを下向きのものにする
        	//左右に進むなら
        	} else {
        		//@mod 2015.0526 T.Masuda フレームをユニット毎に用意するように変更したため、
        		//ユニット名でフレームリストを取得するように変更しました
        		unit.frame = TO_SIDE_FRAME[fune.getImageDirection()];	//ユニットのアニメのフレームを上向きのものにする
        		//左に進むなら
        		if(beforeI > i){
        			//ユニットを逆の方向に向ける
        			unit.scaleX = -1;
        		} else {
        			//ユニットを通常の方向に向ける
        			unit.scaleX = 1;
        		}
        	}
        },

        //船の移動を行う関数
        moveFune: function(fune, path, onEnd) {
            if (path.length > 0) {	//移動するルートが消化しきられていなければ
                var nextMasu = path.shift();	//次のマスを取得し、前のマスデータを削除する
                //次のマスのx,y座標をそれぞれ変数に格納する
                var i = nextMasu.y;
                var j = nextMasu.x;
                //移動コストを算出する
                var cost = nextMasu.getCost()

                //マス目からローカル座標を割り出す
                var postion       = this.getMapPositionAtTile(i, j);
                //ローカル座標からワールド座標を割り出す
                var worldPosition = this.toWorldSpace(postion.localX, postion.localY);
                
                //ユニットの向きを変える
                this.changeDirection(fune, i, j);
                
                //船の位置をセットする
                fune.i = i;
                fune.j = j;
                
                //@add 2015.0527 T.Masuda スプライトの縦サイズの違いへの対応のためのコードを追加しました
                //オブジェクトにY座標補正用のメンバがあれば
                if('replaceY' in fune){
                	//Y座標から補正値を引く
                	worldPosition.y -= fune.replaceY;
                }

                //マップへの参照を変数にする
                var self = this;
                //アニメーションしながら船を所定の位置まで移動させる
              //@add 2015.0527 T.Masuda easingを除去しました
                fune.tl.moveTo(worldPosition.x, worldPosition.y, 10 *cost).then(function(){
                    self.moveFune(fune, path, onEnd);	//再帰し、次のマス目移動を行う
                });
            //移動しきったら
            } else {
                onEnd();	//終了時の処理を定義した関数をコールする
            }
        },

        //ユークリッド距離を取得する関数
        getEuclideanDistance: function(startI, startJ, endI, endJ) {
        	//距離を関数で算出して返す
            return utils.getEuclideanDistance(startI, startJ, endI, endJ);
        },

        //マンハッタン距離を取得する関数
        getManhattanDistance: function(startI, startJ, endI, endJ) {
        	//距離を関数で算出して返す
            return utils.getManhattanDistance(startI, startJ, endI, endJ);
        },

        //チェビシェフ距離を取得する関数
        getChebyshevDistance: function(startI, startJ, endI, endJ) {
        	//距離を関数で算出して返す
            return utils.getChebyshevDistance(startI, startJ, endI, endJ);
        },

        //マス目の座標で画面外座標指定の判定を行う関数。trueなら不正な座標判定となる
        outOfBorders: function(i, j) {
        	//座標がマイナスであれば不正
            if (i < 0) return true;
            if (j < 0) return true;
            //マス目を超える座標であれば不正
            if (i >= this.mapWidth) return true;
            if (j >= this.mapHeight) return true;

            //有効な座標ということでfalseを返す
            return false;
        },

        //操作する船を選択した後の処理の関数
        setActiveFune: function(fune) {
        	//船のオブジェクトにGameMapのインスタンスの参照を登録する
            fune.map = this;
            //GameMapのインスタンスのactiveFuneメンバに引数の船を登録する
            this.activeFune = fune;
            //船の移動可能範囲を描画する
            this.drawMovementRange()
        },

        //船の進路データを作成する関数
        getPath: function(fune, i,j, targetI, targetJ) {
            var path;	//進路データを格納する変数を宣言する
            //画面外判定を行う
            if (this.outOfBorders(targetI, targetJ)) {
            	//画面外であれば現在の座標を行き先の座標にする
                targetI = i;
                targetJ = j;
            }
            //移動タイプが中量級なら
            if (fune.moveType == "normal") {
            	//中量級の検索グラフから開始座標のデータを取得する
                var start = this.searchGraph.grid[j][i];
                //同様に目的地の座標を取得する
                var end   = this.searchGraph.grid[targetJ][targetI];
                //Aスターサーチで進路データを算出してpathに格納する
                path = astar.search(this.searchGraph, start, end);
                //以下の条件分岐も同様の処理を行う
            }
            //軽量級のパターン
            if (fune.moveType == "light") {
                var start = this.searchGraphLight.grid[j][i];
                var end   = this.searchGraphLight.grid[targetJ][targetI];
                path = astar.search(this.searchGraphLight, start, end);
            }
            //重量級のパターン
            if (fune.moveType == "heavy") {
                var start = this.searchGraphHeavy.grid[j][i];
                var end   = this.searchGraphHeavy.grid[targetJ][targetI];
                path = astar.search(this.searchGraphHeavy, start, end);
            }

            //pathのコストのオブジェクトを作り、0で初期化する
            path.cost = 0;
            //ループで移動の総コストを算出する
            for(var i=0; i<path.length;i++){
            	//コストをcostに追加していく
                path.cost += path[i].getCost();
            }
            //作成した進路データを返す
            return path;
        },

        //GameMapのタッチ終了時の処理の関数
        ontouchend:function(params) {
        	//自身にmapMakerオブジェクト(移動可能かどうかを指すマーカー)が登録されていれば
            if (this.mapMarker) {
            	//mapMakerオブジェクトを削除する
                this.overLayer.removeChild(this.mapMarker)
                delete this.mapMarker;
            }

            //タッチされた場所のローカル座標を取得する
            var localPosition = this.toLocalSpace(params.x, params.y);

            //マスの情報を取得する
            var tileData = this.tiles.checkTile(localPosition.x, localPosition.y);
            var tileInfo = this.getTileInfo(tileData);

            //あたり判定テストを行い、通れる場所なら
            if (this.tiles.hitTest(localPosition.x, localPosition.y) == true) {
            	//その場所は通れないというログを出す
                console.log("通れない", tileInfo.name, "world X", params.x, "localX", localPosition.x, "worldY", params.y, "localY", localPosition.y)
            //通れる場所なら
            } else {
            	//通れるログを出す
                console.log("通れる", tileInfo.name, "world X", params.x, "localX", localPosition.x, "worldY", params.y, "localY", localPosition.y)

                //マス目を取得する
                var tile = this.getMapTileAtPosition(localPosition.x, localPosition.y);
                //画面外ならキャンセルする
                if (this.outOfBorders(tile.i, tile.j)) {
                    return;
                }
                //異動先のマス目のログを出す
                console.log("i", tile.i, "j", tile.j, "distance", this.getManhattanDistance(this.activeFune.i, this.activeFune.j, tile.i, tile.j));
                //@mod 2015.0526 T.Masuda this.activeFuneへの参照が多いため、変数を使います
                var activeFune = this.activeFune;
                //マンハッタン距離で移動可能な場所であれば
                if (this.getManhattanDistance(activeFune.i, activeFune.j, tile.i, tile.j) <= activeFune.getMovement()) {
                    //進路データを取得する
                	var path = this.getPath(activeFune, activeFune.i, activeFune.j, tile.i, tile.j);
                    //進路のコストが船の移動力に収まれば移動処理を開始する
                	if (path.cost <= activeFune.getMovement()) {
                        var self = this;		//GameMapへの参照を変数に格納する
                        //@add 2015.0526 T.Masuda 座標を一時保存するようにしました
                        activeFune.prevX = activeFune.i;
                        activeFune.prevY = activeFune.j;
                        //ここまで追加しました。
                        utils.beginUIShield();	//一時的に操作不能にする
                        //船を動かす
                        self.moveFune(self.activeFune, path, function() {
                        	//@mod 2015.0526 T.Masuda endTurn関数を削除し移動後のターン終了をしないようにしました
                            //self.controller.endTurn();	//移動を終えたらターンを終了する
                            //@add 2015.0526 T.Masuda afterMove関数をコールして移動後に待機状態になるようにしました
                            self.afterMove(self);	//移動後待機状態にする
                        });
                    }
                }
            }
        },

        /*
         * 関数名:setStageMap
         * 引数  :Array mapData:マップデータの二次元配列
         * 　　　:int stageId:ステージID
         * 戻り値:なし
         * 概要  :ステージの新たなマップをセットする
         * 作成日:2015.05.28
         * 作成者:T.M
         */
        setStageMap:function(mapData, stageId){
        	//マップデータをロードする
        	this.tiles.loadData(mapData);
        	//あたり判定データをセットする。現状ではマップデータイコールとなる
        	this.tiles.collisionData = mapData;
 
            // マップを大きさを取得する
            this.mapHeight = mapData.length;	//マップの高さ
            this.mapWidth  = mapData[0].length;	//マップの幅
        	
            // 検索用のデータ。移動コストデータを格納する
            var mapSearchData = [];			//中量級の船
            var mapSearchDataLight  = [];	//軽量級の船
            var mapSearchDataHeavy  = [];	//重量級の船

            //あたり判定データ生成時と同様のループを行う
            for(var j=0; j < this.mapHeight; j++) {
            	//各配列に行データの空配列を追加する
                mapSearchData[j] = [];
                //マップデータの行を走査する
                for(var i=0; i < this.mapWidth; i++) {
                	//通行不能のマスであれば
                    if (mapData[j][i] == 1) {
                    	//各配列に0を追加する
                        mapSearchData[j].push(0);
                    //通常のマスであれば
                    } else {
                        mapSearchData[j].push(1);
                    }
                }
            }

            //Aスターサーチ用の各船重量別のグラフを作る
            this.searchGraph = new Graph(mapSearchData);
            this.searchGraphLight = new Graph(mapSearchData);
            this.searchGraphHeavy = new Graph(mapSearchData);
        	
        },
        
        /*
         * 関数名:createMoveCancelButton
         * 引数  :GameMap gameMap:ゲームのマップ
         * 戻り値:Label:移動キャンセルボタンを返す
         * 概要  :移動キャンセルのラベルボタンを作る
         * 作成日:2015.05.26
         * 作成者:T.M
         */
        createMoveCancelButton:function(gameMap){
        	//移動後のキャンセルボタンを作る
        	var moveCancelButton = new Label(CANCEL_LABEL);
        	//キャンセルボタンに高さを指定する
        	moveCancelButton.height = TIP_LENGTH;
        	//キャンセルボタンに幅を指定する
        	moveCancelButton.width = BUTTON_WIDTH;
        	//キャンセルボタンを画面に追加する
        	gameMap.scene.addChild(moveCancelButton);
        	//ゲームマップにキャンセルボタンへの参照を登録する
        	gameMap.moveCancelButton = moveCancelButton;
        	//フォントを設定する
        	moveCancelButton.font = MOVE_BUTTON_FONT_STYLE;
        	moveCancelButton.color = FONT_WHITE;
        	
        	return moveCancelButton;	//作成したボタンを返す
        },
        
        /*
         * 関数名:createMoveConfirmButton
         * 引数  :GameMap gameMap:ゲームのマップ
         * 戻り値:Label:待機のラベルボタンをを返す
         * 概要  :待機のラベルボタンを作る
         * 作成日:2015.05.26
         * 作成者:T.M
         */
        createMoveConfirmButton:function(gameMap){
        	//移動後のキャンセルボタンを作る
        	var moveConfirmButton = new Label(MOVE_CONFIRM_LABEL);
        	//待機ボタンに高さを指定する
        	moveConfirmButton.height = TIP_LENGTH;
        	//待機ボタンに幅を指定する
        	moveConfirmButton.width = BUTTON_WIDTH;
        	//待待機ボタンを画面に追加する
        	gameMap.scene.addChild(moveConfirmButton);
        	//ゲームマップに待機ボタンへの参照を登録する
        	gameMap.moveConfirmButton = moveConfirmButton;
        	//フォントの色を設定する
        	moveConfirmButton.font = MOVE_BUTTON_FONT_STYLE;
        	moveConfirmButton.color = FONT_WHITE;

        	return moveConfirmButton;	//作成したボタンを返す
        },
        
        /*
         * 関数名:removeMoveButtons
         * 引数  :GameMap gameMap:ゲームのマップ
         * 概要  :待機ボタン、キャンセルボタンを消す
         * 戻り値:なし
         * 作成日:2015.05.26
         * 作成者:T.M
         */
        removeMoveButtons:function(gameMap){
        	//待機、キャンセルボタンがあれば
        	if('moveCancelButton' in gameMap||'moveConfirmButton' in gameMap){
    		//キャンセルボタン、待機ボタンを削除する
    		gameMap.scene.removeChild(gameMap.moveCancelButton);
    		gameMap.scene.removeChild(gameMap.moveConfirmButton);
    		//ゲームマップに保存した参照も削除する
    		gameMap.moveCancelButton = null;
    		gameMap.moveConfirmButton = null;
        	}
        },
        
        /*
         * 関数名:afterMove
         * 引数  :GameMap gameMap:ゲームのマップ
         * 概要  :移動後の待機状態を整える
         * 作成日:2015.05.26
         * 作成者:T.M
         */
        afterMove:function(gameMap){
        	//アクティブなユニットを取得する
        	var unit = gameMap.activeFune;
        	//移動を終えたユニットの移動力を一時的に0にする
        	unit.stats.movement = 0;
    		//ユニットの座標を確定させる
            gameMap.positonObject(unit, unit.i, unit.j);
        	//移動後のキャンセルボタンを作る
        	var moveCancelButton = gameMap.createMoveCancelButton(gameMap);
        	//移動後の待機ボタンを作る
        	var moveConfirmButton = gameMap.createMoveConfirmButton(gameMap);
        	
        	//ユニットの上に待機ボタンとキャンセルボタンを配置する
        	moveCancelButton.x = unit.x;
        	moveCancelButton.y = unit.y - TIP_LENGTH / 3 + 3;
        	moveConfirmButton.x = unit.x; 
        	moveConfirmButton.y = unit.y - TIP_LENGTH * 2  / 3 + 3;
        	
        	//キャンセルボタンのイベントを登録する
        	moveCancelButton.ontouchend = function(){
        		//ユニットを前の座標に戻す
                gameMap.positonObject(unit, unit.prevX, unit.prevY);
        		
        		//ユニットの移動力を戻す
        		unit.stats.movement = unit.getMovementReserved();
        		//ユニットの移動可能範囲を描画する
        		gameMap.drawMovementRange();
        		//ボタンを消す
        		gameMap.removeMoveButtons(gameMap);
        	};
        	
        	//待機ボタンのイベントを登録する
        	moveConfirmButton.ontouchend = function(){
        		//ユニットの移動力を戻す
        		unit.stats.movement = unit.getMovementReserved();
        		//ボタンを消す
        		gameMap.removeMoveButtons(gameMap);
        		utils.beginUIShield();	//ターンが切り替わるまで操作できないようにする
        		
        		//ターンを終える
        		gameMap.controller.endTurn();
        	};
        	
        	//ターンを開始する
        	gameMap.controller.startTurn();
        },

        /*
         * 関数名:mapMarkerValid
         * 引数  :Sprite marker:マップマーカー
         * 概要  :マップマーカーの表示を通行可能のほうに切り替える
         * 作成日:2015.05.28
         * 作成者:T.M
         */
        mapMarkerValid:function(marker){
        	marker.frame = 0;	//マーカーをチェックアイコンに切り替える
            // マップマーカーの画像が変わってから表示する。
            marker.opacity = 1;
        },
        
        /*
         * 関数名:mapMarkeriInvalid
         * 引数  :Sprite marker:マップマーカー
         * 概要  :マップマーカーの表示を通行不可能のほうに切り替える
         * 作成日:2015.05.28
         * 作成者:T.M
         */
        mapMarkerInvalid:function(marker){
        	marker.frame = 1;	//マーカーを×にする
            // マップマーカーの画像が変わってから表示する。
        	marker.opacity = 1;
        },
        //スワイプ中の処理の関数
        ontouchupdate: function(params) {
        	//ローカル座標を取得し、そこからマス目を取得する
            var localPosition = this.toLocalSpace(params.x, params.y);
            var tile = this.getMapTileAtPosition(localPosition.x, localPosition.y);
            //画面外なら処理を終える
            if (this.outOfBorders(tile.i, tile.j)) {
                return
            }

            //移動可能判定のマークがでていなければ
            if (this.mapMarker == undefined) {
            	//マークを作り、overLayeに追加する
                this.mapMarker = new Sprite(TIP_LENGTH, TIP_LENGTH);
                //@mod 2015.0529 T.Masuda マップマーカーの画像を変えました。
                this.mapMarker.image = game.assets[mapUI01];
                //@add 2015.0529 T.Masuda マップマーカー生成時は隠しておく。
                this.mapMarker.opacity = 0;
                //座標をセットする
                this.positonObject(this.mapMarker, tile.i, tile.j);
                this.overLayer.addChild(this.mapMarker);
            //すでにあれば
            } else {
            	//座標のみ更新する
                this.positonObject(this.mapMarker, tile.i, tile.j);
            }

            //通行不能の場所をさしていると
            if (this.tiles.hitTest(localPosition.x, localPosition.y) == true) {
            	this.mapMarkerInvalid(this.mapMarker);     	//マップマーカーをNGのものにする               
            //通行可能な場所である
            } else {
            	//移動可能な場所なら
                if (this.getManhattanDistance(this.activeFune.i, this.activeFune.j, tile.i, tile.j) <= this.activeFune.getMovement()) {
                    var path = this.getPath(this.activeFune, this.activeFune.i, this.activeFune.j, tile.i, tile.j);
            //@mod 2015.0529 T.Masuda マップマーカーのアイコンを切り替えるコードを関数にしました。
                    //移動コストが足りていれば
                    if (path.cost <= this.activeFune.getMovement()) {
                    	this.mapMarkerValid(this.mapMarker);     	//マップマーカーをOKのものにする               
                    //足りていなければ
                    } else {
                    	this.mapMarkerInvalid(this.mapMarker);     	//マップマーカーをNGのものにする               
                    }
                //移動できない場所なら
                } else {
                	this.mapMarkerInvalid(this.mapMarker);     	//マップマーカーをNGのものにする               
            //ここまで変更しました
                }
            }
        },

        //移動可能な場所の領域を書き出す関数
        drawMovementRange: function() {
        	//移動可能領域のレイヤーがあれば
            if (this.areaRangeLayer) {
            	//それを消す
                this.underLayer.removeChild(this.areaRangeLayer);
                delete this.areaRangeLayer;
            }

            //新たに生成する
            this.areaRangeLayer = new Group();
            this.underLayer.addChild(this.areaRangeLayer);

            //開くのみかの判定をfalseにする
            var openOnly = false;
            //移動可能場所のリストを作る
            var moveList = this.getMovementRange(this.activeFune, openOnly);
            //ループで移動可能領域の描画を行う
            for (var positionIndex = 0; positionIndex < moveList.length; ++positionIndex) {
            	//次に走査する場所を変数に格納する
                var nextPostion = moveList[positionIndex];

                //マスに重ねるスプライトを生成する
                var areaSprite = new Sprite(TIP_LENGTH, TIP_LENGTH);
                //タッチイベントを起こさないようにする
                areaSprite.touchEnabled = false;
                //画像をセットする
                areaSprite.image = game.assets[mapUI02];
                //透過する
                areaSprite.opacity = 0.35;
                //移動可能の場所なら
                if (nextPostion.open) {
                	//frameオブジェクトを0にする
                    areaSprite.frame = 0;
                //そうでなければ
                } else {
                	//frameオブジェクトを1にする
                    areaSprite.frame = 1;
                }
                //位置情報を登録する
                this.positonObject(areaSprite, nextPostion.i, nextPostion.j);
                //レイヤーにスプライトを追加する
                this.areaRangeLayer.addChild(areaSprite);

            }
        },

        //移動可能領域の取得処理を行う
        getMovementRange: function(fune, openOnly) {
        	//船一覧を取得する
            var funeList = this.controller.getFuneList();
            //移動リストを作成する
            var moveList = [];

            //ループで移動可能領域のデータを作成する
            for (var rangeI = -fune.getMovement(); rangeI <= fune.getMovement(); rangeI++) {
                var targetI = fune.i +rangeI;	//縦の描画範囲の座標を取得する
                //行を走査する
                for (var rangeJ = -fune.getMovement(); rangeJ <= fune.getMovement(); rangeJ++) {
                    //横の判定座標をセットする
                	var targetJ = fune.j +rangeJ;

                	//画面外でなければ
                    if (!this.outOfBorders(targetI, targetJ)) {
                        //マンハッタン距離で移動可能な場所なら
                    	if (this.getManhattanDistance(fune.i, fune.j, targetI, targetJ) <= fune.getMovement()) {
                            //移動経路データを取得する
                    		var path = this.getPath(fune, fune.i, fune.j, targetI, targetJ);
                            //コストが足りていれば
                    		if (path.cost <= fune.getMovement()) {
                                //一データを取得する
                    			var position = this.getMapPositionAtTile(targetI, targetJ);
                                //このマスが有効であることに、まずはする
                    			var isOpen = true;
                    			//通れない場所なら
                                if (this.tiles.hitTest(position.localX, position.localY) == true) {
                                    isOpen = false;	//マスを無効にする
                                //通れる場所なら
                                } else {
                                	//他の船との重なり判定をループで行う
                                    for (var i=0; i < funeList.length; i++) {
                                        var otherFune = funeList[i];	//他の船の情報を取得する
                                        //位置が重なっていたら
                                        if (targetI == otherFune.i && targetJ == otherFune.j) {
                                            isOpen = false;	//無効にする
                                        }
                                    }
                                }
                                //無効であったら
                                if (isOpen == false) {
                                	//openOnlyをfalseにする
                                    if (openOnly == false) {
                                    	//無効な位置にとしてデータを追加する
                                        moveList.push({i:targetI, j:targetJ, open:false});
                                    }
                                //有効であったら
                                } else {
                                	//有効な位置としてデータを追加する
                                    moveList.push({i:targetI, j:targetJ, open:true});
                                }
                            }
                        }
                    }
                }
            }

            //移動可能判定リストを返す
            return moveList;
        },

        //重なり順のソートを行う関数
        zsort: function() {
            var zorder = [];
            for (var c=0; c < this.playLayer.childNodes.length; ++c) {
                zorder.push(this.playLayer.childNodes[c]);
            }
            zorder.sort(function(a, b) {
                if (a.y > b.y) {
                    return 1;
                } else if (a.y == b.y) {
                    if (a.x > b.x) {
                        return 1;
                    } else if (a.x == b.x) {
                        return 0;
                    } else {
                        return -1;
                    }
                } else {
                    return -1;
                }
            });
            for (var i=0; i < zorder.length; ++i) {
                this.playLayer.addChild(zorder[i]);
            }
        },
        
        //ユニットの行動順を表示する関数
        showUnitTurn:function(units, x, y){
        	//初めて呼ばれたら
        	if(this.turnBack === void(0)){
        		//行動順表示領域のスプライトを作る
        		var turnBack = new Sprite(TIP_LENGTH * units, TIP_LENGTH);
        		//この関数の引数で指定された座標をこのスプライトの座標に設定する
        		turnBack.x = x;
        		turnBack.y = y;
        		//真っ黒にしないために、透過する
        		turnBack.opacity = TURNBACK_OPACITY;
        		//画像をセットする
        		turnBack.image = game.assets[ui1x1Black];
        		//画面に作成したスプライトを追加する
        		this.scene.addChild(turnBack);
        		this.turnBack = turnBack;	//このスプライトへの参照をマップに保存する
        	}
        	
        	//行動順リストを走査する
        	for(var i = 0; i < units; i++){
        		var unitIndex = 'unit' + i;	//オブジェクト保存用のキー名の文字列を作る
        		//シーンから前に作ったユニットのスプライトを削除する
        		this.scene.removeChild(this[unitIndex]);
        		//ユニットのスプライトへの参照を保存しているキーの値をnullにする
        		this[unitIndex] = null;
        		//表示するユニットの行動準リスト内での番号を取得する
        		var currentUnit = this.gm.activeUnit + i;
        		//行動順リストを取得する
        		var turnList = this.gm.turnList;
        		//行動順リストの要素数を取得する
        		var turnListLength = turnList.length;
        		//currentUnitが行動順リストの最後の番号を超えている
        		if(currentUnit >= turnListLength){
        			//番号をリストの最初からにする
        			currentUnit -= turnListLength;
        		}
        		//ユニットの順番表示用のスプライトを作る
        		var unitTurn = new Sprite(TIP_LENGTH, TIP_LENGTH);
        		//順番リストからユニットを取得する
        		var unit = turnList[currentUnit]['unit'];
        		var image = unit.fune.image;		//ユニットの画像を取得する
        		unitTurn.image = image;				//ユニットの画像を順番領域のユニットスプライトにセットする
        		unitTurn.frame = 0;					//アニメーションのフレームをセットする
        		
        		//現在行動ターンではないユニットのスプライトであれば
        		if(i != 0){
        			unitTurn.opacity = WAITING_UNIT_OPACITY;	//少し透過する
        		}
        		
        		//プレイヤー1のユニットでなければ
        		if(unit.player.id != 1){
        			unitTurn.scaleX = -1;	//向きを反転させる
        		}
        		
        		//スプライトの座標をセットする
        		unitTurn.x = x + TIP_LENGTH * i;
        		unitTurn.y = y;
        		
        		this.scene.addChild(unitTurn);	//作成したスプライトを画面に追加する
        		//作成したユニットのスプライトへの参照をマップのオブジェクトに追加する
        		this[unitIndex] = unitTurn;
        	}
        }
    });


    /**
     * 基本船のクラス
     */
    var BaseFune = Class.create(Group, {	//Groupクラスを継承する
    	//初期化を行う。ステータスデータ、船IDを引数にする
        initialize: function(id, stats) {
            Group.call(this);	//スーパークラスのコンストラクタを実行する

            var fune = new Sprite(TIP_LENGTH, TIP_LENGTH);	//スプライトを作成する
            this.fune = fune;				//自身の参照を持たせる
            
            //アニメーション用のフレームをセットする
            fune.frame = [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 3, 3, 3];
            fune.frame = [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 3, 3, 3];
            fune.sinkFrame = [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, null];
            
            //@add 2015.0526 T.Masuda 移動前の座標を保存するメンバを追加しました。
            this.prevX;
            this.prevY;
            
            this.addChild(fune);	//作成した船データを追加する

            //HPバーを作成する
            var healthBackSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthBackSprite  = healthBackSprite;
            healthBackSprite.image = game.assets[uiHealthBack];
            healthBackSprite.y     = TIP_LENGTH -6;
            this.addChild(healthBackSprite);
            healthBackSprite.opacity = 0;
            
            var healthRedSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthRedSprite  = healthRedSprite;
            healthRedSprite.originX = 0
            healthRedSprite.image = game.assets[uiHealthRed];
            healthRedSprite.y     = TIP_LENGTH -6;
            this.addChild(healthRedSprite);
            healthRedSprite.opacity = 0;

            
            var healthGreenSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthGreenSprite  = healthGreenSprite;
            healthGreenSprite.originX = 0
            healthGreenSprite.image = game.assets[uiHealthGreen];
            healthGreenSprite.y     = TIP_LENGTH -6;
            this.addChild(healthGreenSprite);
            healthGreenSprite.opacity = 0;

            
            //ステータスを設定する
            this.stats    = {
                id:        id,
                movement:  stats.movement,
                range:     stats.range,
                attack:    stats.attack,
                defense:   stats.defense,
                hpMax:     stats.hpMax,
                speed:     stats.speed
            };
            
            //@add 2015.0526 T.Masuda 移動力を保存するようにしました
            this.movementReserved = stats.movement;
            
            //初期HPを設定する
            this.stats.hp = this.stats.hpMax;

            //移動タイプを設定する
            this.moveType   = "normal";
            //必殺技の使用フラグを未使用にしておく
            this.usedSkill  = false;
        },
        
        //getter関数群
        getId: function() {
            return this.stats.id;
        },

        /*
         * 関数名:getMovementReserved
         * 引数  :なし
         * 戻り値:なし
         * 概要  :保存された移動力を返す
         * 作成日:2015.05.26
         * 作成者:T.M
         */
        getMovementReserved: function() {
            return this.movementReserved;	//保存された移動力を返す
        },

        //移動力を取得する
        getMovement: function() {
        	return this.stats.movement;
        },
        
        getRange: function() {
            return this.stats.range;
        },

        getAttack: function() {
            return this.stats.attack;
        },

        getDefense: function() {
            return this.stats.defense;
        },

        getHPMax: function() {
            return this.stats.hpMax;
        },

        getHP: function() {
            return this.stats.hp;
        },

        //ユニットの素早さを取得する
        getSpeed: function() {
        	//素早さを取得して返す
        	return this.stats.speed;
        },
        
        getCaptainName: function() {
            return "無名";
        },

        getSkillName: function() {
            return "無名";
        },

        getImage: function() {
            return game.assets[pirateSprites[this.getId() -1]]
        },

        getChibiImage: function() {
            return game.assets[pirateChibiSprites[this.getId() -1]]
        },
        //@mod 2015.0528 T.Masuda
        //キャラ画像の向きを取得する関数を追加しました。
        getImageDirection: function(){
        	return this.imageDirection;	//キャラの向きのタイプの文字列を返す
        },
        //攻撃範囲内の判定を返す関数
        withinRange: function(i, j) {
            var distance = utils.getManhattanDistance(this.i, this.j, i, j);
            //console.log("withinRange", "distance", distance, "range", this.stats.range, distance <= this.stats.range);
            if (distance <= this.stats.range) {
                return true;
            } else {
                return false;
            }
        },
        //@add 2015.0601 T.Masuda AI用に移動後の攻撃が届くかを判定する関数を作成
        //移動後を加味した攻撃範囲内の判定を返す関数
        withinRangeWithMove: function(i, j, target) {
        	//移動地点とターゲットの距離を算出する
            var distance = utils.getManhattanDistance(i, j, target.i, target.j);
            //射程範囲なら
            if (distance <= this.stats.range) {
                return true;	//攻撃可能を返す
            //射程範囲外なら
            } else {
                return false;	//攻撃不可能を返す
            }
        },

        //HPバーの更新処理の関数
        updateHPBar: function() {
            var ratio = Math.max(this.stats.hp / this.stats.hpMax, 0);
            if (ratio > 0.5) {
                this.healthGreenSprite.scaleX = ratio;
            } else {
                this.healthGreenSprite.scaleX = 0;
            }
            this.healthRedSprite.scaleX = ratio;
        },

        //被ダメージの処理関数
        takeDamage: function(damage) {
            var actualDamage = Math.max(damage -this.stats.defense, 1);
            this.stats.hp -= actualDamage;
            this.updateHPBar();
            return this.stats.hp;
        },

        //HP回復処理の関数
        healDamage: function(recover) {
            this.stats.hp = Math.min(this.stats.hp + recover, this.stats.hpMax);
            this.updateHPBar();
        },

        //攻撃処理の関数
        attackFune: function(otherFune) {
            utils.beginUIShield();
            var damage;
            var baseDamage = this.stats.attack;
            var variance   = Math.random() -0.5;
            var variableDamage = (baseDamage /10) * variance;

            var attackRoll = Math.random();
            var isCritical = false;
            // クリティカルヒット 10%
            // ミス 10%
            if (attackRoll > 0.9) {
                // クリティカル　ダメージx2
            	//@mod 2015.0531 T.Masuda クリティカルヒットが強すぎるので下方修正しました
                damage = (baseDamage +variableDamage) *1.5;
                var isCritical = true;
            } else if (attackRoll < 0.1) {
                // ミス ダメージ 0
                damage = 0;
            } else {
                damage = baseDamage +variableDamage;
            }

            damage = Math.ceil(damage);

            if (damage > 0) {
                var beforeHp = otherFune.getHP();
                var afterHp  = otherFune.takeDamage(damage);

                var explosion = new Explosion();
                //@mod 2015 0529 T.Masuda 爆発エフェクト画像が銃撃エフェクトに変わって、画像サイズも同時に変わったため
                //ベタ書きの補正値を消しました
                explosion.x = otherFune.x;
                explosion.y = otherFune.y;
                this.player.controller.sndManager.playFX(sndShot);
                game.currentScene.addChild(explosion);

                if (isCritical) {
                	var self = this;
                	//攻撃演出から1秒まつ
                    setTimeout(function(){
	                	var alertWindow = new AlertWindow("クリティカル！", self.player.controller);
	                    alertWindow.onTouch = function() {
	                        if (afterHp <= 0) {
	                            var alertWindow = new AlertWindow("戦闘不能", self.player.controller);
	                            alertWindow.onTouch = function() {
	                                otherFune.sinkShip();
	                                self.player.controller.endTurn();
	                            }
	                        } else {
	                            self.player.controller.endTurn();
	                        }
	                    }
                    },1000);
                } else {
                    if (afterHp <= 0) {
                    	var self = this;
                    	//攻撃演出から1秒まつ
                        setTimeout(function(){
	                        var alertWindow = new AlertWindow("戦闘不能", self.player.controller);
	                        alertWindow.onTouch = function() {
	                            otherFune.sinkShip();
	                            self.player.controller.endTurn();
	                        }
                        }, 1000);
                    
                    } else {
                        this.player.controller.endTurn();
                    }
               }
            } else {
                var alertWindow = new AlertWindow("ミス！", this.player.controller);
                var self = this;
                alertWindow.onTouch = function() {
                    self.player.controller.endTurn();
                }
            }
        },

        //船タッチ処理の関数
        ontouchend: function(params) {
        	//アクティブプレイヤーの船が対象なら
            if (this.player.isActive()) {
            	//@mod 2015.0525 T.Masuda 条件文削除
//                if (this.player.getActiveFune() == this) {
//              ステータスウィンドウを出す
                var popup = new FunePopup(this);
                popup.onCancel = function() {
                }
                var self = this;
                //必殺技ボタンをクリックしたイベント
                popup.onSkill = function() {
                	//@mod 2015.0525 条件式&&以下を追加しました。
                	//スキルが使える状態かつ、現在行動中のユニットなら
                    if (self.canUseSkill() && self.player.activeFune === self) {
                    	//スキルを発動する
                        self.activateSkill(function() {
                        	//コールバック関数。ターンを終える
                            self.player.controller.endTurn();
                        })
                    }
                }
            //@mod 2015.0525 T.Masuda 条件文削除
//            else {
//                    this.player.setActiveFune(this);
//                }
            //相手の船なら攻撃処理を行う
            } else {
                var activePlayer = this.player.controller.getActivePlayer();
                var activeFune   = activePlayer.getActiveFune();
                if (activeFune.withinRange(this.i, this.j)) {
                    activeFune.attackFune(this);
                } else {
                	//@mod 2015.0525 T.Masuda メッセージを変更しました
                    new AlertWindow("攻撃の範囲外です。", this.player.controller);
                }
            }
        },

        //必殺技の発動を行う関数
        activateSkill: function(onEnd) {
            utils.beginUIShield();
            this.usedSkill = true;
            //@mod 2015.0527 T.Masuda 発動時にキャラを出さないようにしました
//            var pirateChibi = new Sprite(512, 512);
//            pirateChibi.image = this.getChibiImage();
//            pirateChibi.opacity = 0;
//            if (this.scaleX > 0) {
//                pirateChibi.x = -50;
//            } else {
//                pirateChibi.x = GAME_SCREEN_WIDTH -512 +50;
//            }
            //@mod 2015.0530 T.Masuda 改行対策として自作クラスdemoWindowを使うようにしました
            var alertWindow = new DemoWindow(this.getSkillName(), this.player.controller, '', SKILL_MESSAGE_FONT);
            //@mod 2015.0527 T.Masuda 発動時にキャラを出さないようにしました
//            alertWindow.addChild(pirateChibi, alertWindow.firstChild);
//            pirateChibi.tl.fadeIn(10);
            var self = this;
            alertWindow.onTouch = function() {
                self.processSkill(onEnd);
            }
        },

        //必殺技を使った後の処理の関数
        processSkill: function(onEnd) {
            onEnd();
        },

        //必殺技の使用フラグを可能に戻す関数
        refreshSkill: function() {
            this.usedSkill = false;
        },

        //必殺技が使えるかどうかを調べる関数
        canUseSkill: function() {
            return this.usedSkill == false;
        },

        //船の沈没処理の関数
        sinkShip: function() {
            this.counter = 1;	//アニメーションフレームのカウンター
            //やられ時のアニメーションフレームをセットする
            this.fune.frame = this.fune.sinkFrame;

            //@add 2015.0531 T.Masuda ステージクリア時の残存兵力処理のための記述を追加
            //残った兵士は静かに消えるように変更
            //リーダーが生存しているなら
            if(this.player.leaderLiving){
            	//やられ音を鳴らす
            	this.player.controller.sndManager.playFX(sndSinkShip);
            	//転倒させる
            	this.fune.originX = this.fune.width / 2;
            	this.fune.originY = this.fune.height -6;
            	this.fune.rotate(90);
            //リーダーやられ時の残存兵力掃除処理なら
            } else {
            	//透明にする。やられ音はならさない
            	this.fune.opacity = 0;
            }
            //ユニットのやられ処理を行う
            this.player.removeFune(this);
            
            
            this.onenterframe = function(){ // enterframe event listener
                this.counter++;
                if (this.counter == 12 ) {
                    this.parentNode.removeChild(this);
                }
            };
        }
    });

    
    //爆発アニメ
    var Explosion = Class.create(Sprite, {
        initialize: function(id, stats) {
        	//@mod 2015.0529 T.Masuda 高さ、幅の値をキャラチップ幅の定数に置き換えました
            Sprite.call(this, TIP_LENGTH, TIP_LENGTH);

            this.image = game.assets[explosionSpriteSheet];
            //@mod 2015.0529 T.Masuda アニメーションが爆発から銃撃に変わったため、アニメーションフレームを調整しました
            this.frame = [0,1,2,3,4,5,6,7, 8, 9, null];

            this.counter = 0;
        },
        onenterframe:function(){ // enterframe event listener
            this.counter++;
			//@mod 2015.0529 T.Masuda 銃撃のフレーム数に合わせてカウンターの条件の値を変えました
            if (this.counter == 10 ) {
                this.parentNode.removeChild(this);
            }
        },
    });

    /**
     * プレイヤーのクラス
     */
    //継承はなし
    var GamePlayer = Class.create({
    	//@mod 2015.0522 T.Masuda GameManagerへの参照のメンバを持つように変更しました
        initialize: function(id, data, manager) {
            this.funeList = [];	//船リストを持つ
            this.id   = id;		//プレイヤーID
            this.data = data;	//プレイヤーデータ
            this.manager = manager;
            this.funeCountInitial = 0;	//所有する船の数の初期値
            //隊長の生存フラグ
            this.leaderLiving = true;
        },

        //アクティブプレイヤーか調べる関数
        isActive: function() {
            return this.myTurn;
        },

        //アクティブプレイヤーにする関数
        setActive: function(flag) {
            this.myTurn = flag;
        },

        //データを取得する関数
        getData: function(key) {
            return this.data[key];
        },

        //データを更新する関数
        setData: function(key, value) {
            this.data[key] = value;
        },

        //コントローラの対象にする関数
        setController: function(controller) {
            this.controller = controller;
        },

        //船データを追加する関数
        addFune: function(fune) {
            fune.player = this;
            this.funeList.push(fune);
            this.funeCountInitial++;
        },

        //船データを削除する関数
        removeFune: function(fune) {
        	//@add 2015.0529 T.Masuda filter関数内でのGameManagerの参照を行うため、参照を変数に保存する
            var gm = this.manager;	
            //@mod 2015.0527 T.Masuda filter関数を使って配列を作成するようにしました
        	//行動順リストを取得する
        	var turnList = this.manager.turnList;
        	var self = this;	//コールバック関数内でのthisの参照変更への対処
            //ユニットのリストを更新するため、配列を生成する
            var newList = turnList.filter(function(v, i) {
            	//@mod 2015.05.29 T.Masuda 未行動のユニットがやられた場合の処理
            	//やられたユニットが未行動であったら
            	if(v.unit === fune && gm.activeUnit >= i){
            		gm.activeUnit--;	//行動順を1つ下げて適正にする
            	}
            	return (v.unit !== fune);	//やられたユニットを除外する
            });

            //@mod 2015.0527 T.Masuda コードの位置を変更しました。この関数の最初の行からこの位置へ移動しました。
            //delete fune.player;
            gm.turnList = newList;
            
            delete fune.player;

            var newUnitList = [];
            for (var i=0; i < this.getFuneCount(); ++i) {
                if (this.getFune(i) != fune) {
                	newUnitList.push(this.getFune(i));
                }
            }
            this.funeList = newUnitList;

            gm.turnList = newList;
            
            //@mod 2015.0527 T.Masuda コードの位置を変更しました。この関数の最初の行からこの位置へ移動しました。
            delete fune.player;
            //やられたユニットがアクティブであれば
            if (this.activeFune == fune) {
            	//ユニットのアクティブ判定をnullにする
                this.activeFune = null;
            }
        },

        //船データを取得する関数
        getFune: function(index) {
            return this.funeList[index];
        },

        //現在所有している船の数を取得する関数
        getFuneCount: function() {
            return this.funeList.length;
        },

        //船の所有数の初期値を取得する関数
        getFuneCountInitial: function() {
            return this.funeCountInitial;
        },

        //現在選択されている船を取得する関数
        getActiveFune: function() {
            if (this.activeFune) {
                return this.activeFune;
            } else {
                return this.funeList[0];
            }
        },

        //船をアクティブ状態にする関数
        setActiveFune: function(fune) {
            this.activeFune = fune;
            //@mod 2015.0526 T.Masuda updateTurn内でこの関数をコールするよう
            //変更したため、無限ループ防止目的でこのコードを外しました。
            //this.controller.updateTurn();
        },
    });

    //AIプレイヤーのクラス
    var AIPlayer = Class.create(GamePlayer, {
    	//@mod 2015.0522 T.Masuda GameManagerへの参照のメンバを持つように変更しました
        initialize: function(id, data, manager) {
            GamePlayer.call(this, id, data, manager);
            this.state = new OpeningState(this);
        },

        //状態をリセットする関数
        resetState: function() {
            this.state = new OpeningState(this);
            this.funeCountInitial = 0;
        },

        //AIに応じた操作を行う関数
        simulatePlay: function() {
            this.state = this.state.updateState();
            var action = this.state.chooseAction();

            this.setActiveFune(action.fune);

            var self = this;
            setTimeout(function() {
                switch(action.type) {
                    case "attack":
                        action.fune.attackFune(action.target);
                        break;
                    case "skill":
                        action.fune.activateSkill(function() {
                            self.controller.endTurn();
                        })
                        break;
                    case "move":
                        if (action.path && action.path.length > 0) {
                            self.controller.map.moveFune(action.fune, action.path, function() {
                            	//@mod 2015.0531 T.Masuda 移動後の攻撃の処理を追加しました
                                //周囲の敵をサーチする。敵側のユニット数をまずは取得する
                                var count = self.controller.getNonActivePlayer().getFuneCount();
                                var isAttacked = false;	//攻撃を行ったかどうかを示す変数を用意する
                                var unit = action.fune;	//現在行動中のユニットを変数に入れる
                            	//移動を終えたユニットの移動力を一時的に0にする
                            	unit.stats.movement = 0;
                            	//ユニットの座標を確定させる
                            	self.controller.map.positonObject(unit, unit.i, unit.j);
                                //敵ユニットを走査する
                                for(var i=0; i < count; i++) {
                                	//敵のユニット情報を取得する
                                    var targetFune = self.controller.getNonActivePlayer().getFune(i);
                                    //敵ユニットが射程圏内なら
                                    if (action.fune.withinRange(targetFune.i, targetFune.j)) {
                                    	//攻撃を行い、ターンを終える
                                    	action.fune.attackFune(targetFune);
                                    	isAttacked = true;	//攻撃フラグをオンにする
                                    	//敵攻撃処理を終える
                                    	break;
                                    }
                                }
                                //攻撃を行っていなければ
                                if(!isAttacked){
                                	//ターンを終える
                                	self.controller.endTurn();
                                }
                                //移動力を元に戻す
                            	unit.stats.movement = unit.getMovementReserved();
                           });
                        } else {
                            self.controller.endTurn();
                        }
                        break;
                }
            }, 1000);
        },
    });

    //ステートマシンの基底クラス
    var BaseState = Class.create({
        initialize: function(player) {
            this.player = player;
        },

        updateState: function() {
            return this;
        },

        chooseAction: function() {
            // Choose randomly
        	//@mod 2015.0531 T.masuda 取得する船をターンリストから取ってくるように変更しました
            var maxFuneIndex = this.player.getFuneCount();
           // var funeIndex    = Math.floor(Math.random() * maxFuneIndex);
            //getRandomFuneで現在のユニットを取得する
            var fune         = this.getRandomFune();

            // Use skill randomly
            if (fune.canUseSkill() && Math.random() < 0.1) {
                return {
                    type: "skill",
                    fune: fune,
                }
            }

            // Search for nearby enemies
            var count = this.player.controller.getNonActivePlayer().getFuneCount();
            for(var i=0; i < count; i++) {
                var targetFune = this.player.controller.getNonActivePlayer().getFune(i);
                if (fune.withinRange(targetFune.i, targetFune.j)) {
                    return {
                        type:   "attack",
                        fune:   fune,
                        target: targetFune,
                    }
                }
            }

            // If no actions taken then move randomly
            var openOnly = true;
            var moveList = this.player.controller.map.getMovementRange(fune, openOnly);
            var randomIndex = Math.floor(Math.random() * moveList.length);
            var targetPosition = moveList[randomIndex];

            var path     = this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j);
            return {
                type:"move",
                fune: fune,
                path: path,
            };
        },

        getRandomFune: function() {
            //@mod 2015.0529 T.Masuda ランダムでユニットを取得しないようにしました。
//            var maxFuneIndex = this.player.getFuneCount();
//            var funeIndex    = Math.floor(Math.random() * maxFuneIndex);
//            var fune         = this.player.getFune(funeIndex);
        	//行動順リストからユニットを返します
            return this.player.controller.turnList[this.player.controller.activeUnit].unit;
        },

        getTargetsWithinRange: function(fune) {
            var targets    = [];
            var otherCount = this.player.controller.getNonActivePlayer().getFuneCount();
            for(var j=0; j < otherCount; j++) {
                var targetFune = this.player.controller.getNonActivePlayer().getFune(j);
                if (fune.withinRange(targetFune.i, targetFune.j)) {
                    targets.push(targetFune);
                }
            }
            return targets;
        },

        isTargeted: function(fune) {
            var otherCount = this.player.controller.getNonActivePlayer().getFuneCount();
            for(var j=0; j < otherCount; j++) {
                var targetFune = this.player.controller.getNonActivePlayer().getFune(j);
                if (targetFune.withinRange(fune.i, fune.j)) {
                    return true;
                }
            }
            return false;
        },

        getMovePosition: function(fune, avoidEnemyRate) {
            var openOnly = true;
            var moveList = this.player.controller.map.getMovementRange(fune, openOnly);
            var moveTargetList = [];
            for (var i=0; i < moveList.length; i++) {
                var targetPosition = moveList[i];
                var otherCount = this.player.controller.getNonActivePlayer().getFuneCount();
                for(var j=0; j < otherCount; j++) {
                    var otherFune = this.player.controller.getNonActivePlayer().getFune(j);
                    if (otherFune.withinRange(targetPosition.i, targetPosition.j)) {
                        if (Math.random() < avoidEnemyRate) {
                            continue;
                        }
                    }
                    moveTargetList.push(targetPosition)
                }
            }
            return moveTargetList;
        },

        getRandomPath: function(fune, avoidEnemyRate) {
            var moveList = this.getMovePosition(fune, avoidEnemyRate);
            var pathList = [];
            for (var i=0; i < moveList.length; i++) {
                var targetPosition = moveList[i];
                var path = this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j);
                if (path.length > 0) {
                    pathList.push(path);
                }
            }

            var path = pathList[Math.floor(Math.random() * pathList.length)];
            return path;
        },

        sortPathByLength: function(pathList) {
            pathList.sort(function(a, b) {
              if (a.length < b.length)
                 return 1;
              if (a.length > b.length)
                return -1;
              return 0;
            });
            return pathList;
        },

        testSkillUseInCombat: function(fune) {
            if (fune.canUseSkill()) {
                if (fune instanceof Enemy01) {
                    // Should Captain Heal ships?
                    var count = this.player.getFuneCount();
                    var woundedCount = 0;
                    for(var j=0; j < count; j++) {
                        var woundedFune = this.player.getFune(j);
                        if (woundedFune.getHP() < (woundedFune.getHPMax() *0.7)) {
                            woundedCount++;
                        }
                    }
                    if (Math.random() <= (woundedCount/this.player.getFuneCount()) ) {
                        return {
                            type: "skill",
                            fune: fune,
                        }
                    }
                } else if (fune instanceof Player01) {
                    // Should kougeki use attack skill
                    var targetCount = 0;
                    // look for attack targets
                    var otherCount = this.player.controller.getNonActivePlayer().getFuneCount();
                    for(var j=0; j < otherCount; j++) {
                        var targetFune = this.player.controller.getNonActivePlayer().getFune(j);
                        if (fune.withinRange(targetFune.i, targetFune.j)) {
                            targetCount++;
                        }
                    }
                    if (Math.random() <= (targetCount *0.3) ) {
                        return {
                            type: "skill",
                            fune: fune,
                        }
                    }
                } else {
                    // Other skills are used randomly
                    if (Math.random() < 0.2) {
                        return {
                            type: "skill",
                            fune: fune,
                        }
                    }
                }
            }
            return;
        }
    });

    //開始時のステートマシン
    var OpeningState = Class.create(BaseState, {
        updateState: function() {
            var count = this.player.getFuneCount();
            for(var i=0; i < count; i++) {
                var fune    = this.player.getFune(i);
                var targets = this.getTargetsWithinRange(fune);
                if (targets.length > 0) {
                    console.log("AI switch from OpeningState to MidGameState");
                    return new MidGameState(this.player);
                }
            }
            console.log("AI in OpeningState");
            return this;
        },

        chooseAction: function() {
            var fune         = this.getRandomFune();

            // Skill
            if (fune instanceof Enemy01 == false) {
                if (fune.canUseSkill() && Math.random() < 0.3) {
                    console.log("AI use skill", fune.getCaptainName(), fune.getSkillName());
                    return {
                        type: "skill",
                        fune: fune,
                    }
                }
            } else {
                // Other skills are not used in Opening Phase
            }

            // If no actions taken then move randomly
            var moveList = this.getMovePosition(fune, 0.25);
            var pathList = [];
            for (var i=0; i < moveList.length; i++) {
                var targetPosition = moveList[i];
                if (targetPosition.i <= (fune.i +2) && targetPosition.j >= (fune.j -2)) {
                    pathList.push(this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j));
                }
            }
            // Longer paths first
            pathList = this.sortPathByLength(pathList);
            // Choose from the 30% longest paths
            var randomLongPathIndex = Math.floor(Math.random() *(pathList.length *0.3));
            var path = pathList[randomLongPathIndex];
            if (path == null) {
                console.log("AI no safe path");
                path = this.getRandomPath(fune, 0.0);
            }
            console.log("AI random long Move", fune.getCaptainName());
            return {
                type: "move",
                fune: fune,
                path: path,
            };
        },
    });

    //中盤(交戦開始から)のステートマシン
    var MidGameState = Class.create(BaseState, {
        updateState: function() {
            // We are losing
            if (this.player.getFuneCount() <= Math.ceil(this.player.getFuneCountInitial() /2)) {
                console.log("AI switch from MidGameState to EndGameBadState");
                return new EndGameBadState(this.player);
            }
            // We are winning
            if (this.player.controller.getNonActivePlayer().getFuneCount() <= Math.ceil(this.player.controller.getNonActivePlayer().getFuneCountInitial() /2)) {
                console.log("AI switch from MidGameState to EndGameGoodState");
                return new EndGameGoodState(this.player);
            }
            console.log("AI in MidGameState");
            return this;
        },

        chooseAction: function() {
            var count = this.player.getFuneCount();
            for(var i=0; i < count; i++) {
                var fune = this.getRandomFune();

                // skill を使う
                var skillUse = this.testSkillUseInCombat(fune);
                if (skillUse) {
                    console.log("AI use skill", fune.getCaptainName(), fune.getSkillName());
                    return skillUse;
                }

                // look for attack targets
                var targets = this.getTargetsWithinRange(fune);
                if (targets.length > 0) {
                    if (Math.random() < 0.7) {
                        var target = targets[Math.floor(Math.random() *targets.length)];
                        console.log("AI attack from", fune.getCaptainName(), "on", target.getCaptainName());
                        return {
                            type:   "attack",
                            fune:   fune,
                            target: target,
                        }
                    }
                }
                
                //wounded ships try to escape
                if (fune.getHP() < (fune.getHPMax() * 0.5) ) {
                    if (Math.random() < 0.3) {
                        if (this.isTargeted(fune)) {
                            var path = this.getRandomPath(fune, 0.9);
                            if (path) {
                                console.log("AI escaping", fune.getCaptainName());
                                return {
                                    type:"move",
                                    fune: fune,
                                    path: path,
                                }
                            }
                        }
                    }
                }
            }
            
            // If no actions taken then move randomly
            var fune = this.getRandomFune();
            
            var openOnly = true;
            var moveList = this.player.controller.map.getMovementRange(fune, openOnly);
            var attackablePosition = [];
            //敵ユニットが攻撃可能範囲にいるかを調べる
            for(var i = 0; i < this.player.controller.getNonActivePlayer().getFuneCount(); i++){
            	//敵ユニットを取得する
            	var targetUnit = this.player.controller.getNonActivePlayer().getFune(i);
				//移動可能リストを走査する 
				for(var j = 0; j < moveList.length; j++){
					//敵を攻撃可能な座標なら
					if(fune.withinRangeWithMove(moveList[j].i,moveList[j].j, targetUnit)){
						//攻撃可能座標リストに追加する
						attackablePosition.push(moveList[j]);
					}
				}
			}
            
            //経路データを格納する変数を宣言する
            var path     = null;
            //攻撃可能な座標があったら
            if(attackablePosition.length){
            	//候補からランダムに選出するための乱数を取得する
	            var randomIndex = Math.floor(Math.random() * attackablePosition.length);
	            //行き先の座標を確定する
	            var targetPosition = attackablePosition[randomIndex];
	            //経路データを取得する
	            path     = this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j);
            } else {
            	//ランダムな経路を取得する
            	path = this.getRandomPath(fune, 0.5);
            	if (path == null) {
            		console.log("AI no safe path");
            		path = this.getRandomPath(fune, 0.0);
            	}
            	console.log("AI random move", fune.getCaptainName());
            }
            //行動データを返す
            return {
            	type:"move",
            	fune: fune,
            	path: path,
            }
        },
    });

    //終盤優勢時のステートマシン
    var EndGameGoodState = Class.create(BaseState, {
        updateState: function() {
            if (this.player.getFuneCount() < this.player.controller.getNonActivePlayer().getFuneCount()) {
                console.log("AI switch from EndGameGoodState to EndGameBadState");
                return new EndGameBadState(this.player);
            }
            console.log("AI in EndGameGoodState");
            return this;
        },

        chooseAction: function() {
            var count = this.player.getFuneCount();
            //ターンがきているユニットを動かす
            var fune = this.getRandomFune();
            for(var i=0; i < count; i++) {
                // skill を使う
                var skillUse = this.testSkillUseInCombat(fune);
                if (skillUse) {
                    console.log("AI use skill", fune.getCaptainName(), fune.getSkillName());
                    return skillUse;
                }

                // look for attack targets
                var targets = this.getTargetsWithinRange(fune);
                if (targets.length > 0) {
                    if (Math.random() < 0.9) {
                        var target = targets[Math.floor(Math.random() *targets.length)];
                        console.log("AI attack from", fune.getCaptainName(), "on", target.getCaptainName());
                        return {
                            type:   "attack",
                            fune:   fune,
                            target: target,
                        }
                    }
                }
            }
            
            var openOnly = true;
            var moveList = this.player.controller.map.getMovementRange(fune, openOnly);
            var attackablePosition = [];
            //敵ユニットが攻撃可能範囲にいるかを調べる
            for(var i = 0; i < this.player.controller.getNonActivePlayer().getFuneCount(); i++){
            	//敵ユニットを取得する
            	var targetUnit = this.player.controller.getNonActivePlayer().getFune(i);
				//移動可能リストを走査する 
				for(var j = 0; j < moveList.length; j++){
					//敵を攻撃可能な座標なら
					if(fune.withinRangeWithMove(moveList[j].i,moveList[j].j, targetUnit)){
						//攻撃可能座標リストに追加する
						attackablePosition.push(moveList[j]);
					}
				}
			}
            
            //経路データを格納する変数を宣言する
            var path     = null;
            //攻撃可能な座標があったら
            if(attackablePosition.length){
            	//候補からランダムに選出するための乱数を取得する
	            var randomIndex = Math.floor(Math.random() * attackablePosition.length);
	            //行き先の座標を確定する
	            var targetPosition = attackablePosition[randomIndex];
	            //経路データを取得する
	            path     = this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j);
            } else {
            	//ランダムな経路を取得する
            	path = this.getRandomPath(fune, 0.5);
            	if (path == null) {
            		console.log("AI no safe path");
            		path = this.getRandomPath(fune, 0.0);
            	}
            	console.log("AI random move", fune.getCaptainName());
            }
            //行動データを返す
            return {
            	type:"move",
            	fune: fune,
            	path: path,
            }
        },
    });

    //終盤劣勢時のステートマシン
    var EndGameBadState = Class.create(BaseState, {
        updateState: function() {
            if (this.player.getFuneCount() > this.player.controller.getNonActivePlayer().getFuneCount()) {
                console.log("AI switch from EndGameBadState to EndGameGoodState");
                return new EndGameGoodState(this.player);
            }
            console.log("AI in EndGameBadState");
            return this;
        },

        chooseAction: function() {
            var count = this.player.getFuneCount();
            for(var i=0; i < count; i++) {
                var fune = this.getRandomFune();

                //wounded ships try to escape
                if (fune.getHP() < (fune.getHPMax() * 0.5) ) {
                    if (Math.random() < 0.5) {
                        if (this.isTargeted(fune)) {
                            var path = this.getRandomPath(fune, 0.9);
                            if (path) {
                                console.log("AI escaping", fune.getCaptainName());
                                return {
                                    type:"move",
                                    fune: fune,
                                    path: path,
                                }
                            }
                        }
                    }
                }

                // skill を使う
                var skillUse = this.testSkillUseInCombat(fune);
                if (skillUse) {
                    console.log("AI use skill", fune.getCaptainName(), fune.getSkillName());
                    return skillUse;
                }

                // look for attack targets
                var targets = this.getTargetsWithinRange(fune);
                if (targets.length > 0) {
                    if (Math.random() < 0.9) {
                        var target = targets[Math.floor(Math.random() *targets.length)];
                        console.log("AI attack from", fune.getCaptainName(), "on", target.getCaptainName());
                        return {
                            type:   "attack",
                            fune:   fune,
                            target: target,
                        }
                    }
                }
            }
            
            // If no actions taken then move randomly
            var fune = this.getRandomFune();
            var openOnly = true;
            var moveList = this.player.controller.map.getMovementRange(fune, openOnly);
            var attackablePosition = [];
            //敵ユニットが攻撃可能範囲にいるかを調べる
            for(var i = 0; i < this.player.controller.getNonActivePlayer().getFuneCount(); i++){
            	//敵ユニットを取得する
            	var targetUnit = this.player.controller.getNonActivePlayer().getFune(i);
				//移動可能リストを走査する 
				for(var j = 0; j < moveList.length; j++){
					//敵を攻撃可能な座標なら
					if(fune.withinRangeWithMove(moveList[j].i,moveList[j].j, targetUnit)){
						//攻撃可能座標リストに追加する
						attackablePosition.push(moveList[j]);
					}
				}
			}
            
            //経路データを格納する変数を宣言する
            var path     = null;
            //攻撃可能な座標があったら
            if(attackablePosition.length){
            	//候補からランダムに選出するための乱数を取得する
	            var randomIndex = Math.floor(Math.random() * attackablePosition.length);
	            //行き先の座標を確定する
	            var targetPosition = attackablePosition[randomIndex];
	            //経路データを取得する
	            path     = this.player.controller.map.getPath(fune, fune.i, fune.j, targetPosition.i, targetPosition.j);
            } else {
            	//ランダムな経路を取得する
            	path = this.getRandomPath(fune, 0.5);
            	if (path == null) {
            		console.log("AI no safe path");
            		path = this.getRandomPath(fune, 0.0);
            	}
            	console.log("AI random move", fune.getCaptainName());
            }
            //行動データを返す
            return {
            	type:"move",
            	fune: fune,
            	path: path,
            }
        },
    });


    /**
     * ゲーム管理クラス
     */
    var GameManager = Class.create({
        initialize: function() {
            this.playerList = [];	//プレイヤーリスト
            this.turnCounter = 0;	//ターン数
            this.mode = "";			//ゲームモード
            this.turnList = [];		//ターンの順番リスト
            this.activeUnit = 0;	//現在行動できるユニットの番号

            //音楽管理クラスをセットする
            this.sndManager = new SoundManager();
        },

        //プレイヤー追加関数
        addPlayer: function(player) {
            player.setController(this);
            this.playerList.push(player)
        },

        //マップデータを用意する関数
        setMap: function(map) {
            map.setController(this);
            this.map = map;
        },

        //枠上のUIを作成する関数
        setFrameUI: function(ui) {
            this.frameUI = ui;
            ui.manager = this;
        },

        //船の開始位置をセットする関数
        setStartPositions: function(startPositions) {
            this.startPositions = startPositions;
        },

        //アクティブとなっているプレイヤーを取得する関数
        getActivePlayer: function() {
        	//@mod 2015.0522 T.Masuda アクティブプレイヤーの選定基準を変更する
        	//行動順リストからアクティブプレイヤーのIDを取り出し、そこからプレイヤーリストを参照してアクティブプレイヤーを取得して返す
            return this.playerList[parseInt(this.turnList[this.activeUnit]["player"]) - 1];
        },

        //プレイヤーデータを取得する関数
        getPlayer: function(number) {
            return this.playerList[number -1];
        },

        //非アクティブのプレイヤーを取得する関数
        getNonActivePlayer: function() {
        	//@mod 2015.0522 T.Masuda 非アクティブプレイヤーの選定基準を変更する
        	//行動順リストから非アクティブプレイヤーを取り出して返す。
           return this.playerList[parseInt(this.turnList[this.activeUnit]["player"]) - 1 == 1? 0 : 1];
        },

        //プレイヤーの船リストを取得する関数
        getFuneList: function() {
            var funeList = [];
            var player1 = this.getPlayer(1);
            for(var i=0; i < player1.getFuneCount(); i++) {
                funeList.push(player1.getFune(i));
            }
            var player2 = this.getPlayer(2);
            for(var i=0; i < player2.getFuneCount(); i++) {
                funeList.push(player2.getFune(i));
            }
            return funeList;
        },

        //ストーリーモードを開始する関数
        beginCampaignGame: function(stageId) {
            this.mode = "campaign";

            var funeList;
            var saveData = $.jStorage.get("save data");
            if (saveData) {
                stageId  = saveData.stageId;
                funeList = saveData.funeList;
            }

            // プレイヤー１
            var player1 = new GamePlayer(1, {name:"プレイヤー"}, this);
            this.addPlayer(player1);

            if (funeList) {
                for(var funeIndex = 0; funeIndex < funeList.length; funeIndex++) {
                    var fune = this.unitFactory(funeList[funeIndex]);
                    player1.addFune(fune);
                }
            } else {
                // プレイヤー1に船を４つあげよう
                //@mod 2015.0526 T.Masuda ユニット構成を変更しました 
                player1.addFune(new Player01(1));
                player1.addFune(new Player02(2));
                player1.addFune(new Player02(2));
                player1.addFune(new Player02(2));
            }

            // 船の初期の位置
            var startPositions = {
                player1: [
                    {i: 0, j: 8},
                    {i: 0, j: 6},
                    {i: 1, j: 7},
                    {i: 2, j: 8}
                ],
            }
            this.setStartPositions(startPositions);

            this.placePlayerShips(player1);

            if (this.getPlayer(2) == undefined) {
                var player2 = new AIPlayer(2, {name:"エネミー"}, this);
                this.addPlayer(player2);
            }

            //ステージIDがなければステージIDを1にセットする
            stageId = stageId ? stageId: 1; 
            //ステージIDに応じたステージをセットする
            this.setupStage(stageId);
            //マップデータをロードする
            this.map.setStageMap(MAP_DATA[stageId - 1], stageId);            

            this.sndManager.playBGM();
            //@add 2015.0520 行動順リストを作る
            this.createTurnList();
            //ステージデモを開始する
            //ゲームを始める
            this.startTurn();
//            this.loadStageDemo(stageId , this);
        },

        //プレイヤーの船を配置する関数
        placePlayerShips: function(player) {
            for(var funeIndex = 0; funeIndex < player.getFuneCount(); funeIndex++) {
                var fune = player.getFune(funeIndex);
                this.map.addChild(fune);
                var startPosition
                if (player.id == 1) {
                    startPosition = this.startPositions.player1[funeIndex];
                } else {
                    startPosition = this.startPositions.player2[funeIndex];
                }
                this.map.positionFune(fune, startPosition.i, startPosition.j);
            }
        },

        //プレイヤーの船の回復処理を行う関数
        refreshPlayer: function(player) {
        	//プレイヤーが所持している船を走査する
            for(var funeIndex = 0; funeIndex < player.getFuneCount(); funeIndex++) {
                //船のデータを取得する
                var fune = player.getFune(funeIndex);
                //回復するHPを算出する。回復する割合の定数の数値をHPの最大値とかける。小数点は切り捨てる
                var recoverHp = Math.ceil(fune.getHPMax() * RECOVER_HP);
                //HPの回復処理を行う
                fune.healDamage(recoverHp);
                //必殺技を使用可能にする
                fune.refreshSkill();
            }
            player.leaderLiving = true;		//ストーリーモードの敵プレイヤー用に隊長生存フラグを立てておく
            this.placePlayerShips(player);	//ユニットを初期配置座標に戻す
            this.turnCounter = 0;			//ターン数をリセットする
            this.skipTurns = 0;				//技でスキップするターンの残数をリセットする
            if (player instanceof AIPlayer) {	//CPUプレイヤーであれば
                player.resetState();	//ステートマシンを初期段階に戻す
            }
        },

        /*
         * 関数名:changeBackground
         * 引数  :int stageId:ステージの番号
         * 戻り値:なし
         * 概要  :ステージの背景を変える
         * 作成日:2015.05.20
         * 作成者:T.M
         */
        changeBackground:function(stageId){
        	//背景スプライトの画像ソースを差し替える
        	this.map.background.image = game.assets[stageBackground[stageId]];
        },
        
        //ステージ間デモを表示する
        loadStageDemo:function(stageId, gm){
        	var demoCount = 0;	//デモシーンの番号を用意する
        	//ステージデモを開始する
        	gm.createDemoWindow(DemoData[stageId - 1],demoCount, gm);
        },
        
        //ステージデモのウィンドウを出す関数
        createDemoWindow:function(demoData, demoCount, gm){
        	//デモのウィンドウを出す
        	var demoWindow = new DemoWindow(demoData[demoCount]["message"], this, demoData[demoCount]["portrait"]);
        	demoWindow.onTouch = function(){
        		//次のデモデータがあれば
        		if(demoData[++demoCount] !== void(0)){
        			//次のデモウィンドウを出す
        			gm.createDemoWindow(demoData, demoCount, gm);
        		//このウィンドウで終わりなら
        		} else {
        			//次のステージを開始する
        			gm.startTurn();
        		}
        	}
        },
        
        //ステージデータをロードしてステージ作り上げる関数
        setupStage: function(stageId) {
            //ステージデータの参照に利用する
            var stageIndex = (stageId-1) % StageData.length;	
        	//ステージ背景画像を入れ替える
        	this.changeBackground(stageIndex);
        	
        	//ゲーム管理クラスのメンバのステージIDを更新する
            this.stageId = stageId;
            //フレームUIのデータを更新する
            this.frameUI.updateStage(stageId);

            var saveData = {
                stageId: stageId,
                funeList: [],
            };

            var player = this.getPlayer(1);
            for(var funeIndex = 0; funeIndex < player.getFuneCount(); funeIndex++) {
                var fune = player.getFune(funeIndex);
                saveData.funeList.push(fune.getId());
            }
            //セーブデータを作る
            $.jStorage.set("save data", saveData);

            //CPUプレイヤーの準備を開始する。CPUプレイヤーのデータを変数に入れる
            var player2 = this.getPlayer(2);
            player2.leaderLiving = true;	//CPUプレイヤーのリーダー生存フラグを立て直す
            //ステージデータがなくなったらステージ1からやり直すため、ステージIDをステージ数で割った余りを
            var stageData = StageData[stageIndex];	//ステージデータを取得する
            //ループでステージデータの配置を行う
            for(var i=0; i< stageData.startPositions.length; i++) {
                var entry = stageData.startPositions[i];	//敵ユニットデータをステージデータから取得する

                //factoryメソッドで、ステージデータから取得した値を使ってユニットを作成する
                var fune = this.unitFactory(entry.type);
                //ユニットの中心のX座標を指定する
                fune.originX = TIP_LENGTH / 2;
                //逆向きにする
                fune.fune.scaleX = -1;
                //CPUプレイヤーにユニットを与える
                player2.addFune(fune);
                //ユニットをマップに配置する
                this.map.addChild(fune);
                //ユニットの座標を指定する
                this.map.positionFune(fune, entry.i, entry.j);
            }
            
            return stageIndex;	//@add 2015.0525 ステージの番号を返す
        },

        //ターン開始の関数
        startTurn: function() {
            utils.endUIShield();
            var player = this.getActivePlayer();
            if (this.skipTurns) {
                if (player != this.skipper) {
                    this.skipTurns--;
                    utils.beginUIShield();
                    return this.endTurn();
                }
            }
            player.setActive(true);
            this.updateTurn();
            if (player instanceof AIPlayer) {
                utils.beginUIShield();
                player.simulatePlay();
            }
        },

        //ターン更新処理の関数
        updateTurn: function() {
        	//@mod 2015.0525 T.Masuda アクティブなユニットを決める
        	//ゲームマップ、プレイヤーのクラスインスタンスでそれぞれアクティブユニットを更新する
            this.map.setActiveFune(this.turnList[this.activeUnit]['unit']);
            this.getActivePlayer().setActiveFune(this.turnList[this.activeUnit]["unit"]);
            
            this.map.drawMovementRange();
            this.frameUI.updateTurn(this.turnCounter);
            this.frameUI.updatePlayer(this.getActivePlayer().getData("name"));
            //@mod 2015.0527 不要なサウンドと判断し、除去しました。
            //     this.sndManager.playFX(sndChangeShips);
            //@add 2015.0525 T.Masuda ユニットの行動順の表示を更新する
            this.map.showUnitTurn(3, UNITTURN_X, UNITTURN_Y);
        },

        //ターン終了の関数
        endTurn: function() {
        	//@add 2015.0529 T.Masuda activeUnitが0以下になってエラーを起こすケースへの対応
        	//activeUnitが0以下になっていたら0をセットする
        	this.activeUnit = this.activeUnit < 0? 0:this.activeUnit;
        	//@add 2015.0526 T.Masuda 移動後の行動を選択するボタンを消すコードを追加しました
        	this.map.removeMoveButtons(this.map);
    		//@add 2015.0526 T.Masuda ユニットの移動力を戻す。
    		this.map.activeFune.stats.movement = this.map.activeFune.getMovementReserved();
        	//アクティブプレイヤーを取得する
    		//@mod 2015.0529 T.Masuda バグ対応のため、アクティブプレイヤーの取得方法を変更しました。
            var player = this.getActivePlayer();
            player.setActive(false);	//アクティブプレイヤーを非アクティブ状態の設定にする

            //勝利判定を行う。勝利者がいれば勝利者となるプレイヤーのインスタンスを取得する
            var winner = this.getWinner();
            //勝利者がいれば
            if (winner) {
            	//GameManagerクラスのインスタンスを保存する
                var self = this;
                //1秒待って処理を行う
                setTimeout(function(){
                	//対戦モードなら
                    if (self.mode == "versus") {
                    	//対戦モード終了の関数をコールする
                        self.versusOver(winner);
                    //ストーリーモードなら
                    } else if (self.mode == "campaign") {
                    	//ストーリーモードのステージ終了の関数をコールする
                        self.campaignOver(winner);
                    }
                }, 1000);
            //ゲーム継続なら
            } else {
            	//ターンのカウンターを回す
                this.turnCounter++;
                //アクティブユニットのカウントを増やす
                this.activeUnit++;
                //アクティブユニットの数値をチェックする
                this.checkActiveUnitValue();
                var playerBanner = new Sprite(512, 256);
                
                var NextPlayerId = this.getActivePlayer().id;	//次のプレイヤーのIDを取得する
                //次のプレイヤーがプレイヤー1であれば
                if (NextPlayerId == 1) {
                	//プレイヤー1の旗を出す
                	playerBanner.image = game.assets[uiPlayerBanner1];
                //次のプレイヤーがプレイヤー2であれば
                } else if (NextPlayerId == 2) {
                	//プレイヤー2の旗を出す
                	playerBanner.image = game.assets[uiPlayerBanner2];
                }

                playerBanner.opacity = 0;
                playerBanner.x = 480 -256;
                playerBanner.y = 320 -128;
                game.currentScene.addChild(playerBanner);

                var self = this;
                playerBanner.tl.fadeIn(20).delay(30).fadeOut(10).then(function() {
                    self.startTurn();
                    game.currentScene.removeChild(playerBanner);
                })
            }
        },
        
        //アクティブユニットの数値をチェックする
        checkActiveUnitValue:function(){
            //行動順が一周したら
            if(this.activeUnit >= this.turnList.length){
            	this.activeUnit = 0;	//順番を0に戻す
            }
        },
        

        //ストーリーモード終了の関数
        campaignOver: function(winner) {
            var touchable = new ShieldWindow(this);
            utils.beginUIShield();

            var playerBanner = new Sprite(512, 256);
            playerBanner.image = game.assets[uiPlayerBanner1];

            playerBanner.opacity = 0;
            playerBanner.x = 480 -256;
            playerBanner.y = 320 -128;
            game.currentScene.addChild(playerBanner);

            var self = this;
            playerBanner.tl.fadeIn(20).delay(30).fadeOut(10).then(function() {
                game.currentScene.removeChild(playerBanner);

                var resultBanner = new Sprite(512, 256);
                //勝利時の処理
                if (winner.id == 1) {
                    resultBanner.image = game.assets[uiWin];
                    //@add 2015.0528 T.Masuda 勝敗が決まった後に残ったユニットを掃除します
                    var player2 = self.getPlayer(2);
                    if(self.turnList.length){
                    	//現在のCPUプレイヤーのユニット所持数を取得する
                    	var funeNumber = player2.funeList.length;
                    	//ユニットリストの項目分ループする
                    	for(var i = 0; i < funeNumber; i++){
                    		var underdog = player2.funeList[0];
                    		underdog.opacity = 0;
                    		underdog.sinkShip();
                    	}
                    }
                    //行動順をリセットする
                    self.activeUnit = 0;
                    //タッチ処理
                    touchable.onTouch = function() {
                    	//ゲームクリアとなったら
                    	if(self.stageId == StageData.length){
                    		//ゲームクリアを伝える
                    		alert("ゲームクリアおめでとうございます！");
                    		//画面を更新してトップ画面へ戻る
                    		location.reload();
                    		//関数処理を終える
                    		return false;
                    	}
                    	//各プレイヤーを回復
                        self.refreshPlayer(self.getPlayer(1));
                        
                        //次のステージをセットする
                        self.setupStage(self.stageId + 1);
                        self.map.setStageMap(MAP_DATA[self.stageId - 1], self.stageId);            
                        //ユニットの行動順番リストを作る
                        self.createTurnList();
                        //ステージデモを開始する
                        self.loadStageDemo(self.stageId , self);

                    };
                //敗北時の処理
                } else if (winner.id == 2) {
                	//敗北のバナーを出す
                    resultBanner.image = game.assets[uiLose];

                    //画面クリック
                    touchable.onTouch = function() {
                        $.jStorage.deleteKey("save data");	//セーブデータを削除する
                        location.reload();					//画面を最初に戻す
                    };
                }
                
                //結果バナーを用意する
                resultBanner.opacity = 0;
                resultBanner.touchEnabled = false;
                resultBanner.x = 480 -256;
                resultBanner.y = 320 -128;
                game.currentScene.addChild(resultBanner);

                //結果バナーをフェードイン表示する
                resultBanner.tl.fadeIn(20).then(function(){
                    utils.endUIShield();
                });
            });
        },

        //勝者が入ればIDを返す関数
        getWinner: function() {
        	//アクティブプレイヤーのユニットが0になったら
            if (this.getActivePlayer().getFuneCount() == 0) {
            	//非アクティブプレイヤーのユニットも0になっていたら
                if (this.getNonActivePlayer().getFuneCount() == 0) {
                    return this.getActivePlayer();	//アクティブプレイヤーの勝ちとなる
                //非アクティブプレイヤーにまだユニットが残っていたら
                } else {
                    return this.getNonActivePlayer();	//非アクティブプレイヤーの勝ちとなる
                }
            //非アクティブプレイヤーのユニットが0になったら
            } else if (this.getNonActivePlayer().getFuneCount() == 0) {
                return this.getActivePlayer();	//アクティブプレイヤーの勝ちとなる
            //アクティブプレイヤーの隊長ユニットがやられていたら
            } else if(!this.getActivePlayer().leaderLiving){
            	return this.getNonActivePlayer();	//非アクティブプレイヤーの勝ちとなる
            //非アクティブプレイヤーの隊長ユニットがやられていたら
            } else if(!this.getNonActivePlayer().leaderLiving){
            	return this.getActivePlayer();		//アクティブプレイヤーの勝ちとなる
            }
            //勝敗条件が満たされていなければnullを返す
            return null
        },

        //設定ウィンドウを開く関数
        openSettings: function() {
            new SettingsWindow(this);
        },
        
        //ターンの順番リストを作る関数
        createTurnList:function(){
        	var list = [];	//リスト本体となる配列を作る
        	//ユニット一覧を取得する
        	var unitList = this.getFuneList();
       		//ユニット一覧を走査する
       		for(var i = 0; i < unitList.length; i++){
       			//順番一覧の配列にユニットのデータとユニットを所持するプレイヤーのIDをセットにして追加する
       			list.push({unit:unitList[i], player:unitList[i].player.id});
       		}
        	
        	//順番一覧をソートする
        	this.statusListSort(list, "speed");
        	//GameManagerのturnListを更新する
        	this.turnList = list;
        },

        /*
         * 関数名:statusListSort
         * 引数  :Array list:ソートする配列。要素が連想配列であることが前提となる
         * 戻り値:String parameter:ソートの基準となるlist内の連想配列のキー
         * 概要  :ステータスのリストをソートする
         * 作成日:2015.05.22
         * 作成者:T.M
         */
        statusListSort:function(list, parameter){
        	// 最後の要素を除いて、すべての要素を並べ替えます
            for(var i=0;i<list.length-1;i++){

              // 下から上に順番に比較します
              for(var j=list.length-1;j>i;j--){

	        	// 上の方が大きいときは互いに入れ替えます
	        	if(list[j]['unit']['stats'][parameter] > list[j-1]['unit']['stats'][parameter]){
	        		//並び替える要素を別の変数に一時対比させる
	        		var t=list[j];
	        		//後ろの要素を前に持ってくる
	        		list[j]=list[j-1];
	        		//一時対比した前の要素を後ろの要素に入れる
	        		list[j-1]=t;
	        	}
              }
            }
        },
        
        //スキル「ハリーアップ」で増やしたターンを設定する関数
        getFreeTurns: function(player, turns) {
            this.skipper = player;
            this.skipTurns = turns;
        },

        //指定された船を造る関数
        //@mod 2015.0531 T.Masuda 作成できるユニットを整理 関数名変更
        unitFactory: function(name) {
            switch(name) {
                case 1:
                case "Player01":
                	return new Player01(1);
                //@add 2015.0526 T.Masuda プレイヤー02ユニット追加
                case 2:
                case "Player02":
                	return new Player02(2);
                case 3:
                case "enemy01":
                	return new Enemy01(3);
                case 4:
                case "enemy02":
                	return new Enemy02(4);
                case 5:
                case "enemy03":
                	return new Enemy03(5);
                case 6:
                case "enemy04":
                	return new Enemy04(6);
            }
        },
    })

    /**
     * ターン関係の情報を表示するクラス
     */
    var FrameUI = Class.create({
        initialize: function(scene) {

            this.turnLabel = new Label();
            scene.addChild(this.turnLabel);
            this.turnLabel.x = TIP_LENGTH*5;
            this.turnLabel.y = GAME_SCREEN_HEIGHT -40;
            this.turnLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            this.turnLabel.color = FONT_WHITE;

            this.playerLabel = new Label();
            scene.addChild(this.playerLabel);
            this.playerLabel.x = TIP_LENGTH;
            this.playerLabel.y = GAME_SCREEN_HEIGHT -40;
            this.playerLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            this.playerLabel.color = FONT_WHITE;

            this.stageLabel = new Label();
            scene.addChild(this.stageLabel);
            this.stageLabel.x = TIP_LENGTH*8;
            this.stageLabel.y = GAME_SCREEN_HEIGHT -40;
            this.stageLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            this.stageLabel.color = FONT_WHITE;

            this.settingsButton = new Sprite(TIP_LENGTH, TIP_LENGTH);
            scene.addChild(this.settingsButton);
            this.settingsButton.image = game.assets[uiSettingsSprite];
            this.settingsButton.x = TIP_LENGTH*14;
            this.settingsButton.y = GAME_SCREEN_HEIGHT -TIP_LENGTH;

            var self = this;
            this.settingsButton.addEventListener(enchant.Event.TOUCH_START, function(params) {
                self.settingsButton.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                new SettingsWindow(self.manager);
            });

            this.settingsButton.addEventListener(enchant.Event.TOUCH_END, function(params) {
                self.settingsButton.tl.scaleTo(1.0, 3);
            });
        },

        updateTurn: function(turn) {
            this.turnLabel.text = "ターン:"+turn;
        },

        updatePlayer: function(name) {
            this.playerLabel.text = name;
        },

        updateStage: function(stageId) {
            this.stageLabel.text = "ステージ:"+stageId;
        }

    })

    /**
     * オーディオ管理
     */
    var SoundManager = Class.create(Sprite, {
    	//コンストラクタ
        initialize: function() {
            Sprite.call(this, 1,1);
            //ボリュームをロードする
            this.volume = $.jStorage.get("sound volume", 0.5);
            this.bgmPlaying = false;	//生成してすぐにはBGMを流さない
        },

        //BGMを流す関数
        playBGM: function() {
            this.bgmPlaying = true;

            game.assets[sndBGM].play();
            if(game.assets[sndBGM].src){
                game.assets[sndBGM].src.loop = true;
            } else {
                game.currentScene.addChild(this);
            }
            game.assets[sndBGM].volume = this.volume *0.5;
        },

        //繰り返し使う音を再生する関数
        playFX: function(name) {
            var fx = game.assets[name].clone();
            fx.play();
            fx.volume = this.volume;
        },

        //BGMの再生を一時停止する関数
        pauseBGM: function() {
            this.bgmPlaying = false;
            game.assets[sndBGM].pause();
        },

        //BGMを完全に停止させる関数
        stopBGM: function() {
            this.bgmPlaying = false;
            game.assets[sndBGM].stop();
        },

        //ボリュームを上げる関数
        volumeUp: function() {
            this.volume += 0.05;
            if (this.volume > 1) {
                this.volume = 1;
            }
            console.log("volume", this.volume);
            //ボリュームを保存する
            $.jStorage.set("sound volume", this.volume);
            game.assets[sndBGM].volume = this.volume *0.3;
            this.playFX(sndClick);
        },

        //ボリュームを下げる関数
        volumeDown: function() {
            this.volume -= 0.05;
            if (this.volume < 0) {
                this.volume = 0;
            }
            console.log("volume", this.volume);
            $.jStorage.set("sound volume", this.volume);
            game.assets[sndBGM].volume = this.volume *0.3;
            this.playFX(sndClick);
        },

        //現在のボリュームを返す関数
        getVolume: function() {
            return this.volume;
        },

        //フレーム更新時に実行される関数
        onenterframe: function(){
        	//BGMが再生中なら
            if (this.bgmPlaying) {
            	//BGMの再生を開始する命令を出す。特定ブラウザのループ再生用の処理。
                game.assets[sndBGM].play();
            }
        },
    })

    /**
     * キャラのポップアップウィンドー
     */
    var FunePopup = Class.create(Scene, {
        initialize: function(fune) {
            Scene.call(this);
            game.pushScene(this);

            fune.player.controller.sndManager.playFX(sndClick);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.5
            this.addChild(shieldSprite);

            var windowGroup = new Group();
            windowGroup.x = (GAME_SCREEN_WIDTH -512)/2;
            windowGroup.y = (GAME_SCREEN_HEIGHT -512)/2;
            this.addChild(windowGroup);

            var windowSprite = new Sprite(512, 512);
            windowSprite.image = game.assets[uiWindowSprite];
            windowGroup.addChild(windowSprite);

            var statsGroup = new Group();
            statsGroup.x = TIP_LENGTH;
            statsGroup.y = 32;
            windowGroup.addChild(statsGroup);

            //ステータス表示
            captainLabel = new Label("ユニット："+fune.getCaptainName());
            statsGroup.addChild(captainLabel);
            captainLabel.x = 0;
            captainLabel.y = 0;
            captainLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            captainLabel.color = FONT_WHITE;

            attackLabel = new Label("攻撃力："+fune.getAttack());
            statsGroup.addChild(attackLabel);
            attackLabel.x = 0;
            attackLabel.y = TIP_LENGTH *1;
            attackLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            attackLabel.color = FONT_WHITE;

            defenseLabel = new Label("防御力："+fune.getDefense());
            statsGroup.addChild(defenseLabel);
            defenseLabel.x = 0;
            defenseLabel.y = TIP_LENGTH *2;
            defenseLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            defenseLabel.color = FONT_WHITE;

            //@mod 2015.0526 T.Masuda 移動力を、移動力を保存するメンバから取得するようにしました。 
            movementLabel = new Label("移動力："+fune.getMovementReserved());
            statsGroup.addChild(movementLabel);
            movementLabel.x = 0;
            movementLabel.y = TIP_LENGTH *3;
            movementLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            movementLabel.color = FONT_WHITE;

            rangeLabel = new Label("攻撃の距離："+fune.getRange());
            statsGroup.addChild(rangeLabel);
            rangeLabel.x = 0;
            rangeLabel.y = TIP_LENGTH *4;
            rangeLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            rangeLabel.color = FONT_WHITE;

            hpLabel = new Label("HP："+fune.getHP()+"/"+fune.getHPMax());
            statsGroup.addChild(hpLabel);
            hpLabel.x = 0;
            hpLabel.y = TIP_LENGTH *5;
            hpLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            hpLabel.color = FONT_WHITE;

            //ここまでステータス

            //キャンセルボタン
            var self = this;
            var cancelBtnSprite = new Sprite(128, TIP_LENGTH);
            cancelBtnSprite.image = game.assets[uiCancelBtnSprite];
            cancelBtnSprite.x = TIP_LENGTH;
            cancelBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(cancelBtnSprite);

            //必殺技ボタン
            var skillBtnSprite = new Sprite(128, TIP_LENGTH);
            skillBtnSprite.image = game.assets[uiSkillBtnSprite];
            skillBtnSprite.x = TIP_LENGTH *4;
            skillBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(skillBtnSprite);

            //必殺技使用済みなら
            //@mod 2015.0525 T.Masuda アクティブではないユニットのステータスウィンドウならスキルを発動できない色にするよう変更しました
            if (fune.usedSkill ||fune !== fune.player.getActiveFune()) {
            	//必殺技ボタンを半透明にして使用済みの表現を行う
                skillBtnSprite.opacity = 0.5;
            }

            windowGroup.originX = 256;
            windowGroup.originY = 256;
            windowGroup.scaleX = 0.7;
            windowGroup.scaleY = 0.7;
            //ウィンドウの出現時の処理
            windowGroup.tl.scaleTo(1, 10, enchant.Easing.ELASTIC_EASEOUT).then(function() {
                //@mod 2015.0527 新キャラ画像が用意できるまで画像を表示しないようにします。
//                pirate.y = -50;
//                pirate.tl.moveBy(-50, -25, 5).and().fadeIn(10);

                //キャンセルボタンのアニメーション
                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                    cancelBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                });

                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                    shieldSprite.tl.fadeTo(0, 5);
                    cancelBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                    //@mod 2015.0527 新キャラ画像が用意できるまで画像を表示しないようにします。
//                    pirate.tl.fadeTo(0, 5);
                    windowSprite.tl.fadeTo(0, 5).then(function() {
                        game.popScene();
                        fune.player.controller.sndManager.playFX(sndClick);
                        if (self.onCancel) {
                            self.onCancel()
                        }
                    });
                });
                //ここまでキャンセルボタンのアニメーション
                
                //必殺技ボタンのアニメーション
                if (fune.usedSkill == false) {
                    skillBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                        skillBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                    });

                    skillBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                        shieldSprite.tl.fadeTo(0, 5);
                        skillBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                        //@mod 2015.0527 新キャラ画像が用意できるまで画像を表示しないようにします。
//                        pirate.tl.fadeTo(0, 5);
                        windowSprite.tl.fadeTo(0, 5).then(function() {
                            game.popScene();
                            fune.player.controller.sndManager.playFX(sndClick);
                            if (self.onSkill) {
                                self.onSkill()
                            }
                        });
                    });
                }
            });
        },
    })


    
    /**
     * 操作不能のベール
     */
    var ShieldWindow = Class.create(Scene, {
        initialize: function(gameManager) {
            Scene.call(this);
            game.pushScene(this);

            gameManager.sndManager.playFX(sndClick);		//クリック音をならす

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);		//ベールのスプライトを作る
            shieldSprite.image = game.assets[ui1x1Black];	//黒背景画像をセットする
            shieldSprite.opacity = 0.5						//半透過する
            this.addChild(shieldSprite);					//シーンに追加する

            var self = this;								//自身への参照を変数に保存する
            //タッチ後の処理
            shieldSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                if (self.onTouch) {	//タッチフラグがたっていれば
                	//クリック音を出して
                    gameManager.sndManager.playFX(sndClick);
                    //シーンを進める
                    game.popScene();
                    self.onTouch();
                }
            });
        }
    })

    //お知らせメッセージウィンドウ
    var AlertWindow = Class.create(Scene, {
    	//コンストラクタ
        initialize: function(message, gameManager) {
        	Scene.call(this);
            game.pushScene(this);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.2
            this.addChild(shieldSprite);

            var windowSprite = new Sprite(320, 160);
            windowSprite.image = game.assets[uiAlertScreen];
            windowSprite.x = (GAME_SCREEN_WIDTH -320)/2;
            windowSprite.y = (GAME_SCREEN_HEIGHT -160)/2;
            this.addChild(windowSprite);
            //@add 2015.0525 クラスオブジェクトにウィンドウへの参照を持たせました
            this.windowSprite = windowSprite;

            
            messageLabel = new Label(message);
            this.addChild(messageLabel);
            messageLabel.x = windowSprite.x +40;
            messageLabel.y = windowSprite.y +TIP_LENGTH;
            messageLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            messageLabel.color = FONT_WHITE;
            //@add 2015.0525 クラスオブジェクトにラベルへの参照を持たせました
            this.messageLabel = messageLabel;
            
            var once = false;
            var self = this;

            windowSprite.scaleX = 0.7;
            windowSprite.scaleY = 0.7;

            windowSprite.tl.scaleTo(1, 10, enchant.Easing.ELASTIC_EASEOUT).then(function() {
                self.addEventListener(enchant.Event.TOUCH_END, function(params) {
                    if (once == false) {
                        once = true;
                        windowSprite.tl.fadeTo(0, 5).then(function() {
                            gameManager.sndManager.playFX(sndClick);
                            game.popScene();
                            if (self.onTouch) {
                                self.onTouch();
                            }
                        });
                    }
                });
            });
        }
    })

    /*
     * 関数名:isSupportPushState()
     * 引数  :String message:ウィンドウに表示するメッセージ
     * 		:GameManager gameManager:ゲーム進行管理クラスのインスタンス
     * 		:String image:ウィンドウに表示する画像パス
     * 概要  :ステージデモウィンドウクラス。お知らせウィンドウのクラスを継承する
     * 作成日:2015.05.25
     * 作成者:T.M
     */
    var DemoWindow = Class.create(AlertWindow, {
    	//コンストラクタ
        initialize: function(message, gameManager, image, font) {
        	//お知らせウィンドウのコンストラクタを実行する
        	AlertWindow.call(this, message,gameManager);
        	//デモウィンドウ用のフォントを指定する
        	this.messageLabel.font = DEMO_FONT_STYLE;

            //画像パスが第3引数にセットされていれば
            if(image !== void(0) && image != ''){
            	//顔写真のスプライトを作る
            	var faceImage = new Sprite(FACE_IMAGE_SIZE, FACE_IMAGE_SIZE);
            	//画像をセットする
            	faceImage.image = game.assets[image];
            	//ウィンドウにスプライトを追加する
            	this.addChild(faceImage);
            	//座標をセットする
            	faceImage.x = this.windowSprite.x + WINDOW_MARGIN / 2;
            	faceImage.y = this.windowSprite.y + WINDOW_MARGIN;
            }
        	
        	//表示するラベルのテキストを取得する
        	var text = this.messageLabel.text;
        	//本来のラベルを消す
        	this.removeChild(this.messageLabel);
        	
        	//ループでラベルを作成する
        	for(var i = 0; text.length > 0; i++){
        		//新たなラベルを生成する
        		var label = new Label();
        		this.addChild(label);	//ラベルをウィンドウに追加する
        		//テキストを1行分切り出してセットする
        		label.text = text.substr(0, MESSAGE_NUMBER_PER_LINE);
        		//切り出した残りを自らにセットする
        		text = text.substr(MESSAGE_NUMBER_PER_LINE);
        		//このウィンドウ用のフォントをセットする。引数にフォントが指定してあればそちらを使う
        		label.font = font === void(0) || font == ''?DEMO_FONT_STYLE:font;	
        		label.color = FONT_WHITE;		//フォントの色をセットする
        		//ラベルの座標をセットする。顔グラフィックからずらす。
        		//@mod 2015.0530 T.Masuda 顔グラフィック未使用につき幅変更
        		label.x = this.windowSprite.x + WINDOW_MARGIN;
        		label.y = this.windowSprite.y + (DEMOWINDOW_LABEL_HEIGHT * (i + 1));
        	}
        }
    });
    
    /**
     * 設定ウィンドウ
     */
    var SettingsWindow = Class.create(Scene, {
        initialize: function(gameManager) {
            Scene.call(this);
            game.pushScene(this);

            gameManager.sndManager.playFX(sndClick);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.5
            this.addChild(shieldSprite);

            var windowGroup = new Group();
            windowGroup.x = (GAME_SCREEN_WIDTH -512)/2;
            windowGroup.y = (GAME_SCREEN_HEIGHT -512)/2;
            this.addChild(windowGroup);

            var windowSprite = new Sprite(512, 512);
            windowSprite.image = game.assets[uiWindowSprite];
            windowGroup.addChild(windowSprite);

            var settingsGroup = new Group();
            settingsGroup.x = TIP_LENGTH;
            settingsGroup.y = 32;
            windowGroup.addChild(settingsGroup);

            soundLabel = new Label("音量");
            settingsGroup.addChild(soundLabel);
            soundLabel.x = 0;
            soundLabel.y = 16;
            soundLabel.font = NORMAL_FONT_STYLE;
            //@mod 2015.0530 T.Masuda フォントカラーを白に変更
            soundLabel.color = FONT_WHITE;

            var sndUpButton = new Sprite(TIP_LENGTH, TIP_LENGTH);
            settingsGroup.addChild(sndUpButton);
            sndUpButton.x = TIP_LENGTH *4;
            sndUpButton.y = 0;
            sndUpButton.image = game.assets[uiArrowSprite];

            var isKeyPressed = false;
            sndUpButton.addEventListener(enchant.Event.TOUCH_START, function(params) {
                if (gameManager.sndManager.getVolume() < 1) {
                    if (isKeyPressed == false) {
                        isKeyPressed = true;
                        sndUpButton.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT);
                    }
                }
            });

            sndUpButton.addEventListener(enchant.Event.TOUCH_END, function(params) {
                if (gameManager.sndManager.getVolume() < 1) {
                    if (isKeyPressed == true) {
                        gameManager.sndManager.volumeUp();
                        sndUpButton.tl.scaleTo(1.0, 3).then(function() {
                            isKeyPressed = false;
                        });
                    }
                }
            });

            var sndDownButton = new Sprite(TIP_LENGTH, TIP_LENGTH);
            settingsGroup.addChild(sndDownButton);
            sndDownButton.x = TIP_LENGTH*5 +5;
            sndDownButton.y = 0;
            sndDownButton.rotation = 180;
            sndDownButton.image = game.assets[uiArrowSprite];

            sndDownButton.addEventListener(enchant.Event.TOUCH_START, function(params) {
                if (gameManager.sndManager.getVolume() > 0) {
                    if (isKeyPressed == false) {
                        isKeyPressed = true;
                        sndDownButton.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT);
                    }
                }
            });

            sndDownButton.addEventListener(enchant.Event.TOUCH_END, function(params) {
                if (gameManager.sndManager.getVolume() > 0) {
                    if (isKeyPressed == true) {
                        gameManager.sndManager.volumeDown();
                        sndDownButton.tl.scaleTo(1.0, 3).then(function() {
                            isKeyPressed = false;
                        });
                    }
                }
            });

            var self = this;
            var cancelBtnSprite = new Sprite(128, TIP_LENGTH);
            cancelBtnSprite.image = game.assets[uiCancelBtnSprite];
            cancelBtnSprite.x = TIP_LENGTH;
            cancelBtnSprite.y = 512 -TIP_LENGTH -32;

            windowGroup.addChild(cancelBtnSprite);

            windowGroup.originX = 256;
            windowGroup.originY = 256;
            windowGroup.scaleX = 0.7;
            windowGroup.scaleY = 0.7;
            windowGroup.tl.scaleTo(1, 10, enchant.Easing.ELASTIC_EASEOUT).then(function() {
                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                    cancelBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                });

                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                    shieldSprite.tl.fadeTo(0, 5);
                    cancelBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                    windowSprite.tl.fadeTo(0, 5).then(function() {
                        gameManager.sndManager.playFX(sndClick);
                        game.popScene();
                    });
                });
            });
        },
    })


    /**
     * スタート画面
     */
    var StartScreen = Class.create(Scene, {
        initialize: function(gameManager) {
            Scene.call(this);
            game.pushScene(this);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.5
            this.addChild(shieldSprite);

            var windowGroup = new Group();
            //@mod 2015.0529 T.Masuda 画面いっぱいの写真を使うため、座標を0にしました
            windowGroup.x = 0;
            windowGroup.y = 0;
            this.addChild(windowGroup);

            //@mod 2015.0529 T.Masuda タイトル画面を写真にしました
            var windowSprite = new Sprite(TIP_LENGTH*13, TIP_LENGTH*9);
            windowSprite.image = game.assets[uiStartScreen];
            windowSprite.x = TIP_LENGTH;
            windowSprite.y = 10;
            windowGroup.addChild(windowSprite);

            //@add 2015.0529 T.Masuda タイトルの画像を配置します
            var titleSprite = new Sprite(TIP_LENGTH*8, TIP_LENGTH*1.5);
            titleSprite.image = game.assets[titleLogo];
            titleSprite.x = 224;
            titleSprite.y = TIP_LENGTH;
            windowGroup.addChild(titleSprite);
            
            windowGroup.originX = 256;
            windowGroup.originY = 256;
            
            //@mod 2015.0529 T.Masuda タイトル画面とストーリーモード選択画面を統合しました
            //以下のコードはストーリーモード用のウィンドウから移植しました。
            var self = this;

            var saveData = $.jStorage.get("save data");
            if (saveData) {
                console.log("Found Save Data", saveData.stageId)
                var continueBtnSprite = new Sprite(128, TIP_LENGTH);
                continueBtnSprite.image = game.assets[uiContinueBtnSprite];
                continueBtnSprite.x = TIP_LENGTH *4.5;
                continueBtnSprite.y = 512 -TIP_LENGTH -32;
                windowGroup.addChild(continueBtnSprite);

                continueBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                    continueBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                });

                continueBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                    shieldSprite.tl.fadeTo(0, 5);
                    continueBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                    windowSprite.tl.fadeTo(0, 5).then(function() {
                        gameManager.beginCampaignGame();
                        gameManager.sndManager.playFX(sndClick);
                        game.popScene();
                        //@add 2015.0525 ゲーム開始時にデモをコールする関数を追加しました。
                        gameManager.loadStageDemo(gameManager.stageId , gameManager);
                    });
                });
            }

            var newBtnSprite = new Sprite(128, TIP_LENGTH);
            newBtnSprite.image = game.assets[uiNewBtnSprite];
            newBtnSprite.x = TIP_LENGTH *8.5;
            newBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(newBtnSprite);

            windowGroup.originX = 256;
            windowGroup.originY = 256;

            newBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                newBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
            });

            newBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                $.jStorage.deleteKey("save data")
                shieldSprite.tl.fadeTo(0, 5);
                newBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                windowSprite.tl.fadeTo(0, 5).then(function() {
                    gameManager.beginCampaignGame();
                    gameManager.sndManager.playFX(sndClick);
                    game.popScene();
                    //@add 2015.0525 ゲーム開始時にデモをコールする関数を追加しました。
                    gameManager.loadStageDemo(gameManager.stageId , gameManager);
                });
            });
            //ここまで移植
        }
    })

    //プレイヤー兵1(チーフ)。隊長であり、やられると負けとなる
    var Player01 = Class.create(BaseFune, {
    	initialize: function(id) {
        	//@mod 2015.0527 T.Masuda ステータスを調整しました。リーダーとして優秀なステータスを設定しました。
    		BaseFune.call(this, id, {
    			movement:  4,
    			range:     3,
    			attack:   80,
    			defense:  70,
    			hpMax:   100,
    			speed:	8
    		});

    		//高さを変更する
    		this.fune.height = PLAYER_SOLDIER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = PLAYER_SOLDIER_HEIGHT - TIP_LENGTH;
    		
    		//プレイヤー1兵のスプライトシートを使う
    		this.fune.image = game.assets[player01]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.front;
    		this.fune.sinkFrame = SINK_FRAME.front;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。正面
    		this.imageDirection = 'front';
    	},
    	
    	getCaptainName: function() {
    		return "チーフ";
    	},
    	
        /*
         * 関数名:getUnitName
         * 引数  :なし
         * 戻り値:String:ユニット名を返す
         * 概要  :ユニット名の文字列を返す
         * 作成日:2015.05.26
         * 作成者:T.M
         */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "player01";
    	},
    	
    	getSkillName: function() {
    		return "応急手当:味方全員を回復する";
    	},
    	
    	processSkill: function(onEnd) {
    		var count = this.player.getFuneCount();
    		for(var i=0; i < count; i++) {
    			var fune = this.player.getFune(i);
    			var toHeal = Math.ceil(fune.getHPMax() /2);
    			fune.healDamage(toHeal);
    		}
    		onEnd();
    	},
    	
    	//やられ処理の関数を上書きする
    	sinkShip: function() {
    		this.player.controller.sndManager.playFX(sndSinkShip);
    		//隊長の生存フラグを下ろし、ターン終了の関数で負けにする
    		this.player.leaderLiving = false;
    		
    		this.player.removeFune(this);
    		this.counter = 1;

            this.fune.frame = this.fune.sinkFrame;
            this.fune.originX = this.fune.width / 2;
            this.fune.originY = this.fune.height -6;
            this.fune.rotate(90);
    		this.onenterframe = function(){ // enterframe event listener
    			            this.counter++;
    			if (this.counter == 12 ) {
    				this.parentNode.removeChild(this);
    			}
    		};
    	}
    });

    //プレイヤー兵2。複数存在する
    var Player02 = Class.create(BaseFune, {
    	//@mod 2015.0527 T.Masuda ステータスを調整しました。一兵卒ステータスにしました
    	initialize: function(id) {
    		BaseFune.call(this, id, {
    			movement:  3,
    			range:     3,
    			attack:  70,
    			defense:  50,
    			hpMax:   70,
    			speed:	5
    		});
 
    		
    		//高さを変更する
    		this.fune.height = PLAYER_SOLDIER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = PLAYER_SOLDIER_HEIGHT - TIP_LENGTH;
    		
    		//プレイヤー2兵のスプライトシートを使う
    		this.fune.image = game.assets[player02]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.front;
    		this.fune.sinkFrame = SINK_FRAME.front;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。正面
    		this.imageDirection = 'front';
    	},
    	
    	getCaptainName: function() {
    		return "隊員";
    	},

        /*
         * 関数名:getUnitName
         * 引数  :なし
         * 戻り値:String:ユニット名を返す
         * 概要  :ユニット名の文字列を返す
         * 作成日:2015.05.26
         * 作成者:T.M
         */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "player02";
    	},
    	
    	getSkillName: function() {
    		return "バレットフィーバー:周囲の敵全員を攻撃";
    	},
    	
    	processSkill: function(onEnd) {
    		var damage = this.stats.attack;
    		var count = this.player.controller.getNonActivePlayer().getFuneCount();
    		for(var i=0; i < count; i++) {
    			var fune = this.player.controller.getNonActivePlayer().getFune(i);
    			if (this.withinRange(fune.i, fune.j)) {
    				var afterHp = fune.takeDamage(damage);
    				var explosion = new Explosion();
    				//@mod 2015.0528 T.Masuda 爆発アニメから銃撃アニメに変わり、画像サイズがマス目と同じになったため補正値を外しました
    				explosion.x = fune.x;
    				explosion.y = fune.y;
    				this.player.controller.sndManager.playFX(sndExplosion);
    				game.currentScene.addChild(explosion);
    				
    				if (afterHp <= 0) {
    					fune.sinkShip();
    				}
    			}
    		}
    		onEnd();
    	},
    });    
    
    //敵兵01クラス。敵側指揮官ユニット。倒すとステージクリア。いなければ殲滅でクリア
    var Enemy01 = Class.create(BaseFune, {
    	//@mod 2015.0527 T.Masuda ステータスを調整しました。攻撃寄りです
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  4,
                range:     3,
                attack:   55,
                defense:  45,
                hpMax:    80,
                speed:	7
            });

    		//高さを変更する
    		this.fune.height = ENEMY_SOLDIER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = ENEMY_SOLDIER_HEIGHT - TIP_LENGTH;
    		
    		//敵兵01のスプライトシートを使う
    		this.fune.image = game.assets[enemy01]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.front;
    		this.fune.sinkFrame = SINK_FRAME.front;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。正面
    		this.imageDirection = 'front';
        },

        getCaptainName: function() {
            return "警備兵:隊長";
        },

        /*
         * 関数名:getUnitName
         * 引数  :なし
         * 戻り値:String:ユニット名を返す
         * 概要  :ユニット名の文字列を返す
         * 作成日:2015.05.26
         * 作成者:T.M
         */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "enemy01";
    	},
        
        getSkillName: function() {
            return "無差別発砲:周囲の敵全員を攻撃";
        },

        processSkill: function(onEnd) {
    		var damage = this.stats.attack;
    		var count = this.player.controller.getNonActivePlayer().getFuneCount();
    		for(var i=0; i < count; i++) {
    			var fune = this.player.controller.getNonActivePlayer().getFune(i);
    			if (this.withinRange(fune.i, fune.j)) {
    				var afterHp = fune.takeDamage(damage);
    				var explosion = new Explosion();
    				//@mod 2015.0528 T.Masuda 爆発アニメから銃撃アニメに変わり、画像サイズがマス目と同じになったため補正値を外しました
    				explosion.x = fune.x;
    				explosion.y = fune.y;
    				this.player.controller.sndManager.playFX(sndExplosion);
    				game.currentScene.addChild(explosion);
    				
    				if (afterHp <= 0) {
    					fune.sinkShip();
    				}
    			}
    		}
            onEnd();
        },
    	//やられ処理の関数を上書きする
    	sinkShip: function() {
    		this.player.controller.sndManager.playFX(sndSinkShip);
    		//隊長の生存フラグを下ろし、ターン終了の関数で負けにする
    		this.player.leaderLiving = false;
    		
    		this.player.removeFune(this);
    		this.counter = 1;
    		this.fune.frame = this.fune.sinkFrame;
            this.fune.originX = this.fune.width / 2;
            this.fune.originY = this.fune.height -6;
            this.fune.rotate(90);

    		this.onenterframe = function(){ // enterframe event listener
    			            this.counter++;
    			if (this.counter == 12 ) {
    				this.parentNode.removeChild(this);
    			}
    		};
    	}
    });

    //敵兵02クラス
    var Enemy02 = Class.create(BaseFune, {
    	initialize: function(id) {
        	//@mod 2015.0527 T.Masuda ステータスを調整しました。防御寄りです
    		BaseFune.call(this, id, {
    			movement:  3,
    			range:     4,
    			attack:   50,
    			defense:  60,
    			hpMax:    50,
    			speed:	2
    		});
    		
    		//高さを変更する
    		this.fune.height = ENEMY_SOLDIER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = ENEMY_SOLDIER_HEIGHT - TIP_LENGTH;
    		
    		//敵兵02のスプライトシートを使う
    		this.fune.image = game.assets[enemy02]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.quarter;
    		this.fune.sinkFrame = SINK_FRAME.quarter;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。斜め
    		this.imageDirection = 'quarter';
    	},
    	
    	getCaptainName: function() {
    		return "警備兵:2";
    	},
    	
    	/*
    	 * 関数名:getUnitName
    	 * 引数  :なし
    	 * 戻り値:String:ユニット名を返す
    	 * 概要  :ユニット名の文字列を返す
    	 * 作成日:2015.05.26
    	 * 作成者:T.M
    	 */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "enemy02";
    	},
    	
    	getSkillName: function() {
    		return "奮起:攻撃力・防御力 小UP";
    	},
    	
    	processSkill: function(onEnd) {
    		this.stats.attack  += 5;
    		this.stats.defense += 5;
    		onEnd();
    	},
    });
    
    //敵兵03クラス
    var Enemy03 = Class.create(BaseFune, {
    	initialize: function(id) {
        //@mod 2015.0527 T.Masuda ステータスを調整しました。スピード寄りです
   		BaseFune.call(this, id, {
    			movement:  5,
    			range:     2,
    			attack:   50,
    			defense:  40,
    			hpMax:    50,
    			speed:	6
    		});
    		
    		//高さを変更する
    		this.fune.height = ENEMY_SOLDIER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = HIGH_TIP_HEIGHT - TIP_LENGTH;
    		
    		//敵兵01のスプライトシートを使う
    		this.fune.image = game.assets[enemy03]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.front;
    		this.fune.sinkFrame = SINK_FRAME.front;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。正面
    		this.imageDirection = 'front';
    	},
    	
    	getCaptainName: function() {
    		return "警備兵:03";
    	},
    	
    	/*
    	 * 関数名:getUnitName
    	 * 引数  :なし
    	 * 戻り値:String:ユニット名を返す
    	 * 概要  :ユニット名の文字列を返す
    	 * 作成日:2015.05.26
    	 * 作成者:T.M
    	 */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "enemy03";
    	},
    	
    	getSkillName: function() {
    		return "慎重に行動:防御力UP 移動力DOWN";
    	},
    	
    	processSkill: function(onEnd) {
    		this.stats.defense += 10;
    		this.stats.movement -= 1;
    		this.movementReserved -= 1;
    		onEnd();
    	},
    });
    
    //敵兵04クラス。生体兵器(ゾンビのようなモンスター)
    var Enemy04 = Class.create(BaseFune, {
    	initialize: function(id) {
    		//@mod 2015.0527 ステータスを調整しました。近接型のパラメータです。
    		BaseFune.call(this, id, {
    			movement:  5,
    			range:     1,
    			attack:   80,
    			defense:  70,
    			hpMax:    70,
    			speed:	7
    		});
    		
    		//高さを変更する
    		this.fune.height = MONSTER_HEIGHT;
    		//幅を変更する
    		this.fune.width = TIP_LENGTH;
    		
    		//Y座標補正用メンバを追加する
    		this.replaceY = MONSTER_HEIGHT - TIP_LENGTH;
    		
    		//敵兵04のスプライトシートを使う
    		this.fune.image = game.assets[enemy04]; 
    		//アニメ設定           
    		this.fune.frame = TO_SIDE_FRAME.front;
    		this.fune.sinkFrame = SINK_FRAME.front;
    		//@mod 2015 05.28 T.Masuda キャラの向きのパラメーターを追加しました
    		//キャラ画像の向き。正面
    		this.imageDirection = 'front';
    	},
    	
    	getCaptainName: function() {
    		return "生体兵器";
    	},
    	
    	/*
    	 * 関数名:getUnitName
    	 * 引数  :なし
    	 * 戻り値:String:ユニット名を返す
    	 * 概要  :ユニット名の文字列を返す
    	 * 作成日:2015.05.26
    	 * 作成者:T.M
    	 */
    	getUnitName: function() {
    		//ユニット名を返す
    		return "enemy04";
    	},

    	//@mod 2015.0527 T.Masuda スキル名を変えました
    	getSkillName: function() {
    		return "強襲:攻撃力・移動力UP 防御力DOWN";
    	},
    	
    	//@mod 2015.0527 T.Masuda スキルで上昇するパラメータを攻撃力と防御力から、攻撃力と移動力に変えました
    	processSkill: function(onEnd) {
    		this.stats.attack  += 10;
    		this.stats.defense  -= 20;
    		this.stats.movement += 2;
    		this.movementReserved += 2;
    		onEnd();
    	},
    });
    
    /**
     * ロードが完了した直後に実行される関数を指定している。
     */
    game.onload = function(){
        var sceneGameMain = new Scene();

        // ゲームロジックの管理
        var manager = new GameManager();

        //@mod 2015.0528 T,Masuda マスのデータを定数から取るようにしました
        var map = new GameMap(sceneGameMain, MAP_DATA[0], manager);
        manager.setMap(map);

        var frameUI = new FrameUI(sceneGameMain);
        manager.setFrameUI(frameUI);

        // ゲームにシーンを追加
        game.pushScene(sceneGameMain);
        new StartScreen(manager);
    };

    game.start();
};