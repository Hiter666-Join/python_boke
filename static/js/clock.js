/* 全站时钟（保留你现有逻辑） */
(function(){
    const $ = id => document.getElementById(id);
    const secondHand = $('second');
    const minuteHand = $('minute');
    const hourHand   = $('hour');
    const digital    = $('digital');

    function updateClock(){
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();

        const sDeg = s * 6;
        const mDeg = m * 6 + s * 0.1;
        const hDeg = (h % 12) * 30 + m * 0.5;

        secondHand.setAttribute('transform', `rotate(${sDeg},60,60)`);
        minuteHand.setAttribute('transform', `rotate(${mDeg},60,60)`);
        hourHand.setAttribute('transform',   `rotate(${hDeg},60,60)`);
        digital.textContent = [h, m, s].map(v=>String(v).padStart(2,'0')).join(':');
    }
    updateClock();
    setInterval(updateClock, 1000);
})();