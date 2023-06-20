// 格式化时间
export function formatTime(str: any) {
  if (!str) return ''
  return str.substring(0, 10)
}

// 格式化编辑状态
export function formatEdit(key: string) {
  let editMap = {
    0: '未编辑',
    1: '已编辑',
  }
  return editMap[key]
}
