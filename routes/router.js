const express =require('express')
const bcrypt = require('bcrypt');
const collection = require('../model/User'); 


// Create router
const router = express.Router();


const saltRounds = 10;

// Define routes
router.get('/', (req, res) => {
    res.status(200).render("login");
});


router.get('/register', (req, res) => {
    res.status(200).render("register");
});

//Registration
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new collection({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        console.log("User registered:", user);
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });
        if (!user) return res.status(401).send("Invalid email or password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid email or password");

        res.status(200).send("Login successful");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;