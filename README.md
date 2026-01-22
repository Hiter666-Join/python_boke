# 🏠 Hiter's Notes  
> 一个轻量级、自托管的个人博客 —— 用 FastAPI 驱动，支持 Markdown 写作、Artalk 评论、音乐播放器与主题切换。

---

## ✨ 亮点功能
- ✍️ **Markdown 写作** → 文章一键渲染为 HTML  
- 💬 **Artalk 评论系统** → 轻量、自托管、支持表情包  
- 🎵 **内置音乐播放器** → 全局悬浮，支持列表循环/随机播放  
- 🕒 **实时时间显示** → 页面顶部动态刷新  
- 🌓 **一键主题切换** → 深色 / 浅色 / 自动（跟随系统）  
- 📊 **博客运行时长** → 从建站日精确到秒的“已运行 N 天”  
- 🐍 **纯 Python 路由** → 无需数据库，部署仅需 Python 环境  

---

## 🧱 技术栈
| 层级        | 技术                          |
|-------------|-------------------------------|
| 后端框架    | FastAPI                       |
| 前端模板    | Jinja2 + HTML + CSS + Vanilla JS |
| 文章格式    | Markdown → `markdown` 库渲染  |
| 评论系统    | [Artalk](https://artalk.js.org)（自托管） |
| 部署方式    | Uvicorn / Gunicorn / Docker（可选） |

---

## 🚀 快速开始
1. 克隆仓库  
   ```bash
   git clone https://github.com/yourname/hiter-notes.git
   cd hiter-notes
   ```

2. 创建虚拟环境并安装依赖  
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows 用 venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. 启动开发服务器  
   ```bash
   uvicorn main:app --reload
   ```
   浏览器访问 [http://127.0.0.1:8000](http://127.0.0.1:8000) 即可预览。

---

## 📁 项目结构
```
hiter-notes
├─ main.py              # FastAPI 入口，所有路由
├─ posts/               # Markdown 文章（*.md）
├─ static/
│  ├─ css/              # 样式 + 主题变量
│  ├─ js/               # 音乐播放器、时间、主题切换逻辑
│  └─ img/              # 头像、favicon、背景图
├─ templates/
│  ├─ base.html         # 主模板
│  ├─ index.html        # 首页
│  ├─ post.html         # 文章页
│  └─ message.html      # 留言板（嵌入 Artalk）
├─ requirements.txt
└─ README.md
```

---

## 📝 写文章
1. 在 `posts/` 目录新建 `.md` 文件，文件名即 URL Slug  
2. 顶部可写 YAML Front Matter（可选）：
   ```markdown
   ---
   title: Python 的元组
   date: 2026-01-22
   tags: [Python, 基础]
   ---
   正文开始...
   ```
3. 保存后重启服务（生产环境可改为热加载或监听文件变动）。

---

## 🎨 主题切换
- 点击右上角「🌓」图标即可循环切换 深色 / 浅色 / 自动  
- 主题偏好自动写入 `localStorage`，下次访问自动恢复

---

## 🎶 音乐播放器
- 播放列表写在 `static/js/player.js` 的 `playlist` 数组里  
- 支持快捷键：  
  - 空格 → 播放/暂停  
  - ←/→ → 上一首/下一首  
  - ↑/↓ → 音量加减

---

## 💬 评论系统（Artalk）
1. 下载 Artalk 独立二进制或 Docker 镜像，运行后端  
2. 修改 `templates/message.html` 中的 `server` 地址为你自己的 Artalk 服务  
3. 首次访问留言板，按提示创建管理员账户即可

---

## 🚢 部署示例（Docker）
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
构建 & 运行：
```bash
docker build -t hiter-notes .
docker run -d -p 8000:8000 hiter-notes
```

---

## 🤝 贡献
欢迎提 Issue / PR 分享你的想法，包括但不限于：  
- 新的主题配色  
- 播放器特效  
- Markdown 解析插件  
- 性能优化建议

---

## 📄 License
MIT © 2026 Hiter  
Feel free to fork & remix！

---

## 🙋‍♂️ 作者
- Blog: [https://wwwiamyyy.com](https://www.iamyyy.com)  
- GitHub: [@Hiter666-Join](https://github.com/Hiter666-Join)  
- CSDN: [Hiter_John](https://blog.csdn.net/Hiter_John)
