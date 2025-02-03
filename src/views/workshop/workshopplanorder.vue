<template>
  <basic-container>
    <avue-crud
      :option="option"
      :table-loading="loading"
      :data="data"
      :page="page"
      :permission="permissionList"
      :before-open="beforeOpen"
      v-model="form"
      ref="crud"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
      @search-change="searchChange"
      @search-reset="searchReset"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @size-change="sizeChange"
      @on-load="onLoad"
    >
      <template v-slot:menuLeft>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          plain
          v-if="permission.workshopplanorder_delete"
          @click="handleDelete"
          >删 除
        </el-button>
      </template>
      <template #menu-before="{ size, row, index }">
        <el-button type="text" :icon="CirclePlus" @click="orderHandleEdit(row, index)"
          >排单</el-button
        >
      </template>
    </avue-crud>
  </basic-container>
  <workshopplanorderrecord v-model="showRecordDialog" :row="curRow" @close="closeHandle" />
</template>

<script>
import { CirclePlus } from '@element-plus/icons-vue';
import workshopplanorderrecord from './workshopplanorderrecord.vue';
import { getList, getDetail, add, update, remove } from '@/api/workshop/workshopplanorder';
import { mapGetters } from 'vuex';

export default {
  components: {
    workshopplanorderrecord,
  },
  data() {
    return {
      CirclePlus,
      showRecordDialog: false,
      curRow: {},
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: {
        height: 'auto',
        calcHeight: 210,
        searchShow: true,
        searchMenuSpan: 6,
        tip: false,
        border: true,
        index: true,
        viewBtn: false,
        selection: false,
        headerAlign: 'center',
        labelWidth: 120,
        align: 'center',
        column: [
          {
            label: '委外单号',
            prop: 'outsourcingOrders',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入委外单号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '订单号',
            prop: 'orderNo',
            minWidth: 150,
            rules: [
              {
                required: true,
                message: '请输入订单号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '客户',
            prop: 'customer',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入客户',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '物料编号',
            prop: 'materialNo',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入物料编号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '物料品种',
            prop: 'materialVariety',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入物料品种',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '规格型号',
            prop: 'specificationModel',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入规格型号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '色号',
            prop: 'colorNumber',
            display: false,
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入色号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '颜色',
            prop: 'color',
            type: 'select',
            dicUrl: '/api/blade-demo/colorinformation/list',
            dicQuery: {
              page: 1,
              limit: 2000,
            },
            dicMethod: 'get',
            props: {
              label: 'color',
              value: 'color',
              res: 'data.records',
            },
            change: ({ item }) => {
              if (item) {
                this.form.colorNumber = item.colorNumber;
                this.form.colorInformationId = item.id;
                this.form.colorSystemName = item.colorSystemName;
                this.form.colorSystemId = item.colorSystemId;
              } else {
                this.form.colorNumber = '';
                this.form.colorInformationId = '';
                this.form.colorSystemName = '';
                this.form.colorSystemId = '';
              }
            },
            rules: [
              {
                required: true,
                message: '请输入色系',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '单位',
            prop: 'unit',
            minWidth: 120,
            rules: [
              {
                required: true,
                message: '请输入单位',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '数量',
            prop: 'num',
            type: 'number',
            minWidth: 100,
            rules: [
              {
                required: true,
                message: '请输入数量',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '已排数量',
            prop: 'allocatedNum',
            type: 'number',
            display: false,
            minWidth: 100,
            rules: [
              {
                required: true,
                message: '请输入已排数量',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '欠数',
            prop: 'waitNum',
            display: false,
            type: 'number',
            minWidth: 100,
            formatter: row => {
              console.log('[ row ] >', row);
              return row.num - row.allocatedNum || 0;
            },
            rules: [
              {
                required: true,
                message: '请输入欠数',
                trigger: 'blur',
              },
            ],
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(['permission']),
    permissionList() {
      return {
        addBtn: this.validData(this.permission.workshopplanorder_add, true),
        viewBtn: this.validData(this.permission.workshopplanorder_view, true),
        delBtn: this.validData(this.permission.workshopplanorder_delete, true),
        editBtn: this.validData(this.permission.workshopplanorder_edit, true),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(',');
    },
  },
  methods: {
    orderHandleEdit(row, index) {
      this.curRow = row;
      this.showRecordDialog = true;
    },
    closeHandle() {
      this.searchReset();
    },
    rowSave(row, done, loading) {
      add(row).then(
        () => {
          done();
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        error => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(
        () => {
          done();
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        },
        error => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowDel(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        });
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择至少一条数据');
        return;
      }
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (['edit', 'view'].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style></style>
