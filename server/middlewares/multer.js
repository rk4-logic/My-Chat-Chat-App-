import multer from "multer";

 const multerupload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});

const singleAvatar = multerupload.single("avatar");

export {singleAvatar};