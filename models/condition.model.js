module.exports = (sequelize, Sequelize) => {
	const Condition = sequelize.define("condition", {
		type: {
			type: Sequelize.STRING
		},
		value: {
			type: Sequelize.INTEGER,
		}
	},
	{
		tableName: 'condition'
	});

	return Condition;
};
