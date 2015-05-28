(function() {
	//画像パスの連想配列を用意する
	var imagePath ={
			ocean:"resources/pipo-battlebg009.jpg",
			stoneTile:"resources/pipo-battlebg010.jpg",
			mystery:"resources/map00.png",
			pirate0:"resources/pirate00thumb.png",
			pirate1:"resources/pirate01thumb.png",
			pirate2:"resources/pirate02thumb.png",
			pirate3:"resources/pirate03thumb.png"
	}
    /* detect a dollar object or create one if not found */
    window.StageData = [
        {
            startPositions: [
 //               {type: "enemy01", i: 11, j: 1},
//                {type: "enemy02", i: 8, j: 1},
 //               {type: "enemy03", i: 10, j: 3}
                {type: "enemy01", i: 2, j: 7}
            ],
            stageBackground:imagePath.stoneTile
        },
        {
            startPositions: [
//                             {type: "enemy01", i: 9, j: 1},
                             {type: "enemy02", i: 7, j: 1},
                             {type: "enemy02", i: 7, j: 2},
                             {type: "enemy03", i: 10, j: 3},
                             {type: "enemy01", i: 2, j: 7}
            ],
            stageBackground:imagePath.mystery
        },
        {
        	startPositions: [
        	                 {type: "enemy01", i: 9, j: 1},
        	                 {type: "enemy02", i: 7, j: 1},
        	                 {type: "enemy02", i: 5, j: 1},
        	                 {type: "enemy03", i: 9, j: 3},
        	                 {type: "enemy03", i: 8, j: 3}
			],
			stageBackground:imagePath.ocean
        }
    ];
    
    //ステージ間デモのデータ
    window.DemoData = [
                       [
                        {message:"Stage 1",portrait:""},
//                        {message:"チーフ:ここが報告にあった研究施設か……",portrait:""},
//                        {message:"チーフ:発展途上国には似つかわしい装備の兵士ばかりだな",portrait:""},
//                        {message:"チーフ:バックに大きな組織か国がついているのは間違いない",portrait:""},
//                        {message:"チーフ:幸い数はたいしたものではない。速やかに制圧するぞ",portrait:""}
                        ],
                        [
                        {message:"Stage 2",portrait:""},
                        {message:"チーフ:何だ、あれは!?モンスター!?",portrait:""},
//                        {message:"チーフ:こいつら、とんでもないものを作っていやがる",portrait:""},
//                        {message:"チーフ:あの体つき、飛びかかりでもされたらひとたまりもないな",portrait:""},
//                        {message:"チーフ:距離を取って集中砲火を浴びせるぞ!",portrait:""},
//                        {message:"チーフ:さあ、化け物退治のはじまりだ!",portrait:""}
                        ],
                       [
                        {message:"Stage 3",portrait:""},
//                        {message:"チーフ:さっきの化け物がこんなにうじゃうじゃいやがる",portrait:""},
//                        {message:"チーフ:さっさと焼き払っておさらばするか",portrait:""},
//                        {message:"チーフ:!? チ、感覚も鋭いみたいだな。隠れているつもりだったが",portrait:""},
//                        {message:"チーフ:あの脚力が相手では到底逃げられん。速やかに掃討した後、施設を爆破する。",portrait:""},
//                        {message:"チーフ:さっさと終わらせて国に帰るぞ!",portrait:""}
                        ]
    ];
    
})();
