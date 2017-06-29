// 整个程序只保留一个全局对象：Fly
// 游戏中所有其他的对象，都挂到这个 Fly 对象中
// 与对象无关的工具性的函数，也挂载到 Fly 对象中

(function (window) {
  'use strict';
  var FlyObj = {};

  // 角度转弧度：
  FlyObj.toRadian = function (angle) {
    return angle / 180 * Math.PI;
  };

  // 加载图片：
  FlyObj.loadImages = function (srcList, callback) {
    var count = 0,
      allLength = srcList.length,
      imgsObj = {};

    srcList.forEach(function (srcStr) {
      var img = new Image();
      img.src = './images/' + srcStr + '.png';
      imgsObj[srcStr] = img;

      img.onload = function () {
        count++;
        if (count >= allLength) {
          callback(imgsObj);
        }
      };
    });
  }

  // 暴露到全局环境中
  window.Fly = FlyObj;
})(window);