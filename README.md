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

> 由于将hexo生成的主页部署到了 public_dir: public/blog，期望部署到GitHub pages的路径是 yechuanjie.github.io/blog。由于hexo-deployer-git插件生成的.deoloy_git目录是读取的public_dir，导致生成的文件中只包含blog下的文件。因此需要手动处理。

> node_modules/hexo-deployer-git/lib/deployer.js下的publicDir修改为public整个目录，就会包含blog
```javascript
// var publicDir = this.public_dir;
var publicDir = pathFn.join(baseDir, 'public');
```

> 当path路径为空时，翻页会存在问题 :sweat_smile:
> 修改node_modules/hexo/lib/plugins/helper/url_for.js如下
```javascript
// path = path || '/'; 
path = path || '';
```
