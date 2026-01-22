---
title: "Python的元组"
date: 2026-01-22
category: "技术笔记"
---

Python 的元组与列表类似，不同之处在于元组的元素不能修改，元组使用小括号`()`，列表使用方括号`[]`
### 元组
```python
tuple1 = ('1','2','3','4','5')
tuple2 = (1,2,3,4,5)
tuple3 = '1','2','3','4','5'
print(type(tuple1))
print(type(tuple2))
print(type(tuple3))
```
输出：
```python
<class 'tuple'>
<class 'tuple'>
<class 'tuple'>
```
创建一个空元组：
```python
tup1 = ()
```
**如果元组中只包含一个元素时，需要在元素后面添加逗号`,`，否则括号会被当成运算符**
```python
tuple1 = (1)
print(type(tuple1))
tuple2 = (1,)
print(type(tuple2))
```
输出：
```python
<class 'int'>
<class 'tuple'>
```
### 访问元组
可以使用元组下标或者切片，来访问元组内容
```python
tuple1 = (1,2,3,4,5)
tuple2 = ('1','2','3','4','5')
print(tuple1[3])
print(tuple2[2:4])
```
输出：
```python
4
('3', '4')
```
元组中的元素值是不允许修改的，但我们可以对元组进行连接组合
```python
tuple1 = (1,2,3,4,5)
tuple2 = ('1','2','3','4','5')
tuple3 = tuple1 + tuple2
print(tuple3)
# tuple1[2] = 3  这是不被允许的
```
输出：
```python
(1, 2, 3, 4, 5, '1', '2', '3', '4', '5')
```
### 删除元组
元组中的元素值是不允许删除的，但我们可以使用del语句来删除整个元组
```python
tuple1 = (1,2,3,4,5)
del tuple1
```
### 元组的运算符
元组和列表一样也可以使用`+`，`+=`，`*`来进行运算
```python
tuple1 = (1,2,3,4,5)
tuple2 = ('1','2','3','4','5')
tuple3 = tuple1 + tuple2
print(tuple3)

tuple1 += tuple2
print(tuple1)

tuple4 = ('hi',) * 4
print(tuple4)
```
输出：
```python
(1, 2, 3, 4, 5, '1', '2', '3', '4', '5')
(1, 2, 3, 4, 5, '1', '2', '3', '4', '5')
('hi', 'hi', 'hi', 'hi')
```
**还可以进行判断和迭代**
```python
tuple1 = (1,2,3,4,5)
print(3 in tuple1)

for i in tuple1:
    print(i,end=" ")
```
输出：
```python
True
1 2 3 4 5 
```
### 元组的函数
```python
# len(tuple)
# 计算元组元素个数
tuple1 = (1,2,3,4,5)
print(len(tuple1))

# max(tuple)
# 返回元组中元素最大值
print(max(tuple1))

# min(tuple)
# 返回元组中元素最小值
print(min(tuple1))

# tuple(iterable)
# 将可迭代系列转换为元组
list1 = [1,2,3,4,5]
tuple2 = tuple(list1)
print(tuple2)
```
输出：
```python
5
5
1
(1, 2, 3, 4, 5)
```
### 关于元组的不可变，本质上是指的是元组所指向的内存中的内容不可变
如果有兴趣了解该部分可以看这一篇文章：[元组不可变，你真的确定吗？有了列表，元组存在的意义又是什么？](https://blog.csdn.net/momoda118/article/details/119807916)