export default function sleep(ms) {
	console.log(`SLEEP IS ON!!!!!`);
	return function (x) {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}
