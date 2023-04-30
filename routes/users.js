const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Job = require("../models/job");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    qualifications: req.body.qualifications,
    experience: req.body.experience,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ status: "ok", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/profile", async (req, res) => {
  const email = req.body.email;
  // console.log("got:" ,email);
  const user = await User.findOne({email:email});
  // console.log('fetched user:' , user);
  res.json({user : user});
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    res.json({ user: token });
  } else {
    res.json({ user: false });
  }
});

router.post("/update", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const dob = req.body.dob;
  const qualifications = req.body.qualifications;
  const experience = req.body.experience;
  const phone = req.body.phone;
  // console.log(email);
  // const user = await User.findOne({email:email});
  const updatedUser = await User.findOneAndUpdate(
    {email:email},
    { name: name, dob:dob, qualifications:qualifications, experience:experience, phone:phone });
  const user = await User.findOne({email:email});
  res.json({user:user});
});

router.get("/jobs", async (req, res) => {
    const jobs = await Job.find({archived:false});
    // console.log(jobs);
    res.json({jobs : jobs});
  });

  router.post("/job-description", async (req, res) => {
    const id = req.body.id;
    const job = await Job.findOne({id:id});
    // console.log(job.description);
    res.json({description : job.description});
  });


  router.post("/applied-jobs", async (req, res) => {
    const email = req.body.email;
    // console.log(email);
    const user = await User.findOne({email:email});
    const appliedJobs=[]
    // console.log(job.description);
    if (user) {
      const arr = user.appliedJobs;
      for(let i=0;i<arr.length;i++){
        const job = await Job.findOne({id:arr[i]});
        appliedJobs.push(job)
      }
    }
    res.json({appliedJobs: appliedJobs});
  });

  router.post("/apply", async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;

    // console.log(email);
    const user = await User.findOne({email:email});
    // const appliedJobs=[]
    // console.log(job.description);
    if (user) {
      const arr = user.appliedJobs;
      arr.push(id);
      const updatedUser = await User.findOneAndUpdate({email:email},{appliedJobs: arr});
      // console.log(arr);
    }

    const job = await Job.findOne({id: id});
    // console.log("MY JOB : ", job);
    if (job) {
      const arr = job.jobApplicants;
      arr.push(email);
      // console.log("UPDATED ARRAY : ", arr);
      const updatedJob = await Job.findOneAndUpdate({id:id}, {jobApplicants:arr});
    }

    res.json();
    // res.json({description : job.description});
  });


module.exports = router;