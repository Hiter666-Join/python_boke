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

app = FastAPI(debug=os.getenv("DEBUG","false").lower() == "true")       # debug 模式，不用修改后反复启动,部署记得删了!!!!!!!!!!!!!!!!!!!!

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

@app.get("/posts")      # posts 页面路由
async def posts(request: Request):
    md_files = sorted(ARTICLES.glob("*.md"))    # .glob 出所有 .md 后缀的文件进行排序
    items = [{"slug": f.stem,"title": f.stem} for f in md_files]    #使用推导式方式，.stem 获取文件的名称，放入字典 items
    return templates.TemplateResponse(
        "posts.html",
        {"request":request,"items":items}   # return 一个请求和字典 items
    )

@app.get("/posts/{slug}")   #通过用户点击后， /posts/{slug} 自动把 URL 里对应位置的值注入 slug
async def read_post(slug: str,request: Request):
    if not re.fullmatch(r"[A-Za-z0-9\-_]+",slug):           #白名单校验
        raise HTTPException(400,"非法文章名")
    md_file = ARTICLES / f"{slug}.md"       #把把 URL 中的  slug  变成硬盘上的文件路径
    if not md_file.exists():                #判断是否存在，if not 判断条件是否为假，.exists 方法用来寻找文件是否存在
        raise HTTPException(404,"文章不存在")    # 返回一个标准的 HTTP 错误响应
    md_text = md_file.read_text(encoding="utf-8")              # .read_text 读取全部文本内容
    html = markdown.markdown(                                  #将 markdown 转化成 HTML
        md_text,
        extensions=['extra', 'codehilite','fenced_code'],      # markdown 的文本，代码高亮显示
        extension_configs={                                    #扩展配置
            'codehilite': {
                'use_pygments': False,
                'css_class': 'language',
                'noclasses': False
            }
        }
    )
    return templates.TemplateResponse(
        "post.html",
        {"request":request,"title":slug,"content":html}     # return 一个请求和 URL 和转化的 HTML
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