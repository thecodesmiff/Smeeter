import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3.js';

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'justin-twitter-clone',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

export default upload;