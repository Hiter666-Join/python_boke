---
title: "Python的循环语句"
date: 2026-04-01
category: "技术笔记"
---

# 一，while 循环
#### while 的语法用法形如：

```python
while 判断条件:  
    代码块
```

要注意的是，while 判断条件后要加一个冒号 **:** ，因为 python 中不使用花括号来包括代码块，所以在循环下的所有代码块，都要进行缩进来保证属于一个整体

#### 无限循环

当判断条件恒为 True 的时候，就会触发无限循环，在特定的情况下无限循环非常有用

```python
while True:  
    代码块
```

在循环过程里，可以发起无限请求，在服务器实时请求里经常使用该方法
在循环中，可以按 **CTRL + C** 来结束循环

#### while循环使用else语句

当循环条件不符合或者为 false 时，并且没有跳出循环的情况下，就会执行 else 中的内容

```python
while 判断条件:  
    代码块  
else:  
    代码块
```

# for 循环

#### for循环的语法用法形如：

```python
for 元素 in 可迭代对象:  
    代码块
```

这样不好理解，我们举两个例子

遍历输出列表内容：

```python
list1 = ['a','b','c','apple','banana']  
for result in list1:  
    print(result)
```

这样会依次遍历列表内的内容，并且输出，对列表进行迭代

遍历输出字符串

```python
str1 = 'apple'  
for result in str1:  
    print(result)
```

对字符串则是依次输出单个字符，对字符串进行迭代

#### range()函数

```python
value = 0  
for i in range(1,6):  
    value += i  
print(value)
```

以上面的例子为例，range会遍历数字序列，可以控制范围，也可以控制循环次数，经常和 for 循环一起使用

```python
range(5) # 循环5次，遍历 0，1，2，3，4，不包括 5  
range(1,5) # 遍历 1，2，3，4，不包括 5
```

用法和切片大差不差，都是前闭后开区间，并且可以设置步频`range(10,100,50)`

可以结合 range() 和 len() 函数以遍历一个序列的索引

```python
list1 = ['a','b','c','apple','banana']  
for i in range(len(list1)):  
    print(i,list1[i])
```

也可以创建列表

```python
list(range(10))
```

#### for循环使用else语句

当循环结束后，并且没有跳出循环，就执行 else 代码块

```python
for item in iterable:
    # 循环主体
else:
    # 循环结束后执行的代码
```

# break 和 continue 语句

简单来说就是 break 是跳出循环体，结束循环；而 continue 是跳出当前循环，继续下一次循环
使用 break 跳出循环，结束循环后 else 语句永远不会生效

break

```python
n = 10  
while n > 0:  
    n -= 2  
    if n == 2:  
        break  
    print(n)
```

输出：

```
8
6
4
```

continue

```python
n = 10  
while n > 0:  
    n -= 2  
    if n == 2:  
        continue  
    print(n)
```

输出：

```
8
6
4
0
```

看输出的差异就大致可以知道这两个的区别了

