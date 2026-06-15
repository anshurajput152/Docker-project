import express from 'express';
import path from 'path';

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

app.get('/', async function(req, res) {
    const options = {
        method: 'GET'
    };

    try {
        // Use Node's native global fetch
        const apiResponse = await fetch(URL, options);
        
        if (!apiResponse.ok) {
            throw new Error(`API responded with status: ${apiResponse.status}`);
        }

        const json = await apiResponse.json();
        console.log("Successfully fetched from backend:", json);

        // Explicitly passing a variable named 'data' for your EJS file
        res.render('index', { data: json });

    } catch (err) {
        console.error('Error fetching data from backend:', err);
        // Fallback so your template still receives the 'data' variable
        res.render('index', { data: 'Failed to retrieve data from backend.' });
    }
});

app.listen(3000, function() {
    console.log('Ares listening on port 3000!');
});