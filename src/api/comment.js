import request from "@/util/request";

export function getComment(articleID) {
    return request({
        url: "/api/get_comment",
        method: "post",
        data: {
            articleID
        }
    })
}

export function addComment(data) {
    return request({
        url: "/api/add_comment",
        method: "post",
        data
    })
}