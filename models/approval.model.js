module.exports = (sequelize, Sequelize) => {
	const ApprovalStatus = sequelize.define("approval_status", {
			type: {
				type: Sequelize.STRING
			},
		},
		{
			tableName: 'approval_status'
		});
	return ApprovalStatus;
};
