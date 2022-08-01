const jwt = require('jsonwebtoken')

const generateAuthToken = (user) => {
	const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'})
	return token;
}

module.exports = generateAuthToken;