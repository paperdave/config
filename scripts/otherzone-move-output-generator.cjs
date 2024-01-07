const path = require("node:path");

module.exports = ({ name, ext }) => {
	return path.join(
		process.env.OTHERZONE_MOVE_OUTPUT,
		`${path.basename(name)}.${ext}`,
	);
};
