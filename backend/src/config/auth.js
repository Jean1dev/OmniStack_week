module.exports = {
    secret: process.env.JWT_CODE || 'secreto-mesmo',
    expiresIn: `7d`
}