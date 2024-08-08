const axios = require('axios');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token est absent');

  try {
    const response = await axios.get('http://auth-service:3000/getUserInfoFromToken', {
      headers: { 'Authorization': token }
    });
    const userInfo = response.data;
    if (userInfo.role !== 'admin') return res.status(403).send('Accès administrateur requis');
    next();
  } catch (err) {
    res.status(403).send(' Token invalide');
  }
};
