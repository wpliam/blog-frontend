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