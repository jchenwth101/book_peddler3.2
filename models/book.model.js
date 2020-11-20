module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define("books", {
		title: {
			type: Sequelize.STRING
		},
		isbn: {
			type: Sequelize.STRING
		},
		author: {
			type: Sequelize.STRING
		},
		quantity: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: '1'
		},
	});

	return Book;
};
