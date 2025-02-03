<template>
  <basic-container />
</template>

<script>
import { mapGetters } from 'vuex';
import thirdRegister from '@/components/third-register/main.vue';

export default {
  name: 'wel',
  components: {
    thirdRegister,
  },
  data() {
    return {
      activeNames: ['1', '2', '3', '5'],
      logActiveNames: ['40'],
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  created() {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>

<style>
.el-divider--horizontal {
  margin: 12px 0 !important;
}

.el-font-size {
  font-size: 14px;
}
</style>
