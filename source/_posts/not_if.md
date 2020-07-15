---
title: 试着不使用if语句？
date: 2018-04-17 17:09:19
tags:
    - JavaScript
    - ES6
categories: JavaScript
---

🍒 你有尝试过不用 `if` 语句写代码吗？


<!-- more -->

用if会存在什么问题吗？不会。相反，`if` 语句能十分高效的判断条件是否满足。
那这篇文章还有必要看吗？别急。还有一个概念，叫做**代码即数据**。

### 试着不使用if

>**if**是我们平时编程最常用的语句之一。if语句的替代品还有**switch**语句、**三目运算**等语句。它们的实质都是判断条件为真时执行代码。那么当我们不使用这些语句去解决问题时的意义何在呢？

如果写代码的时候不能使用if，我们就会去寻找其他的办法来解决，首先，这对于自己的思维转换有很大的提升，其次，当你用另外的方法解决之后，你又get到了新的技能。

<!-- ### 不使用if应该怎么做 -->

### 示例1：统计数组中偶数的数量
>假设有一个数组，我们需要统计里面的偶数

```javascript
const arr = [3, 5, 7, 2, 1, 8, 4, -6]
```
#### 使用if
```javascript
let count = 0
arr.forEach((item) => {
    if (Math.abs(item % 2) === 0) {
        count += 1
    }
})
console.log(count) // 4
```
#### 不使用if（方法一）
```javascript
let newArr = arr.filter(item => Math.abs(item % 2) === 0 )
console.log(newArr.length) // 4
```
>使用filter过滤满足条件的数据，返回新数组的长度即可。

#### 不使用if（方法二）
```javascript
let count = 0;
arr.forEach((item) => count += Math.abs(item % 2))
console.log(arr.length - count) // 4
```
>利用了偶数算法的返回值始终为0或1，得到不是偶数的count，使用数组长度减去count即可。

---------------------------------------------------------------------------------------------------------------------

### 示例二：判断是否是夏季
>指定一个月份（如：5），判断是否属于夏季（7，8，9月），是则返回'summer', 否则返回'other_season'

#### 使用if
```javascript
const summerOrOther = (month) => {
    if (month <= 9 && month >= 7) return 'summer';
    return 'other_season';
}
summerOrOther(7); //summer
summerOrOther(10); //other_season
```
#### 不使用if
```javascript
const condition = {
    7: 'summer',
    8: 'summer',
    9: 'summer',
    default: 'other_season'
}
const summerOrOther = month => condition[month] || condition['default']
summerOrOther(9); //summer
summerOrOther(10); //other_season
```
>该方法并没有什么简单之处。但这样实现更能体现“代码即数据”的理念。一切操作都是对数据的处理，最后输出数据。

---------------------------------------------------------------------------------------------------------------------

### 总结
>这两个简单示例只是说明if(switch, 三目运算符)语句可以用其他方式实现，仅供参考和学习。但if语句仍然是代码中高使用率的语句，建议根据实际需求来合理使用。
