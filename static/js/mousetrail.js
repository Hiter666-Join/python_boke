/* mousetrail.js 雪花彩条拖尾 */
const colors = ["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"];
const characters = ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"];
const elementGroup = [];

// 工具函数：批量应用样式
function ApplyStyle(el, styles) {
    for (let k in styles) el.style[k] = styles[k];
}

class Element {
    constructor() {
        this.character = characters[Math.floor(Math.random() * characters.length)];
        this.lifeSpan = 120;
        this.initialStyles = {
            position: "fixed",
            top: "0",
            display: "block",
            pointerEvents: "none",
            zIndex: "10000000",
            fontSize: "25px",
            willChange: "transform",
            color: "#000000"
        };
    }
    init(x, y, color) {
        this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 };
        this.position = { x: x - 10, y: y - 20 };
        this.initialStyles.color = color;
        this.element = document.createElement("span");
        this.element.innerHTML = this.character;
        ApplyStyle(this.element, this.initialStyles);
        this.update();
        document.body.appendChild(this.element);
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lifeSpan--;
        this.element.style.transform = `translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan / 120})`;
    }
    die() {
        this.element.remove();
    }
}

function Render() {
    for (let i = 0; i < elementGroup.length; i++) {
        elementGroup[i].update();
        if (elementGroup[i].lifeSpan < 0) {
            elementGroup[i].die();
            elementGroup.splice(i, 1);
        }
    }
    requestAnimationFrame(Render);
}

document.addEventListener("mousemove", e => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const el = new Element();
    el.init(e.clientX, e.clientY, color);
    elementGroup.push(el);
});

Render();