---
title: "Python的字典"
date: 2026-01-26
category: "技术笔记"
---

python字典是一种可变容器模型，能够存储任意类型的对象。字典的每个键值对用冒号分隔，键值对之间用逗号分隔，整个字典包含在花括号`{}`中。键通常是唯一的，如果出现重复，则最后的键值对会替换前面的
字典里的每一个键值都使用冒号`:`来连接，每一个对之间使用逗号`,`分开，两边使用花括号`{}`包住
例如：
```python
dict1 = {"one" : 1 , "two" : 2 , "three" : 3}
```
键必须是唯一的，但值可以不是，值可以是任何数据类型，但键必须是不可变的，如字符串、数字或元组
### 创建空集合
使用花括号`{}`创建空字典
```python
emptyDict = {}
```
使用内建函数`dict()`创建字典
```python
emptyDict = dict()
```
### 访问集合
```python
dict1 = {"one":1 , "two":2 , "three":3}
print(dict1["one"])
print(dict1['two'])
print(dict1['three'])
```
输出：
```python
1
2
3
```
如果用字典里没有的键访问数据，会输出错误
### 修改字典内容
```python
dict1 = {"one":1 , "two":2 , "three":3}
dict1["one"] = '1'
dict1["four"] = 4
print(dict1)
```
输出：
```python
{'one': '1', 'two': 2, 'three': 3, 'four': 4}
```
### 删除字典内容
能删单一的元素也能清空字典，删除一个字典用del命令
例如：
```python
dict1 = {"one":1 , "two":2 , "three":3}
del dict1["one"]
print(dict1)
del dict1
```
或者是清除字典内内容，保留空字典
```python
dict1 = {"one":1 , "two":2 , "three":3}
dict1.clear()
print(dict1)
```
输出一个空集合`{}`
### 字典键的特性
字典值可以是任何的python对象，既可以是标准的对象，也可以是用户定义的，但键不行。
有两个重要的点
- 不允许同一个键出现两次。创建时如果同一个键被赋值两次，后一个值会被记住
- 键必须不可变，所以可以用数字，字符串或元组

# 字典内置函数和方法
## 字典内置方法一览表

| 方法 | 描述 |
|------|------|
| clear() | 移除字典中的所有元素 |
| copy() | 返回字典的浅拷贝 |
| fromkeys() | 创建一个新字典，以序列的元素为键 |
| get() | 返回指定键的值 |
| items() | 返回包含所有键值对的视图对象 |
| keys() | 返回包含所有键的视图对象 |
| pop() | 移除并返回指定键的值 |
| popitem() | 移除并返回最后插入的键值对 |
| setdefault() | 返回键的值，如果不存在则插入键 |
| update() | 使用另一个字典更新当前字典 |
| values() | 返回包含所有值的视图对象 |

## 详细方法说明

### 1. clear() - 清空字典
```python
# 移除字典中的所有元素
my_dict = {'name': '张三', 'age': 25, 'city': '北京'}
my_dict.clear()
print(my_dict)  # 输出: {}
```

### 2. copy() - 浅拷贝字典
```python
# 创建字典的浅拷贝
original = {'name': '李四', 'scores': [90, 85, 88]}
copied = original.copy()
copied['name'] = '王五'
print(original)  # 输出: {'name': '李四', 'scores': [90, 85, 88]}
print(copied)    # 输出: {'name': '王五', 'scores': [90, 85, 88]}
```

### 3. fromkeys() - 创建新字典
```python
# 从序列创建字典，所有值为默认值
keys = ['name', 'age', 'city']
default_dict = dict.fromkeys(keys, '未知')
print(default_dict)  # 输出: {'name': '未知', 'age': '未知', 'city': '未知'}

# 不指定默认值，默认为None
empty_dict = dict.fromkeys(keys)
print(empty_dict)  # 输出: {'name': None, 'age': None, 'city': None}
```

### 4. get() - 安全获取值
```python
# 获取字典中的值，键不存在时返回默认值
person = {'name': '赵六', 'age': 30}

# 键存在
name = person.get('name')
print(name)  # 输出: 赵六

# 键不存在，返回默认值
salary = person.get('salary', 5000)
print(salary)  # 输出: 5000

# 键不存在，不指定默认值，返回None
address = person.get('address')
print(address)  # 输出: None
```

### 5. items() - 获取键值对视图
```python
# 返回包含所有键值对的视图对象
student = {'name': '小明', 'grade': 'A', 'score': 95}

# 遍历键值对
for key, value in student.items():
    print(f"{key}: {value}")

# 转换为列表
items_list = list(student.items())
print(items_list)  # 输出: [('name', '小明'), ('grade', 'A'), ('score', 95)]
```

### 6. keys() - 获取所有键
```python
# 返回包含所有键的视图对象
fruit_prices = {'apple': 3.5, 'banana': 2.0, 'orange': 4.0}

# 获取所有键
all_keys = fruit_prices.keys()
print(all_keys)  # 输出: dict_keys(['apple', 'banana', 'orange'])

# 遍历所有键
for fruit in fruit_prices.keys():
    print(f"水果: {fruit}")

# 转换为列表
keys_list = list(fruit_prices.keys())
print(keys_list)  # 输出: ['apple', 'banana', 'orange']
```

### 7. values() - 获取所有值
```python
# 返回包含所有值的视图对象
scores = {'语文': 90, '数学': 95, '英语': 88}

# 获取所有值
all_values = scores.values()
print(all_values)  # 输出: dict_values([90, 95, 88])

# 计算总分
total = sum(scores.values())
print(f"总分: {total}")  # 输出: 总分: 273

# 转换为列表
values_list = list(scores.values())
print(values_list)  # 输出: [90, 95, 88]
```

### 8. pop() - 移除指定键
```python
# 移除并返回指定键的值
user = {'id': 1, 'name': '张三', 'email': 'zhangsan@example.com'}

# 移除email键
email = user.pop('email')
print(f"移除的邮箱: {email}")  # 输出: 移除的邮箱: zhangsan@example.com
print(user)  # 输出: {'id': 1, 'name': '张三'}

# 移除不存在的键，返回默认值
phone = user.pop('phone', '无联系方式')
print(phone)  # 输出: 无联系方式
```

### 9. popitem() - 移除最后插入的键值对
```python
# 移除并返回最后插入的键值对（Python 3.7+）
cache = {'a': 1, 'b': 2, 'c': 3}

# 移除最后插入的键值对
last_item = cache.popitem()
print(f"移除的键值对: {last_item}")  # 输出: 移除的键值对: ('c', 3)
print(cache)  # 输出: {'a': 1, 'b': 2}

# 继续移除
another_item = cache.popitem()
print(f"移除的键值对: {another_item}")  # 输出: 移除的键值对: ('b', 2)
```

### 10. setdefault() - 设置默认值
```python
# 获取键的值，如果不存在则插入键并设置默认值
config = {'host': 'localhost', 'port': 8080}

# 获取已存在的键
host = config.setdefault('host', '127.0.0.1')
print(host)  # 输出: localhost

# 获取不存在的键，插入默认值
timeout = config.setdefault('timeout', 30)
print(timeout)  # 输出: 30
print(config)  # 输出: {'host': 'localhost', 'port': 8080, 'timeout': 30}

# 获取不存在的键，不指定默认值（默认为None）
debug = config.setdefault('debug')
print(debug)  # 输出: None
print(config)  # 输出: {'host': 'localhost', 'port': 8080, 'timeout': 30, 'debug': None}
```

### 11. update() - 更新字典
```python
# 使用另一个字典更新当前字典
person = {'name': '李四', 'age': 25}

# 使用字典更新
new_info = {'age': 26, 'city': '上海', 'job': '工程师'}
person.update(new_info)
print(person)  # 输出: {'name': '李四', 'age': 26, 'city': '上海', 'job': '工程师'}

# 使用关键字参数更新
person.update(salary=15000, department='技术部')
print(person)  # 输出: {'name': '李四', 'age': 26, 'city': '上海', 'job': '工程师', 'salary': 15000, 'department': '技术部'}

# 使用可迭代对象更新
person.update([('phone', '13800138000'), ('email', 'lisi@example.com')])
print(person)
# 输出: {'name': '李四', 'age': 26, 'city': '上海', 'job': '工程师', 'salary': 15000, 'department': '技术部', 'phone': '13800138000', 'email': 'lisi@example.com'}
```

## 性能优化建议

### 选择合适的方法
- **单个元素操作**：使用赋值运算符 `dict[key] = value`
- **批量更新**：使用 `update()` 方法
- **安全获取值**：使用 `get()` 方法避免 KeyError
- **遍历操作**：使用 `items()`, `keys()`, `values()` 视图对象

### Python 3.9 新特性
```python
# 使用合并运算符 |
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
merged = dict1 | dict2  # 创建新字典
print(merged)  # 输出: {'a': 1, 'b': 3, 'c': 4}

# 使用更新运算符 |=
dict1 |= dict2  # 就地更新
print(dict1)  # 输出: {'a': 1, 'b': 3, 'c': 4}
```