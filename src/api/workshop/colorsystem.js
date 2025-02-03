import request from '@/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-demo/colorsystem/list',
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
    url: '/api/blade-demo/colorsystem/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

export const remove = ids => {
  return request({
    url: '/api/blade-demo/colorsystem/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

export const add = row => {
  return request({
    url: '/api/blade-demo/colorsystem/submit',
    method: 'post',
    data: row,
  });
};

export const update = row => {
  return request({
    url: '/api/blade-demo/colorsystem/update',
    method: 'post',
    data: row,
  });
};
