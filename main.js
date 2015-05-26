/**
 * enchant.js を使う前に必要な処理。
 */
enchant();



//定数を宣言する
RECOVER_HP = 0.5;	//ステージ終了後の回復倍率
//アニメーションのフレームの配列を宣言する
TO_UP_FRAME = [2,2,2,3,3,3,2,2,2,3,3,3];
TO_LOW_FRAME = [4,4,4,5,5,5,4,4,4,5,5,5];
TO_SIDE_FRAME = [0,0,0,1,1,1,0,0,0,1,1,1];

//ゲーム画面の高さと幅の定数を作成する
GAME_SCREEN_WIDTH = 960;
GAME_SCREEN_HEIGHT = 640;

//マス目の1辺の長さ
TIP_LENGTH = 64;
//縦長のキャラのサイズ
HIGH_TIP_HEIGHT = 96;

//ユニットの行動順番を表示する領域の座標の定数2つ
UNITTURN_X = TIP_LENGTH * 10;
UNITTURN_Y = TIP_LENGTH * 8;

//ゲームのフレームレートを定数にする
FRAME_RATE = 30;

//行動順リストの行動待ちユニット画像の透過度
WAITING_UNIT_OPACITY = 0.5;
//行動順リストの背景の透過度
TURNBACK_OPACITY = 0.75;

//画像倍率合わせ用の定数
//ドイツ兵画像
DEUTSCH_SCALE = 64/24;

//画像幅の定数
//ドイツ兵画像
DEUTSCH_WIDTH = 24; DEUTSCH_HEIGHT = 32;

//フォント設定
//フォントの設定データを作成する
NORMAL_FONT_STYLE = "32px 'ＭＳ ゴシック', arial, sans-serif";
//ステージデモのフォントを作成する
DEMO_FONT_STYLE = "24px 'ＭＳ Pゴシック', arial, sans-serif";
//ステージデモのメッセージ1行の文字数
MESSAGE_NUMBER_PER_LINE = 7;
//ステージデモのメッセージ1行分の高さ
DEMOWINDOW_LABEL_HEIGHT = 30;
//ウィンドウのマージン
WINDOW_MARGIN = 40;

//ウィンドウロード時のイベント
window.onload = function(){
	
	//ゲームのそのもののオブジェクトを作る。この時に解像度も指定する
    var game = new Core(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
    game.fps = FRAME_RATE; //fps 一秒に何回を画面更新する

    /**
     * 必要なファイルを相対パスで引数に指定する。 ファイルはすべて、ゲームが始まる前にロードされる。
     */
    //マップの枠の画像パスを取得する
    var mapFrame  = "resources/mapframe.png";
    game.preload(mapFrame);	//マップ画像をプリロードする。
    //以下同様に画像をプリロードしていく
    
    //マップ背景のバナー
    var ocean  = "resources/map00.png";
    game.preload(ocean);

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
    var mapTiles  = "resources/maptiles.png";
    game.preload(mapTiles);

    //マップのUIの画像
    var mapUI  = "resources/mapui.png";
    game.preload(mapUI);

    //船のスプライトシート
    var shipsSpriteSheet  = "resources/ships.png";
    game.preload(shipsSpriteSheet);

    //海賊の画像パスの配列
    var pirateSprites = [
        "resources/pirate00.png",
        "resources/pirate01.png",
        "resources/pirate02.png",
        "resources/pirate03.png",
    ];
    
    //ループしてプリロードする
    for (var i=0; i < pirateSprites.length; ++i) {
    	game.preload(pirateSprites[i]);
    }
    
    //海賊の画像パスの配列
    var pirateSpritesthumb = [
                         "resources/pirate00thumb.png",
                         "resources/pirate01thumb.png",
                         "resources/pirate02thumb.png",
                         "resources/pirate03thumb.png",
                         ];
    
    //ループしてプリロードする
    for (var i=0; i < pirateSpritesthumb.length; ++i) {
        game.preload(pirateSpritesthumb[i]);
    }

    //海賊のちびキャラ画像パスの配列
    var pirateChibiSprites = [
        "resources/pirateChibi00.png",
        "resources/pirateChibi01.png",
        "resources/pirateChibi02.png",
        "resources/pirateChibi03.png",
        "resources/pirateChibi04.png",
        "resources/pirateChibi05.png",
    ];
    //ループしてプリロードする
    for (var i=0; i < pirateChibiSprites.length; ++i) {
        game.preload(pirateChibiSprites[i]);
    }

    //爆発アニメのスプライトシート
    var explosionSpriteSheet  = "resources/explosion.png";
    game.preload(explosionSpriteSheet);

    //オーバーレイ用の画像
    var ui1x1Black    = "resources/1x1black.png";
    game.preload(ui1x1Black);

    //スタート画面
    var uiStartScreen   = "resources/startScreen.png";
    game.preload(uiStartScreen);

    //ストーリーモードのタイトル画面
    var uiStoryScreen   = "resources/storyScreen.png";
    game.preload(uiStoryScreen);

    //対戦モードのタイトル画面
    var uiVSScreen   = "resources/vsScreen.png";
    game.preload(uiVSScreen);

    //システムメッセージのウィンドウ
    var uiAlertScreen   = "resources/alertScreen.png";
    game.preload(uiAlertScreen);

    //ウィンドウのスプライト
    var uiWindowSprite    = "resources/window.png";
    game.preload(uiWindowSprite);

    //ストーリーモードのボタンのスプライト
    var uiStoryBtnSprite = "resources/btnStory.png";
    game.preload(uiStoryBtnSprite);

    //対戦モードのボタンのスプライト
    var uiVersusBtnSprite = "resources/btnVS.png";
    game.preload(uiVersusBtnSprite);

    //人間対戦選択のボタンのスプライト
    var uiHumanBtnSprite = "resources/btnHuman.png";
    game.preload(uiHumanBtnSprite);

    //CPU対戦選択のボタンのスプライト
    var uiCpuBtnSprite = "resources/btnCPU.png";
    game.preload(uiCpuBtnSprite);

    //コンテニューボタンのスプライト
    var uiContinueBtnSprite = "resources/btnContinue.png";
    game.preload(uiContinueBtnSprite);

    //新規開始ボタンのスプライト
    var uiNewBtnSprite = "resources/btnNew.png";
    game.preload(uiNewBtnSprite);

    //ツイッターのボタンのスプライト
    var uiTwitterBtnSprite = "resources/twitter.png";
    game.preload(uiTwitterBtnSprite);

    //設定画面のスプライト
    var uiSettingsSprite    = "resources/settings.png";
    game.preload(uiSettingsSprite);

    //キャンセルボタンのスプライト
    var uiCancelBtnSprite = "resources/btnCancel.png";
    game.preload(uiCancelBtnSprite);

    //必殺技ボタンのスプライト
    var uiSkillBtnSprite = "resources/btnSkill.png";
    game.preload(uiSkillBtnSprite);

    //矢印ボタンのスプライト
    var uiArrowSprite = "resources/arrow.png";
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
    var uiPlayerBanner1   = "resources/playerBanner1.png";
    game.preload(uiPlayerBanner1);

    //プレイヤー2のバナー
    var uiPlayerBanner2   = "resources/playerBanner2.png";
    game.preload(uiPlayerBanner2);

    //勝利のバナー
    var uiWin             = "resources/win.png";
    game.preload(uiWin);

    //負けのバナー
    var uiLose            = "resources/lose.png";
    game.preload(uiLose);

    //ドイツ兵のキャラチップ(スプライトシート)
    var deustchSoldier = "resources/deutschSoldier.png";
    game.preload(deustchSoldier);
    
    /**
     * 音関連のデータをプリロードする
     */
    //BGM
    var sndBGM            = "resources/music/highseas.mp3";
    game.preload(sndBGM);

    //クリック音
    var sndClick          = "resources/sound/se2.wav";
    game.preload(sndClick);

    //爆発音
    var sndExplosion      = "resources/sound/shot2.wav";
    game.preload(sndExplosion);

    //船の沈没音
    var sndSinkShip       = "resources/sound/bomb4.wav";
    game.preload(sndSinkShip);

    //船選択音
    var sndChangeShips    = "resources/sound/se4.wav";
    game.preload(sndChangeShips);

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
    var tileTypes = {
        umi:  {id:0, name:"umi"},	//通常の海
        arai: {id:1, name:"arai"},	//荒海
        asai: {id:2, name:"asai"},	//浅瀬
        riku: {id:3, name:"riku"},	//陸
        iwa:  {id:4, name:"iwa"},	//岩場
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
            //マップデータをロードする
            tiles.loadData(mapData);
            //透明にする
            tiles.opacity = 0.;
            scene.addChild(tiles);
            this.tiles = tiles;

            // マップを大きさを保存
            this.mapHeight = mapData.length;	//マップの高さ
            this.mapWidth  = mapData[0].length;	//マップの幅

            //　元のマップデータから陸や岩のcollisionデータを生成します
            var mapCollisionData = [];
            //マップの高さ(マス目の数)分ループする
            for(var j=0; j < this.mapHeight; j++) {
            	//行データの配列を作る
                mapCollisionData[j] = [];
                //マップの幅(マス目の数)分ループする
                for(var i=0; i < this.mapWidth; i++) {
                	//該当するマップデータが通行不能のマスをさしていたら
                    if (mapData[j][i] == tileTypes.riku.id || mapData[j][i] == tileTypes.iwa.id) {
                        mapCollisionData[j].push(1);	//コリジョンデータの二次元配列に1をセットする
                    //通行可能マスであれば
                    } else {
                    	//0を追加する
                        mapCollisionData[j].push(0);
                    }
                }
            }
            //作成したマップのあたり判定データをtilesに追加する
            this.tiles.collisionData = mapCollisionData;

            // 検索用のデータ。移動コストデータを格納する
            var mapSearchData = [];			//中量級の船
            var mapSearchDataLight  = [];	//軽量級の船
            var mapSearchDataHeavy  = [];	//重量級の船

            //あたり判定データ生成時と同様のループを行う
            for(var j=0; j < this.mapHeight; j++) {
            	//各配列に行データの空配列を追加する
                mapSearchData[j] = [];
                mapSearchDataLight[j] = [];
                mapSearchDataHeavy[j] = [];
                //マップデータの行を走査する
                for(var i=0; i < this.mapWidth; i++) {
                	//通行不能のマスであれば
                    if (mapData[j][i] == tileTypes.riku.id || mapData[j][i] == tileTypes.iwa.id) {
                    	//各配列に0を追加する
                        mapSearchData[j].push(0);
                        mapSearchDataLight[j].push(0);
                        mapSearchDataHeavy[j].push(0);
                    //荒海のマスであれば
                    } else {
                        if (mapData[j][i] == tileTypes.arai.id) {
                        	//船の重量に応じた値を各配列に追加する。以下の分岐も同様となる
                            mapSearchData[j].push(2);
                            mapSearchDataLight[j].push(3);
                            mapSearchDataHeavy[j].push(1);
                        //浅瀬のマスであれば
                        } else if (mapData[j][i] == tileTypes.asai.id) {
                            mapSearchData[j].push(2);
                            mapSearchDataLight[j].push(1);
                            mapSearchDataHeavy[j].push(3);
                        //普通の海であれば
                        } else {
                            mapSearchData[j].push(1);
                            mapSearchDataLight[j].push(1);
                            mapSearchDataHeavy[j].push(1);
                        }
                    }
                }
            }

            //Aスターサーチ用の各船重量別のグラフを作る
            this.searchGraph = new Graph(mapSearchData);
            this.searchGraphLight = new Graph(mapSearchDataLight);
            this.searchGraphHeavy = new Graph(mapSearchDataHeavy);

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
        },

        //船の座標をセットする関数
        positionFune: function(fune, i, j) {
            this.positonObject(fune, i, j);	//座標を計算してマップにセットする

        },

        //ユニットの向きを変える関数
        changeDirection:function(fune, i, j){
        	var unit = fune.fune;		//ユニットのデータを変数に入れる
        	//前のマスの座標を得る
        	var beforeI = unit.i;
        	var beforeJ = unit.j;
        	
        	//上に進むなら
        	if(beforeI < i){
        		unit.frame = TO_UP_FRAME;	//ユニットのアニメのフレームを上向きのものにする
        	//下に進むなら
        	} else if(beforeI < i){
        		unit.frame = TO_UP_FRAME;	//ユニットのアニメのフレームを上向きのものにする
        	//左右に進むなら
        	} else {
        		unit.frame = TO_SIDE_FRAME;	//ユニットのアニメのフレームを上向きのものにする
        		//右に進むなら
        		if(beforeJ > j){
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

                //マップへの参照を変数にする
                var self = this;
                //アニメーションしながら船を所定の位置まで移動させる
                fune.tl.moveTo(worldPosition.x, worldPosition.y, 10 *cost, enchant.Easing.QUAD_EASEINOUT).then(function(){
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

                //マンハッタン距離で移動可能な場所であれば
                if (this.getManhattanDistance(this.activeFune.i, this.activeFune.j, tile.i, tile.j) <= this.activeFune.getMovement()) {
                    //進路データを取得する
                	var path = this.getPath(this.activeFune, this.activeFune.i, this.activeFune.j, tile.i, tile.j);
                    //進路のコストが船の移動力に収まれば移動処理を開始する
                	if (path.cost <= this.activeFune.getMovement()) {
                        var self = this;		//GameMapへの参照を変数に格納する
                        utils.beginUIShield();	//一時的に操作不能にする
                        //船を動かす
                        self.moveFune(self.activeFune, path, function() {
                            self.controller.endTurn();	//移動を終えたらターンを終了する
                        });
                    }
                }
            }
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
                this.mapMarker.image = game.assets[mapUI];
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
                this.mapMarker.frame = 1;	//灰色になる
            //通行可能な場所である
            } else {
            	//移動可能な場所なら
                if (this.getManhattanDistance(this.activeFune.i, this.activeFune.j, tile.i, tile.j) <= this.activeFune.getMovement()) {
                    var path = this.getPath(this.activeFune, this.activeFune.i, this.activeFune.j, tile.i, tile.j);
                    //移動コストが足りていれば
                    if (path.cost <= this.activeFune.getMovement()) {
                        //赤くする
                        this.mapMarker.frame = 0;
                    //足りていなければ
                    } else {
                    	//灰色にする
                        this.mapMarker.frame = 1;
                    }
                //移動できない場所なら
                } else {
                	//灰色にする
                    this.mapMarker.frame = 1;
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
                areaSprite.image = game.assets[mapUI];
                //移動可能の場所なら
                if (nextPostion.open) {
                	//frameオブジェクトを2にする
                    areaSprite.frame = 2;
                //そうでなければ
                } else {
                	//frameオブジェクトを3にsる
                    areaSprite.frame = 3;
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
        		unitTurn.frame = unit.fune.frame;	//アニメーションのフレームをセットする
        		
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
            fune.image = game.assets[shipsSpriteSheet];	//画像をセットする
            
            //アニメーション用のフレームをセットする
            fune.frame = [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 3, 3, 3];
            fune.frame = [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 3, 3, 3];
            fune.sinkFrame = [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, null];
            
            this.addChild(fune);	//作成した船データを追加する

            //HPバーを作成する
            var healthBackSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthBackSprite  = healthBackSprite;
            healthBackSprite.image = game.assets[uiHealthBack];
            healthBackSprite.y     = TIP_LENGTH -6;
            this.addChild(healthBackSprite);

            var healthRedSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthRedSprite  = healthRedSprite;
            healthRedSprite.originX = 0
            healthRedSprite.image = game.assets[uiHealthRed];
            healthRedSprite.y     = TIP_LENGTH -6;
            this.addChild(healthRedSprite);

            var healthGreenSprite   = new Sprite(TIP_LENGTH, 12);
            this.healthGreenSprite  = healthGreenSprite;
            healthGreenSprite.originX = 0
            healthGreenSprite.image = game.assets[uiHealthGreen];
            healthGreenSprite.y     = TIP_LENGTH -6;
            this.addChild(healthGreenSprite);

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
                damage = (baseDamage +variableDamage) *2;
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
                explosion.x = otherFune.x +32;
                explosion.y = otherFune.y +32;
                this.player.controller.sndManager.playFX(sndExplosion);
                game.currentScene.addChild(explosion);

                if (isCritical) {
                    var alertWindow = new AlertWindow("クリティカル！", this.player.controller);
                    var self = this;
                    alertWindow.onTouch = function() {
                        if (afterHp <= 0) {
                            var alertWindow = new AlertWindow("沈没...", self.player.controller);
                            alertWindow.onTouch = function() {
                                otherFune.sinkShip();
                                self.player.controller.endTurn();
                            }
                        } else {
                            self.player.controller.endTurn();
                        }
                    }
                } else {
                    if (afterHp <= 0) {
                        var alertWindow = new AlertWindow("沈没...", this.player.controller);
                        var self = this;
                        alertWindow.onTouch = function() {
                            otherFune.sinkShip();
                            self.player.controller.endTurn();
                        }
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
                    if (self.canUseSkill() && self.player.activeFune() === self) {
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
            var pirateChibi = new Sprite(512, 512);
            pirateChibi.image = this.getChibiImage();
            pirateChibi.opacity = 0;
            if (this.scaleX > 0) {
                pirateChibi.x = -50;
            } else {
                pirateChibi.x = GAME_SCREEN_WIDTH -512 +50;
            }
            var alertWindow = new AlertWindow(this.getSkillName(), this.player.controller);
            alertWindow.addChild(pirateChibi, alertWindow.firstChild);
            pirateChibi.tl.fadeIn(10);
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
            this.player.controller.sndManager.playFX(sndSinkShip);
            this.player.removeFune(this);
            this.counter = 1;
            this.fune.frame = this.fune.sinkFrame;
            this.onenterframe = function(){ // enterframe event listener
                this.counter++;
                if (this.counter == 12 ) {
                    this.parentNode.removeChild(this);
                }
            };
        }
    });

    /**
     * 船の種類
     */
    //ベース船のクラスを継承して、必要な部分を上書きする
    //キャプテン船
    var CaptainFune = Class.create(BaseFune, {
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  4,
                range:     3,
                attack:  100,
                defense:  50,
                hpMax:   120,
                speed:	5
            });
           	//アニメ設定           
            this.fune.frame = [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 3, 3, 3];
            this.fune.sinkFrame = [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, null];
        },

        getCaptainName: function() {
            return "キャプテン";
        },

        getSkillName: function() {
            return "オウエン";
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
            this.onenterframe = function(){ // enterframe event listener
                this.counter++;
                if (this.counter == 12 ) {
                    this.parentNode.removeChild(this);
                }
            };
        }

    });

    //ドイツ兵
    var deutschSoldier = Class.create(BaseFune, {
    	initialize: function(id) {
    		BaseFune.call(this, id, {
    			movement:  4,
    			range:     3,
    			attack:  100,
    			defense:  50,
    			hpMax:   120,
    			speed:	5
    		});

    		//画像幅の定数
    		//ドイツ兵画像
    		DEUTSCH_WIDTH = 24; DEUTSCH_HEIGHT = 32;
    		
    		//高さを変更する
    		this.fune.height = DEUTSCH_HEIGHT;
    		//幅を変更する
    		this.fune.width = DEUTSCH_WIDTH;
    		//画像が小さめなので拡大倍率を指定する
    		this.fune.scaleX = DEUTSCH_SCALE;
    		this.fune.scaleY = DEUTSCH_SCALE;
    		
    		//ドイツ兵のスプライトシートを使う
    		this.fune.image = game.assets[deustchSoldier]; 
    		//アニメ設定           
    		this.fune.frame = [10, 10, 10, 9, 9, 9, 11, 11, 11, 9, 9];
    		this.fune.sinkFrame = [12, 12, null, null, 12, 12, null, null, 12, 12, null, null];
    	},
    	
    	getCaptainName: function() {
    		return "ドイツ兵";
    	},
    	
    	getSkillName: function() {
    		return "応急手当";
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
    		//this.player.leaderLiving = false;
    		
    		this.player.removeFune(this);
    		this.counter = 1;
    		this.fune.frame = this.fune.sinkFrame;
    		this.onenterframe = function(){ // enterframe event listener
    			            this.counter++;
    			if (this.counter == 12 ) {
    				this.parentNode.removeChild(this);
    			}
    			    };
    	}
    	
    });
    
    //速い船
    var HayaiFune = Class.create(BaseFune, {
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  5,
                range:     3,
                attack:   80,
                defense:  60,
                hpMax:    80,
                speed:	10
            });

            this.moveType   = "light";
            this.fune.frame = [8, 8, 8, 8, 9, 9, 9, 10, 10, 9, 9, 8, 8, 8, 8, 11, 11, 11];
            this.fune.sinkFrame = [11, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, null];
        },

        getCaptainName: function() {
            return "はやいちゃん";
        },

        getSkillName: function() {
            return "ハリーアップ";
        },

        processSkill: function(onEnd) {
            this.player.controller.getFreeTurns(this.player, 2);
            onEnd();
        },
    });

    //固い船
    var KataiFune = Class.create(BaseFune, {
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  3,
                range:     3,
                attack:   80,
                defense:  60,
                hpMax:   240,
                speed:	2
            });

            this.moveType   = "heavy";
            this.fune.frame = [16, 16, 16, 16, 17, 17, 17, 18, 18, 17, 17, 16, 16, 16, 16, 19, 19, 19];
            this.fune.sinkFrame = [19, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, null];
            this.indestructible = false;
        },

        getCaptainName: function() {
            return "かたいちゃん";
        },

        getSkillName: function() {
            return "アイロンシールド";
        },

        processSkill: function(onEnd) {
            this.indestructible = true;
            onEnd();
        },

        attackFune: function(otherFune) {
            this.indestructible = false;
            BaseFune.prototype.attackFune.call(this, otherFune);
        },

        takeDamage: function(damage) {
            if (this.indestructible) {
                this.indestructible = false
                return this.getHP()
            } else {
                return BaseFune.prototype.takeDamage.call(this, damage);
            }
        },
    });

    //攻撃タイプの船
    var KougekiFune = Class.create(BaseFune, {
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  3,
                range:     3,
                attack:  120,
                defense:  40,
                hpMax:   150,
                speed:	4
            });

            this.fune.frame = [24, 24, 24, 24, 25, 25, 25, 26, 26, 25, 25, 24, 24, 24, 24, 27, 27, 27];
            this.fune.sinkFrame = [27, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, null];
        },

        getCaptainName: function() {
            return "こうげきちゃん";
        },

        getSkillName: function() {
            return "バレットストーム";
        },

        processSkill: function(onEnd) {
            var damage = this.stats.attack;
            var count = this.player.controller.getNonActivePlayer().getFuneCount();
            for(var i=0; i < count; i++) {
                var fune = this.player.controller.getNonActivePlayer().getFune(i);
                if (this.withinRange(fune.i, fune.j)) {
                    var afterHp = fune.takeDamage(damage);
                    var explosion = new Explosion();
                    explosion.x = fune.x +32;
                    explosion.y = fune.y +32;
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

    //敵の船の基底クラス
    var TekiFune = Class.create(BaseFune, {
        initialize: function(id) {
            BaseFune.call(this, id, {
                movement:  4,
                range:     3,
                attack:   50,
                defense:  40,
                hpMax:    50,
                speed:	3
            });

            this.moveType   = "light";
            this.fune.frame = [32, 32, 32, 32, 33, 33, 34, 34, 34, 33, 33, 32, 32, 32, 32, 35, 35, 35];
            this.fune.sinkFrame = [35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, null];
        },

        getCaptainName: function() {
            return "テシタちゃん";
        },

        getSkillName: function() {
            return "パワーアップ";
        },

        processSkill: function(onEnd) {
            this.stats.attack  += 10;
            this.stats.defense += 10;
            onEnd();
        },
    });

    //ボス船
    var BossFune = Class.create(KougekiFune, {
        initialize: function(id) {
            KougekiFune.call(this, id);

            this.stats.hpMax = 200;
            this.stats.hp    = this.stats.hpMax;

            this.moveType   = "normal";
            this.fune.frame = [40, 40, 40, 40, 41, 41, 41, 42, 42, 41, 41, 40, 40, 40, 40, 43, 43, 43];
            this.fune.sinkFrame = [43, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, null];
        },

        getCaptainName: function() {
            return "ボス";
        },

        getSkillName: function() {
            return "カミワザ";
        },

        processSkill: function(onEnd) {
            var count = this.player.getFuneCount();
            for(var i=0; i < count; i++) {
                var fune = this.player.getFune(i);
                var toHeal = Math.ceil(fune.getHPMax() /4);
                fune.healDamage(toHeal);
            }

            KougekiFune.prototype.processSkill.call(this, onEnd);
        },
    });

    var BossTeki = Class.create(CaptainFune, {
        initialize: function(id) {
            CaptainFune.call(this, id);

            this.fune.frame = [32, 32, 32, 32, 33, 33, 33, 34, 34, 33, 33, 32, 32, 32, 32, 35, 35, 35];
            this.fune.sinkFrame = [35, 35, 35, 36, 36, 37, 37, 38, 38, 39, 39, null];
        },

        getCaptainName: function() {
            return "ボスちゃん";
        },

        processSkill: function(onEnd) {
            this.stats.attack  += 10;
            this.stats.defense += 10;
            onEnd();
        },
    });

    var HayaiTeki = Class.create(HayaiFune, {
        initialize: function(id) {
            HayaiFune.call(this, id);

            this.stats.hpMax = Math.floor(0.5 * this.stats.hpMax);
            this.stats.hp = this.stats.hpMax;

            this.fune.frame = [40, 40, 40, 40, 41, 41, 41, 42, 42, 41, 41, 40, 40, 40, 40, 43, 43, 43];
            this.fune.sinkFrame = [43, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, null];
        },

        getCaptainName: function() {
            return "ハヤイくん";
        },
    });

    var KataiTeki = Class.create(KataiFune, {
        initialize: function(id) {
            KataiFune.call(this, id);

            this.stats.hpMax = Math.floor(0.5 * this.stats.hpMax);
            this.stats.hp = this.stats.hpMax;

            this.fune.frame = [48, 48, 48, 48, 49, 49, 49, 50, 50, 49, 49, 48, 48, 48, 48, 51, 51, 51];
            this.fune.sinkFrame = [51, 51, 51, 52, 52, 53, 53, 54, 54, 55, 55, null];
        },

        getCaptainName: function() {
            return "カタイくん";
        },
    });

    var KougekiTeki = Class.create(KougekiFune, {
        initialize: function(id) {
            KougekiFune.call(this, id);

            this.stats.hpMax = Math.floor(0.5 * this.stats.hpMax);
            this.stats.hp = this.stats.hpMax;

            this.fune.frame = [56, 56, 56, 56, 57, 57, 57, 58, 58, 57, 57, 56, 56, 56, 56, 59, 59, 59];
            this.fune.sinkFrame = [59, 59, 59, 60, 60, 61, 61, 62, 62, 63, 63, null];
        },

        getCaptainName: function() {
            return "コウゲキくん";
        },
    });    
    
    //爆発アニメ
    var Explosion = Class.create(Sprite, {
        initialize: function(id, stats) {
            Sprite.call(this, 32, 32);

            this.image = game.assets[explosionSpriteSheet];
            this.frame = [0,1,2,3,1,2,3,4,null];

            this.counter = 0;
        },
        onenterframe:function(){ // enterframe event listener
            this.counter++;
            if (this.counter == 9 ) {
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
        	//ユニットからのプレイヤーへの参照を無効にする
            delete fune.player;
            
            //ユニットのリストを更新するため、配列を生成する
            var newList = [];
            //ユニットの数を数えるループ
            for (var i=0; i < this.getFuneCount(); ++i) {
            	//ユニットを取得し、それがやられたユニットでなければ
                if (this.getFune(i) != fune) {
                	//ユニットリストに該当するユニットを登録する
                    newList.push(this.getFune(i));
                }
            }
            //プレイヤーのユニットのリストを更新する
            this.funeList = newList;

            //@mod 2015.0522 T.Masuda 行動順リストからやられたユニットを削除する記述を追加しました
            //行動順リストを取得する
            var turnList = this.manager.turnList;
            //やられたユニットを見つけるループを開始する
            for(var i = 0; i < turnList.length; i++){
            	//ユニットが見つかったら
            	if(fune === turnList[i]["unit"]){
            		//該当するインデックス(=ユニットの連想配列)を削除する
            		delete turnList[i];
            		//削除するユニットが行動後であれば
            		if(i >= this.activeUnit){
            			//行動順がずれるので、行動順の数値を修正する
            			this.activeUnit -= 1;
            		}
            	}
            }
            //ここまで変更しました
            
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
            this.controller.updateTurn();
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
                                self.controller.endTurn();
                            })
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
            var maxFuneIndex = this.player.getFuneCount();
            var funeIndex    = Math.floor(Math.random() * maxFuneIndex);
            var fune         = this.player.getFune(funeIndex);

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
            var maxFuneIndex = this.player.getFuneCount();
            var funeIndex    = Math.floor(Math.random() * maxFuneIndex);
            var fune         = this.player.getFune(funeIndex);
            return fune;
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
                if (fune instanceof CaptainFune) {
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
                } else if (fune instanceof KougekiFune) {
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
            if (fune instanceof KataiFune) {
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
                var fune = this.player.getFune(i);

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
            var path = this.getRandomPath(fune, 0.5);
            if (path == null) {
                console.log("AI no safe path");
                path = this.getRandomPath(fune, 0.0);
            }
            console.log("AI random move", fune.getCaptainName());
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
            for(var i=0; i < count; i++) {
                var fune = this.player.getFune(i);

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
            var path = this.getRandomPath(fune, 0.5);
            if (path == null) {
                console.log("AI no safe path");
                path = this.getRandomPath(fune, 0.0);
            }
            console.log("AI random move", fune.getCaptainName());
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
                var fune = this.player.getFune(i);

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
            var path = this.getRandomPath(fune, 0.8);
            if (path == null) {
                console.log("AI no safe path");
                path = this.getRandomPath(fune, 0.0);
            }
            console.log("AI random move", fune.getCaptainName());
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

        //対戦プレイを開始する関数
        beginVersusGame: function(opponent) {
            this.mode = "versus";

            // 船の初期の位置
            var startPositions = {
                player1: [
                    {i: 0, j: 8}, {i: 0, j: 6}, {i: 1, j: 7}, {i: 2, j: 8}
                ],
                player2: [
                    {i: 12, j: 0}, {i: 10, j: 0}, {i: 11, j: 1}, {i: 12, j: 2}
                ],
            }
            this.setStartPositions(startPositions);

            // プレイヤー１
            var player1 = new GamePlayer(1, {name:"プレイヤー１"}, this);
            this.addPlayer(player1);
            // プレイヤー1に船を４つあげよう
            player1.addFune(new CaptainFune(1));
            player1.addFune(new HayaiFune(2));
            player1.addFune(new KataiFune(3));
            player1.addFune(new KougekiFune(4));

            this.placePlayerShips(player1);

            // プレイヤー２
            var player2;
            if (opponent == "human") {
                player2 = new GamePlayer(2, {name:"プレイヤー２"}, this);
            } else if (opponent == "ai") {
                player2 = new AIPlayer(2, {name:"プレイヤー２"}, this);
            }

            this.addPlayer(player2);
            // プレイヤー1に船を４つあげよう
            player2.addFune(new CaptainFune(1));
            player2.addFune(new HayaiFune(2));
            player2.addFune(new KataiFune(3));
            player2.addFune(new KougekiFune(4));

            this.placePlayerShips(player2);

            this.sndManager.playBGM();
            //ユニットの行動順番リストを作る
            this.createTurnList();
            //ゲームを開始する
            this.startTurn();
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
            var player1 = new GamePlayer(1, {name:"プレイヤー１"}, this);
            this.addPlayer(player1);

            if (funeList) {
                for(var funeIndex = 0; funeIndex < funeList.length; funeIndex++) {
                    var fune = this.funeFactory(funeList[funeIndex]);
                    player1.addFune(fune);
                }
            } else {
                // プレイヤー1に船を４つあげよう
                player1.addFune(new CaptainFune(1));
                //@mod 2015.0526 T.Masuda 試験的にドイツ兵を追加 
//                player1.addFune(new HayaiFune(2));
                player1.addFune(new deutschSoldier(11));
                player1.addFune(new KataiFune(3));
                player1.addFune(new KougekiFune(4));
            }

            // 船の初期の位置
            var startPositions = {
                player1: [
                    {i: 0, j: 8}, {i: 0, j: 6}, {i: 1, j: 7}, {i: 2, j: 8}
                ],
            }
            this.setStartPositions(startPositions);

            this.placePlayerShips(player1);

            if (this.getPlayer(2) == undefined) {
                var player2 = new AIPlayer(2, {name:"敵"}, this);
                this.addPlayer(player2);
            }

            //ステージIDがなければステージIDを1にセットする
            stageId = stageId ? stageId: 1; 
            //ステージIDに応じたステージをセットする
            this.setupStage(stageId);

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
                var fune = this.funeFactory(entry.type);
                //ユニットの中心のX座標を指定する
                fune.originX = TIP_LENGTH / 2;
                //逆向きにする
                fune.scaleX = -1;
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
        	//
            //this.map.setActiveFune(this.getActivePlayer().getActiveFune());
        	//動かすユニットを決める
            this.map.setActiveFune(this.turnList[this.activeUnit]["unit"]);
            
            this.map.drawMovementRange();
            this.frameUI.updateTurn(this.turnCounter);
            this.frameUI.updatePlayer(this.getActivePlayer().getData("name"));
            this.sndManager.playFX(sndChangeShips);
            //ユニットの行動順の表示を更新する
            this.map.showUnitTurn(3, UNITTURN_X, UNITTURN_Y);
        },

        //ターン終了の関数
        endTurn: function() {
        	//アクティブプレイヤーを取得する
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
        
        //対戦モードを終了する関数
        versusOver: function(winner) {
            var touchable = new ShieldWindow(this);
            utils.beginUIShield();

            //バナー
            var playerBanner = new Sprite(512, 256);
            if (winner.id == 1) {
                playerBanner.image = game.assets[uiPlayerBanner1];
            } else if (winner.id == 2) {
                playerBanner.image = game.assets[uiPlayerBanner2];
            }

            playerBanner.opacity = 0;
            playerBanner.x = 480 -256;
            playerBanner.y = 320 -128;
            game.currentScene.addChild(playerBanner);

            var self = this;
            playerBanner.tl.fadeIn(20).delay(30).fadeOut(10).then(function() {
                game.currentScene.removeChild(playerBanner);

                var resultBanner = new Sprite(512, 256);
                resultBanner.image = game.assets[uiWin];
                resultBanner.opacity = 0;
                resultBanner.touchEnabled = false;
                resultBanner.x = 480 -256;
                resultBanner.y = 320 -128;
                game.currentScene.addChild(resultBanner);

                resultBanner.tl.fadeIn(20).then(function(){
                    touchable.onTouch = function() {
                        location.reload();
                    };
                    utils.endUIShield();
                });
            });
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
                    //タッチ処理
                    touchable.onTouch = function() {
                    	
                    	//各プレイヤーを回復
                        self.refreshPlayer(self.getPlayer(1));
                        
                        //次のステージをセットする
                        self.setupStage(self.stageId + 1);
                        //行動順をリセットする
                        self.activeUnit = 0;
                        //ユニットの行動順番リストを作る
                        self.createTurnList();
                        //ステージデモを開始する
                        self.loadStageDemo(self.stageId , self);

                    };
                //敗北時の処理
                } else if (winner.id == 2) {
                    resultBanner.image = game.assets[uiLose];
                    //ツイートボタンのデータを作る
                    var tweet = new TwitterButton({
                    	//負けたステージの番号
                        stageId: self.stageId,
                        //ゲームのURL
                        url: "https://dl.dropboxusercontent.com/u/4325065/pirateTactics/enchant.js-builds-0.8.1/game/pirates/head/index.html"
                    });
                    //ツイートボタンを追加する
                    touchable.addChild(tweet);
                    tweet.x = 480 -32;
                    tweet.y = 450;

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
        funeFactory: function(name) {
            switch(name) {
                //キャプテン
            	case 1:
                case "captain":
                    return new CaptainFune(1);
                //はやい船
                case 2:
                case "hayai":
                    return new HayaiFune(2);
                    //固い船
                case 3:
                case "katai":
                    return new KataiFune(3);
                    //攻撃型の船
                case 4:
                case "kougeki":
                    return new KougekiFune(4);
                    //雑魚敵船
                case 5:
                case "teki":
                    return new TekiFune(5);
                    //ボス船
                case 6:
                case "boss":
                    return new BossFune(6);
                case 7:
                case "boss_teki":
                	return new BossTeki(7);
                case 8:
                case "hayai_teki":
                	return new HayaiTeki(8);
                case 9:
                case "katai_teki":
                	return new KataiTeki(9);
                case 10:
                case "kougeki_teki":
                	return new KougekiTeki(10);
                case 11:
                case "deutschSoldier":
                	return new deutschSoldier(11);
            }
        },
    })

    /**
     * ターン関係の情報を表示するクラス
     */
    var FrameUI = Class.create({
        initialize: function(scene) {
            var fontColor = "rgba(255, 255, 105, 1.0)";

            this.turnLabel = new Label();
            scene.addChild(this.turnLabel);
            this.turnLabel.x = TIP_LENGTH*5;
            this.turnLabel.y = GAME_SCREEN_HEIGHT -40;
            this.turnLabel.font = NORMAL_FONT_STYLE;
            this.turnLabel.color = fontColor;

            this.playerLabel = new Label();
            scene.addChild(this.playerLabel);
            this.playerLabel.x = TIP_LENGTH;
            this.playerLabel.y = GAME_SCREEN_HEIGHT -40;
            this.playerLabel.font = NORMAL_FONT_STYLE;
            this.playerLabel.color = fontColor;

            this.stageLabel = new Label();
            scene.addChild(this.stageLabel);
            this.stageLabel.x = TIP_LENGTH*8;
            this.stageLabel.y = GAME_SCREEN_HEIGHT -40;
            this.stageLabel.font = NORMAL_FONT_STYLE;
            this.stageLabel.color = fontColor;

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
            //ループ再生の設定を行う。ブラウザ別のaudioタグの実装ごとに対応した処理を行う
            if(game.assets[sndBGM].src){
                game.assets[sndBGM].src.loop = true;
            } else {
                game.currentScene.addChild(this);
            }
            game.assets[sndBGM].volume = this.volume *0.3;
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

            var fontColor = "rgba(255, 255, 105, 1.0)";

            //ステータス表示
            captainLabel = new Label("船長："+fune.getCaptainName());
            statsGroup.addChild(captainLabel);
            captainLabel.x = 0;
            captainLabel.y = 0;
            captainLabel.font = NORMAL_FONT_STYLE;
            captainLabel.color = fontColor;

            attackLabel = new Label("攻撃力："+fune.getAttack());
            statsGroup.addChild(attackLabel);
            attackLabel.x = 0;
            attackLabel.y = TIP_LENGTH *1;
            attackLabel.font = NORMAL_FONT_STYLE;
            attackLabel.color = fontColor;

            defenseLabel = new Label("防御力："+fune.getDefense());
            statsGroup.addChild(defenseLabel);
            defenseLabel.x = 0;
            defenseLabel.y = TIP_LENGTH *2;
            defenseLabel.font = NORMAL_FONT_STYLE;
            defenseLabel.color = fontColor;

            movementLabel = new Label("移動力："+fune.getMovement());
            statsGroup.addChild(movementLabel);
            movementLabel.x = 0;
            movementLabel.y = TIP_LENGTH *3;
            movementLabel.font = NORMAL_FONT_STYLE;
            movementLabel.color = fontColor;

            rangeLabel = new Label("攻撃の距離："+fune.getRange());
            statsGroup.addChild(rangeLabel);
            rangeLabel.x = 0;
            rangeLabel.y = TIP_LENGTH *4;
            rangeLabel.font = NORMAL_FONT_STYLE;
            rangeLabel.color = fontColor;

            hpLabel = new Label("HP："+fune.getHP()+"/"+fune.getHPMax());
            statsGroup.addChild(hpLabel);
            hpLabel.x = 0;
            hpLabel.y = TIP_LENGTH *5;
            hpLabel.font = NORMAL_FONT_STYLE;
            hpLabel.color = fontColor;

            //ここまでステータス

            //海賊の画像
            var pirate = new Sprite(400, GAME_SCREEN_HEIGHT);
            pirate.x = 350;
            pirate.y = -50;
            pirate.opacity = 0;
            pirate.image = fune.getImage();
            windowGroup.addChild(pirate);

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
            if (fune.usedSkill ||fune == fune.player.getActiveFune()) {
            	//必殺技ボタンを半透明にして使用済みの表現を行う
                skillBtnSprite.opacity = 0.5;
            }

            windowGroup.originX = 256;
            windowGroup.originY = 256;
            windowGroup.scaleX = 0.7;
            windowGroup.scaleY = 0.7;
            //ウィンドウの出現時の処理
            windowGroup.tl.scaleTo(1, 10, enchant.Easing.ELASTIC_EASEOUT).then(function() {
                pirate.y = -50;
                pirate.tl.moveBy(-50, -25, 5).and().fadeIn(10);

                //キャンセルボタンのアニメーション
                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                    cancelBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
                });

                cancelBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                    shieldSprite.tl.fadeTo(0, 5);
                    cancelBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                    pirate.tl.fadeTo(0, 5);
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
                        pirate.tl.fadeTo(0, 5);
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


    //ツイートボタン
    var TwitterButton = Class.create(Sprite, {
        initialize: function(options) {
            Sprite.call(this, TIP_LENGTH, TIP_LENGTH);
            this.image = game.assets[uiTwitterBtnSprite];
            this.stageId = options.stageId;
            this.url     = options.url;
        },

        ontouchend: function(params) {
            window.open("https://twitter.com/intent/tweet?url="+encodeURIComponent(this.url)+"&text="+encodeURIComponent("ステージ"+this.stageId+"まで行けました！みんなはどこまで行ける？")+"&hashtags=piratesTactics,海賊", "twitter", "top=50, left=50, width=500, height=400");
        }
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

            
            var fontColor = "rgba(255, 255, 105, 1.0)";

            messageLabel = new Label(message);
            this.addChild(messageLabel);
            messageLabel.x = windowSprite.x +40;
            messageLabel.y = windowSprite.y +TIP_LENGTH;
            messageLabel.font = NORMAL_FONT_STYLE;
            messageLabel.color = fontColor;
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
        initialize: function(message, gameManager, image) {
        	//お知らせウィンドウのコンストラクタを実行する
        	AlertWindow.call(this, message,gameManager);
        	//デモウィンドウ用のフォントを指定する
        	this.messageLabel.font = DEMO_FONT_STYLE;

            //画像パスが第3引数にセットされていれば
            if(image !== void(0) && image != ''){
            	//顔写真のスプライトを作る
            	var faceImage = new Sprite(100, 100);
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
        	
        	//フォントの色を設定する
        	var fontColor = "rgba(255, 255, 105, 1.0)";
        	//ループでラベルを作成する
        	for(var i = 0; text.length > 0; i++){
        		//新たなラベルを生成する
        		var label = new Label();
        		this.addChild(label);	//ラベルをウィンドウに追加する
        		//テキストを1行分切り出してセットする
        		label.text = text.substr(0, MESSAGE_NUMBER_PER_LINE);
        		//切り出した残りを自らにセットする
        		text = text.substr(MESSAGE_NUMBER_PER_LINE);
        		label.font = DEMO_FONT_STYLE;	//このウィンドウ用のフォントをセットする
        		label.color = fontColor;		//フォントの色をセットする
        		//ラベルの座標をセットする
        		label.x = this.windowSprite.x + WINDOW_MARGIN + faceImage.width;
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

            var fontColor = "rgba(255, 255, 105, 1.0)";

            soundLabel = new Label("音量");
            settingsGroup.addChild(soundLabel);
            soundLabel.x = 0;
            soundLabel.y = 16;
            soundLabel.font = NORMAL_FONT_STYLE;
            soundLabel.color = fontColor;

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
            windowGroup.x = (GAME_SCREEN_WIDTH -512)/2;
            windowGroup.y = (GAME_SCREEN_HEIGHT -512)/2;
            this.addChild(windowGroup);

            var windowSprite = new Sprite(512, 512);
            windowSprite.image = game.assets[uiStartScreen];
            windowGroup.addChild(windowSprite);

            var self = this;
            var versusBtnSprite = new Sprite(128, TIP_LENGTH);
            versusBtnSprite.image = game.assets[uiVersusBtnSprite];
            versusBtnSprite.x = TIP_LENGTH *1.5;
            versusBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(versusBtnSprite);

            var campaignBtnSprite = new Sprite(128, TIP_LENGTH);
            campaignBtnSprite.image = game.assets[uiStoryBtnSprite];
            campaignBtnSprite.x = TIP_LENGTH *4.5;
            campaignBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(campaignBtnSprite);

            windowGroup.originX = 256;
            windowGroup.originY = 256;

            versusBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                versusBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
            });

            versusBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                shieldSprite.tl.fadeTo(0, 5);
                versusBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                windowSprite.tl.fadeTo(0, 5).then(function() {
                    gameManager.sndManager.playFX(sndClick);
                    game.popScene();
                    new VersusScreen(gameManager);
                });
            });

            campaignBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                campaignBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
            });

            campaignBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                campaignBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                windowSprite.tl.fadeTo(0, 5).then(function() {
                    gameManager.sndManager.playFX(sndClick);
                    game.popScene();
                    new CampaignScreen(gameManager);
                });
            });
        },
    })

    /**
     * ストーリーモードの開始画面
     */
    var CampaignScreen = Class.create(Scene, {
        initialize: function(gameManager) {
            Scene.call(this);
            game.pushScene(this);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.5
            this.addChild(shieldSprite);

            var windowGroup = new Group();
            windowGroup.x = (GAME_SCREEN_WIDTH -512)/2;
            windowGroup.y = (GAME_SCREEN_HEIGHT -512)/2;
            this.addChild(windowGroup);

            var windowSprite = new Sprite(512, 512);
            windowSprite.image = game.assets[uiStoryScreen];
            windowGroup.addChild(windowSprite);

            var self = this;

            var saveData = $.jStorage.get("save data");
            if (saveData) {
                console.log("Found Save Data", saveData.stageId)
                var continueBtnSprite = new Sprite(128, TIP_LENGTH);
                continueBtnSprite.image = game.assets[uiContinueBtnSprite];
                continueBtnSprite.x = TIP_LENGTH *1.5;
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
            newBtnSprite.x = TIP_LENGTH *4.5;
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
        },
    })

    //対戦モードの開始ウィンドウ
    var VersusScreen = Class.create(Scene, {
        initialize: function(gameManager) {
            Scene.call(this);
            game.pushScene(this);

            var shieldSprite = new Sprite(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT);
            shieldSprite.image = game.assets[ui1x1Black];
            shieldSprite.opacity = 0.5
            this.addChild(shieldSprite);

            var windowGroup = new Group();
            windowGroup.x = (GAME_SCREEN_WIDTH -512)/2;
            windowGroup.y = (GAME_SCREEN_HEIGHT -512)/2;
            this.addChild(windowGroup);

            var windowSprite = new Sprite(512, 512);
            windowSprite.image = game.assets[uiVSScreen];
            windowGroup.addChild(windowSprite);

            var self = this;

            var humanBtnSprite = new Sprite(128, TIP_LENGTH);
            humanBtnSprite.image = game.assets[uiHumanBtnSprite];
            humanBtnSprite.x = TIP_LENGTH *1.5;
            humanBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(humanBtnSprite);

            windowGroup.originX = 256;
            windowGroup.originY = 256;

            humanBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                humanBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
            });

            humanBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                shieldSprite.tl.fadeTo(0, 5);
                humanBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                windowSprite.tl.fadeTo(0, 5).then(function() {
                    gameManager.beginVersusGame("human");
                    gameManager.sndManager.playFX(sndClick);
                    game.popScene();
                });
            });

            var cpuBtnSprite = new Sprite(128, TIP_LENGTH);
            cpuBtnSprite.image = game.assets[uiCpuBtnSprite];
            cpuBtnSprite.x = TIP_LENGTH *4.5;
            cpuBtnSprite.y = 512 -TIP_LENGTH -32;
            windowGroup.addChild(cpuBtnSprite);

            windowGroup.originX = 256;
            windowGroup.originY = 256;

            cpuBtnSprite.addEventListener(enchant.Event.TOUCH_START, function(params) {
                cpuBtnSprite.tl.scaleTo(1.1, 10, enchant.Easing.ELASTIC_EASEOUT)
            });

            cpuBtnSprite.addEventListener(enchant.Event.TOUCH_END, function(params) {
                shieldSprite.tl.fadeTo(0, 5);
                cpuBtnSprite.tl.scaleTo(0.9, 3).and().fadeTo(0, 5);
                windowSprite.tl.fadeTo(0, 5).then(function() {
                    gameManager.beginVersusGame("ai");
                    gameManager.sndManager.playFX(sndClick);
                    game.popScene();
                });
            });
        },
    })
    /**
     * ロードが完了した直後に実行される関数を指定している。
     */
    game.onload = function(){
        var sceneGameMain = new Scene();

        // ゲームロジックの管理
        var manager = new GameManager();

        // マスのデータ
        var mapDisplayData = [
            [3, 3, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],
            [3, 2, 0, 0, 2, 3, 3, 2, 0, 1, 0, 0, 0],
            [3, 0, 4, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0],
            [3, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0, 1, 1, 0, 4, 0],
            [1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
            [0, 0, 0, 3, 3, 2, 0, 0, 0, 0, 4, 2, 3],
            [0, 0, 0, 3, 3, 3, 2, 0, 0, 2, 2, 3, 3],
        ];

        var map = new GameMap(sceneGameMain, mapDisplayData, manager);
        manager.setMap(map);

        var frameUI = new FrameUI(sceneGameMain);
        manager.setFrameUI(frameUI);

        // ゲームにシーンを追加
        game.pushScene(sceneGameMain);
        new StartScreen(manager);
    };

    game.start();
};
