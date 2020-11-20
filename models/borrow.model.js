module.exports = (sequelize, Sequelize) => {
	const Borrow = sequelize.define("borrow", {
		returned: {
			type: Sequelize.BOOLEAN,
		},
	},
	{
		tableName: 'borrow'
	});

	return Borrow;
};
