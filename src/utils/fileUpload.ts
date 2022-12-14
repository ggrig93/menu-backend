const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

/**
 * Check uploaded file types.
 */
const imgFilter = (req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};


export {
    imgFilter
};
