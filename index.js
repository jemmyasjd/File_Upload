const express = require('express');
const multer = require('multer');
const path = require('path');


const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return  cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    return res.send('Single file uploaded');
});




app.get('/', (req, res) => {
    return res.render("home");
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

