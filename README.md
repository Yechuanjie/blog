### 个人博客hexo源码

----

##### 本地预览
```
npm install

hexo server

```

##### 打包上传（使用gulp优化打包体积）
```
hexo clean && hexo g && gulp && hexo deploy
```

## 注意事项

> 当path路径为空时，翻页会存在问题 :sweat_smile:
> 修改node_modules/hexo/lib/plugins/helper/url_for.js如下
```javascript
// path = path || '/'; 
path = path || '';
```
