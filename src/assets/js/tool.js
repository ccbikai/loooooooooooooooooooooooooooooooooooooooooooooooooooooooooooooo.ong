import { stringToBinary } from "./utils.js";

const originUrl = document.getElementById("origin-url");
const longUrl = document.getElementById("long-url");

originUrl?.addEventListener("input", () => {
	try {
		const validUrl = new URL(originUrl.value);
		longUrl.value = `${location.origin}/l${stringToBinary(validUrl.href)}ng`;
	} catch (e) {
		console.error(e);
		longUrl.value = "";
	}
});

const openUrl = document.getElementById("open-url");
const copyUrl = document.getElementById("copy-url");

openUrl.addEventListener("click", () => {
	longUrl.value && window.open(longUrl.value, "_blank");
});
copyUrl.addEventListener("click", async () => {
	if (longUrl.value) {
		await navigator.clipboard.writeText(longUrl.value);
	}
});
