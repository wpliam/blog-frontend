const yearSecond = 365 * 24 * 60 * 60
const monthSecond = 30 * 24 * 60 * 60
const daySecond = 24 * 60 * 60
const houseSecond = 60 * 60
const minuteSecond = 60

export function computeDate(val) {
    let currTime = new Date().getTime()
    let diff = 0
    if (typeof val === "number") {
        diff = (currTime - val * 1000) / 1000
    } else {
        diff = (currTime - new Date(val).getTime()) / 1000
    }
    let year = Math.floor(diff / yearSecond)
    if (year > 0) {
        return `${year}年前`
    }
    let month = Math.floor(diff / monthSecond)
    if (month > 0) {
        return `${month}个月前`
    }
    let day = Math.floor(diff / daySecond)
    if (day > 0) {
        return `${day}天前`
    }
    let house = Math.floor(diff / houseSecond)
    if (house > 0) {
        return `${house}个小时前`
    }
    let minute = Math.floor(diff / minuteSecond)
    if (minute > 0) {
        return `${minute}分钟前`
    }
    return `${diff}秒钟前`
}

export function timeLayout(val) {
    let date = new Date(val)
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, "0")
    let day = date.getDate().toString().padStart(2, "0")
    let house = date.getHours().toString().padStart(2, "0")
    let minute = date.getMinutes().toString().padStart(2, "0")
    let second = date.getSeconds().toString().padStart(2, "0")
    return `${year}-${month}-${day} ${house}:${minute}:${second}`
}