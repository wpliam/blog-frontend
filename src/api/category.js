import request from "@/util/request";

// 获取分类卡片
export function getCategoryCard() {
    return request({
        url: "/api/get_category_card",
        method: "get"
    })
}