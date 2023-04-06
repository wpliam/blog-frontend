import request from "@/util/request";

// 读取文章信息
export function readArticle(articleID) {
    return request({
        url: `/api/read_article/${articleID}`,
        method: "get"
    })
}

export function searchKeywordFlow(keyword) {
    return request({
        url: "/api/search_keyword_flow",
        method: "post",
        data: {
            keyword
        }
    })
}

// 搜索文章
export function searchArticleList(data) {
    return request({
        url: "/api/search_article_list",
        method: "post",
        data: data,
    })
}

// 获取热门文章
export function getHotArticle() {
    return request({
        url: "/api/get_hot_article",
        method: "get"
    })
}

// 获取文章归档
export function getArticleArchive() {
    return request({
        url: "/api/get_article_archive",
        method: "get"
    })
}

export function writeArticle(data) {
    return request({
        url: "/api/write_article",
        method: "post",
        data
    })
}