module.exports = (sequelize, Sequelize) => {
	const BookStatus = sequelize.define("book_status", {
		type: {
			type: Sequelize.STRING
		},
	},
	{
		tableName: 'book_status'
	});
	return BookStatus;
};
