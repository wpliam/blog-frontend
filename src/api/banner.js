import request from "@/util/request";

export function getBannerCard() {
    return request({
        url: "/api/get_banner_card",
        method: "get"
    })
}