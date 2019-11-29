---
title: 移动端按钮添加点击态
date: 2018-04-17 11:09:19
tags: 
  - html5
  - JavaScript
categories: 移动端
---

>用户点击按钮，如果将不同的元素设计成有创意和有驱动性的动效能为用户带来兴奋和愉悦的体验。

<!-- more -->


### 前端点击态一般怎么处理

用户点击按钮时，使按钮发生变化。一般可以给按钮添加 **过渡动画** 或者 **颜色变化**。


### 按钮的一般展现形式

> button         用a标签自定义             用div自定义

> 由于实际项目中，按钮通常会有各种样式，一般选择自定义的方式，后面的方法都是选择的 **用a标签自定义** 的形式

```html
  <a href='javascript:void(0)'></a>
```

---------------------------------------------------------------------------------------------------------------------

### 移动端点击添加按下态实现方式

###### 1、CSS样式里用a:active来实现

```css
  a:active { background-color: rgba(0,0,0,.3) }
```

>缺点：
1、某些android机型不支持该样式
2、如果a标签里面是图片，没有效果

###### 2、使用js在元素的click事件里面，setTimeout延时200ms，同时增加一个点击状态的class，再手动进行跳转。

```javascript
  $('a').click(function(e) {
    e.preventDeafult(); // 阻止默认跳转
    $(this).addClass('active');
    setTimeout(function() {
        location.href = 'xxxx'; //执行跳转
    },200)
  })
```

>缺点：延时影响用户体验

###### 3、终极方法，结合touchstart touchmove touchend事件来实现。原理就是touchstart时，给元素添加className，touchstend时移除className
 
```javascript
  var move;
  $('a').live('touchend touchstart touchmove',function(e){
   if(e.type==='touchstart'){
      move= null;
      $(this).addClass('active')
   }else if(e.type==='touchmove'){
       if(move) return;
       move= true;
   }else{
      if(move) return;
      $(this).removeClass('active');
   }
 });
```