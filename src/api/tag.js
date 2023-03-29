import request from "@/util/request";

export function getTagCard() {
    return request({
        url: "/api/get_tag_card",
        method: "get"
    })
}