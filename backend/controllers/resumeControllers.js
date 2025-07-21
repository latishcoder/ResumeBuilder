import Resume from "../models/resumeModels.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        //DEFAULT TEMPLATE
         const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],

            
        };
        const newResume = await Resume.create({
                userId: req.user.id,
                title,
                ...defaultResumeData,
                ...req.body,
            })
            res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
}

//GET FUNCTION
export const getUserResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user.id }).sort({
            updatedAt: -1
        });
    
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
}

//GET RESUME BY ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id, userId: req.user._id
        });
        if(!resume){
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: "Failed to get resume", error: error.message });
    }
}

//UPDATES RESUMES
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id, userId: req.user._id
        });
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }
        
        //MERGE UPDATED RESUMES
        Object.assign(resume, req.body);
        //SAVE UPDATED RESUMES
        const saveResume = await resume.save();
        res.status(200).json(saveResume);
        
    } catch (error) {
        res.status(500).json({ message: "Failed to update resume", error: error.message });
    }
}

//DELETE RESUMES

export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id, userId: req.user._id
        
        })
        if(!resume){
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }
        

        //CREATE A UPLOADS FOLDER AND STORE THE RESUME THERE
        const uploadsFolder = path.join(process.cwd(), "uploads");

        //DELETE THUMBNAIL FUNCTION
        if(resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder,path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)){
                fs.unlinkSync(oldThumbnail);
            }
        }
        if(resume.resumeLink) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)){
                fs.unlinkSync(oldProfile);
            }
        }

        //DELETE RESUME DOC
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });
        if(!deleted){
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }
        res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
}