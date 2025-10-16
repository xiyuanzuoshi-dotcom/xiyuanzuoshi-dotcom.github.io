// ゲームの全シーン定義
const gameData = {
    scenes: [
        { id: 0, text: "日向 蒼：今日もバイト疲れたな、早く帰って寝よう", choices: [{ text: "次へ", nextSceneId: 1 }], background: "scene_1.png", character: "" },
        { id: 1, text: "日向 蒼：貝殻のオルゴールだ...", choices: [{ text: "持って帰る", nextSceneId: 3 }, { text: "そのまま帰る", nextSceneId: 2 }], background: "scene_1.png", character: "" },
        { id: 2, text: "日向 蒼：明日もまた朝からバイトだなあ...", choices: [], background: "scene_1.png", character: "" },
        { id: 3, text: "日向 蒼：すごく綺麗だな、どこかでみた気がするけど...", choices: [{ text: "次へ", nextSceneId: 4 }], background: "scene_2.png", character: "" },
        { id: 4, text: "日向 蒼：持って帰っちゃったけど、明日交番に持って行かなきゃ", choices: [{ text: "交番へ持っていく", nextSceneId: 6 }, { text: "自分のものにする", nextSceneId: 5 }], background: "scene_2.png", character: "" },
        { id: 5, text: "日向 蒼：良い音色だなあ、どこかで聞いたことあるような...", choices: [], background: "scene_2.png", character: "" },
        { id: 6, text: "警察官：ありがとね、名前は？", choices: [], background: "scene_3.png", character: "" },
        { id: 7, text: "日向 蒼：落とし主が見つかるといいな、でも、どこかでみたことがあるんだけどな...", choices: [], background: "scene_3.png", character: "" },
        { id: 8, text: "ユイ：藤沢くん、ありがとう", choices: [{ text: "次へ", nextSceneId: 9 }], background: "scene_4.png", character: "" },
        { id: 9, text: "次作へ続く！！！", choices: [], background: "scene_4.png", character: "" }
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

    textElement.textContent = scene.text;
    bgElement.style.backgroundImage = `url(${scene.background})`;
    charElement.style.backgroundImage = scene.character ? `url(${scene.character})` : "";
    choicesContainer.innerHTML = "";

    // ✅ 特別処理：id=4 のときボタン出現（aoheya.html へ遷移）
    if (scene.id === 4) {
        const toHeyaBtn = document.createElement("button");
        toHeyaBtn.textContent = "部屋へ行く";
        Object.assign(toHeyaBtn.style, {
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "9999",
            padding: "12px 25px",
            fontSize: "1.2em",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.9)",
            border: "2px solid #ccc",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            transition: "all 0.3s ease"
        });

        toHeyaBtn.onmouseenter = () => (toHeyaBtn.style.background = "white");
        toHeyaBtn.onmouseleave = () => (toHeyaBtn.style.background = "rgba(255,255,255,0.9)");

        toHeyaBtn.onclick = () => {
            const effect = document.createElement("div");
            effect.id = "world-shift-effect";
            effect.innerHTML = `<div class="scanline"></div><div class="pixelate"></div>`;
            document.body.appendChild(effect);

            setTimeout(() => {
                window.location.href = "aoheya.html";
            }, 1500);
        };

        document.body.appendChild(toHeyaBtn);
    }

    // ✅ 特別処理：id=5 のときボタン出現
    if (scene.id === 5) {
        const toHeyaBtn = document.createElement("button");
        toHeyaBtn.textContent = "部屋へ行く";
        Object.assign(toHeyaBtn.style, {
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "9999",
            padding: "12px 25px",
            fontSize: "1.2em",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.9)",
            border: "2px solid #ccc",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255,255,255,0.5)",
            transition: "all 0.3s ease"
        });

        toHeyaBtn.onmouseenter = () => (toHeyaBtn.style.background = "white");
        toHeyaBtn.onmouseleave = () => (toHeyaBtn.style.background = "rgba(255,255,255,0.9)");

        toHeyaBtn.onclick = () => {
            const effect = document.createElement("div");
            effect.id = "world-shift-effect";
            effect.innerHTML = `<div class="scanline"></div><div class="pixelate"></div>`;
            document.body.appendChild(effect);

            setTimeout(() => {
                window.location.href = "heya.html";
            }, 1500);
        };

        document.body.appendChild(toHeyaBtn);
        return;
    }

    // ✅ id=6: 名前入力
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
        submitBtn.onclick = () => {
            const name = input.value.trim();
            if (!name) return alert("名前を入力してください。");
            playerName = name;
            currentSceneId = playerName === "藤沢 蒼" ? 8 : 7;
            renderScene();
        };

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(submitBtn);
        return;
    }

    // 通常シーン
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
