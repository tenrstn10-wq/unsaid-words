const audio = document.getElementById('audioPlayer');
const polaroidAudio = document.getElementById('polaroidAudio');
const bgVideo = document.getElementById('bgCanvasVideo');
const canvasGradient = document.getElementById('canvasGradientOverlay');
const albumImg = document.getElementById('albumImg');
const postcardImg = document.getElementById('postcardImg');
const postcardBgBlur = document.getElementById('postcardBgBlur');
const dynamicBg = document.getElementById('dynamicAlbumBg');
const polaroidBg = document.getElementById('polaroidAlbumBg');
const guideModalBgBlur = document.getElementById('guideModalBgBlur');
const splashBgBlur = document.getElementById('splashBgBlur');

let isPlaying = false;
let isCanvasActive = false;
let isLoopActive = false;
let isCleanView = false;
let userManuallyTurnedCanvas = false;
let lastActiveLyricIndex = -1;
let activePolaroidIndex = null;

let currentMessagePlainText = "Terima kasih sudah menjadi rumah tempatku pulang dan bersandar selamanya.";
let typingTimeout = null;

let polaroidPhotos = [
    { img: 'foto1.jpg', caption: 'Kenangan terindah', date: '01 AGUSTUS 2026', secretName: '', secretMsg: 'Pesan rahasia kartu 1...', secretDate: 'FOR YOUR EYES ONLY', x: 40, y: 80, scale: 1, rotate: -8, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 },
    { img: 'foto2.jpg', caption: 'Waktu berjalan cepat', date: '15 AGUSTUS 2026', secretName: '', secretMsg: 'Pesan rahasia kartu 2...', secretDate: 'CONFIDENTIAL', x: 170, y: 220, scale: 1, rotate: 9, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 },
    { img: 'foto3.jpg', caption: 'Satu tawa berdua', date: '20 AGUSTUS 2026', secretName: '', secretMsg: 'Pesan rahasia kartu 3...', secretDate: 'MEMORIES ONLY', x: 50, y: 400, scale: 1, rotate: -5, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 },
    { img: 'foto4.jpg', caption: 'Rumahku adalah kamu', date: '28 AGUSTUS 2026', secretName: '', secretMsg: 'Pesan rahasia kartu 4...', secretDate: 'FOREVER US', x: 160, y: 560, scale: 1, rotate: 6, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 }
];

let defaultLyrics = JSON.parse(localStorage.getItem('savedLyrics')) || [
    { time: "00:14", text: "Home" },
    { time: "00:16", text: "By seeing you" },
    { time: "00:20", text: "Picturing where" },
    { time: "00:23", text: "We'd end up to" },
    { time: "00:27", text: "I'm broke" },
    { time: "00:30", text: "And hopeless too" },
    { time: "00:34", text: "Wishing I could" },
    { time: "00:37", text: "Get back to you" },
    { time: "00:42", text: "I can't keep goin' on like this" },
    { time: "00:45", text: "Pretending that you're gone" },
    { time: "00:48", text: "Well, I don't know" },
    { time: "00:51", text: "'Cause all I know" },
    { time: "00:55", text: "I'll be here, waiting you to come" },
    { time: "00:58", text: "And bring me right back home" },
    { time: "01:01", text: "I'm caught up with these memories" },
    { time: "01:05", text: "Just by sitting here alone" },
    { time: "01:09", text: "If only I could see where it all started" },
    { time: "01:13", text: "We'll be fine" },
    { time: "01:15", text: "It's clear where this is goin'" },
    { time: "01:18", text: "I'll keep missin' you alone" },
    { time: "01:22", text: "If you could see me cryin' in my room" },
    { time: "01:29", text: "Hey" },
    { time: "01:32", text: "I missed you too" },
    { time: "01:35", text: "And just so you know, well" },
    { time: "01:39", text: "I still love you" },
    { time: "01:43", text: "And don't even know if I'm all right" },
    { time: "01:46", text: "'Cause if I called, we'd only end up in a fight" },
    { time: "01:50", text: "And don't wanna keep on getting hurt" },
    { time: "01:53", text: "Still holding to your favorite, little shirt" },
    { time: "01:57", text: "I'll be here, waiting you to come" },
    { time: "02:00", text: "And bring me right back home" },
    { time: "02:03", text: "I'm caught up with these memories" },
    { time: "02:06", text: "Just by sitting here alone" },
    { time: "02:10", text: "If only I could see where it all started" },
    { time: "02:15", text: "We'll be fine" },
    { time: "02:17", text: "It's clear where this is goin'" },
    { time: "02:20", text: "I'll keep missin' you alone" },
    { time: "02:24", text: "If you could see me cryin' in my room" },
    { time: "02:30", text: "And I don't know" },
    { time: "02:34", text: "Where to go" },
    { time: "02:38", text: "How can I be fine with being alone?" },
    { time: "02:44", text: "I'm just scared" },
    { time: "02:47", text: "Of losing you" },
    { time: "02:51", text: "I can't keep seeing you crying in your room" },
    { time: "02:58", text: "Yeah, I can't keep seeing you crying in your room" },
    { time: "03:05", text: "I'll be here, waiting you to come" },
    { time: "03:09", text: "And bring me right back home" },
    { time: "03:12", text: "I'm caught up with these memories" },
    { time: "03:15", text: "Just by sitting here alone" },
    { time: "03:19", text: "If only I could see where it all started" },
    { time: "03:23", text: "We'll be fine" },
    { time: "03:25", text: "It's clear where this is goin'" },
    { time: "03:29", text: "I'll keep missin' you alone" },
    { time: "03:32", text: "If you could see me cryin' in my room" },
    { time: "03:39", text: "If you could see me cryin' in my room" },
    { time: "03:46", text: "If you could see me cryin' in my room" },
    { time: "03:53", text: "If you could see me cryin' in my room" },
    { time: "04:00", text: "If you could see me cryin' in my room" },
];

const totalVisBars = 15;

function initAudioVisualizer() {
    const containerMain = document.getElementById('audioVisMain');
    const containerEmbedded = document.getElementById('audioVisEmbedded');
    
    let barsHTML = '';
    for (let i = 0; i < totalVisBars; i++) {
        barsHTML += `<div class="vis-bar" style="height: 2px;"></div>`;
    }
    
    if(containerMain) containerMain.innerHTML = barsHTML;
    if(containerEmbedded) containerEmbedded.innerHTML = barsHTML;
}

function updateAudioVisualizer() {
    document.querySelectorAll('.audio-visualizer').forEach(container => {
        const bars = container.querySelectorAll('.vis-bar');
        const total = bars.length;
        bars.forEach((bar, index) => {
            if (!audio.paused) {
                let centerFactor = 1 - Math.abs(index - (total - 1) / 2) / ((total - 1) / 2 || 1);
                let randomH = Math.floor(Math.random() * (3 + (centerFactor * 5))) + 2;
                bar.style.height = randomH + 'px';
            } else {
                bar.style.height = '2px';
            }
        });
    });
}

function seekProgress(event) {
    const track = event.currentTarget;
    const rect = track.getBoundingClientRect();
    let percent = (event.clientX - rect.left) / rect.width;
    let totalDuration = !isNaN(audio.duration) && audio.duration > 0 ? audio.duration : 55;
    audio.currentTime = percent * totalDuration;
}

function openWebApp() {
    const splash = document.getElementById('splashScreen');
    splash.classList.add('fade-out');
    
    audio.play().catch(() => {});
    isPlaying = true;
    
    const playIconsMain = document.querySelectorAll('.playIconMain');
    const pauseIconsMain = document.querySelectorAll('.pauseIconMain');
    const playIconsEmbedded = document.querySelectorAll('.playIconEmbedded');
    const pauseIconsEmbedded = document.querySelectorAll('.pauseIconEmbedded');

    playIconsMain.forEach(el => el.style.display = 'none');
    pauseIconsMain.forEach(el => el.style.display = 'block');
    playIconsEmbedded.forEach(el => el.style.display = 'none');
    pauseIconsEmbedded.forEach(el => el.style.display = 'block');

    if (isCanvasActive) {
        bgVideo.play().catch(() => {});
    }
}

function parseTimeToSeconds(timeStr) {
    if (typeof timeStr === 'number') return timeStr;
    const parts = timeStr.split(':');
    return (parseInt(parts[0], 10) * 60) + parseInt(parts[1], 10);
}

let boardScale = 1;
let boardX = 0;
let boardY = 0;

function updateBoardTransform() {
    const container = document.getElementById('polaroidFeedContainer');
    container.style.transform = `translate(${boardX}px, ${boardY}px) scale(${boardScale})`;
}

function renderPolaroidFeed() {
    const container = document.getElementById('polaroidFeedContainer');
    container.innerHTML = "";
    polaroidPhotos.forEach((item, index) => {
        let imgX = item.imgX || 0;
        let imgY = item.imgY || 0;
        let imgScale = item.imgScale || 1;
        let imgRotate = item.imgRotate || 0;
        let imgContent = item.img 
            ? `<img id="polaroid-img-${index}" src="${item.img}" style="transform: translate(${imgX}px, ${imgY}px) scale(${imgScale}) rotate(${imgRotate}deg);" alt="Polaroid Memory">`
            : `<div class="polaroid-placeholder-plus">+</div>`;

        let flippedClass = item.flipped ? ' flipped' : '';

        container.innerHTML += `
            <div class="polaroid-card${flippedClass}" id="polaroid-card-${index}" style="left: ${item.x}px; top: ${item.y}px; transform: scale(${item.scale}) rotate(${item.rotate}deg);">
                <div class="polaroid-inner">
                    <div class="polaroid-front">
                        <div class="polaroid-top-action-group">
                            <button class="polaroid-icon-btn" onclick="downloadSinglePolaroid(${index})" title="Download Foto">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                            <button class="polaroid-icon-btn" onclick="event.stopPropagation(); deletePolaroidPhoto(${index})" title="Hapus foto">✕</button>
                        </div>
                        <div class="polaroid-card-top-row">
                            <span class="polaroid-card-number">#${index + 1}</span>
                        </div>
                        <div class="polaroid-img-box" id="polaroid-box-${index}" data-index="${index}" onclick="event.stopPropagation(); triggerReplacePolaroid(${index})" title="Klik ganti foto / Geser, Cubit & Putar foto">
                            ${imgContent}
                        </div>
                        <textarea class="polaroid-caption-edit" rows="1" oninput="autoResizeTextarea(this)" onchange="updatePolaroidCaption(${index}, this.value)" placeholder="(isi catatan)">${item.caption}</textarea>
                        <input type="text" class="polaroid-date-edit" value="${item.date}" onchange="updatePolaroidDate(${index}, this.value)" placeholder="TANGGAL / WAKTU">
                        <div class="polaroid-credit-text">CREATED BY MASTEN</div>
                    </div>
                    
                    <div class="polaroid-back">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 6px;">
                            <span style="font-size: 6px; letter-spacing: 1px; font-weight: 800; color: var(--accent-color); font-family: 'Plus Jakarta Sans', sans-serif; display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                                TO MY DEAREST <input type="text" class="secret-name-input" onclick="event.stopPropagation()" value="${item.secretName || ''}" onchange="updateSecretName(${index}, this.value)" placeholder="(Isi Nama)">
                            </span>
                            <button class="polaroid-icon-btn" onclick="event.stopPropagation(); triggerFlipCard(${index})" title="Putar Balik">↩</button>
                        </div>

                        <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; padding: 10px 0;">
                            <textarea class="secret-text-input" rows="3" onclick="event.stopPropagation()" onchange="updateSecretMessage(${index}, this.value)" placeholder="Tulis pesan rahasia di sini...">${item.secretMsg || ''}</textarea>
                        </div>

                        <div style="border-top: 1px solid rgba(0,0,0,0.1); padding-top: 6px; text-align: center;">
                            <input type="text" class="secret-date-input" onclick="event.stopPropagation()" value="${item.secretDate || 'FOR YOUR EYES ONLY'}" onchange="updateSecretDate(${index}, this.value)">
                            <span class="polaroid-back-credit">MASTEN</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.polaroid-caption-edit').forEach(ta => {
        autoResizeTextarea(ta);
    });

    updateBoardTransform();

    const feedContainer = document.getElementById('polaroidFeedContainer');
    
    let isBoardDragging = false;
    let startBoardX = 0, startBoardY = 0;
    let initialPinchDist = null;

    feedContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        let zoomFactor = 0.08;
        boardScale += (e.deltaY < 0 ? zoomFactor : -zoomFactor);
        boardScale = Math.max(0.3, Math.min(4, boardScale));
        updateBoardTransform();
    }, { passive: false });

    feedContainer.addEventListener('touchstart', (e) => {
        if (e.target.closest('.polaroid-card') || e.target.closest('.polaroid-top-bar') || e.target.closest('button')) return;
        if (e.touches.length === 2) {
            isBoardDragging = false;
            initialPinchDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        } else if (e.touches.length === 1) {
            isBoardDragging = true;
            startBoardX = e.touches[0].clientX - boardX;
            startBoardY = e.touches[0].clientY - boardY;
        }
    }, { passive: true });

    feedContainer.addEventListener('touchmove', (e) => {
        if (e.target.closest('.polaroid-card') || e.target.closest('.polaroid-top-bar') || e.target.closest('button')) return;
        if (e.touches.length === 2 && initialPinchDist !== null) {
            let currentDist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            let scaleFactor = currentDist / initialPinchDist;
            boardScale *= (scaleFactor > 1 ? 1.02 : 0.98);
            boardScale = Math.max(0.3, Math.min(4, boardScale));
            updateBoardTransform();
            initialPinchDist = currentDist;
        } else if (isBoardDragging && e.touches.length === 1) {
            boardX = e.touches[0].clientX - startBoardX;
            boardY = e.touches[0].clientY - startBoardY;
            updateBoardTransform();
        }
    }, { passive: true });

    feedContainer.addEventListener('touchend', () => {
        isBoardDragging = false;
        initialPinchDist = null;
    });

    feedContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.polaroid-card') || e.target.closest('.polaroid-top-bar') || e.target.closest('button')) return;
        isBoardDragging = true;
        startBoardX = e.clientX - boardX;
        startBoardY = e.clientY - boardY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isBoardDragging) return;
        boardX = e.clientX - startBoardX;
        boardY = e.clientY - startBoardY;
        updateBoardTransform();
    });

    window.addEventListener('mouseup', () => {
        isBoardDragging = false;
    });

    polaroidPhotos.forEach((item, index) => {
        const card = document.getElementById(`polaroid-card-${index}`);
        const imgBox = document.getElementById(`polaroid-box-${index}`);
        const imgEl = document.getElementById(`polaroid-img-${index}`);
        if (!card) return;

        let isCardDragging = false;
        let isImgInteracting = false;
        let startX = 0, startY = 0;
        let startImgX = 0, startImgY = 0;
        let initialTouchAngle = null;
        let initialCardRotate = 0;
        let initialTouchDist = null;
        let initialCardScale = 1;
        
        let initialImgPinchDist = null;
        let initialImgScale = 1;
        let initialImgAngle = null;
        let initialImgRotate = 0;
        
        let lastTapTime = 0;

        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.closest('button')) return;
            let currentTime = new Date().getTime();
            let tapLength = currentTime - lastTapTime;
            if (tapLength < 300 && tapLength > 0) {
                triggerFlipCard(index);
                e.stopPropagation();
            }
            lastTapTime = currentTime;
        });

        function updateCardStyle() {
            card.style.left = polaroidPhotos[index].x + 'px';
            card.style.top = polaroidPhotos[index].y + 'px';
            card.style.transform = `scale(${polaroidPhotos[index].scale}) rotate(${polaroidPhotos[index].rotate}deg)`;
        }

        if (imgBox && imgEl) {
            imgBox.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    isImgInteracting = true;
                    initialImgPinchDist = Math.hypot(
                        e.touches[1].clientX - e.touches[0].clientX,
                        e.touches[1].clientY - e.touches[0].clientY
                    );
                    initialImgScale = polaroidPhotos[index].imgScale || 1;
                    
                    initialImgAngle = Math.atan2(
                        e.touches[1].clientY - e.touches[0].clientY,
                        e.touches[1].clientX - e.touches[0].clientX
                    ) * (180 / Math.PI);
                    initialImgRotate = polaroidPhotos[index].imgRotate || 0;
                    
                    e.stopPropagation();
                } else if (e.touches.length === 1) {
                    isImgInteracting = true;
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    startImgX = polaroidPhotos[index].imgX || 0;
                    startImgY = polaroidPhotos[index].imgY || 0;
                    e.stopPropagation();
                }
            }, { passive: true });

            imgBox.addEventListener('touchmove', (e) => {
                if (!isImgInteracting) return;

                if (e.touches.length === 2 && initialImgPinchDist !== null) {
                    let currentDist = Math.hypot(
                        e.touches[1].clientX - e.touches[0].clientX,
                        e.touches[1].clientY - e.touches[0].clientY
                    );
                    let scaleFactor = currentDist / initialImgPinchDist;
                    polaroidPhotos[index].imgScale = Math.max(0.5, Math.min(4, initialImgScale * scaleFactor));
                    
                    if (initialImgAngle !== null) {
                        let currentAngle = Math.atan2(
                            e.touches[1].clientY - e.touches[0].clientY,
                            e.touches[1].clientX - e.touches[0].clientX
                        ) * (180 / Math.PI);
                        let angleDiff = currentAngle - initialImgAngle;
                        polaroidPhotos[index].imgRotate = initialImgRotate + angleDiff;
                    }

                    let imgX = polaroidPhotos[index].imgX || 0;
                    let imgY = polaroidPhotos[index].imgY || 0;
                    let currentScale = polaroidPhotos[index].imgScale;
                    let currentRotate = polaroidPhotos[index].imgRotate || 0;
                    imgEl.style.transform = `translate(${imgX}px, ${imgY}px) scale(${currentScale}) rotate(${currentRotate}deg)`;
                    e.stopPropagation();
                } else if (e.touches.length === 1) {
                    let dx = (e.touches[0].clientX - startX) / (boardScale * polaroidPhotos[index].scale);
                    let dy = (e.touches[0].clientY - startY) / (boardScale * polaroidPhotos[index].scale);
                    
                    polaroidPhotos[index].imgX = startImgX + dx;
                    polaroidPhotos[index].imgY = startImgY + dy;
                    
                    let imgX = polaroidPhotos[index].imgX;
                    let imgY = polaroidPhotos[index].imgY;
                    let currentScale = polaroidPhotos[index].imgScale || 1;
                    let currentRotate = polaroidPhotos[index].imgRotate || 0;
                    imgEl.style.transform = `translate(${imgX}px, ${imgY}px) scale(${currentScale}) rotate(${currentRotate}deg)`;
                    e.stopPropagation();
                }
            }, { passive: true });

            imgBox.addEventListener('touchend', () => {
                isImgInteracting = false;
                initialImgPinchDist = null;
                initialImgAngle = null;
            });
        }

        card.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.closest('button') || e.target.closest('.polaroid-img-box')) return;
            
            if (e.touches.length === 2) {
                isCardDragging = false;
                initialTouchAngle = Math.atan2(
                    e.touches[1].clientY - e.touches[0].clientY,
                    e.touches[1].clientX - e.touches[0].clientX
                ) * (180 / Math.PI);
                initialCardRotate = polaroidPhotos[index].rotate;

                initialTouchDist = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
                initialCardScale = polaroidPhotos[index].scale;
                e.stopPropagation();
            } else if (e.touches.length === 1) {
                isCardDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                e.stopPropagation();
            }
        }, { passive: true });

        card.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && initialTouchAngle !== null) {
                let currentAngle = Math.atan2(
                    e.touches[1].clientY - e.touches[0].clientY,
                    e.touches[1].clientX - e.touches[0].clientX
                ) * (180 / Math.PI);
                
                let angleDiff = currentAngle - initialTouchAngle;
                polaroidPhotos[index].rotate = initialCardRotate + angleDiff;

                if (initialTouchDist !== null) {
                    let currentDist = Math.hypot(
                        e.touches[1].clientX - e.touches[0].clientX,
                        e.touches[1].clientY - e.touches[0].clientY
                    );
                    let scaleFactor = currentDist / initialTouchDist;
                    polaroidPhotos[index].scale = Math.max(0.4, Math.min(3.5, initialCardScale * scaleFactor));
                }

                updateCardStyle();
                e.stopPropagation();
            } else if (isCardDragging && e.touches.length === 1) {
                let dx = (e.touches[0].clientX - startX) / boardScale;
                let dy = (e.touches[0].clientY - startY) / boardScale;
                polaroidPhotos[index].x += dx;
                polaroidPhotos[index].y += dy;
                updateCardStyle();
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                e.stopPropagation();
            }
        }, { passive: true });

        card.addEventListener('touchend', () => {
            isCardDragging = false;
            initialTouchAngle = null;
            initialTouchDist = null;
        });
    });
}

function triggerFlipCard(index) {
    polaroidPhotos[index].flipped = !polaroidPhotos[index].flipped;
    const card = document.getElementById(`polaroid-card-${index}`);
    if (card) {
        card.classList.toggle('flipped', polaroidPhotos[index].flipped);
    }
}

function updateSecretName(index, val) {
    polaroidPhotos[index].secretName = val;
}

function updateSecretMessage(index, val) {
    polaroidPhotos[index].secretMsg = val;
}

function updateSecretDate(index, val) {
    polaroidPhotos[index].secretDate = val;
}

function shufflePolaroidLayout() {
    boardScale = 1;
    boardX = 0;
    boardY = 0;
    updateBoardTransform();
    
    let startPositions = [
        {x: 40, y: 80},
        {x: 170, y: 220},
        {x: 50, y: 400},
        {x: 160, y: 560}
    ];

    polaroidPhotos.forEach((item, index) => {
        let randomRot = (Math.random() * 24) - 12;
        item.rotate = parseFloat(randomRot.toFixed(1));
        item.scale = 1;
        item.imgX = 0;
        item.imgY = 0;
        item.imgScale = 1;
        item.imgRotate = 0;
        
        let basePos = startPositions[index % startPositions.length];
        item.x = basePos.x + Math.floor(Math.random() * 30) - 15;
        item.y = basePos.y + Math.floor(Math.random() * 30) - 15;
    });
    renderPolaroidFeed();
}

function updatePolaroidDate(index, val) {
    polaroidPhotos[index].date = val;
}

function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function toggleSlidePage() {
    const polaroidLayer = document.getElementById('polaroidPageLayer');
    const mainViewport = document.getElementById('mainViewportContainer');
    
    const isActive = polaroidLayer.classList.contains('active');

    if (!isActive) {
        polaroidLayer.classList.add('active');
        mainViewport.classList.add('hidden');

        setTimeout(() => {
            renderPolaroidFeed();
        }, 50);

        if (!audio.paused) {
            audio.pause();
            document.querySelectorAll('.playIconMain').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.pauseIconMain').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.playIconEmbedded').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.pauseIconEmbedded').forEach(el => el.style.display = 'none');
            isPlaying = false;
        }

        if (polaroidAudio.src && polaroidAudio.src !== window.location.href) {
            polaroidAudio.play().catch(() => {});
        } else {
            document.getElementById('polaroidAudioInput').click();
        }
    } else {
        polaroidLayer.classList.remove('active');
        mainViewport.classList.remove('hidden');
        polaroidAudio.pause();
    }
}

function loadPolaroidAudio(event) {
    const file = event.target.files[0];
    if (file) {
        if (!audio.paused) {
            audio.pause();
            isPlaying = false;
        }
        polaroidAudio.src = URL.createObjectURL(file);
        polaroidAudio.play().catch(() => {});
    }
    event.target.value = "";
}

function triggerReplacePolaroid(index) {
    activePolaroidIndex = index;
    document.getElementById('polaroidReplaceInput').click();
}

function replacePolaroidPhoto(event) {
    const file = event.target.files[0];
    if (file && activePolaroidIndex !== null) {
        const reader = new FileReader();
        reader.onload = function(e) {
            polaroidPhotos[activePolaroidIndex].img = e.target.result;
            polaroidPhotos[activePolaroidIndex].scale = 1;
            polaroidPhotos[activePolaroidIndex].rotate = 0;
            polaroidPhotos[activePolaroidIndex].imgX = 0;
            polaroidPhotos[activePolaroidIndex].imgY = 0;
            polaroidPhotos[activePolaroidIndex].imgScale = 1;
            polaroidPhotos[activePolaroidIndex].imgRotate = 0;
            renderPolaroidFeed();
        }
        reader.readAsDataURL(file);
    }
    event.target.value = "";
}

function addNewPolaroidPhoto(event) {
    const file = event.target.files[0];
    let newX = 50 + (polaroidPhotos.length * 20);
    let newY = 100 + (polaroidPhotos.length * 90);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            polaroidPhotos.push({ img: e.target.result, caption: 'Catatan baru', date: 'TANGGAL', secretName: '', secretMsg: 'Tulis pesan rahasia...', secretDate: 'FOR YOUR EYES ONLY', x: newX, y: newY, scale: 1, rotate: 5, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 });
            renderPolaroidFeed();
        }
        reader.readAsDataURL(file);
    } else {
        polaroidPhotos.push({ img: '', caption: 'Catatan baru', date: 'TANGGAL', secretName: '', secretMsg: 'Tulis pesan rahasia...', secretDate: 'FOR YOUR EYES ONLY', x: newX, y: newY, scale: 1, rotate: 5, flipped: false, imgX: 0, imgY: 0, imgScale: 1, imgRotate: 0 });
        renderPolaroidFeed();
    }
    event.target.value = "";
}

function deletePolaroidPhoto(index) {
    if (polaroidPhotos.length <= 1) {
        alert("Minimal sisakan 1 kartu di galeri!");
        return;
    }
    polaroidPhotos.splice(index, 1);
    renderPolaroidFeed();
}

function updatePolaroidCaption(index, newCaption) {
    polaroidPhotos[index].caption = newCaption;
}

function downloadSinglePolaroid(index) {
    const cardElement = document.getElementById(`polaroid-card-${index}`);
    const actionGroup = cardElement.querySelector('.polaroid-top-action-group');
    
    if(actionGroup) actionGroup.style.display = 'none';

    html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        if(actionGroup) actionGroup.style.display = 'flex';

        const imageLink = document.createElement('a');
        imageLink.download = `polaroid-memory-${index + 1}.png`;
        imageLink.href = canvas.toDataURL('image/png');
        imageLink.click();
    }).catch(err => {
        if(actionGroup) actionGroup.style.display = 'flex';
        alert("Gagal mendownload foto polaroid. Pastikan gambar termuat dengan sempurna!");
    });
}

function downloadAllPolaroids() {
    const layerElement = document.getElementById('polaroidPageLayer');
    const topBar = layerElement.querySelector('.polaroid-top-bar');
    const backBtn = layerElement.querySelector('button[onclick="toggleSlidePage()"]');
    
    if(topBar) topBar.style.display = 'none';
    if(backBtn) backBtn.style.display = 'none';

    const actionGroups = layerElement.querySelectorAll('.polaroid-top-action-group');
    actionGroups.forEach(el => el.style.display = 'none');

    html2canvas(layerElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        if(topBar) topBar.style.display = 'flex';
        if(backBtn) backBtn.style.display = 'block';
        actionGroups.forEach(el => el.style.display = 'flex');

        const imageLink = document.createElement('a');
        imageLink.download = 'galeri-polaroid-lengkap.png';
        imageLink.href = canvas.toDataURL('image/png');
        imageLink.click();
    }).catch(err => {
        if(topBar) topBar.style.display = 'flex';
        if(backBtn) backBtn.style.display = 'block';
        actionGroups.forEach(el => el.style.display = 'flex');
        alert("Gagal mendownload galeri. Coba lagi ya!");
    });
}

function renderLyrics() {
    const container = document.getElementById('lyricsListContainer');
    container.innerHTML = "";
    
    let visibleIndex = 1;
    defaultLyrics.forEach((item, index) => {
        if (item.text && item.text.trim() !== "") {
            let numStr = visibleIndex < 10 ? '0' + visibleIndex : visibleIndex;
            container.innerHTML += `
                <div class="lyric-item" id="lyric-row-${index}" onclick="seekToLyric('${item.time}')" title="Klik untuk lompat ke waktu ini">
                    <div class="num">${numStr}</div>
                    <div class="text">${item.text}</div>
                </div>
            `;
            visibleIndex++;
        }
    });
}

function seekToLyric(timeStr) {
    audio.currentTime = parseTimeToSeconds(timeStr);
    if (audio.paused) {
        togglePlay();
    }
}

function toggleLyricsExpandView() {
    const slideContainer = document.getElementById('mainSlideContainer');
    const wrapper = document.getElementById('lyricsScrollWrapper');
    
    slideContainer.classList.toggle('lyrics-focused-mode');
    wrapper.classList.toggle('expanded');
}

window.onload = function() {
    initAudioVisualizer();
    renderLyrics();
    renderPolaroidFeed();
    updatePaletteFromAlbum(albumImg.src);
    startTypingEffect(currentMessagePlainText.replace(/\n/g, '<br>'));
    document.getElementById('postcardMessageText').textContent = currentMessagePlainText;
};

function startTypingEffect(htmlContent) {
    const displayEl = document.getElementById('messageTextDisplay');
    if (!displayEl) return;
    
    if (typingTimeout) clearTimeout(typingTimeout);
    displayEl.innerHTML = "";

    let i = 0;
    let speed = 75; 

    function typeWriter() {
        if (i <= htmlContent.length) {
            if (htmlContent.substr(i, 4) === '<br>') {
                displayEl.innerHTML = htmlContent.substring(0, i + 4) + '<span class="typing-cursor"></span>';
                i += 4;
            } else {
                displayEl.innerHTML = htmlContent.substring(0, i) + '<span class="typing-cursor"></span>';
                i++;
            }
            typingTimeout = setTimeout(typeWriter, speed);
        } else {
            displayEl.innerHTML = htmlContent;
        }
    }

    typeWriter();
}

function updatePaletteFromAlbum(imgSrc) {
    dynamicBg.style.backgroundImage = `url('${imgSrc}')`;
    if(splashBgBlur) {
        splashBgBlur.src = imgSrc;
    }
    polaroidBg.style.backgroundImage = `url('${imgSrc}')`; 
    postcardImg.src = imgSrc; 
    postcardBgBlur.style.backgroundImage = `url('${imgSrc}')`;
    if(guideModalBgBlur) guideModalBgBlur.style.backgroundImage = `url('${imgSrc}')`;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50;
        canvas.height = 50;
        
        try {
            ctx.drawImage(img, 0, 0, 50, 50);
            const data = ctx.getImageData(0, 0, 50, 50).data;
            let r = 0, g = 0, b = 0, count = 0;
            
            for (let i = 0; i < data.length; i += 16) {
                r += data[i];
                g += data[i+1];
                b += data[i+2];
                count++;
            }
            
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            applyColorTheme(r, g, b);
        } catch(e) {
            applyColorTheme(255, 82, 66);
        }
    };
    
    img.onerror = function() {
        applyColorTheme(255, 82, 66);
    };
}

function applyColorTheme(r, g, b) {
    let dominantColor = `rgb(${r}, ${g}, ${b})`;
    document.documentElement.style.setProperty('--accent-color', dominantColor);
    
    document.getElementById('pageGradientOverlay').style.background = `radial-gradient(circle at 50% 20%, ${dominantColor} 0%, rgba(0, 0, 0, 0.65) 85%)`;
    
    const polaroidGrad = document.getElementById('polaroidGradientOverlay');
    if(polaroidGrad) {
        polaroidGrad.style.background = `radial-gradient(circle at 50% 20%, ${dominantColor} 0%, rgba(0, 0, 0, 0.65) 85%)`;
    }

    canvasGradient.style.background = `linear-gradient(180deg, ${dominantColor} 0%, rgba(0,0,0,0.5) 100%)`;
}

const colorExtractorCanvas = document.createElement('canvas');
colorExtractorCanvas.width = 30;
colorExtractorCanvas.height = 30;
const colorExtractorCtx = colorExtractorCanvas.getContext('2d');
let colorExtractionInterval = null;

function startVideoColorExtractor() {
    if (colorExtractionInterval) clearInterval(colorExtractionInterval);
    colorExtractionInterval = setInterval(() => {
        if (isCanvasActive && bgVideo.readyState >= 2 && !bgVideo.paused) {
            try {
                colorExtractorCtx.drawImage(bgVideo, 0, 0, 30, 30);
                const frameData = colorExtractorCtx.getImageData(0, 0, 30, 30).data;
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < frameData.length; i += 16) {
                    r += frameData[i];
                    g += frameData[i+1];
                    b += frameData[i+2];
                    count++;
                }
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
                applyColorTheme(r, g, b);
            } catch (err) {}
        }
    }, 500);
}

function stopVideoColorExtractor() {
    if (colorExtractionInterval) {
        clearInterval(colorExtractionInterval);
        colorExtractionInterval = null;
    }
    updatePaletteFromAlbum(albumImg.src);
}

function toggleCanvas() {
    isCanvasActive = !isCanvasActive;
    userManuallyTurnedCanvas = isCanvasActive;
    const btn = document.getElementById('canvasToggleBtn');
    if (isCanvasActive) {
        bgVideo.style.display = 'block';
        if (!isCleanView) canvasGradient.style.display = 'block';
        bgVideo.play().catch(() => {});
        btn.textContent = "VISUAL: ON";
        btn.classList.add('canvas-on');
        document.body.classList.add('visual-on');
        startVideoColorExtractor();
    } else {
        bgVideo.style.display = 'none';
        canvasGradient.style.display = 'none';
        bgVideo.pause();
        btn.textContent = "VISUAL: OFF";
        btn.classList.remove('canvas-on');
        document.body.classList.remove('visual-on');
        stopVideoColorExtractor();
    }
}

function toggleGuideModal() {
    const modal = document.getElementById('guideModal');
    modal.classList.toggle('active');
}

function toggleLoop() {
    isLoopActive = !isLoopActive;
    audio.loop = isLoopActive;
    const btn = document.getElementById('loopBtn');
    const embeddedBtns = document.querySelectorAll('.loopBtnEmbedded');
    
    let loopText = isLoopActive ? "LOOP: ON" : "LOOP: OFF";
    if (btn) btn.textContent = loopText;
    if (isLoopActive) {
        if(btn) btn.classList.add('active-status');
        embeddedBtns.forEach(b => b.classList.add('active-status'));
    } else {
        if(btn) btn.classList.remove('active-status');
        embeddedBtns.forEach(b => b.classList.remove('active-status'));
    }
    embeddedBtns.forEach(b => b.textContent = loopText);
}

function toggleCleanView() {
    isCleanView = !isCleanView;
    const container = document.getElementById('mainSlideContainer');
    const btn = document.getElementById('cleanViewBtn');
    const canvasBtn = document.getElementById('canvasToggleBtn');

    if (isCleanView) {
        container.classList.add('clean-view');
        
        isCanvasActive = true;
        bgVideo.style.display = 'block';
        bgVideo.play().catch(() => {});
        canvasGradient.style.display = 'none';
        
        canvasBtn.textContent = "VISUAL: ON";
        canvasBtn.classList.add('canvas-on');
        document.body.classList.add('visual-on');
        startVideoColorExtractor();

        if(btn) {
            btn.textContent = "SHOW";
            btn.classList.add('active-status');
        }

        isLoopActive = true;
        audio.loop = true;
        const loopBtn = document.getElementById('loopBtn');
        if(loopBtn) {
            loopBtn.textContent = "LOOP: ON";
            loopBtn.classList.add('active-status');
        }

        if (audio.paused) {
            togglePlay();
        }
    } else {
        container.classList.remove('clean-view');
        
        if (!userManuallyTurnedCanvas) {
            isCanvasActive = false;
            bgVideo.style.display = 'none';
            canvasGradient.style.display = 'none';
            bgVideo.pause();
            canvasBtn.textContent = "VISUAL: OFF";
            canvasBtn.classList.remove('canvas-on');
            document.body.classList.remove('visual-on');
            stopVideoColorExtractor();
        } else {
            if (isCanvasActive) {
                canvasGradient.style.display = 'block';
            }
        }
        
        if(btn) {
            btn.textContent = "HIDE";
            btn.classList.remove('active-status');
        }
    }
}

function loadLocalVideo(event) {
    const file = event.target.files[0];
    if (file) {
        bgVideo.src = URL.createObjectURL(file);
        if (isCanvasActive) {
            bgVideo.play();
            startVideoColorExtractor();
        }
        alert("Video background canvas berhasil diganti!");
    }
}

function loadLocalImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            albumImg.src = imageUrl;
            if (!isCanvasActive) {
                updatePaletteFromAlbum(imageUrl);
            }
        }
        reader.readAsDataURL(file);
    }
}

function loadLocalAudio(event) {
    const file = event.target.files[0];
    if (file) {
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = function() {
            let durationSec = Math.round(audio.duration);
            document.getElementById('duration-text').textContent = `0:00/${Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60).toString().padStart(2,'0')}`;
            document.getElementById('duration-text-embedded').textContent = document.getElementById('duration-text').textContent;
        };
        alert("File MP3 '" + file.name + "' berhasil dimuat!");
    }
}

function togglePlay() {
    const playIconsMain = document.querySelectorAll('.playIconMain');
    const pauseIconsMain = document.querySelectorAll('.pauseIconMain');
    const playIconsEmbedded = document.querySelectorAll('.playIconEmbedded');
    const pauseIconsEmbedded = document.querySelectorAll('.pauseIconEmbedded');

    if (audio.paused) {
        audio.play().catch(() => alert("Gagal memutar audio."));
        isPlaying = true;
        playIconsMain.forEach(el => el.style.display = 'none');
        pauseIconsMain.forEach(el => el.style.display = 'block');
        playIconsEmbedded.forEach(el => el.style.display = 'none');
        pauseIconsEmbedded.forEach(el => el.style.display = 'block');
        if (isCanvasActive) {
            bgVideo.play().catch(() => {});
            startVideoColorExtractor();
        }
    } else {
        audio.pause();
        isPlaying = false;
        playIconsMain.forEach(el => el.style.display = 'block');
        pauseIconsMain.forEach(el => el.style.display = 'none');
        playIconsEmbedded.forEach(el => el.style.display = 'block');
        pauseIconsEmbedded.forEach(el => el.style.display = 'none');
    }
}

audio.ontimeupdate = function() {
    if (!isNaN(audio.duration) && defaultLyrics.length > 0) {
        let current = audio.currentTime;
        let formattedSec = Math.floor(current);
        
        let currentMin = Math.floor(formattedSec / 60);
        let currentRemSec = formattedSec % 60;
        let formattedTimeDisplay = `${String(currentMin).padStart(2, '0')}:${String(currentRemSec).padStart(2, '0')}`;
        document.getElementById('time-display').textContent = formattedTimeDisplay;
        
        let totalDuration = !isNaN(audio.duration) && audio.duration > 0 ? audio.duration : 55;
        let totalMinStr = Math.floor(totalDuration / 60);
        let totalSecRem = Math.floor(totalDuration % 60);
        let totalSecFormatted = totalSecRem < 10 ? '0' + totalSecRem : totalSecRem;

        let timeStrFormatted = `${currentMin}:${String(currentRemSec).padStart(2, '0')}/${totalMinStr}:${totalSecFormatted}`;
        document.getElementById('duration-text').textContent = timeStrFormatted;
        document.getElementById('duration-text-embedded').textContent = timeStrFormatted;

        let percent = (current / totalDuration) * 100;
        if(percent > 100) percent = 100;
        
        document.querySelectorAll('.progress-bar-fill').forEach(bar => {
            bar.style.width = percent + '%';
        });

        updateAudioVisualizer();

        let activeIndex = -1;
        for (let i = 0; i < defaultLyrics.length; i++) {
            if (current >= parseTimeToSeconds(defaultLyrics[i].time)) {
                activeIndex = i;
            } else {
                break;
            }
        }

        defaultLyrics.forEach((item, idx) => {
            if (item.text.trim() !== "") {
                const el = document.getElementById(`lyric-row-${idx}`);
                if (el) {
                    if (idx === activeIndex) {
                        el.classList.add('active-lyric');
                    } else {
                        el.classList.remove('active-lyric');
                    }
                }
            }
        });

        const cleanLyricEl = document.getElementById('activeLyricLine');
        if (cleanLyricEl) {
            if (activeIndex >= 0 && defaultLyrics[activeIndex]) {
                let startTime = parseTimeToSeconds(defaultLyrics[activeIndex].time);
                let maxDisplayTime = 3.5;

                let nextTime = (activeIndex + 1 < defaultLyrics.length) 
                    ? parseTimeToSeconds(defaultLyrics[activeIndex + 1].time) 
                    : startTime + maxDisplayTime;

                let endTime = Math.min(nextTime - 0.2, startTime + maxDisplayTime);

                if (current >= startTime && current < endTime) {
                    cleanLyricEl.textContent = defaultLyrics[activeIndex].text;
                } else {
                    cleanLyricEl.textContent = "";
                }
            } else {
                cleanLyricEl.textContent = "";
            }
        }

        if (activeIndex !== lastActiveLyricIndex) {
            lastActiveLyricIndex = activeIndex;
            if (activeIndex >= 0) {
                const activeEl = document.getElementById(`lyric-row-${activeIndex}`);
                const container = document.getElementById('lyricsScrollWrapper');
                if (activeEl && container) {
                    container.scrollTo({
                        top: activeEl.offsetTop - container.offsetTop - (container.clientHeight / 2) + (activeEl.clientHeight / 2),
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
};

audio.onended = function() {
    if (!isLoopActive) {
        resetPlayer();
    }
};

function switchTab(tabName, event) {
    const tabs = document.querySelectorAll('.tab-content');
    const btns = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    btns.forEach(b => b.classList.remove('active'));

    if (tabName === 'lyrics') {
        document.getElementById('lyrics-tab').classList.add('active');
        renderLyrics();
    } else if (tabName === 'edit') {
        document.getElementById('edit-tab').classList.add('active');
        let currentString = defaultLyrics.filter(l => l.text.trim() !== "").map(l => l.text).join('\n');
        
        const editContainer = document.getElementById('edit-tab');
        editContainer.innerHTML = `
            <div class="lyric-studio-overlay">
                <div style="font-size: 10px; margin-bottom: 4px; text-transform: uppercase; font-weight: 600;">
                    Paste Lirik (1 Baris = 1 Kalimat):
                </div>
                <textarea id="studio-lyrics-input" class="studio-textarea">${currentString}</textarea>
                
                <div style="font-size: 9px; opacity: 0.9; margin-bottom: 8px; line-height: 1.4;">
                    <b>Cara Rekam Super Mudah (1 Klik):</b><br>
                    1. Putar lagu.<br>
                    2. Klik <b>"Rekam Baris Ini"</b> pas di ketukan vokal baris tersebut!
                </div>

                <div id="studio-preview-list" style="font-size: 10px; margin-bottom: 8px; max-height: 80px; overflow-y: auto; display: none;"></div>

                <div class="studio-btn-row">
                    <button class="studio-btn" onclick="recordLyricLine(event)">Rekam Baris Ini</button>
                    <button class="studio-btn" onclick="saveStudioLyrics()">Simpan</button>
                </div>
            </div>
        `;
        window.tempRecordedLyrics = [];
    } else if (tabName === 'message') {
        document.getElementById('message-tab').classList.add('active');
        startTypingEffect(currentMessagePlainText.replace(/\n/g, '<br>'));
    }
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

function recordLyricLine(e) {
    if (audio.paused) {
        alert("Silakan putar lagunya terlebih dahulu menggunakan tombol Play di bawah!");
        return;
    }

    const textarea = document.getElementById('studio-lyrics-input');
    if (!textarea) return;
    const lines = textarea.value.split('\n').filter(l => l.trim() !== "");
    
    let recordedCount = window.tempRecordedLyrics.length;

    if (recordedCount >= lines.length) {
        alert("Semua baris lirik sudah selesai direkam! Silakan klik 'Simpan'.");
        return;
    }

    let rawCurrentTime = audio.currentTime;
    let minutes = Math.floor(rawCurrentTime / 60);
    let seconds = Math.floor(rawCurrentTime % 60);
    let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const currentLineText = lines[recordedCount];

    window.tempRecordedLyrics.push({ time: formattedTime, text: currentLineText });

    const previewEl = document.getElementById('studio-preview-list');
    if(previewEl) {
        previewEl.style.display = 'block';
        previewEl.innerHTML = window.tempRecordedLyrics
            .map(l => `<div>[${l.time}] ${l.text}</div>`)
            .join('');
    }
    
    let nextCount = window.tempRecordedLyrics.length;
    if(nextCount < lines.length) {
        e.target.innerText = `Rekam Berikutnya (${nextCount}/${lines.length})`;
    } else {
        e.target.innerText = "Selesai Direkam!";
    }
}

function saveStudioLyrics() {
    if (!window.tempRecordedLyrics || window.tempRecordedLyrics.length === 0) {
        alert("Belum ada lirik yang direkam waktunya!");
        return;
    }

    defaultLyrics = window.tempRecordedLyrics;
    localStorage.setItem('savedLyrics', JSON.stringify(defaultLyrics));

    alert("Lirik dan ritme berhasil diperbarui dan disimpan secara permanen!");
    switchTab('lyrics');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
}

function changeSongTitle() {
    let newTitle = prompt("Masukkan judul lagu baru:", "if you could see me cryin in my room");
    if (newTitle) {
        let parts = newTitle.split(" ");
        let lastWord = parts.pop();
        let firstPart = parts.join(" ");
        document.getElementById('songTitleDisplay').innerHTML = `${firstPart}<br><span id="songTitleSpan" style="text-transform: none;">${lastWord}</span>`;
        document.getElementById('postcardSongTitle').textContent = newTitle;
        updateFooterMeta();
    }
}

function changeArtist() {
    let newArtist = prompt("Masukkan nama artis baru:", "Arash Buana & Raissa Anggiani");
    if (newArtist) {
        document.getElementById('artistDisplay').textContent = newArtist;
        document.getElementById('postcardArtistName').textContent = newArtist;
        updateFooterMeta();
    }
}

function updateFooterNomorOrMeta() {
    let titleMain = document.getElementById('songTitleDisplay').innerText.replace(/\n/g, ' ');
    let artist = document.getElementById('artistDisplay').textContent;
    
    let footerTitleEl = document.getElementById('footerSongTitle');
    let footerTitleEmbeddedEl = document.getElementById('footerSongTitleEmbedded');
    
    footerTitleEl.textContent = titleMain;
    footerTitleEl.style.textTransform = 'none';
    footerTitleEl.style.fontSize = '11px';

    if(footerTitleEmbeddedEl) {
        footerTitleEmbeddedEl.textContent = titleMain;
        footerTitleEmbeddedEl.style.textTransform = 'none';
        footerTitleEmbeddedEl.style.fontSize = '11px';
    }

    document.getElementById('footerArtistName').textContent = artist.toUpperCase();
    const embeddedArtist = document.getElementById('footerArtistNameEmbedded');
    if(embeddedArtist) embeddedArtist.textContent = artist.toUpperCase();
}

function updateFooterMeta() {
    updateFooterNomorOrMeta();
}

function editMessage() {
    let currentPlainText = currentMessagePlainText;
    let newMsg = prompt("Ubah pesan rahasia (gunakan Enter untuk baris baru):", currentPlainText);
    if (newMsg !== null) {
        currentMessagePlainText = newMsg;
        document.getElementById('postcardMessageText').textContent = newMsg;
        startTypingEffect(newMsg.replace(/\n/g, '<br>'));
        
        let waBtn = document.getElementById('waShareLink');
        waBtn.href = `https://wa.me/6281461232770?text=${encodeURIComponent(newMsg)}`;
    }
}

function downloadPostcard() {
    const postcardElement = document.getElementById('memoryPostcard');
    
    html2canvas(postcardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const imageLink = document.createElement('a');
        imageLink.download = 'memory-postcard.png';
        imageLink.href = canvas.toDataURL('image/png');
        imageLink.click();
    }).catch(err => {
        alert("Gagal mendownload postcard. Pastikan gambar album sudah termuat sempurna!");
    });
}

function resetPlayer() {
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    document.querySelectorAll('.playIconMain').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.pauseIconMain').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.playIconEmbedded').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.pauseIconEmbedded').forEach(el => el.style.display = 'none');
}
