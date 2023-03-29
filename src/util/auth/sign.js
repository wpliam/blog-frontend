import md5 from 'js-md5'

export function signAuth() {
    let signInfo = {
        appid: "liwenping",
        timestamp: new Date().getMilliseconds(),
        sKey: "pingguo"
    }
    let sign = md5(JSON.stringify(signInfo))
    console.log("sign:", sign)
    return sign
}