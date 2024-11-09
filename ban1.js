async function onResponse(context, request, response) {
	response.body = JSON.stringify({ "flags": [] });
	return response;
}