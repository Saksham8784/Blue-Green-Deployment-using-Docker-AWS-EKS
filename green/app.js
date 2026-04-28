const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("🟢 GREEN VERSION - NEW");
});

app.listen(3000, () => console.log("Green running on port 3000"));
