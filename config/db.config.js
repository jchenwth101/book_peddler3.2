module.exports = {
	HOST: "joels-MacBook-Pro.local",
	USER: "root",
	PASSWORD: "GoodB33r",
	DB: "users_db",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};