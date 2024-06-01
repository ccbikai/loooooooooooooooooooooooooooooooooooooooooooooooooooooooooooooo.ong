import ToastMaker from "toastmaker";
import "toastmaker/dist/toastmaker.css";
import { stringToBinary } from "./utils.js";

const originUrl = document.getElementById("origin-url");
const longUrl = document.getElementById("long-url");

originUrl?.addEventListener("input", () => {
	try {
		const validURL = new URL(originUrl.value);
		longUrl.value = `${location.origin}/l${stringToBinary(validURL.href)}ng`;
	} catch (e) {
		console.error(e);
		longUrl.value = "";
	}
});

const openURL = document.getElementById("open-url");
const copyURL = document.getElementById("copy-url");

openURL.addEventListener("click", () => {
	longUrl.value && window.open(longUrl.value, "_blank");
});
copyURL.addEventListener("click", async () => {
	if (longUrl.value) {
		await navigator.clipboard.writeText(longUrl.value);
		ToastMaker("L(o*62).ong URL Copied!", 1000);
	}
});
