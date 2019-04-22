const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const date = new Date()

const dateTime = {
    getDate() {
        // 获取当前年   
        let year = date.getFullYear();
// 获取当前月   
        let month = date.getMonth() + 1;
// 获取当前日   
        let d = date.getDate();
// 获取当前星期几   
        let day = date.getDay();
// 获取小时   
        let hour = date.getHours();
// 获取分钟   
        let minute = date.getMinutes();
// 获取秒   
        let second = date.getSeconds();
// 自动补零   
        month = (month < 10) ? '0' + month : month;
        day = (day < 10) ? '0' + day : day === day;
        minute = (minute < 10) ? '0' + minute : minute;
        second = (second < 10) ? '0' + second : second;
        return year + '-' + month + '-' + d + ' ' + hour + ':' + minute + ':' + second;
    },
    getWeek() {
        let arr = [];  // 周一开始
        let newdate = new Date();
        let now = newdate.getTime();
        let day = newdate.getDay();    // 星期
        let oneDayTime = 60 * 60 * 24 * 1000;
        for (let i = 1; i < 8; i++) {
            let current
            if (day >= i) {
                current = new Date(now - (day - i) * oneDayTime)
            } else {
                current = new Date(now + (i - day) * oneDayTime)
            }
            let month = current.getMonth() + 1;
            month = (month < 10) ? '0' + month : month + '';

            let dd = current.getDate();
            dd = dd < 10 ? '0' + dd : dd + '';
            arr.push(month + '-' + dd);
        }
        return arr
    },

}
export {dateTime}
