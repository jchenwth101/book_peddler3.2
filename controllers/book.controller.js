const db = require("../models");
const Book = db.book;
const Condition = db.condition;
const Profile = db.profile;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAllBooks = (req, res) => {
	//get our variables if
	const searchValue = req.body.search ? `%${req.body.search}%` : '';
	const limit = req.body.limit ? parseInt(req.body.limit) : 10;
	const page = req.body.page ? parseInt(req.body.page) - 1 : 0;
	const offset = limit * page;

	let whereCondition = {
		bookStatusId: 2
	};
	if (searchValue){
		whereCondition = {
			bookStatusId: 2,
			[Op.or]: {
				title: {[Op.like]: searchValue},
				isbn: {[Op.like]: searchValue},
				author: {[Op.like]: searchValue},
			}
		};
	}

	Book.findAndCountAll({
			limit: limit,
			offset: offset,
			where: whereCondition,
			include: [
				{ model: db.condition, foreignKey: "conditionId", attributes: ["id", "type"] },
				{ model: db.bookstatus, foreignKey: "bookStatusId", attributes: ["type"] }
			]
		})
		.then(books => {
			res.status(200).send({
				books: books.rows,
				total: books.count
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.getBook = (req, res) => {
	// Save User to Database
	Book.findOne({
			include: [
				{ model: db.condition, foreignKey: "conditionId", attributes: ["id", "type"] },
				{ model: db.bookstatus, foreignKey: "bookStatusId", attributes: ["type"] }
			],
			where: {
				id: req.params.id
			}
		})
		.then(book => {
			res.status(200).send({
				book
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.addBook = (req, res) => {
	Book.create({
			title: req.body.title,
			isbn: req.body.isbn,
			author: req.body.author,
			quantity: 1,
			conditionId: req.body.condition,
			bookStatusId: 2,
			userId: req.userId
		})
		.then(book => {
			//get the condition value
			Condition.findOne({
				where: {
					id: req.body.condition
				}
			}).then(condition => {
				Profile.findOne({
					where: {
						userId: req.userId,
					}
				}).then(profile => {
					profile.update({
						points: profile.points + condition.value
					}).then(()=>{
						res.status(200).send({ message: "Book added successfully!" });
					});
				});
			});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.editBook = (req, res) => {
	Book.findOne({
		where: {
			id: req.params.id
		}
	}).then(book => {
			book.update({
					title: req.body.title,
					isbn: req.body.isbn,
					author: req.body.author,
					conditionId: req.body.condition
				})
				.then(() => {
					res.status(200).send('Book Updated Successfully.');
				});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.deleteBook = (req, res) => {
	// Save User to Database
	Book.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(book => {
			book.destroy()
				.then(() => {
					res.status(200).send('Deleted Successfully.');
				});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.searchBooks = (req, res) => {
	//get our variables if
	const searchValue = req.body.search ? `%${req.body.search}%` : '';
	const limit = req.body.limit ? parseInt(req.body.limit) : 10;
	const page = req.body.page ? parseInt(req.body.page) - 1 : 0;
	const offset = limit * page;

	let whereCondition = {
		bookStatusId: 2,
		userId: {
			[Op.not]: req.userId
		}
	};
	if (searchValue){
		whereCondition = {
			bookStatusId: 2,
			[Op.or]: {
				title: {[Op.like]: searchValue},
				isbn: {[Op.like]: searchValue},
				author: {[Op.like]: searchValue},
			}
		};
	}

	Book.findAndCountAll({
			limit: limit,
			offset: offset,
			where: whereCondition,
			include: [
				{model: db.condition, foreignKey: "conditionId", attributes: ["id", "type"]},
				{model: db.bookstatus, foreignKey: "bookStatusId", attributes: ["type"]}
			],
		})
		.then(books => {
			res.status(200).send({
				books: books.rows,
				total: books.count
			});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
};
