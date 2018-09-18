var base_url = 'https://cnodejs.org/api/v1/';
// topics 主题首页
export function getTopics(query_data) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: base_url+'topics',
      data: query_data,
      success(res) {
        // console.log('res', res)
        resolve(res.data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

// topic 详情
export function getTopic(topic_id) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: base_url+'topic/'+topic_id,
      success(res) {
        resolve(res.data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

// 用户详情
export function getUser(username) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: base_url+'user/'+username,
      success(res) {
        resolve(res.data.data);
      },
      fail(err) {
        reject(err);
      }
    });
  })
}
