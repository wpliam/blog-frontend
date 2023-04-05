import request from "@/util/request";

// 点赞
export function giveThumb(id, likeType) {
    return request({
        url: `/api/give_thumb`,
        method: "post",
        data: {
            id, likeType
        }
    })
}

// 收藏
export function giveCollect(articleID) {
    return request({
        url: `/api/give_collect`,
        method: "post",
        data: {
            articleID
        }
    })
}

// 关注
export function giveFollow(authorID) {
    return request({
        url: "/api/give_follow",
        method: "post",
        data: {
            authorID
        }
    })
}

// 添加浏览量
export function addViewCount(articleID) {
    return request({
        url: `/api/add_view_count/${articleID}`,
        method: "get"
    })
}

// 签到
export function punchClock() {
    return request({
        url: "/api/punch_clock",
        method: "get"
    })
}

// 统计用户签到信息
export function censusClockInfo(uid) {
    return request({
        url: "/api/census_clock_info",
        method: "post",
        data: {
            uid
        }
    })
}