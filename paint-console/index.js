const stdout = process.stdout;
const COLORS = require("./color-code");

const log = console.log;
const info = console.info;
const warn = console.warn;
const error = console.error;

console.log = function () {
	const args = Array.prototype.slice.call(arguments);
	let color = args.filter(arg => arg && typeof arg === 'object' && arg.hasOwnProperty('color'));
	color = color.length ? (color[0].color || "").toUpperCase() : 'DEFAULT';

	stdout.write(COLORS[color]);
	args.pop();
	log.apply(this, args);
	stdout.write(COLORS['DEFAULT']);
};

console.info = function () {
	const args = Array.prototype.slice.call(arguments);

	stdout.write(COLORS['BLUE']);
	info.apply(this, args);
	stdout.write(COLORS['DEFAULT']);
};

console.warn = function () {
	const args = Array.prototype.slice.call(arguments);

	stdout.write(COLORS['YELLOW']);
	warn.apply(this, args);
	stdout.write(COLORS['DEFAULT']);
};

console.error = function () {
	const args = Array.prototype.slice.call(arguments);

	stdout.write(COLORS['RED']);
	error.apply(this, args);
	stdout.write(COLORS['DEFAULT']);
};

module.exports = console;