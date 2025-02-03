export const colorSystemOption = [
  {
    label: '色系',
    prop: 'colorSystemId',
    type: 'select',
    dicUrl: '/api/blade-demo/colorsystem/list',
    dicQuery: {
      page: 1,
      limit: 2000,
    },
    dicMethod: 'get',
    props: {
      label: 'name',
      value: 'id',
      res: 'data.records',
    },
    change: function ({ item }) {
      console.log('[ this ] >', this);
      this.form.colorSystemName = item.name;
    },
    rules: [
      {
        required: true,
        message: '请输入色系',
        trigger: 'blur',
      },
    ],
  },
];
