import { binaryToString } from "./utils";

const matchedPath = location.pathname.match(/^\/l(O+)ng$/i);

if (matchedPath) {
	try {
		const validURL = new URL(binaryToString(matchedPath[1]));
		const realUrlLext = document.getElementById("real-url-text");
		const realUrl = document.getElementById("real-url");
		const diaplayUrl = document.getElementById("display-url");
		realUrlLext.innerText = validURL.href;
		realUrl.href = validURL.href;
		diaplayUrl.style.display = "block";
	} catch (e) {
		console.warn("binaryToString fail: ", matchedPath, e);
		location.replace("/");
	}
} else {
	location.replace("/");
}
