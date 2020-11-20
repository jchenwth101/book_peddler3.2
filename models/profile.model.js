module.exports = (sequelize, Sequelize) => {
	const Profile = sequelize.define("profiles", {
		picture: {
			type: Sequelize.STRING
		},
		points: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: '0'
		},
		address01: {
			type: Sequelize.STRING
		},
		address02: {
			type: Sequelize.STRING
		},
		city: {
			type: Sequelize.STRING
		},
		state: {
			type: Sequelize.STRING(2)
		},
		zip: {
			type: Sequelize.STRING
		}
	});

	return Profile;
};
