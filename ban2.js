async function onResponse(context, request, response) {
	response.body = JSON.stringify({ "code": 1001, "message": "No action required" });
	return response;
}