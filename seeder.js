const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({
    path: './config/config.env'
});

const Food = require('./models/Food')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const food = JSON.parse(
    fs.readFileSync(`${__dirname}/data/food.txt`, 'utf-8')
);

const importData = async () => {
    try {
        await Food.create(food);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
}