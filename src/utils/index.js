export function getTopicType(tab) {
  switch(tab) {
    case 'share':
      return '分享';
    case 'ask':
      return '问答';
    case 'job':
      return '招聘';
    case 'dev':
      return '客户端测试';
    default:
      break;
  }
}

export function getRelativeTime(dateString) {
    if (!dateString) {
        return ''
    }
    const date = new Date(dateString);
    const time = new Date().getTime() - date.getTime(); // 相差的时间（单位 = 毫秒）= 现在的时间-传入的时间
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000), 10) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000, 10) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000, 10) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000, 10) + '月前';
    } else {
        return parseInt(time / 31536000000, 10) + '年前';
    }
}
