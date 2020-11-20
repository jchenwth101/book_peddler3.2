module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		username: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		verified: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});

	return User;
};
