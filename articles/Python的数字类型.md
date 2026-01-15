---
title: "Python的数学类型"
date: 2026-01-15
category: "技术笔记"
---

# 数据类型
- int型：
```python
a = 10
b = -12
c = 0x69
```

- float型：
```python
a = 0.28
b = -0.23
c = 12e+12
b = 75.2E-14
```
- complex:
```python
a = 3.23j
b = 31.j
c = .21j
```
*注: Python支持复数，复数由实数部分和虚数部分构成，可以用a + bj,或者complex(a,b)表示， 复数的实部a和虚部b都是浮点型*

# 数字类型互换
- `int(x)`: 将 x 转为整数
- `float(x)`：将 x 转为浮点数
- `complex(x)`：将 x 转化为一个复数，实数部分是 x ，虚数部分是 0 
- `complex(x,y)`：将 x 和 y 转换到一个复数，实数部分为 x，虚数部分为 y
例如：
```python
x = 12
y = 2.33

c = int(y)
print(c)

c = float(x)
print(c)

c = complex(x)
print(c)

c = complex(x,y)
print(c)
```
输出：
```python
2
12.0
(12+0j)
(12+2.33j)
```
# 数字运算
所有数字都可以通过 `+ - * /` 来运算，和其他语言一样， python中，整数使用 / 返回的结果会有一个浮点数
如果只需要整数，可以使用整除 `//` 来运算，返回的结果只会保留整数部分
```python
x = 17
print(x / 3)
print(x // 3)
```
输出：
```python
5.666666666666667
5
```
**! 要注意的是如果分子分母不是整数，使用 `//` 返回的结果也会有变化：**
```python
x = 17.0
y = 17
print(x // 3)
print(y // 3.0)
```
输出：
```python
5.0
5.0
```
python还可以使用 `**` 来进行幂运算：
```python
x = 2
y = 5
print(x ** y)
print(y ** x)
```
输出：
```python
32
25
```
更多的数学运算，可以导入`math`库：
例如：
```python
import math
x = math.pi
print(x)
print(math.sin(x))
print(math.cos(x))
```
输出：
```python
3.141592653589793
1.2246467991473532e-16
-1.0
```
还有更多的数学运算函数：
```python
import math

print("math 库常用函数演示\n")

# 一、数值处理
print("数值处理")
print(f"math.ceil(4.3)           : 向上取整 = {math.ceil(4.3)}")
print(f"math.floor(4.8)          : 向下取整 = {math.floor(4.8)}")
print(f"math.trunc(4.8)          : 截断小数 = {math.trunc(4.8)}")
print(f"math.modf(4.75)          : 拆成小数和整数部分 = {math.modf(4.75)}")
print(f"math.fabs(-5)            : 绝对值 = {math.fabs(-5)}")
print(f"math.pow(2, 3)           : 幂运算 = {math.pow(2, 3)}")
print(f"math.sqrt(16)            : 平方根 = {math.sqrt(16)}")
print(f"math.isfinite(1e308)     : 是否有限 = {math.isfinite(1e308)}")
print(f"math.isinf(float('inf')) : 是否无穷 = {math.isinf(float('inf'))}")
print(f"math.isnan(float('nan')) : 是否NaN  = {math.isnan(float('nan'))}")

# 二、对数与指数
print("\n对数与指数")
print(f"math.exp(2)              : e 的 2 次方 = {math.exp(2)}")
print(f"math.log(100)            : 自然对数 = {math.log(100)}")
print(f"math.log10(100)          : 以 10 为底 = {math.log10(100)}")
print(f"math.log2(8)             : 以 2 为底  = {math.log2(8)}")
print(f"math.log(100, 10)        : 自定义底数 = {math.log(100, 10)}")

# 三、三角函数（角度单位用**弧度**）
print("\n三角函数")
angle_rad = math.pi / 4  # 45°
print(f"math.sin(π/4)            : 正弦 = {math.sin(angle_rad)}")
print(f"math.cos(π/4)            : 余弦 = {math.cos(angle_rad)}")
print(f"math.tan(π/4)            : 正切 = {math.tan(angle_rad)}")
print(f"math.degrees(π/4)        : 弧度转角度 = {math.degrees(angle_rad)}")
print(f"math.radians(45)         : 角度转弧度 = {math.radians(45)}")

# 四、反三角函数
print("\n反三角函数")
print(f"math.asin(0.5)           : 反正弦 = {math.asin(0.5)}")
print(f"math.acos(0.5)           : 反余弦 = {math.acos(0.5)}")
print(f"math.atan(1)             : 反正切 = {math.atan(1)}")
print(f"math.atan2(1, 1)         : 双参反正切 = {math.atan2(1, 1)}")

# 五、双曲函数
print("\n双曲函数")
print(f"math.sinh(1)             : 双曲正弦 = {math.sinh(1)}")
print(f"math.cosh(1)             : 双曲余弦 = {math.cosh(1)}")
print(f"math.tanh(1)             : 双曲正切 = {math.tanh(1)}")

# 六、实用函数
print("\n实用函数")
print(f"math.isclose(1.0001, 1.0, rel_tol=1e-3) : 是否近似 = {math.isclose(1.0001, 1.0, rel_tol=1e-3)}")
print(f"math.factorial(5)        : 阶乘 = {math.factorial(5)}")
print(f"math.gcd(18, 24)         : 最大公约 = {math.gcd(18, 24)}")
print(f"math.lcm(4, 6)           : 最小公倍 = {math.lcm(4, 6)}")
print(f"math.fmod(7, 3)          : 浮点取模 = {math.fmod(7, 3)}")
print(f"math.fsum([0.1]*10)      : 精确求和 = {math.fsum([0.1]*10)}")

# 七、数学常量
print("\n数学常量")
print(f"math.pi                  : 圆周率 π = {math.pi}")
print(f"math.e                   : 自然常数 e = {math.e}")
print(f"math.tau                 : 2π = {math.tau}")
```
输出：
```python
math 库常用函数演示

数值处理
math.ceil(4.3)           : 向上取整 = 5
math.floor(4.8)          : 向下取整 = 4
math.trunc(4.8)          : 截断小数 = 4
math.modf(4.75)          : 拆成小数和整数部分 = (0.75, 4.0)
math.fabs(-5)            : 绝对值 = 5.0
math.pow(2, 3)           : 幂运算 = 8.0
math.sqrt(16)            : 平方根 = 4.0
math.isfinite(1e308)     : 是否有限 = True
math.isinf(float('inf')) : 是否无穷 = True
math.isnan(float('nan')) : 是否NaN  = True

对数与指数
math.exp(2)              : e 的 2 次方 = 7.38905609893065
math.log(100)            : 自然对数 = 4.605170185988092
math.log10(100)          : 以 10 为底 = 2.0
math.log2(8)             : 以 2 为底  = 3.0
math.log(100, 10)        : 自定义底数 = 2.0

三角函数
math.sin(π/4)            : 正弦 = 0.7071067811865476
math.cos(π/4)            : 余弦 = 0.7071067811865476
math.tan(π/4)            : 正切 = 0.9999999999999999
math.degrees(π/4)        : 弧度转角度 = 45.0
math.radians(45)         : 角度转弧度 = 0.7853981633974483

反三角函数
math.asin(0.5)           : 反正弦 = 0.5235987755982989
math.acos(0.5)           : 反余弦 = 1.0471975511965979
math.atan(1)             : 反正切 = 0.7853981633974483
math.atan2(1, 1)         : 双参反正切 = 0.7853981633974483

双曲函数
math.sinh(1)             : 双曲正弦 = 1.1752011936438014
math.cosh(1)             : 双曲余弦 = 1.5430806348152437
math.tanh(1)             : 双曲正切 = 0.7615941559557649

实用函数
math.isclose(1.0001, 1.0, rel_tol=1e-3) : 是否近似 = True
math.factorial(5)        : 阶乘 = 120
math.gcd(18, 24)         : 最大公约 = 6
math.lcm(4, 6)           : 最小公倍 = 12
math.fmod(7, 3)          : 浮点取模 = 1.0
math.fsum([0.1]*10)      : 精确求和 = 1.0

数学常量
math.pi                  : 圆周率 π = 3.141592653589793
math.e                   : 自然常数 e = 2.718281828459045
math.tau                 : 2π = 6.283185307179586
```