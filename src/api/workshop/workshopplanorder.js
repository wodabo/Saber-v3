import request from '@/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-demo/workshopplanorder/list',
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
    url: '/api/blade-demo/workshopplanorder/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

export const remove = ids => {
  return request({
    url: '/api/blade-demo/workshopplanorder/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

export const add = row => {
  return request({
    url: '/api/blade-demo/workshopplanorder/submit',
    method: 'post',
    data: row,
  });
};

export const update = row => {
  return request({
    url: '/api/blade-demo/workshopplanorder/update',
    method: 'post',
    data: row,
  });
};
