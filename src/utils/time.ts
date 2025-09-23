/**
 * 将时间格式化为 YYYY-MM-DD HH:MM:SS 格式
 * @param date 可选参数，传入需要格式化的时间（默认使用当前时间）
 * @returns 格式化后的时间字符串（YYYY-MM-DD HH:MM:SS）
 */
export const formatToDateTime = (date?: Date | string | number): string => {
  // 处理入参：若未传值则用当前时间；若传入字符串/数字，转换为 Date 对象
  const targetDate = date 
    ? new Date(date) 
    : new Date();

  // 容错处理：若传入的时间无效（如非法字符串），返回空字符串（或根据需求抛出错误）
  if (isNaN(targetDate.getTime())) {
    console.warn('传入的时间格式无效，返回空字符串');
    return '';
  }

  // 提取时间各部分（补零：确保单数位前面加 0，如 5 → 05）
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需 +1
  const day = String(targetDate.getDate()).padStart(2, '0');
  const hours = String(targetDate.getHours()).padStart(2, '0'); // 24小时制
  const minutes = String(targetDate.getMinutes()).padStart(2, '0');
  const seconds = String(targetDate.getSeconds()).padStart(2, '0');

  // 拼接为目标格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};