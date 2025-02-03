import request from '@/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-demo/workshopplanorderrecord/list',
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
    url: '/api/blade-demo/workshopplanorderrecord/detail',
    method: 'get',
    params: {
      id,
    },
  });
};

export const remove = ids => {
  return request({
    url: '/api/blade-demo/workshopplanorderrecord/remove',
    method: 'post',
    params: {
      ids,
    },
  });
};

export const add = row => {
  return request({
    url: '/api/blade-demo/workshopplanorderrecord/save',
    method: 'post',
    data: row,
  });
};

export const update = row => {
  return request({
    url: '/api/blade-demo/workshopplanorderrecord/update',
    method: 'post',
    data: row,
  });
};

// /workshopplanorderrecord/batchGenerateFlowCard
export const batchGenerateFlowCard = ids => {
  return request({
    url: '/api/blade-demo/workshopplanorderrecord/batchGenerateFlowCard',
    method: 'post',
    params: {
      ids,
    },
  });
};
