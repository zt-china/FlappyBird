(function (Fly) {
  'use strict';

  // 构造函数
  var Bird = function (config) {
    this.img = config.img;
    this.ctx = config.ctx;

    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.frameIndex = 0;
    this.x = 100;
    this.a = 0.0005;
    this.maxAngle = 45;
    this.maxSpeed = 0.3;

    this.curAngle = 0;
    this.speed = 0;
    this.y = 100;
  };

  // 原型对象
  Bird.prototype = {
    constructor: Bird,

    // 绘制小鸟
    draw: function ( delta ) {
      // 计算小鸟经过时间 delta 之后的位置：
      this.speed = this.speed + this.a * delta;
      this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);

      // 计算角度：
      this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
      // 处理角度超过最大角度的问题：
      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      } else if (this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      // 先平移，再旋转
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.curAngle));

      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);

      this.frameIndex %= 3;
    },

    // 改变速度
    changeSpeed: function(speed) {
      this.speed = speed;
    }
  };

  // 将小鸟对象暴露给 Fly 全局对象
  Fly.Bird = Bird;

})(Fly);