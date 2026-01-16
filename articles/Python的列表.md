---
title: "Python的列表"
date: 2026-01-17
category: "技术笔记"
---

**列表是 python 中内置的数据结构，属于序列的一种，序列中的每个值都有对应的位置值，称之为索引，第一个索引是 0，第二个索引是 1，依此类推，而列表可以进行的操作包括索引，切片，加，乘，检查成员，而且列表内置了可获取列表长度，最大值，最小值的方法，下面开始讲解列表的用法**

### 列表的表示形式
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]
list3 = ["hello","world"]
```
创建一个列表，只要把逗号分隔的不同的数据项然后使用方括号括起来
### 访问列表的值
访问列表的值，可以通过索引来进行查询，列表索引从第一个 0 开始，第二个索引是 1 ，依此类推
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

print(list1[1])
print(list2[2])
```
输出：
```python
2
l
```
也可以通过负索引来进行查询，列表索引从 -1 开始，倒数第二个索引是 -2 ，依此类推
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

print(list1[-1])
print(list2[-2])
```
输出：
```python
5
l
```
同样，在列表里也可以使用切片的方法来取值
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

print(list1[2:4])
print(list2[-4:-2])
print(list1[:2:-1])
print(list2[:])
```
输出：
```python
[3, 4]
['e', 'l']
[5, 4]
['H', 'e', 'l', 'l', 'o']
```
### 列表的增删改
列表的增删，往列表里添加内容可以使用`append()`方法，删除内容可以使用`del()`，修改内容可以直接使用索引修改
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

print(f"未修改前，列表1为{list1}")
print(f"未修改前，列表2为{list2}")

# 增 (append)
list1.append(6)
list2.append("!")
print(f"增加后，列表1为{list1}")
print(f"增加后，列表2为{list2}")

# 改
list1[2] = 2
list2[1:5] = ["E","L","L","O"]
print(f"修改后，列表1为{list1}")
print(f"修改后，列表2为{list2}")

# 删 (del)
del list1[0:3]
del list2[3:7]
print(f"删除后，列表1为{list1}")
print(f"删除后，列表2为{list2}")
```
输出：
```python
未修改前，列表1为[1, 2, 3, 4, 5]
未修改前，列表2为['H', 'e', 'l', 'l', 'o']
增加后，列表1为[1, 2, 3, 4, 5, 6]
增加后，列表2为['H', 'e', 'l', 'l', 'o', '!']
修改后，列表1为[1, 2, 2, 4, 5, 6]
修改后，列表2为['H', 'E', 'L', 'L', 'O', '!']
删除后，列表1为[4, 5, 6]
删除后，列表2为['H', 'E', 'L']
```
删除内容除了`del()`方法，还有`pop()`,`remove()`
`del()`：删除变量及其引用的对象，以及删除列表中的元素
`pop()`：用于从列表中移除元素并返回被移除的值
`remove()`：用于从列表中移除指定的元素，会删除列表中第一个匹配的元素

**del**
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

print(f"未修改前，列表1为{list1}")
print(f"未修改前，列表2为{list2}")

# 删 (del)
del list1[0:3]
del list2[3:7]
print(f"删除后，列表1为{list1}")
print(f"删除后，列表2为{list2}")
```
输出：
```python
未修改前，列表1为[1, 2, 3, 4, 5]
未修改前，列表2为['H', 'e', 'l', 'l', 'o']
删除后，列表1为[4, 5]
删除后，列表2为['H', 'e', 'l']
```

**pop**
```python
list1 = [1,2,3,4,5]
list2 = ["H","e","l","l","o"]

# 删 (pop)
i = list1.pop(2)
j = list2.pop(2)
print(list1)
print(i)
print(list2)
print(j)
```
输出：
```python
[1, 2, 4, 5]
3
['H', 'e', 'l', 'o']
l
```

**remove**
```python
list1 = [1,2,2,3,2,4,5]
list2 = ["H","e","l","l","o"]
list3 = ["Hiter","John","Handsome"]

# 删 (remove)
list1.remove(2)
list2.remove("H")
list3.remove("John")
print(list1)
print(list2)
print(list3)
```
输出：
```python
[1, 2, 3, 2, 4, 5]
['e', 'l', 'l', 'o']
['Hiter', 'Handsome']
```
*注：remove只会删除遍历到的第一个值，如果要删除所有值，可以使用循环来删除*

例如：
```python
list1 = [1,2,2,3,2,4,5]

# 删 (remove)
for i in range(list1.count(2)):
    list1.remove(2)
print(list1)
```
输出：
```python
[1, 3, 4, 5]
```
### 列表的操作符
- 获取长度：
```python
list1 = [1,2,2,3,2,4,5]
print(len(list1))
```
输出：
```python
7
```
- 拼接列表：
```python
list1 = ["Hello"]
list2 = ["World"]

list3 = list1 + list2
print(list3)

list1 = [1,2,3]
list2 = ["one","two","three"]
list3 = list1 + list2
print(list3)
```
输出：
```python
['Hello', 'World']
[1, 2, 3, 'one', 'two', 'three']
```
- 重复列表：
```python
print(['OJBK'] * 5)
```
输出：
```python
['OJBK', 'OJBK', 'OJBK', 'OJBK', 'OJBK']
```
- 查询列表：
```python
print(2 in [1,2,3,4,5])
```
输出：
```python
True
```
- 迭代列表：
```python
for i in [1,2,3,4,5]:
    print(i,end=" ")
```
输出：
```python
1 2 3 4 5 
```
### 列表的函数
使用 `max()`，`min()` 来获取列表中的最大值和最小值，还有使用 `list()` 来转化列表，我们一个一个来展示
`max()`:
```python
list1 = [1,2,3,4,5,10]
list2 = ['a','b','c','d']
print(max(list1))
print(max(list2))
```
输出：
```python
10
d
```
`min()`:
```python
list1 = [1,2,3,4,5,10]
list2 = ['a','b','c','d']
print(min(list1))
print(min(list2))
```
输出：
```python
1
a
```
`list()`:
```python
# 生成一个空列表[]

list1 = list()
print(list1)

# 将字符串转换为列表

str1 = "apple"
str2 = "12345"
print(list(str1))
print(list(str2))

# 将 range 对象转换为列表

list1 = list(range(5))
print(list1)

# 将 map 对象转换为列表

str1 = "12345"
list1 = list(map(int,str1))
print(list1)
```
输出：
```python
[]
['a', 'p', 'p', 'l', 'e']
['1', '2', '3', '4', '5']
[0, 1, 2, 3, 4]
[1, 2, 3, 4, 5]
```
### 列表的方法
```python
# 统计某个元素在列表中出现的次数

list1 = [2,2,2,2,2,3]
print(f"列表list1 = {list1.count(2)}")

# 在列表末尾一次性追加另一个序列中的多个值

list2 = [1,2,3,4,5]
list3 = ["hi","ok","yes","no"]
list2.extend(list3)
print(f"列表list2 = {list2}")

# 从列表中找出某个值第一个匹配项的索引位置

list4 = [2,3,4,2,4,2]
print(f"列表list4 = {list4.index(2)}")

# 将对象插入列表

list5 = [1,2,3,4,5,6]
list5.insert(2,4)
print(f"列表list5 = {list5}")

# 反向列表中元素

list6 = [1,2,3,4,5]
list6.reverse()
print(f"列表list6 = {list6}")

# 对原列表进行排序

def gettwe(n):
    return n[1]

list7 = [(1,2),(2,5),(3,4),(4,3),(5,1)]
list7.sort(key=gettwe,reverse=False)
print(f"列表list7 = {list7}")

# 清空列表

list8 = [1,2,3,4,5]
list8.clear()
print(f"列表list8 = {list8}")

# 复制列表

list9 = [1,2,3,4,5]
list10 = list9.copy()
print(f"列表list10 = {list10}")
```
输出：
```python
列表list1 = 5
列表list2 = [1, 2, 3, 4, 5, 'hi', 'ok', 'yes', 'no']
列表list4 = 0
列表list5 = [1, 2, 4, 3, 4, 5, 6]
列表list6 = [5, 4, 3, 2, 1]
列表list7 = [(5, 1), (1, 2), (4, 3), (3, 4), (2, 5)]
列表list8 = []
列表list10 = [1, 2, 3, 4, 5]
```