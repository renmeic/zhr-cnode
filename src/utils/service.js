import axios from 'axios'

let base_url = 'https://cnodejs.org/api/v1/';
// topics 主题首页
export function getTopicsData(query_data) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}topics`, {
      params: query_data
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// topic 详情
export function getTopic(topic_id) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}/topic/${topic_id}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 收藏、取消
export function collect(is_collect, topic_id) {
  let url = is_collect
    ? `${base_url}topic_collect/de_collect` 
    : `${base_url}topic_collect/collect`;

  return new Promise((resolve, reject) => {
    axios.post(url, {
      topic_id: topic_id
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 用户详情
export function getUser(username) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}user/${username}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}

// 用户所收藏的主题
export function getCollect(username) {
  return new Promise((resolve, reject) => {
    axios.get(`${base_url}topic_collect/${username}`)
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error);
    });
  })
}
