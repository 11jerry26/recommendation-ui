// 图片基础路径
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || '/src/assets/product-img/';

/**
 * 生成完整的图片路径
 * @param fileName 从后端获取的文件名
 * @returns 完整的图片路径
 */
export const getImageUrl = (fileName: string): string => {
  if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
    return fileName;
  }
  
  // 拼接本地图片路径
  return `${IMAGE_BASE_URL}${fileName}`;
};