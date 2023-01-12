const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@krayo.hhc30g1.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
