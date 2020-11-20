const db = require("../models");
const Profile = db.profile
const User = db.user

exports.getPoints = (req, res) => {
	Profile.findOne({
			where: {
				userId: req.userId
			}
		})
		.then(profile => {
			res.status(200).send({points: profile.points});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
}

exports.getProfile = (req, res) => {
	Profile.findOne({
			where: {
				userId: req.userId
			},
			include: [
				{ model: db.user, attributes: ["email","verified"] },
			],
		})
		.then(profile => {
			res.status(200).send({profile});
		})
		.catch(err => {
			res.status(500).send({message: err.message});
		});
}

exports.saveProfile = (req, res) => {
	//if the address, city, state, and zip are all populated we change the user verified to try
	let isVerified = false;
	if (req.body.address01.trim() && req.body.city.trim() && req.body.state.trim() && req.body.zip.trim()){
		isVerified = true;
	}
	Profile.findOne({
		where: {
			userId: req.userId
		}
	}).then(profile => {
			profile.update({
					address01: req.body.address01.trim(),
					address02: req.body.address02.trim(),
					city: req.body.city.trim(),
					state: req.body.state.trim(),
					zip: req.body.zip.trim(),
				})
				.then(() => {
					//update the user verified record
					User.findOne({
						where: {
							id: req.userId
						}
					}).then(user => {
						user.update({
							verified: isVerified,
						}).then(() => {
							res.status(200).send('Profile Updated Successfully.');
						})
					})
				});
		})
		.catch(err => {
			res.status(500).send({ message: err.message });
		});
}
