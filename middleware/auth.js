const jwt = require('jsonwebtoken');
const JWT_SECRET = "cjXttjuQcYc99sMJQ7gxIia"
module.exports = function(req, res, next)  {
    // Pak de token van de header om connectie te maken
    const token = req.header('x-auth-token')
    // Controleer de 'if' not token goed is of niet
    if(!token){
        return res.status(401).json({ msg: 'Geen token, niet goedgekeurd' })
    }
    try {
        const decoded  = jwt.verify(token, JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Token is niet correct' })
    }
}