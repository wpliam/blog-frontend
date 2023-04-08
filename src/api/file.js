import request from "@/util/request";

export function upload(data) {
    return request({
        url: "/api/upload",
        method: "post",
        data,
        headers: {
            'Content-Type': 'multipart-data'
        }
    })
}