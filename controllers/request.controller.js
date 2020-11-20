const db = require("../models");
const Request = db.request;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Book = db.book;
const Borrow = db.borrow;

exports.makeRequest = (req, res) => {
	// Save User to Database
	Request.create({
			approvalStatusId: 1,
			bookId: req.body.bookId,
			ownerId: req.body.ownerId,
			borrower: req.body.borrower
		})
		.then(request => {
			res.status(200).send({ message: "Request successful!" });
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
};

exports.getRequests = (req, res) => {
	const filterValue = req.body.filter ? req.body.filter : '';
	const limit = req.body.limit ? parseInt(req.body.limit) : 10;
	const page = req.body.page ? parseInt(req.body.page) - 1 : 0;
	const offset = limit * page;

	let whereCondition = {
		ownerId: req.userId,
	};

	if (filterValue){
		whereCondition = {
			ownerId: req.userId,
			approvalStatusId: filterValue,
		};
	}

	Request.findAndCountAll({
			include: [
				{model: db.book, foreignKey: "bookId", attributes: ["title", "author", "isbn"]},
				{model: db.user, foreignKey: "borrower", attributes: ["email"]},
			],
			where: whereCondition,
		})
		.then(requests => {
			res.status(200).send({
				requests: requests.rows,
				total: requests.count
			});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
};

exports.getRequestCount = (req, res) => {
	Request.count({
			where: {
				approvalStatusId: 1,
				ownerId: req.userId
			}
		})
		.then(count => {
			res.status(200).send({
				count: count
			});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
};

exports.approveRequest = (req, res) => {
	Request.findOne({
			where: {
				id: req.body.request
			}
		})
		.then(request => {
			request.update({
				approvalStatusId: 2
			}).then(() => {
				//update the book
				Book.findOne({
						where: {
							id: request.bookId
						}
					})
					.then(book => {
						book.update({
								bookStatusId: 1
							})
							.then(() => {
								Borrow.create({
									returned: false,
									bookId: request.bookId,
									ownerId: request.ownerId,
									borrower: request.borrower
								}).then(() => {
									res.status(200).send('Request Approved Successfully.');
								})
							})
					});
			});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
};

exports.declineRequest = (req, res) => {
	Request.findOne({
			where: {
				id: req.body.request
			}
		})
		.then(request => {
			request.update({
				approvalStatusId: 3
			}).then(() => {
				res.status(200).send('Request Declined Successfully.');
			});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
};
