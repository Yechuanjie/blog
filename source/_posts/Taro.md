---
title: Taro初探
date: 2019-02-21 13:18:11
tags: 
  - Taro
  - React
categories: 多端统一
---
### Taro

> 👽 Taro['tɑ:roʊ]，泰罗·奥特曼，宇宙警备队总教官，实力最强的奥特曼。


<!-- more -->
---

> 多端统一开发框架，支持用 React 的开发方式编写一次代码，生成能运行在**小程序端**、**H5**、**React Native**等各平台的应用。

<!-- ## React-Native开发注意事项 -->
### 样式篇

#### 兼容问题
如果只需要兼容**小程序**以及**h5端**，基本上所有css属性都能使用。

如果要支持 **React Native** 端，必须采用 **Flex** 布局，并且样式选择器仅支持**类选择器**，且不支持 **组合选择器**。以下写法都是不支持的

```css
.button.button_theme_islands{
  font-style: bold;
}
img + p {
  font-style: bold;
}

p ~ span {
  color: red;
}

div > span {
  background-color: DodgerBlue;
}
div span {
  background-color: DodgerBlue;
}
```

React Native端支持的css属性较少，比如不支持**background-image**，只能使用**Image**组件，配合Flex布局来实现。**box-shadow**不支持，position只支持**absolute**和**relative**。 更多属性，见详细的[css属性列表](https://reactnative.cn/docs/layout-props/)。

#### 编译成React-Native
一个简单的按钮，css样式如下：
```css
.back {
    width: 100%;
    margin-top: 500px;
}
.back_btn {
    width: 300px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    margin: 0 auto;
    background: cadetblue;
    border-radius: 70px;
    color: aliceblue;
}
```

编译之后

```javascript
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  "back": {
    "width": "100%",
    "marginTop": 250
  },
  "back_btn": {
    "width": 150,
    "height": 50,
    "textAlign": "center",
    "lineHeight": 50,
    "fontSize": 25,
    "marginTop": 0,
    "marginRight": "auto",
    "marginBottom": 0,
    "marginLeft": "auto",
    "backgroundColor": "cadetblue",
    "borderRadius": 35,
    "color": "aliceblue"
  }
})
```
React Native中，会使用StyleSheet.create来集中定义组件的样式。[了解更多](https://reactnative.cn/docs/style/)



#### CSS单位
以750px设计稿为基准，css样式以px为单位，如750px设计稿，一个按钮200*100。
```css
width:200px;
height:100px
```

设计稿尺寸可以在config文件中配置**designWidth**和**deviceRatio**字段。

> Taro会根据不同平台来编译px，小程序中px转换成rpx，h5中则转换成rem，react-native中转换成pt。如果不希望单位被转换，可以通过写成Px 或 PX来避免。

#### 默认样式

一些默认组件如**button**、**image**的默认样式在各个平台上不一致，开发前需要重置样式。


----------

### JSX篇

#### jsx支持情况

- 不能使用 **Array#map** 之外的方法操作 JSX 数组
```jsx
const numbers = [1,2,3,4,5];
numbers.forEach(numbers => { // Taro中这里必须用map
  if (someCase) {
    return(
      <View />
    )
  }
})
```
- 不能在 JSX 参数中使用**匿名函数**
```jsx
<View onClick={() => {this.openPic}}></View>  
```
- 暂不支持在 render() 之外的方法定义 JSX

  假设现在页面中有一个音乐组件，不能这样使用

```jsx
const music = require('../assets/music.mp3');
const loop = true;
musicComponent = () => {
  return (
    <Audio src={music} loop={loop} />
  )
}
render() {
  return (
    {this.musicComponent()}
  )
}
```

- 不能在 JSX 参数中使用对象展开符
```jsx
<View {...this.props} />
```
- 不支持无状态组件

  由于微信的 template 能力有限，不支持动态传值和函数，Taro 暂时只支持一个文件只定义一个组件。为了避免开发者疑惑，暂时不支持定义**无状态组件**。


#### 所有元素组件化

- 不能使用html标签，所有标签以**组件**形式书写。Taro实现了以微信小程序组件库为标准，结合jsx语法规范，定制了一套[组件库](https://nervjs.github.io/taro/docs/components-desc.html)，在不同的端上，会使用不同端的对应组件。

- 组件名不能和页面名相同。

---
### 配置篇

#### 项目配置
项目初始后会默认自带微信小程序的配置文件**project.config.js**。
打包成其他平台小程序前，需要对应在根目录添加对应配置文件，否则运行报错。
- 微信小程序，[project.config.json](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
- 百度智能小程序，[project.swan.json](https://smartprogram.baidu.com/docs/develop/devtools/projectconfig/)
- 头条小程序，project.tt.json，文档暂无，大部分字段与微信小程序一致
- 支付宝小程序，无


### 实际项目中遇到的问题

 - h5中使用第三方js
  h5端可能会使用到三方js库，如果在小程序环境中，遇到window，document之类的变量，则会导致错误，解决方案是通过**Taro.getEnv()**判断环境后，按需引入三方库

 - audio问题
  微信小程序中，音频会以**createAudioContext**来处理，相关音频的操作，也只能使用**playVoice**，**pauseVoice**等方法。这些方法在h5，react native及其他部分小程序中都是不支持的。因此只能通过不同的环境做不同的处理。

  以下是点击音乐图标后，控制音乐暂停/播放的方法
  ```jsx
  toggleMusic = () => {
    this.setState({
      musicStatus: !this.state.musicStatus,
    });
    let audio;
    if (Taro.getEnv() === 'WEAPP') {
        audio = Taro.createAudioContext('audio');
        this.state.musicStatus ? Taro.pauseVoice() : Taro.playVoice();
    } else if (Taro.getEnv() === 'WEB'){
        audio = document.querySelector('audio');
        this.state.musicStatus ? audio.pause() : audio.play();
    } else {
        audio = ... //对应平台获取audio对象的方法
        this.state.musicStatus ? audio.pause() : audio.play();
    }
  };
  ```

### React Native平台调试

![chrome](https://qiniu.image.cq-wnl.com/content/20190228f9a18bfcb9784471ac1e862b71b6cde7.png)


### 总结

总体来说，Taro的开发体验还是不错的。但在编译不同平台的时候，Taro都只会在dist目录下生成，无法同时编译多个平台的代码。

Taro对小程序端的兼容性基本一致，按照Taro规范的语法和组件来书写项目，基本能实现各端小程序以及h5端的统一开发。react native端由于环境特殊，存在许多特殊的api无法通用的情况，也只能通过获取当前环境来做兼容处理。
