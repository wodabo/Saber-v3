import request from '@/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-demo/colorinformation/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    },
  });
};

export const getDetail = id => {
  return request({
    url: '/api/blade-demo/colorinformation/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

export const remove = ids => {
  return request({
    url: '/api/blade-demo/colorinformation/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

export const add = row => {
  return request({
    url: '/api/blade-demo/colorinformation/submit',
    method: 'post',
    data: row,
  });
};

export const update = row => {
  return request({
    url: '/api/blade-demo/colorinformation/update',
    method: 'post',
    data: row,
  });
};
