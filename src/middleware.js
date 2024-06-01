import { binaryToString } from "./assets/js/utils";

export function onRequest(context, next) {
	const matchedPath = context.url.pathname.match(/^\/l(O+)ng$/i);

	if (matchedPath) {
		try {
			const url = binaryToString(matchedPath[1]);
			console.log("redirect to: ", url);
			return Response.redirect(url, 308);
		} catch (e) {
			console.warn("binaryToString fail: ", matchedPath, e);
			return next();
		}
	}

	return next();
}
