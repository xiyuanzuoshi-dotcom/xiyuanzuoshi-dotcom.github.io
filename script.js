// ゲームの全シーン定義
const gameData = {
    scenes: [
        {
            id: 0,
            text: "日向 蒼：今日もバイト疲れたな、早く帰って寝よう",
            choices: [{ text: "次へ", nextSceneId: 1 }],
            background: "scene_1.png",
            character: ""
        },
        {
            id: 1,
            text: "日向 蒼：貝殻のオルゴールだ...",
            choices: [
                { text: "持って帰る", nextSceneId: 3 },
                { text: "そのまま帰る", nextSceneId: 2 }
            ],
            background: "scene_1.png",
            character: ""
        },
        {
            id: 2,
            text: "日向 蒼：明日もまた朝からバイトだなあ...",
            choices: [],
            background: "scene_1.png",
            character: ""
        },
        {
            id: 3,
            text: "日向 蒼：すごく綺麗だな、どこかでみた気がするけど...",
            choices: [{ text: "次へ", nextSceneId: 4 }],
            background: "scene_2.png",
            character: ""
        },
        {
            id: 4,
            text: "日向 蒼：持って帰っちゃったけど、明日交番に持って行かなきゃ",
            choices: [
                { text: "交番へ持っていく", nextSceneId: 6 },
                { text: "自分のものにする", nextSceneId: 5 }
            ],
            background: "scene_2.png",
            character: ""
        },
        {
            id: 5,
            text: "日向 蒼：良い音色だなあ、どこかで聞いたことあるような...",
            choices: [],
            background: "scene_2.png",
            character: ""
        },
        {
            id: 6,
            text: "警察官：ありがとね、名前は？",
            choices: [],
            background: "scene_3.png",
            character: ""
        },
        {
            id: 7,
            text: "日向 蒼：落とし主が見つかるといいな、でも、どこかでみたことがあるんだけどな...",
            choices: [],
            background: "scene_3.png",
            character: ""
        },
        {
            id: 8,
            text: "ユイ：藤沢くん、ありがとう",
            choices: [{ text: "次へ", nextSceneId: 9 }],
            background: "scene_4.png",
            character: ""
        },
        {
            id: 9,
            text: "次作へ続く！！！",
            choices: [],
            background: "scene_4.png",
            character: ""
        }
    ]
};

let currentSceneId = 0;
let playerName = "";

function renderScene() {
    const scene = gameData.scenes.find(s => s.id === currentSceneId);
    const textElement = document.getElementById("game-text");
    const bgElement = document.getElementById("background");
    const charElement = document.getElementById("character");
    const choicesContainer = document.getElementById("choices");

    // テキスト更新
    textElement.textContent = scene.text;
    bgElement.style.backgroundImage = `url(${scene.background})`;
    charElement.style.backgroundImage = scene.character ? `url(${scene.character})` : "";
    choicesContainer.innerHTML = "";

    // ✅ 特別処理：シーン3（隠しボタン出現）
    if (scene.id === 3) {
        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.onclick = () => {
                currentSceneId = choice.nextSceneId;
                renderScene();
            };
            choicesContainer.appendChild(button);
        });

        // --- 当たり判定が広い隠しゾーン ---
        const hiddenArea = document.createElement("div");
        hiddenArea.style.position = "absolute";
        hiddenArea.style.top = "10%";
        hiddenArea.style.left = "10%";
        hiddenArea.style.width = "80%";   // ← スマホで広くタップ可能
        hiddenArea.style.height = "60%";  // ← 画面の半分以上をカバー
        hiddenArea.style.backgroundColor = "rgba(0,0,0,0.01)"; // 完全透明だと反応しないため少し透過
        hiddenArea.style.cursor = "pointer";
        hiddenArea.style.zIndex = "10000";
        hiddenArea.style.touchAction = "manipulation"; // iOSズーム抑制

        let secretShown = false;

        const showSecret = () => {
            if (secretShown) return; // 1回だけ
            secretShown = true;

            const secret = document.createElement("div");
            secret.textContent = "俺の旧姓は藤沢だ";
            secret.style.position = "absolute";
            secret.style.top = "35%";
            secret.style.left = "50%";
            secret.style.transform = "translateX(-50%)";
            secret.style.fontSize = "2em";
            secret.style.fontWeight = "bold";
            secret.style.color = "white";
            secret.style.textShadow = "0 0 10px rgba(0,0,0,0.8)";
            secret.style.opacity = "0";
            secret.style.transition = "opacity 0.5s ease";
            secret.style.zIndex = "11000";

            bgElement.appendChild(secret);

            // フェードイン
            setTimeout(() => (secret.style.opacity = "1"), 50);

            // 3秒後にフェードアウトして削除
            setTimeout(() => {
                secret.style.opacity = "0";
                setTimeout(() => secret.remove(), 500);
            }, 3000);
        };

        hiddenArea.addEventListener("click", showSecret);
        hiddenArea.addEventListener("touchstart", showSecret);

        bgElement.appendChild(hiddenArea);
        return;
    }

    // ✅ シーン6：名前入力
    if (scene.id === 6) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "あなたの名前を入力";
        input.style.padding = "10px";
        input.style.fontSize = "1.2em";
        input.style.borderRadius = "8px";
        input.style.border = "2px solid #ccc";
        input.style.textAlign = "center";
        input.style.width = "70%";
        input.style.marginBottom = "10px";

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "OK";
        submitBtn.style.fontSize = "1.1em";
        submitBtn.style.padding = "10px 20px";
        submitBtn.style.borderRadius = "10px";
        submitBtn.style.border = "2px solid #ccc";
        submitBtn.style.backgroundColor = "rgba(255,255,255,0.8)";
        submitBtn.style.cursor = "pointer";

        submitBtn.onclick = () => {
            const name = input.value.trim();
            if (!name) {
                alert("名前を入力してください。");
                return;
            }
            playerName = name;

            if (playerName === "藤沢 蒼") {
                currentSceneId = 8;
            } else {
                currentSceneId = 7;
            }
            renderScene();
        };

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(submitBtn);
        return;
    }

    // --- 通常選択肢 or エンド処理 ---
    if (scene.choices.length === 0) {
        const endText = document.createElement("div");
        endText.textContent = "（クリックで最初に戻る）";
        endText.style.color = "#ccc";
        endText.style.marginTop = "20px";
        choicesContainer.appendChild(endText);
        charElement.onclick = bgElement.onclick = textElement.onclick = () => {
            currentSceneId = 0;
            renderScene();
        };
        return;
    }

    // 通常ボタン
    scene.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            currentSceneId = choice.nextSceneId;
            renderScene();
        };
        choicesContainer.appendChild(button);
    });
}

// ゲーム開始
renderScene();
