---
title: 写一个简单的vue双向数据绑定
date: 2018-07-24 11:19:30
tags: 
  - JavaScript
  - Vue
categories: Vue
---

🌱 `vue` 双向数据绑定原理：`监听器`、`解析器`、`观察者`。

<!-- more -->


### MVVM双向数据绑定流程

![MVVM双向数据绑定流程](https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/18-7-24/64201803.jpg)

### html

```html
 <div id="app">
    <form>
        <button type="button" v-click="decrease"> - </button>
        <input type="text" v-model="number">
        <button type="button" v-click="increment"> + </button>
    </form>
    <h3 v-bind="number"></h3>
</div>
```
![html](https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/18-7-24/92465283.jpg)

### 初始化mvvm

```javascript
function MyVue(options) {
  this._init(options);
}
// 初始化, 继承所有options
MyVue.prototype._init = (options) => {
  console.log(options);
  this.$options = options;
  this.$el = document.querySelector(options.el);
  this.$data = options.data;
  this.$methods = options.methods;

  this._binding = {}; // _binding保存着model与view的映射关系，也就是Watcher的实例。当model改变时，会触发其中的指令类更新，保证view也能实时更新

  // 监听器
  this._observe(this.$data);
  // 解析器
  this._compile(this.$el);
};
```

### 实现监听器 Observe

> Observer 遍历数据对象。
> 如果对某个数据赋值，会触发setter，就能监听数据变化
> 如果获取某个数据，会触发getter

```javascript
MyVue.prototype._observe = (data) => {
  console.log(this);
  let value;
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      this._binding[key] = {
          _directives: []
      }
      value = data[key];
      if (typeof value === "object") {
        this._observe(value);
      }
      let binding = this._binding[key];
      Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: true, // 是否可以再定义
        get: () => {
          console.log(`获取${value}`);
          return value;
        },
        set: newValue => {
          console.log(`更新${newValue}`);
          if (value !== newValue) {
            value = newValue;
            binding._directives.forEach(item => {
                item.update();
            });
          }
        }
      });
    }
  }
};
```

### 实现解析器 Compile
> compile方法主要做以下事情：
> 1. 解析模板指令
> 2. 将模板中的变量替换成数据
> 3. 初始化渲染视图并且给每个指令对应的dom绑定update函数
> 4. 数据变化，通知视图更新

```javascript
// root为根元素
MyVue.prototype._compile = (root) => {
 let _this = this;
 let nodes = root.children;
 for (let i = 0; i < nodes.length; ++i) {
     let node = nodes[i];
     if (node.children.length) {
        _this._compile(node);
     }
     //解析模板指令&将模板中的变量替换成数据
     if (node.hasAttribute('v-click')) {
        node.onclick = (function() {
            let attrVal = node.getAttribute('v-click');
            console.log(attrVal);
            return _this.$methods[attrVal].bind(_this.$data);
        })();
     }
     // 绑定数据模型
     if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
         node.addEventListener('input', ((key) => {
            let attrVal = node.getAttribute('v-model');
            _this._binding[attrVal]._directives.push(new Watcher(
                'input',
                node,
                _this,
                attrVal,
                'value'
            ))
            return function() {
                _this.$data[attrVal] = nodes[key].value;
            }
        })(i));
     }
     if (node.hasAttribute('v-bind')) {
         let attrVal = node.getAttribute('v-bind');
         _this._binding[attrVal]._directives.push(new Watcher(
            'text',
            node,
            _this,
            attrVal,
            'innerHTML'
         ))
     }
 }
}
```

### 实现观察者 Watcher
> 每次数据发生变化 都会触发Watcher去更新视图

```javascript
/**
 * 实现Watcher监听
 * 
 * @param {String} name 指令名称
 * @param {Element} el 指令对应的dom元素
 * @param {Instance} vm 指令所属的myVue实例
 * @param {any} exp 指令对应的值
 * @param {any} attr 绑定的属性值
 */
function Watcher(name, el, vm, exp, attr) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.exp = exp;
    this.attr = attr;

    this.update();
}


Watcher.prototype.update = () => {
    this.el[this.attr] = this.vm.$data[this.exp]; // 当data对应的值(exp)改变时，修改当前元素的属性，以保证dom更新
}
```

### 调用MyVue
```javascript
// 调用 MyVue
window.onload = () => {
  let app = new MyVue({
    el: "#app",
    data: {
      number: 0
    },
    methods: {
      increment: () => {
          this.number++;
      },
      decrease: () => {
          this.number--;
      }
    }
  });
};
```

### 最终效果
![最终效果](https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/18-7-24/47264916.jpg)

### 总结
1. vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的。
2. Vue2.x版本双向数据绑定的核心是**Object.defineProperty**方法，劫持对象的访问器，在属性值发生变化时我们可以获取变化,从而进行进一步操作。
3. 通过监听器和解析器的协作，触发Watcher更新视图


> 在即将到来的Vue3.x中，将会使用ES6的[Proxy](http://es6.ruanyifeng.com/#docs/proxy)代替**Object.defineProperty**，它可以直接劫持整个对象，并返回一个新对象，不管是操作便利程度还是底层功能上都远强于Object.defineProperty。