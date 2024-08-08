const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {

   const user = await User.findOne({ email: req.body.email });
   if (user) {
      return res.status(400).json({ msg: "Utilisateur existe deja" });
   }


   const newUser = new User({
      ...req.body,
      
   });

   try {
      await newUser.save();
      res.status(201).json({ msg: "Utilisateur enregistre avec succes" });
   }catch (err) {
   
    if (err.name === 'ValidationError') {
        const errors = {};
        for (field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ errors });
    }

    
    console.error(err.message);
    res.status(500).send("Erreur serveur");
}

}


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ msg: "Utilisateur non trouve" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Mot de passe incorrect" });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
       if (err) throw err;
       res.status(200).json({ token, message: "Vous etes connecte",user});

    });


 }

 exports.getUserInfoFromToken = async (req, res) => {

   const token = req.headers['authorization'].split(' ')[1];
   const decoded = jwt.verify(token, process.env.SECRET);
   const user = await User.findById(decoded.id);
   res.json({ id: user._id, role: user.role });


 };

    



