---
title: "Python的常见的六种数据类型"
date: 2026-01-09
category: "技术笔记"
---

Python3 中常见的数据类型有：

  

-   Number（数字）
-   String（字符串）
-   bool（布尔类型）
-   List（列表）
-   Tuple（元组）
-   Set（集合）
-   Dictionary（字典）

  

其中有：

  

-   **不可变数据（3 个）：**Number（数字）、String（字符串）、Tuple（元组）；
-   **可变数据（3 个）：**List（列表）、Dictionary（字典）、Set（集合）。

  

### 1.Number （数字）

  

数字类型其中有 int ，float ， bool， complex 。

  

分别是：

  

-   int （整型）
-   float （浮点型）
-   bool （布尔型）
-   complex （复数）

  

可以通过内置的type()函数来查询对象类型：

  

```python
a,b,c,d = 10 ,6.6 ,True , 4+3j
print(type(a) , type(b) , type(c) , type(d))
# <class 'int'> <class 'folat'> <class 'bool'> <class 'complex'>
```

  

*注：python3 中，bool 是 int 的子类， True 和 False 可以和数字相加，当有True == 1 ，False == 0时，会返回 True。*

  

```python
True == 1 # 返回 True
False == 0 # 返回 True
```

  

**数值运算：**

  

```python
5 + 4  # 加法9
4.3 - 2 # 减法2.3
3 * 7  # 乘法21
2 / 4  # 除法，得到一个浮点数0.5
2 // 4 # 除法，得到一个整数0
17 % 3 # 取余 2
2 ** 5 # 乘方32
```

  

### String （字符串）

  

python中字符串使用单引号 **'** 或者双引号 **"** 括起来，同时可以使用反斜杠 **\\** 来转义特殊字符

  

字符串的运用比较灵动，可以通过加号 **+** 来连接字符串，也可以使用星号 **\*** 来实现复制字符串

  

```python
str = 'Hello'        # 定义一个字符串变量
print(str)           # 打印整个字符串
print(str * 2)       # 打印字符串两次
print(str + "World") # 打印字符串和"World"拼接在一起
```

  

使用反斜杠 **\\** 来转义特殊字符,可以在字符串前面添加一个 **r**，表示原始字符串

  

```python
print('He\llo')
# He
# llo
print(r'He\llo')
# He\llo
```

  

也可以直接取字符串中的字符

  

```python
i = 'Python'print(i[0], i[5])
# P n
print(i[-1], i[-6])
# n P
```

  

*注：-1 ， -6 就是反方向取数*

  

### bool （布尔类型）

  

布尔类型即 True 或 False

  

在 Python 中，True 和 False 都是关键字，表示布尔值

  

```python
# 布尔类型的值和类型
a = True
b = False
print(type(a))  # <class 'bool'>
print(type(b))  # <class 'bool'>
 
# 布尔类型的整数表现
print(int(True))   # 1
print(int(False))  # 0
 
# 使用 bool() 函数进行转换
print(bool(0))         # False
print(bool(12))        # True
print(bool(''))        # False
print(bool('Python'))  # True
print(bool([]))        # False
print(bool([1, 2, 3])) # True
 
# 布尔比较运算
print(5 > 3)  # True
print(2 == 2) # True
print(7 < 4)  # False
```

  

### List（列表）

  

列表是 python 中最重要的数据类型，可以实现大多数的数据结构的实现， 列表中可以包含的元素的类型可以是不同的，可以有数字，字符串，或者列表

  

列表形如

  

```python
list = ['hello' , 12 , 6.6 ]
```

  

加号 **+** 是列表连接运算符，星号 **\*** 是重复操作

  

```python
list = [ 'hello' , 12 , 6.6 , 'world' , 10.2 ]  # 定义一个列表
tinylist = [123, 'world']
 
print (list)            # 打印整个列表
print (tinylist * 2)    # 打印tinylist列表两次
print (list + tinylist)  # 打印两个列表拼接在一起的结果
```

  

### Tuple （元组)

  

元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号 () 里，元素之间用逗号隔开

  

元组形如

  

```python
tuple = ('hello' , 12 , 6.6 )
```

  

加号 **+** 是列表连接运算符，星号 **\*** 是重复操作

  

```python
tuple = ( 'hello', 12 , 6.6, 'world', 70.2  )
tinytuple = (123, 'world')
 
print (tuple)             # 输出完整元组
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组
```

  

构造包含 0 个或 1 个元素的元组比较特殊，所以有一些额外的语法规则，以区分它是一个元组而不是一个普通的值，这是因为在没有逗号的情况下，Python会将括号解释为数学运算中的括号，而不是元组的表示

  

```python
tup1 = ()    # 空元组
tup2 = (20,) # 一个元素，需要在元素后添加逗号
```

  

### Set（集合）

  

在 Python 中，**set** 是一种 **无序且不重复** 的元素集合。它的主要特点是可以用于关系测试、去除重复元素以及执行集合运算（如交集、并集、差集等）。**set** 类型的实现类似于数学中的集合概念

  

Python 中，集合使用大括号 **{}** 表示，元素之间用逗号 **,** 分隔

  

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}
```

  

或者使用set(value)

  

```python
sets = set([10,12,134,122])
print(sets)
# {10,12,134,122}
```

  

集合的数学操作

  

```python
# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')
 
print(a)
 
print(a - b)     # a 和 b 的差集
 
print(a | b)     # a 和 b 的并集
 
print(a & b)     # a 和 b 的交集
 
print(a ^ b)     # a 和 b 中不同时存在的元素
```

  

### Dictionary（字典）

  

字典是一种内置的数据结构，它以键值对的形式存储数据。字典是无序的，这意味着存储在字典中的数据没有特定的顺序。字典的键必须是唯一的，但值可以重复。字典的键通常是字符串，但也可以是任何不可变的类型，如数字或元组

  

字典是一种映射类型，字典用 **{}** 标识，它是一个无序的 **键(key) : 值(value)** 的集合

  

```python
dictionary = {'name': 'Hiter','code':one, 'site': 'www.iamyyy.top'}
```

  

字典内置方法

  

```python
dictionary = {'name': 'Hiter','code':one, 'site': 'www.iamyyy.top'}
print (dictionary)          # 输出完整的字典
print (dictionary.keys())   # 输出所有键
print (dictionary.values()) # 输出所有值
```

  

### bytes 类型

  

**`bytes`类型**表示一个不可变的字节序列，用于存储二进制数据。它的特点包括：

  

-   **不可变性**：`bytes`对象是不可变的，类似于字符串（`str`），但`bytes`存储的是原始的字节数据，而不是字符。
    
-   **创建方式**：可以通过在字节序列前加上`b`或`B`前缀来创建`bytes`对象，例如：`b'hello'`。
    
-   **操作**：`bytes`对象支持索引和切片操作，允许访问和处理字节数据。
    
-   [应用场景：常用于网络通信、文件读写和加密解密等需要处理二进制数据的场景。](https://www.cnblogs.com/springsnow/p/13174511.html "应用场景：常用于网络通信、文件读写和加密解密等需要处理二进制数据的场景。 ") 
    

  

  

### Python数据类型转换

  

数据类型的转换，你只需要将数据类型作为函数名即可

![这是一个表格图片](/img/2026_01_09_01.jpg){: width="600" height="500" }

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

  

这几个内置的函数可以执行数据类型之间的转换。这些函数返回一个新的对象，表示转换的值