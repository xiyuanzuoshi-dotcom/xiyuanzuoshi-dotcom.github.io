// script.js

// ゲームの全シーン定義
const gameData = {
    scenes: [
        {
            id: 0,
            text: "今日はユイと一緒に遊ぶ日だ。",
            choices: [
                { text: "持って帰ろう", nextSceneId: 1 },
                { text: "", nextSceneId: 2 }
            ],
            background: "park.jpg",
            character: "yui_happy.png"
        },
        {
            id: 1,
            text: "ユイは楽しそうにブランコに乗っている。でも、どこか悲しげな表情が浮かんでいる。",
            choices: [
                { text: "ユイに話しかける", nextSceneId: 3 },
                { text: "一人で遊ぶ", nextSceneId: 4 }
            ],
            background: "swings.jpg",
            character: "yui_sad.png"
        },
        {
            id: 2,
            text: "ユイは花を摘みながら、どこか遠くを見ている。",
            choices: [
                { text: "ユイに理由を聞く", nextSceneId: 3 },
                { text: "ただ黙って花を摘む", nextSceneId: 4 }
            ],
            background: "flowers.jpg",
            character: "yui_pensive.png"
        },
        {
            id: 3,
            text: "ユイは涙をこらえながら、あなたに言う。「ごめんね、私はもうすぐ…」",
            choices: [
                { text: "もっと話を聞く", nextSceneId: 5 },
                { text: "無理に笑顔で接する", nextSceneId: 6 }
            ],
            background: "sad_park.jpg",
            character: "yui_crying.png"
        },
        {
            id: 4,
            text: "ユイは何も言わずに笑顔を見せ、遊び続ける。",
            choices: [
                { text: "ユイに感謝を伝える", nextSceneId: 7 },
                { text: "黙って遊び続ける", nextSceneId: 8 }
            ],
            background: "happy_park.jpg",
            character: "yui_smiling.png"
        },
        {
            id: 5,
            text: "ユイはあなたにありがとうと言って、微笑みながら消えていく。",
            choices: [],
            background: "empty_park.jpg",
            character: ""
        },
        {
            id: 6,
            text: "ユイは笑顔で過ごし、最後にあなたにありがとうと言って消える。",
            choices: [],
            background: "empty_park.jpg",
            character: ""
        },
        {
            id: 7,
            text: "ユイは笑顔で、もう一度会えることを約束して消える。",
            choices: [],
            background: "happy_park.jpg",
            character: ""
        },
        {
            id: 8,
            text: "ユイは最後に微笑んで、あなたを見つめた後、静かに消える。",
            choices: [],
            background: "empty_park.jpg",
            character: ""
        }
    ]
};

let currentSceneId = 0;

function renderScene() {
    const scene = gameData.scenes[currentSceneId];

    // テキストの更新
    const textElement = document.getElementById("game-text");
    textElement.textContent = scene.text;

    // 背景画像の更新
    const bgElement = document.getElementById("background");
    bgElement.style.backgroundImage = `url(${scene.background})`;

    // キャラクター画像の更新
    const charElement = document.getElementById("character");
    if (scene.character) {
        charElement.style.backgroundImage = `url(${scene.character})`;
    } else {
        charElement.style.backgroundImage = '';
    }

    // 選択肢の表示
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = '';

    if (scene.choices.length === 0) {
        // 選択肢がない場合は「ゲーム終了」などを表示（任意）
        const endText = document.createElement("div");
        endText.textContent = "（クリックで最初に戻る）";
        endText.style.color = "#ccc";
        endText.style.marginTop = "20px";
        choicesContainer.appendChild(endText);

        // クリックで最初に戻す
        charElement.onclick = bgElement.onclick = textElement.onclick = () => {
            currentSceneId = 0;
            renderScene();
        };

        return;
    }

    // 各選択肢ボタンを作成
    scene.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.text;

        // 選択肢クリックイベント
        const nextId = choice.nextSceneId;
        button.onclick = () => {
            // すべてのボタンから .selected を外す
            document.querySelectorAll("#choices button").forEach(btn => {
                btn.classList.remove("selected");
            });

            // このボタンに .selected を追加
            button.classList.add("selected");

            // 少し時間を置いて遷移（色変化が見えるように）
            setTimeout(() => {
                currentSceneId = nextId;
                renderScene();
            }, 300);
        };

        choicesContainer.appendChild(button);
    });
}

// ゲーム開始
renderScene();
