<template>
  <div>
    <el-radio-group
      v-model="timeData.timeSelect"
      v-for="(item, idx) in timeArr"
      :key="idx"
      @change="selectTime(item.type)"
    >
      <el-radio-button :label="item.text"></el-radio-button>
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
      pickerOptions: {},//禁用
      timeArr: [
        {
          text: "昨日",
          type: 1,
        },
        {
          text: "今日",
          type: 2,
        },
        {
          text: "本周",
          type: 3,
        },
        {
          text: "本月",
          type: 4,
        },
        {
          text: "自定义",
          type: -1,
        },
      ],
      todayNow: this.$moment().format(),
      timeValue: "",//
      timeData: {//传给父级的内容
        timeSelect: "今日",
        time: {
          start: "",
          end: "",
        },
      },
    };
  },
  methods: {
    //选项
    selectTime(type) {
      this.timeValue = [];
      switch (type) {
        //昨天
        case 1:
          this.timeValue.push(
            this.$moment().subtract(1, "day").format("YYYY-MM-DD 00:00:00")
          );
          this.timeValue.push(
            this.$moment().subtract(1, "day").format("YYYY-MM-DD 23:59:59")
          );
          this.timeData.time.start = Date.parse(this.$moment()
            .subtract(1, "day")
            .format("YYYY-MM-DD 00:00:00"))
          this.timeData.time.end =Date.parse( this.$moment()
            .subtract(1, "day")
            .format("YYYY-MM-DD 23:59:59"))
          this.pickerOptions = {
            disabledDate:(time)=>{
              return time.getTime() != this.$moment().subtract(1, "day");
            }
          };
          break;
        //今天 
        case 2:
          this.timeValue.push(this.$moment().format("YYYY-MM-DD 00:00:00"));
          this.timeValue.push(this.todayNow);
          this.timeData.time.start = Date.parse(this.todayNow)

          this.timeData.time.end = Date.parse(this.todayNow)
          this.pickerOptions = {
            disabledDate:(time)=> {
              return time.getTime() != this.$moment();
            },
          };
          break;
          //本周
        case 3:
          this.timeValue.push(
            this.$moment().day(0).format("YYYY-MM-DD 00:00:00")
          );
          this.timeValue.push(this.todayNow);
          this.timeData.time.start = Date.parse(this.$moment()
            .day(0)
            .format("YYYY-MM-DD 00:00:00"))
          this.timeData.time.end = Date.parse(this.todayNow)
          this.pickerOptions = {
            disabledDate:(time)=> {
              return (
                time.getTime() < this.$moment().day(0) ||
                time.getTime() > this.$moment()
              );
            },
          };
          break;
          //本月
        case 4:
          this.timeValue.push(
            this.$moment().date(1).format("YYYY-MM-DD 00:00:00")
          );
          this.timeValue.push(this.todayNow);
          this.timeData.time.start = Date.parse(this.$moment()
            .date(1)
            .format("YYYY-MM-DD 00:00:00"))
          this.timeData.time.end = Date.parse(this.todayNow)
          this.pickerOptions = {
            disabledDate:(time)=> {
              return (
                time.getTime() < this.$moment().date(1) ||
                time.getTime() > this.$moment()
              );
            },
          };
          break;
        case -1:
          this.pickerOptions = {
            disabledDate() {
              return false;
            },
          };
          break;
      }
      //传给父级
      this.$emit("timeParse", this.timeData);
    },
  },
};
</script>