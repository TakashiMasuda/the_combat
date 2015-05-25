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
                {type: "captain", i: 1, j: 8},
            ],
            stageBackground:imagePath.stoneTile
        },
        {
            startPositions: [
                {type: "hayai", i: 12, j: 2},
            ],
            stageBackground:imagePath.mystery
        },
        {
        	startPositions: [
                {type: "captain", i: 12, j: 0},
				{type: "hayai", i: 12, j: 2},
			],
			stageBackground:imagePath.ocean
        }
    ];
    
    //ステージ間デモのデータ
    window.DemoData = [
                       [
                        {message:"第1ステージ開始です",portrait:imagePath.pirate0},
                        {message:"はりきっていきましょう",portrait:imagePath.pirate1}
                        ],
                        [
                        {message:"第2ステージ開始です",portrait:imagePath.pirate1},
                        {message:"まだまだこれからですよ",portrait:imagePath.pirate3},
                        {message:"負けないでくださいね",portrait:imagePath.pirate2}
                        ],
                       [
                        {message:"第3ステージ開始です",portrait:imagePath.pirate0},
                        {message:"まだまだいけますよね",portrait:imagePath.pirate0}
                        ]
    ];
    
})();
