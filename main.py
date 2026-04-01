import time
import os
import re
from fastapi import FastAPI,Request             #获取所有路由、依赖、模板
from fastapi.templating import Jinja2Templates  #获取动态页面（含变量，继承）例如所有的 HTML 模板
from fastapi.staticfiles import StaticFiles     #获取静态资源（css/js/图片）负责单个文件
from pathlib import Path                        #Python 标准库的 Path 用来拼路径、读文件、判存在
from fastapi import HTTPException               #显示标准的 HTTP 错误响应
import markdown                                 #把 Markdown 字符串转成 HTML
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
import frontmatter
from datetime import datetime, date
app = FastAPI()       # debug 模式，关闭热部署

# 跨域配置（解决前端请求接口被拦截的问题）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # 开发环境允许所有来源，生产环境可指定前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MUSIC_DIR = Path(__file__).parent / "static" / "music"      #提前设置地址链接

@app.get("/music/list")     #写到前面，因为给后面的读取 css 和 js 的路径覆盖了
async def music_list():
    if not MUSIC_DIR.exists():
        return JSONResponse(content={"tracks": []})     #返回获取的音乐文件列表
    mp3_files = [
        # 取文件名（f.name），保留子路径用 f.relative_to(MUSIC_DIR)
        f.name for f in sorted(MUSIC_DIR.glob("**/*.[mM][pP]3"))
        if not f.name.startswith(".")  # 排除隐藏文件
           and f.is_file()  # 排除文件夹（只保留文件）
    ]
    return JSONResponse(content={"tracks": mp3_files})      #返回音乐文件列表

# Path(__file__) 获取当前脚本文件 (main.py) 的完整路径 .parent 去掉文件名,向下拼接两级子目录
app.mount("/music",StaticFiles(directory=MUSIC_DIR),name="music")
IMG_DIR = Path(__file__).parent / "static" / "img"                           #生成“图片静态目录”的绝对路径
app.mount("/img",StaticFiles(directory=IMG_DIR),name="img")             #用于 boke 目录下的图片
app.mount("/static",StaticFiles(directory="static"),name="static")      #用于 CSS/JS 等通用静态资源
ARTICLES = Path("articles")                                                  #读取 markdown 储存路径
templates = Jinja2Templates(directory="templates")                           #打开动态页面所有 HTML 模板

@app.get("/")           #路由
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request":request,"ts": int(time.time())}       # ts 用于给 CSS 加时间戳，强制浏览器刷新缓存
    )

@app.get("/posts")
async def posts(request: Request):
    items = []
    for f in ARTICLES.glob("*.md"):
        post = frontmatter.loads(f.read_text(encoding="utf-8"))
        raw = post.get("date", date.today())
        if isinstance(raw, date):
            date_obj = raw
        else:
            date_obj = datetime.strptime(str(raw), "%Y-%m-%d").date()

        items.append({
            "slug"     : f.stem,
            "title"    : post.get("title", f.stem),
            "date"     : str(date_obj),
            "category" : post.get("category", "未分类"),
            "_date"    : date_obj         # 排序用
        })
    items.sort(key=lambda x: x["_date"], reverse=True)
    return templates.TemplateResponse(
        "posts.html",
        {"request": request,
         "items": [{k: v for k, v in it.items() if k != "_date"} for it in items]}
    )

@app.get("/posts/{slug}")   #通过用户点击后， /posts/{slug} 自动把 URL 里对应位置的值注入 slug
async def read_post(slug: str,request: Request):
    if not re.fullmatch(r"[\w\s\-\u4e00-\u9fff]{1,80}", slug):           #白名单校验
        raise HTTPException(400,"文章名含非法字符或过长")
    md_file = ARTICLES / f"{slug}.md"       #把把 URL 中的  slug  变成硬盘上的文件路径
    if not md_file.exists():                #判断是否存在，if not 判断条件是否为假，.exists 方法用来寻找文件是否存在
        raise HTTPException(404,"文章不存在")    # 返回一个标准的 HTTP 错误响应
    post = frontmatter.loads(md_file.read_text(encoding="utf-8"))              # 用 frontmatter 分离元数据与正文
    html = markdown.markdown(                                  #将 markdown 转化成 HTML
        post.content,
        extensions=['extra', 'codehilite','fenced_code'],      # markdown 的文本，代码高亮显示
        extension_configs={                                    #扩展配置
            'codehilite': {
                'use_pygments': False,
                'css_class': 'language',
                'noclasses': False
            }
        }
    )
    return templates.TemplateResponse(          # return 一个请求和 URL 和转化的 HTML
        "post.html",
        {"request":request,
         "title":post.get("title",slug),
         "content":html,
         "date": str(post.get("date", date.today())),
         "category":post.get("category","未分类")
         }
    )

@app.get("/msg")            # 新路由，留言板的路由
async def msg_page(request: Request):           # 和前面一样，返回一个 URL 请求
    return templates.TemplateResponse(
        "msg.html",                             #把 msg.html 给返回
        {"request": request}
    )

@app.get("/guanyu")
async def guanyu_page(request: Request):
    return templates.TemplateResponse(
        "guanyu.html",
        {"request": request}
    )

# FastAPI 提供的全局异常钩子
@app.exception_handler(StarletteHTTPException)          # 获取应用里任何地方抛出的异常
async def custom_404(request: Request, exc: StarletteHTTPException):        #exc是被捕获到的异常实例
    if exc.status_code == 404:      #判断和处理“路由未匹配”场景
        return templates.TemplateResponse("404.html", {"request": request}, status_code=404)   # 返回404的网页，显式给响应设置404，报告页面错误
    raise exc   #不是 404，就把异常重新抛出