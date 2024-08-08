const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
   
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).send('Token is required...');
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    const response = await axios.get('http://micro_auth:8080/getRole', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   
    console.log('Response:', response);

    const userInfo = response.data;
    const role = userInfo.role;

    console.log('User role:', role);

   
    if (role !== 'admin') {
      return res.status(403).send('Accès administrateur requis');
    }

    next();

  } catch (err) {
  
    console.error('Erreur lors de la vérification du token:', err.message);
    if (err.response) {
      console.error('Réponse d\'Axios:', err.response.data);
    }
    res.status(403).send('Token invalide...');
  }
};
