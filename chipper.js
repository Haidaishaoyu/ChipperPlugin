// 在请求到达服务器之前,调用此函数,您可以在此处修改请求数据
async function onRequest(context, request) {
    console.log(request.url);
    return request;
}

// 在将响应数据发送到客户端之前,调用此函数,您可以在此处修改响应数据
async function onResponse(context, request, response) {
    // 根据不同的 URL 执行不同的操作
    if (/https:\/\/auth.chippercash.com\/otp\/ussdStatus/.test(request.url)) {
        // USDT 入金
        var obj = { "canVerifyViaUSSD": false };
        response.body = JSON.stringify(obj);
    } else if (/https:\/\/api.chippercash.com\/v1\/health\/appversion/.test(request.url)) {
        // 屏蔽更新
        response.statusCode = 200;
        var obj = { "isSupported": true };
        response.body = JSON.stringify(obj);
    } else if (/https:\/\/auth.chippercash.com\/pin\/validate/.test(request.url)) {
        // 破解 Pin
        response.statusCode = 200;
        var obj = { "success": true };
        response.body = JSON.stringify(obj);
    } else if (/https:\/\/api.chippercash.com\/v1\/users\/accounts\/configuration/.test(request.url)) {
        // 强制验证码
        try {
            let responseObject = JSON.parse(response.body);
            responseObject.isUSDXDepositsAvailable = true;
            response.body = JSON.stringify(responseObject);
        } catch (error) {
            console.log("Error modifying response: ", error);
        }
    } else if (/https:\/\/compliance.chippercash.com\/account\/configuration/.test(request.url)) {
        // 邮箱过人脸
        try {
            let obj = JSON.parse(response.body);
            obj.identityVerification.verificationSteps.liveness.status = "NOT_STARTED";
            response.body = JSON.stringify(obj);
        } catch (error) {
            console.log("Error modifying response: ", error);
        }
    } else if (/https:\/\/compliance.chippercash.com\/account_flags/.test(request.url)) {
        // 禁止Ban账号
        response.body = JSON.stringify({ "flags": [] });
    } else if (/https:\/\/api.chippercash.com\/v1\/users\/status/.test(request.url)) {
        // 禁止Ban账号
        response.body = JSON.stringify({ "code": 1001, "message": "No action required" });
    }

    return response;
}