(function() {
    /* detect a dollar object or create one if not found */
    window.StageData = [
        {
            startPositions: [
                {type: "captain", i: 1, j: 8},
            ],
            stageBackground:"resources/pipo-battlebg009.jpg"
        },
        {
            startPositions: [
//                {type: "captain", i: 12, j: 0},
                {type: "hayai", i: 12, j: 2},
            ],
            stageBackground:"resources/pipo-battlebg010.jpg"
        },
        {
        	startPositions: [
//                {type: "captain", i: 12, j: 0},
					{type: "hayai", i: 12, j: 2},
			],
			stageBackground:"resources/map00.png"
        }
    ];
    
    //ステージ間デモのデータ
    window.DemoData = [
                       [
                        {message:"第1ステージ開始です",portrait:"画像パス"},
                        {message:"はりきっていきましょう",portrait:"画像パス"},
                        {message:"",portrait:"画像パス"}
                        ],
                        [
                        {message:"第2ステージ開始です",portrait:"画像パス"},
                        {message:"まだまだこれからですよ",portrait:"画像パス"},
                        {message:"負けないでくださいね",portrait:"画像パス"}
                        ],
                       [
                        {message:"第3ステージ開始です",portrait:"画像パス"},
                        {message:"まだまだいけますよね",portrait:"画像パス"}
                        ]
    ];
    
})();
