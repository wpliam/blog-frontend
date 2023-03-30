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