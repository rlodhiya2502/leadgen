const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/submit-lead', (req, res) => {
    const { name, email, phone } = req.body;
    // Save to database (pseudo code)
    // db.save({ name, email, phone });

    // Send email notification (pseudo code)
    // sendEmailNotification({ name, email, phone });

    res.json({ message: 'Lead submitted successfully!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});