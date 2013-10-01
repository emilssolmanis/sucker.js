exports.index = function(req, res) {
    res.render('index', { title: 'Welcome to Sucker.js' });
};

exports.room = function(req, res) {
    res.render('room', { title: 'POST gathering room', room: req.params.room });
};
