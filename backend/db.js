const mongoose =    require('mongoose');
const mongoURI ='mongodb://127.0.0.1:27017/inotebook2?readPreference=primaryPreferred&directConnection=true';

const connectToMongo=()=>{

    mongoose.connect(mongoURI);

    

}

module.exports = connectToMongo;