const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: 0,

		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle
		}
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model.js")(sequelize, Sequelize);
db.condition = require("../models/condition.model.js")(sequelize, Sequelize);
db.bookstatus = require("../models/bookstatus.model.js")(sequelize, Sequelize);
db.book = require("../models/book.model.js")(sequelize, Sequelize);
db.request = require("../models/request.model.js")(sequelize, Sequelize);
db.borrow = require("../models/borrow.model.js")(sequelize, Sequelize);
db.approvalstatus = require("../models/approval.model.js")(sequelize, Sequelize);

db.condition.hasOne(db.book);
db.bookstatus.hasOne(db.book);

db.book.belongsTo(db.condition);
db.book.belongsTo(db.bookstatus);

db.book.belongsTo(db.user);
db.user.hasMany(db.book);

db.profile.belongsTo(db.user);
db.user.hasOne(db.profile);

db.book.hasMany(db.request, {foreignKey: 'bookId'});
db.user.hasMany(db.request, {foreignKey: 'ownerId'});
db.user.hasMany(db.request, {foreignKey: 'borrower'});
db.request.belongsTo(db.book);
db.request.belongsTo(db.user, {foreignKey: 'borrower'});
db.approvalstatus.hasOne(db.request);


db.book.hasMany(db.borrow, {foreignKey: 'bookId'});
db.user.hasMany(db.borrow, {foreignKey: 'ownerId'});
db.user.hasMany(db.borrow, {foreignKey: 'borrower'});
db.borrow.belongsTo(db.book);
db.borrow.belongsTo(db.user, {foreignKey: 'borrower'});

module.exports = db;
