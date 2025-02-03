<template>
  <el-dialog
    v-model:visible="dialogVisible"
    top="3vh"
    title="排单记录"
    width="80%"
    @before-close="beforeClose"
  >
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
          v-if="permission.workshopplanorderrecord_delete"
          @click="handleDelete"
          >删 除
        </el-button>
      </template>
      <template #menu-left>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="createFlowCard"
          :disabled="createFlowCardDisabled"
          >生成流程卡</el-button
        >
      </template>
    </avue-crud>
  </el-dialog>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
  batchGenerateFlowCard,
} from '@/api/workshop/workshopplanorderrecord';
import { mapGetters } from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  model: {
    prop: 'visible',
    event: 'update:visible',
  },
  data() {
    return {
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
        searchShow: false,
        searchMenuSpan: 6,
        menuRight: false,
        tip: false,
        border: true,
        index: true,
        viewBtn: false,
        selection: true,
        column: [
          {
            label: '染机号',
            prop: 'number',
            type: 'select',
            filterable: true,
            dicUrl: '/api/blade-demo/deviceinformation/list',
            dicQuery: {
              page: 1,
              limit: 2000,
            },
            dicMethod: 'get',
            props: {
              label: 'number',
              value: 'number',
              res: 'data.records',
            },
            change: ({ item }) => {
              if (item) {
                this.form.capacity = item.capacity || '';
                this.form.colorSystemName = item.colorSystemName || '';
                this.form.orderNum = item.capacity || 0;
                this.form.deviceInformationId = item.id || '';
                this.form.colorSystemId = item.colorSystemId || '';
              } else {
                this.form.capacity = '';
                this.form.colorSystemName = '';
                this.form.orderNum = 0;
                this.form.deviceInformationId = '';
                this.form.colorSystemId = '';
              }
              console.log('[ this.form ] >', this.form);
            },
            rules: [
              {
                required: true,
                message: '请输入染机号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '色系',
            prop: 'colorSystemName',
            disabled: true,
            rules: [
              {
                required: true,
                message: '请输入色系',
                trigger: 'blur',
              },
            ],
            showColumn: false,
          },
          {
            label: '容量',
            prop: 'capacity',
            disabled: true,
            rules: [
              {
                required: true,
                message: '请输入容量',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '排单数量',
            prop: 'orderNum',
            type: 'number',
            rules: [
              {
                required: true,
                message: '请输入排单数量',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '缸号',
            prop: 'cylinderNumber',
            display: false,
            rules: [
              {
                required: true,
                message: '请输入缸号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '生成状态',
            prop: 'flowCardStatus',
            display: false,
            dicData: [
              {
                label: '未生成',
                value: 0,
              },
              {
                label: '已生成',
                value: 1,
              },
            ],
          },
          {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            rules: [
              {
                required: false,
                message: '请输入备注',
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
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      },
    },
    createFlowCardDisabled() {
      return this.selectionList.length === 0;
    },
    permissionList() {
      return {
        addBtn: this.validData(this.permission.workshopplanorderrecord_add, true),
        viewBtn: this.validData(this.permission.workshopplanorderrecord_view, true),
        delBtn: this.validData(this.permission.workshopplanorderrecord_delete, true),
        editBtn: this.validData(this.permission.workshopplanorderrecord_edit, true),
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
    createFlowCard() {
      batchGenerateFlowCard(this.ids).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功!',
        });
        this.onLoad(this.page);
      });
    },
    beforeClose() {
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    rowSave(row, done, loading) {
      row.orderId = this.row.id;
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
      row.orderId = this.row.id;
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
