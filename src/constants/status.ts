
export const statusConst: any = {
    "N": { name: "正常", style: "green-state" },
    "W": { name: "预警", style: "warn-state" },
    "A": { name: "报警", style: "red-state" },
}
export const djColor: any = {
    Ⅰ: "#32bb53",
    Ⅱ: "#32bb53",
    Ⅲ: "#32bb53",
    Ⅳ: "#ffab3d",
    Ⅴ: "#ff5a47",
    劣Ⅴ: "#ce1717",
    Ⅰ类: "#32bb53",
    Ⅱ类: "#32bb53",
    Ⅲ类: "#32bb53",
    Ⅳ类: "#ffab3d",
    Ⅴ类: "#ff5a47",
    劣Ⅴ类: "#ce1717",
};
// 处理状态
export const statusNum:any = [
    {
        label: '未处理',
        value: '0'
    },
    {
        label: '已处理',
        value: '2'
    },
    {
        label: '已完成',
        value: '5'
    },
]
export const getBG = (id: string) => {
    let bgstyle = "";
    if (id === "未处理") {
      bgstyle = "orange-state";
    } else if (id === "已交办") {
      bgstyle = "blue-state";
    } else if (id === "已处理") {
      bgstyle = "blue-state";
    } else if (id === "未完成") {
      bgstyle = "green-state";
    } else if (id === "已完成") {
      bgstyle = "gray-state";
    }
    return bgstyle;
  }