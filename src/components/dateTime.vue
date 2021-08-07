<template>
  <div>
    <el-radio-group
      v-model="timeData.timeSelect"
      v-for="(item, idx) in timeArr"
      :key="idx"
      @change="selectTime(item)"
    >
      <el-radio-button :label="item"></el-radio-button>
    </el-radio-group>

    <el-date-picker
      v-model="timeValue"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {},
      timeArr: ["昨日", "今日", "本周", "本月", "自定义"],
      timeValue: "",
      timeData: {
        timeSelect: "今日",
        time: {
          start: "",
          end: "",
        },
      },
    };
  },
  methods: {
    selectTime(val) {
      var moment = require("moment");
      this.timeValue = [];
      if (val == "昨日") {
        this.timeValue.push(
          moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00")
        );
        this.timeValue.push(
          moment().subtract(1, "day").format("YYYY-MM-DD 23:59:59")
        );
        this.timeData.time.start = Date.parse(
          moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00")
        );
        this.timeData.time.end = Date.parse(
          moment().subtract(1, "day").format("YYYY-MM-DD 23:59:59")
        );
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime()!=moment().subtract(1, "day");
          },
        };
      } else if (val == "今日") {
        this.timeValue.push(moment().format("YYYY-MM-DD 00:00:00"));
        this.timeValue.push(moment().format("YYYY-MM-DD 23:59:59"));
        this.timeData.time.start = Date.parse(
          moment().format("YYYY-MM-DD 00:00:00")
        );
        this.timeData.time.end = Date.parse(
          moment().format("YYYY-MM-DD 23:59:59")
        );
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime()!=moment();
          },
        };
      } else if (val == "本周") {
        this.timeValue.push(moment().day(0).format("YYYY-MM-DD 00:00:00"));
        this.timeValue.push(moment().format("YYYY-MM-DD 23:59:59"));
        this.timeData.time.start = Date.parse(
          moment().day(0).format("YYYY-MM-DD 00:00:00")
        );
        this.timeData.time.end = Date.parse(
          moment().format("YYYY-MM-DD 23:59:59")
        );
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime()<moment().day(0) || time.getTime()>moment();
          },
        };
      } else if (val == "本月") {
        this.timeValue.push(moment().date(1).format("YYYY-MM-DD 00:00:00"));
        this.timeValue.push(moment().format("YYYY-MM-DD 23:59:59"));
        this.timeData.time.start = Date.parse(
          moment().date(1).format("YYYY-MM-DD 00:00:00")
        );
        this.timeData.time.end = Date.parse(
          moment().format("YYYY-MM-DD 23:59:59")
        );
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime()<moment().date(1) || time.getTime()>moment();
          },
        };
      }
      else{
        this.pickerOptions = {
          disabledDate() {
            return false;
          },
        }
      }
      this.$emit("timeParse", this.timeData);
    },
  },
};
</script>