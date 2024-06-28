---
title: 使用lottie-web制作高性能动画
date: 2019-07-31 12:35:32
tags:
  - JavaScript
  - 动画
categories: JavaScript
---

🌾 `Lottie` 是一个库，用于解析使用 [AE](https://www.adobe.com/cn/products/aftereffects.html) 制作的动画（动画需要通过 AE 中的 bodymovin 插件将其导出为 json 数据格式），支持`web`、`ios`、`android` 和 `react native`。

<!-- more -->

想提前看下效果的小伙伴请看[这里~](https://yechuanjie.github.io/lottie_demo)


### Lottie 简介

[Lottie 官网](http://airbnb.io/lottie/)

>  这里主要介绍 Lottie 的 web 版本 **lottie-web** 库，它可以解析导出的动画 json 文件，并将其以 svg 或者 canvas 的方式将动画绘制到页面中。

### 为什么使用 Lottie

目前多帧动画一般的实现方式是：

- 前端实现`svg、canvas`动画（实现成本较高、维护成本高）
- 设计师切`gif`（文件较大、容易有锯齿）
- `png`序列帧（文件较大、容易有锯齿）

> 目前的动画实现方案有着各自的问题，所以我们需要寻找一种更加简单、高效、性能高的动画方案。airbnb 的 Lottie 是一套良好的动画解决方案。

### Lottie 的优势

Lottie 方法方案是由设计师出动画，导出为 json，给前端解析。所以，使用 Lottie 方案的好处在于：

- 动画由设计使用专业的动画制作工具`Adobe After Effects`来实现，使动画实现更加方便，动画效果也更好；
- 前端可以方便的调用动画，并对动画进行控制，减少前端动画工作量；
- 设计制作动画，前端展现动画，专业人做专业事，分工合理；
- 还原程度百分之百；
- 使用 lottie 方案，json 文件大小会比 gif 文件小很多，性能也会更好。

### Lottie 的不足

- lottie-web 文件比较大，lottie.js 大小为 532k，轻量版压缩后也有 150k，经过 gzip 后，大小为 43k。
- 如果设计师建了很多的图层，可能仍然有 json 文件较大的问题，需要设计师遵循一定的设计规范。

### lottie-web 使用方式

#### 初始化

`npm install lottie-web` or `yarn add lottie-web`

```ts
import lottie from 'lottie-web';
import animationData from 'animationData.json'; // 使用本地资源

const animation = lottie.loadAnimation({
  container: element as Element, // the dom element that will contain the animation
  renderer: 'svg',
  name: name,
  loop: true,
  autoplay: true,
  animationData
});
// 添加事件
animation.addEventListener('enterFrame', i => {
  ...
});
```

`loadAnimation`参数定义：

```ts
export type AnimationConfig = {
  container: Element; //动画容器
  renderer?: 'svg' | 'canvas' | 'html'; //渲染方式
  loop?: boolean | number; //循环
  autoplay?: boolean; //自动播放
  name?: string; //动画名字
  rendererSettings?:
    | SVGRendererConfig
    | CanvasRendererConfig
    | HTMLRendererConfig; // 渲染设置
  path?: string; // 动画json路径
  animationData?: any; //本地动画json数据
};
```

初始化完成后，可以对`animation`对象添加事件以及对动画进行控制

#### 事件

`调用方式`

```javascript
animation.addEventeListener('event', info => {
  console.log(info);
});
```

| 事件名          | 描述              |
| ------------ | --------------- |
| enterFrame   | 播放每一帧动画的时候触发    |
| loopComplete | 当前循环播放完成触发      |
| complete     | 动画播放完成触发        |
| segmentStart | 开始播放一个动画片段的时候触发 |
| destroy      | 动画销毁时触发         |

#### 方法

`调用方式`

```javascript
animation.play();
animation.setSpeed(1.5);
```

| 方法名             | 参数及返回类型                                   | 描述              |
| --------------- | ----------------------------------------- | --------------- |
| play            | (): void                                  | 播放              |
| stop            | (): void                                  | 停止并回到第 0 帧      |
| pause           | (): void                                  | 暂停              |
| setLocationHref | (href: string): void                      | 设置本地资源路径        |
| setSpeed        | (speed: number): void                     | 设置动画播放速速        |
| goToAndPlay     | (value: number, isFrame?: boolean): void  | 前进到传入帧并继续播放     |
| goToAndStop     | (value: number, isFrame?: boolean): void  | 前进到传入帧并停止播放     |
| setDirection    | (direction: AnimationDirection): void     | 设置动画方向          |
| playSegments    | (segments: [], forceFlag?: boolean): void | 播放指定帧数组的动画;     |
| destroy         | (): void                                  | 主动销毁动画          |
| getDuration     | (inFrames?: boolean): number              | 获取动画时长，可按帧或按秒返回 |

### 使用全球设计师分享的动画

> 我们可以在 [lottiefiles](https://lottiefiles.com/) 上看到来自全球优秀设计师们分享的动画，并十分简单的使用它。

### 使用案例

#### 加载远程 json 文件

```typescript
const source =
  'https://assets1.lottiefiles.com/datafiles/AembVTvov5PkTSJ/data.json';
/**
 * 加载远程json文件
 * @param {string} sourceurl
 * @returns 返回json对象
 */
const loadResource = async (sourceurl: string) => {
  const response = await fetch(sourceurl);
  const data = await response.json();
  return data;
};
loadResource(String(source)).then(json => {
  // 加载完成后初始化
  const animation = lottie.loadAnimation({
    container: element as Element, // the dom element that will contain the animation
    renderer: 'svg',
    name: name,
    loop: true,
    autoplay: true,
    animationData: json,
  });
});
```

###[点击查看demo](https://yechuanjie.github.io/lottie_demo)

###[github](https://github.com/Yechuanjie/lottie_demo)
