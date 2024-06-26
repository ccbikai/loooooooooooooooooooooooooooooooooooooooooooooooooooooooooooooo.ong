import { binaryToString } from "./assets/js/utils";

const DoH = import.meta.env.DOH || "https://family.cloudflare-dns.com/dns-query";

async function isSafeUrl(url) {
	let safe = false;
	try {
		const { hostname } = new URL(url);
		const res = await fetch(`${DoH}?type=A&name=${hostname}`, {
			headers: {
				accept: "application/dns-json",
			},
		});
		const dnsResult = await res.json();
		const isBlock = dnsResult.Answer.some(
			(answer) => answer.data === "0.0.0.0",
		);
		safe = !isBlock;
	} catch (e) {
		console.warn("isSafeUrl fail: ", url, e);
	}
	return safe;
}

export async function onRequest(context, next) {
	const matchedPath = context.url.pathname.match(/^\/l(O+)ng$/i);

	if (matchedPath) {
		try {
			const url = binaryToString(matchedPath[1]);
			const safe = await isSafeUrl(url);
			if (safe) {
				return Response.redirect(url, 308);
			}
			console.warn("Unsafe URL: ", url);
		} catch (e) {
			console.warn("binaryToString fail: ", matchedPath, e);
			return next();
		}
	}

	return next();
}
