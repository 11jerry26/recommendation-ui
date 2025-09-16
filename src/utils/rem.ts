// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 375 宽的缩放比例
  const scale = document.documentElement.clientWidth / 375;
  // 设置页面根节点字体大小，最大值为2倍基准值
  document.documentElement.style.fontSize = `${
    Math.min(scale, 2) * baseSize
  }px`;
}
// 初始化
setRem();
// 监听窗口变化
window.addEventListener('resize', setRem);

export {};