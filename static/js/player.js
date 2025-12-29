const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const openDirBtn = document.getElementById("open-dir");
const dirInput = document.getElementById("dir-input");
const trackName = document.getElementById("track-name");
const volumeSlider = document.getElementById("volume"); // 音量滑块
const muteBtn = document.getElementById("mute"); // 静音按钮

let tracks = [];          // 存储完整的音乐URL
let trackNames = [];      // 存储歌曲名
let current = 0;
let isPlaying = false;    // 播放状态
let hasUserInteracted = false; // 标记用户是否已交互（绕开自动播放限制）
let lastVolume = 1; // 保存最后一次音量（用于静音切换）
let firstPlayDone = false;

function savePlayState() {
    if (!audio) return;
    localStorage.setItem("musicCurrentTime", audio.currentTime);
    localStorage.setItem("musicCurrentTrack", current);
    localStorage.setItem("musicIsPlaying", isPlaying);
    localStorage.setItem("musicTracks", JSON.stringify(tracks));
    localStorage.setItem("musicTrackNames", JSON.stringify(trackNames));
    localStorage.setItem("musicVolume", audio.volume); // 保存音量
}

function restorePlayState() {
    if (!audio) return;
    const savedTime = localStorage.getItem("musicCurrentTime");
    const savedTrack = localStorage.getItem("musicCurrentTrack");
    const savedIsPlaying = localStorage.getItem("musicIsPlaying") === "true";
    const savedTracks = JSON.parse(localStorage.getItem("musicTracks"));
    const savedTrackNames = JSON.parse(localStorage.getItem("musicTrackNames"));
    const savedVolume = localStorage.getItem("musicVolume"); // 读取保存的音量

    if (savedTracks && savedTracks.length > 0) {
        tracks = savedTracks;
        trackNames = savedTrackNames;
        // current = Math.floor(Math.random() * tracks.length);
        current = savedTrack ? parseInt(savedTrack) : 0;
        loadTrack(); // 加载保存的歌曲

        // 恢复播放进度
        if (savedTime) audio.currentTime = parseFloat(savedTime);

        // 恢复音量设置
        if (savedVolume) {
            audio.volume = parseFloat(savedVolume);
            volumeSlider.value = parseFloat(savedVolume);
            lastVolume = parseFloat(savedVolume);
            // 同步静音按钮图标
            const v = parseFloat(savedVolume);
            muteBtn.textContent = v === 0 ? "🔇" : "🔊";
        }

        // 恢复播放状态
        if (savedIsPlaying && hasUserInteracted) {
            autoPlayAudio().catch(err => console.warn('恢复播放失败', err));
        }
    }
}

// 设置音量
function setVolume(volume) {
    audio.volume = volume;
    lastVolume = volume; // 保存当前音量
    // 同步静音按钮图标
    muteBtn.textContent = volume === 0 ? "🔇" : "🔊";
    console.log("音量已设置为：", Math.round(volume * 100) + "%");
}

// 切换静音/恢复音量
function toggleMute() {
    if (audio.volume === 0) {
        // 恢复之前的音量
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume;
        muteBtn.textContent = "🔊";
    } else {
        // 静音，保存当前音量
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        muteBtn.textContent = "🔇";
    }
}

// 加载音乐列表
async function loadMusicList() {
    const savedTrack = localStorage.getItem("musicCurrentTrack");
    try {
        const res = await fetch("/music/list?timestamp=" + Date.now(), {
            cache: "no-cache",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error(`接口请求失败：${res.status}`);
        const rawText = await res.text();
        const data = JSON.parse(rawText);

        // 校验数据
        if (!data || !Array.isArray(data.tracks) || data.tracks.length === 0) {
            trackName.textContent = "暂无可用音乐，请添加MP3文件到 static/music 目录";
            tracks = [];
            trackNames = [];
            return;
        }

        // 解析音乐列表
        trackNames = data.tracks;
        tracks = data.tracks.map(name => "/music/" + name);
        // current = 0;
        if (!tracks.length) {
            current = 0;
        } else if (savedTrack != null) {
            current = parseInt(savedTrack) % tracks.length;
        } else if (current >= tracks.length) {      // 原下标越界
            current = Math.floor(Math.random() * tracks.length);
        }
        loadTrack(); // 加载第一首
        localStorage.setItem("musicCurrentTrack",current);

        // 若用户已交互，直接自动播放
        if (hasUserInteracted) {
            await autoPlayAudio();
        }

    } catch (err) {
        console.error("加载列表失败：", err);
        trackName.textContent = "加载失败：" + err.message;
    }
}

// 加载当前歌曲
function loadTrack() {
    if (tracks.length === 0) return;
    audio.src = tracks[current];
    const songName = trackNames[current].replace(/\.(mp3|MP3)$/i, "");
    trackName.textContent = songName;
    console.log("已加载：", songName);
}

// 自动播放核心函数
async function autoPlayAudio() {
    try {
        if (audio.readyState === 0) {
            await audio.load();
        }
        await audio.play();
        isPlaying = true;
        playBtn.textContent = "暂停";
        console.log("自动播放成功");
    } catch (err) {
        console.warn("自动播放需先点击播放按钮触发交互：", err.message);
        playBtn.textContent = "播放";
        isPlaying = false;
    }
}

// 手动播放/暂停切换
function togglePlay() {
    if (tracks.length === 0) {
        alert("暂无音乐文件");
        return;
    }
    hasUserInteracted = true; // 标记用户已交互
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "播放";
    } else {
        if (!firstPlayDone) {
            current = Math.floor(Math.random() * tracks.length);
            firstPlayDone = true;
        }
        loadTrack();
        autoPlayAudio().catch(() => {}); // 调用自动播放逻辑
    }
}

// 上一首（自动播放）
function playPrev() {
    if (tracks.length === 0) return;
    hasUserInteracted = true;
    current = (current - 1 + tracks.length) % tracks.length;
    loadTrack();
    autoPlayAudio().catch(() => {}); // 切换后自动播放
}

// 下一首（自动播放）
function playNext() {
    if (tracks.length === 0) return;
    hasUserInteracted = true;
    current = (current + 1) % tracks.length;
    loadTrack();
    autoPlayAudio().catch(() => {}); // 切换后自动播放
}

// 播放/暂停按钮
playBtn.addEventListener("click", togglePlay);
// 上一首按钮
prevBtn.addEventListener("click", playPrev);
// 下一首按钮
nextBtn.addEventListener("click", playNext);
// 音乐播放结束自动切下一首
audio.addEventListener("ended", playNext);
// 音频加载错误提示
audio.addEventListener("error", (e) => {
    console.error("音频加载错误：", e);
    alert(`播放失败：${trackNames[current]} 文件不存在或格式错误`);
});
// 打开目录功能
openDirBtn.addEventListener("click", () => dirInput.click());

// 音量控制事件
volumeSlider.addEventListener("input", (e) => {
    setVolume(parseFloat(e.target.value));
});
// 双击音量滑块快速静音
volumeSlider.addEventListener("dblclick", toggleMute);
// 静音按钮点击事件
muteBtn.addEventListener("click", toggleMute);

window.addEventListener("DOMContentLoaded", async () => {
    console.log("页面加载完成，初始化音乐列表...");
    // 先拿最新列表
    await loadMusicList().catch(() => {});
    // 再恢复之前的播放状态
    restorePlayState();
    // 监听交互和卸载保存
    document.addEventListener("click", () => {hasUserInteracted = true}, {once: true});
    window.addEventListener("beforeunload", savePlayState);
});