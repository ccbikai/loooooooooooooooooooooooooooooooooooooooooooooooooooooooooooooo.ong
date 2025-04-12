import { binaryToString } from "./assets/js/utils.js";

const pathRegex = /^\/l(O+)ng$/i;

async function isSafeUrl(
	url,
	DoH = "https://family.cloudflare-dns.com/dns-query",
) {
	let safe = false;
	try {
		const { hostname } = new URL(url);
		const res = await fetch(`${DoH}?type=A&name=${hostname}`, {
			headers: {
				accept: "application/dns-json",
			},
			cf: {
				cacheEverything: true,
				cacheTtlByStatus: { "200-299": 86400 },
			},
		});
		const dnsResult = await res.json();
		if (dnsResult && Array.isArray(dnsResult.Answer)) {
			const isBlock = dnsResult.Answer.some(
				(answer) => answer.data === "0.0.0.0",
			);
			safe = !isBlock;
		}
	} catch (e) {
		console.warn("isSafeUrl fail: ", url, e);
	}
	return safe;
}

export async function onRequest(context, next) {
	const matchedPath = context?.url?.pathname?.match(pathRegex);

	if (matchedPath) {
		try {
			const DoH = context?.locals?.runtime?.env?.DOH || import.meta.env.DOH;
			const url = binaryToString(matchedPath[1]);
			const safe = await isSafeUrl(url, DoH);
			if (safe) {
				return Response.redirect(url, 308);
			}
		} catch (_e) {
			return next();
		}
	}

	return next();
}
