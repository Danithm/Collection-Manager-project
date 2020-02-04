const mongoose = require('mongoose');

module.exports = () => {
    const connect = function(){
        mongoose.connect('mongodb://localhost:27017/admin', {
            dbName:'user_input',
    }, (error) => {
        if (error) {
            console.log('MongoDB Error', error);
        }else {
            console.log('MongoDB connected')
        }
    })
}
connect();
mongoose.connection.on('error', (error) => {
    console.error('MongoDB Error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('Disconnected MongoDB, try re-connect.');
    connect();
});
}