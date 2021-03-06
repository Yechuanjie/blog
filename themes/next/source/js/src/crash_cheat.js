var OriginTitle = document.title;
var titleTime;
var iconList = [
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/腰果.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/甜甜圈.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/薯片.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/塔可.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/披萨.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/麻薯.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/热狗.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/寿司.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/牛油果.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/蛋黄酥.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/面包.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/马卡龙.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/饼干.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/草莓.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/蛋糕.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/开心果.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/布丁.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/爆米花.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/碧根果.png',
    'https://yechuanjie-image.oss-cn-beijing.aliyuncs.com/blog/棒冰.png',
];
var iconIndex = 0;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        if (iconIndex < iconList.length - 1) {
            iconIndex += 1;
        } else {
            iconIndex = 0;
        }
        $('[rel=icon]').attr('href', iconList[iconIndex]);
        document.title = OriginTitle;
        clearTimeout(titleTime);
    } else {
        document.title = OriginTitle;
        $('[rel=icon]').attr('href', iconList[iconIndex]);
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});