export function capitalizeFirstLetter(string) {
	if (typeof string === "string") {
		return string.charAt(0).toUpperCase() + string.slice(1);
	} else {
		console.error("'string' param is not of type string");
	}
}
