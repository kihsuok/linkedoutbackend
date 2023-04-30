const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/user");
const Job = require("../models/job");
const Order = require("../models/order")
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const admin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (admin) {
      const token = jwt.sign(
        {
          name: admin.name,
          email: admin.email,
          isAdmin:true
        },
        "secret123"
      );
      res.json({ admin: token });
    } else {
      res.json({ admin: false });
    }
  });

  router.get("/jobs", async (req, res) => {    
    const jobs = await Job.find();
    // console.log(jobs);
    res.json({jobs : jobs});
  });

  router.post("/job-applicants", async(req, res) => {
    const id = req.body.id;
    const job = await Job.findOne({id:id});
    let jobApplicants=[]
    // console.log("JOB : ", job);
    if (job) {
      jobApplicants = job.jobApplicants;
    }
    // console.log("JOB APPLICANTS :", jobApplicants);
    res.json({jobApplicants: jobApplicants});
  })

    router.post("/applicant-profile", async(req, res) => {
    const email = req.body.email;
    const jobApplicant = await User.findOne({email : email});

    // console.log("JOB APPLICANT :", jobApplicant);
    res.json({jobApplicant: jobApplicant});
  })

  router.post("/createjob", async (req, res) => {
    const job = new Job({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      deadline: req.body.deadline,
      contact: req.body.contact,
      archived : false
    });
    try {
      const newJob = await job.save();
      
      const oldOrder = await Order.findOne({id:1});
      let newOrder=oldOrder.displayorder;
      newOrder.push(job.id)
      const orderUpdate = await Order.findOneAndUpdate({id:1}, {displayorder:newOrder});
      // console.log(orderUpdate);
      res.status(201).json({ status: "ok", user: newJob });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post("/archive", async (req, res) => {
    const id = req.body.id;
    const archived = req.body.archived;
    const jobs = await Job.findOneAndUpdate({id:id}, {archived:archived});
    // console.log(jobs);
    res.json({jobs : jobs});
  });

  router.post("/orderupdate", async (req, res) => {
    const newOrder = req.body.displayorder;
    // console.log('here:',newOrder);
    const order = await Order.findOneAndUpdate({id:1}, {displayorder:newOrder});
    // console.log(order);
    res.json({order : order});
  });

  router.get("/getorder", async (req, res) => {    
    const doc = await Order.findOne({id:1});
    const order= doc.displayorder;
    // console.log('return ',order);
    res.json({order : order});
  });


  module.exports = router;