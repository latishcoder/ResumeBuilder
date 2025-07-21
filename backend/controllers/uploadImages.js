import fs from "fs";
import path from "path";

import Resume from "../models/resumeModels.js";
import upload from "../middleware/uploadMiddleware.js";
import { error } from "console";

export const uploadResumeImages = async (req, res) => {
    try {
        //CONFIGURE MULTER TO HANDLE IMAGES
        upload.fields([{ name: "thumbnail"  }, { name: "profileImage" }]);
        (req,res, async (err) => {
            if(err){
                return res.status(500).json({ message: "File Upload Failed", error: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
            

            if(!resume){
                return res.status(404).json({ message: "Resume not found or not authorized" });
            }

            //USE PROCESS CWD TO LOCATE UPLOADS FOLDER
            const uploadsFolder = path.join(process.cwd(), "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfile = req.files.profileImage?.[0];

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail)){
                        fs.unlinkSync(oldThumbnail);
                    }
                    resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
                }

                //Same for profilrpreview image
                if(newProfile){
                    if(resume.profileInfo?.profilePreviewUrl){
                        const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                        if(fs.existsSync(oldProfile)){
                            fs.unlinkSync(oldProfile);
                        }
                        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfile.filename}`;
                    }
                }
                await resume.save();
                res.status(200).json({
                    message: "Images uploaded successfully",
                    thumbnailLink: resume.thumbnailLink,
                    profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
                });
            }
        })
    } catch (err) {
        console.error("Error uploading image:", err);
        res.status(500).json({ message: "Failed to upload image", error: err.message });
    }
}