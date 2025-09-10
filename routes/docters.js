/** @format */

// /** @format */
import express from "express";
const router = express.Router();
import Doctor from "../models/DoctorSchema.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
 const ext=file.originalname.split(".").pop()
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix +"."+ ext);
  },
});

const upload = multer({ storage: storage });
router.post("/addoctors", upload.single("image"), async (req, res) => {
  const { specialty, experienceYears, description, name } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!specialty || !experienceYears || !description || !name || !image)
    res.status(400).json({
      messeage: "All fildes are requierd",
    });
  const newDocter = await Doctor({
    specialty,
    experienceYears,
    description,
    name,
    image:  req.file?.filename,
  });
  const savedDocter = await newDocter.save();
  res.status(200).json({ savedDocter, messeage: "All fildes are requierd" });
});
router.get("/alldocter", async (req, res) => {
  const doctors = await Doctor.find();
  res.json({
    doctors,
    messeage: "totaldocter",
  });
});

router.get("/count",async(req,res)=>{
  try {
    const count = await Doctor.countDocuments()
     res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors count" });
  }
})

router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  res.json(doctor);
});
export default router;
