import PersonalDetails from "../models/PersonalDetails.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import About from "../models/About.js";
export const addDetails = async (req, res) => {
  const { firstName, lastName, passionateIn, tagLine, about, contact } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !passionateIn ||
    !tagLine ||
    !about ||
    !contact
  ) {
    return res.status(300).json({
      success: false,
      message: "All fields are required",
    });
  }
  const user = req.user;
  try {
    const profileImg = req.file?.path;
    const details = new PersonalDetails({
      profileImg,
      firstName,
      lastName,
      passionateIn,
      tagLine,
      about,
      contact,
      userId: user._id,
    });
    await details.save();
    res.status(201).json({
      success: true,
      details,
      message: "Uploaded Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const updateDetails = async (req, res) => {
  const user = req.user;
  const updateData = {};

  try {
    if (req.body.firstName) updateData.firstName = req.body.firstName;
    if (req.body.lastName) updateData.lastName = req.body.lastName;
    if (req.body.tagLine) updateData.tagLine = req.body.tagLine;
    if (req.body.about) updateData.about = req.body.about;
    if (req.body.passionateIn) updateData.passionateIn = req.body.passionateIn;
    if (req.file) {
      updateData.profileImg = req.file?.path;
    }

    let pushOps = {};
    // if (req.body.passionateIn) {
    //   let newPassionateIn = Array.isArray(req.body.passionateIn)
    //     ? req.body.passionateIn
    //     : [req.body.passionateIn];
    //   pushOps.passionateIn = { $each: newPassionateIn };
    // }

    if (req.body.contact) {
      let newContacts = Array.isArray(req.body.contact)
        ? req.body.contact
        : [req.body.contact];

      newContacts = newContacts.map((c) =>
        typeof c === "string" ? JSON.parse(c) : c
      );
      pushOps.contact = { $each: newContacts };
    }

    const updatedDetails = await PersonalDetails.findOneAndUpdate(
      { userId: user._id },
      {
        $set: updateData,
        ...(Object.keys(pushOps).length > 0 ? { $push: pushOps } : {}),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedDetails,
      message: "Successfully Updated!",
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSkill = async (req, res) => {
  const user = req.user;
  const { skillImg, title, progress, category } = req.body;
  if (!skillImg || !title || !progress || !category) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }
  try {
    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found!",
      });
    }
    const skillExists = await Skill.findOne({ title });
    if (skillExists) {
      return res.status(300).json({
        success: false,
        message: "Skill Already Exists!",
      });
    }
    const skill = new Skill({
      skillImg,
      title,
      progress,
      category,
      userId: user._id,
    });
    await skill.save();

    res.status(200).json({
      success: true,
      skill,
      message: "skill successfully added!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//get all skills
export const allSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      success: true,
      skills,
      message: "Skills fetched!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getSpecificSkillCategory = async(req, res) => {
  const {category} = req.query
  if(category == 'All'){
    try {
      const skills = await Skill.find(
        category === "All" ? {} : { category }
      );
      res.status(200).json({
        success: true,
        skills,
        message: "Skills fetched!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }

    return
  }
  try {
    const skills = await Skill.find({category})
    res.status(200).json({
      success: true,
      skills,
      message: "Skills fetched!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}

export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const response = await Skill.deleteOne({ userId: user._id, _id: id });
    if (response.deletedCount == 0) {
      return res.status(300).json({
        success: false,
        message: "Error while deleting the skill",
      });
    }
    res.status(201).json({
      success: true,
      message: "Skill deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getDetails = async (req, res) => {
  try {
    const details = await PersonalDetails.find({});
    res.status(200).json({
      success: true,
      details,
      message: "Data fetched!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

//Add Project
export const addProject = async (req, res) => {
  const user = req.user;
  const projectImg = req?.file.path;
  console.log(projectImg);
  const { title, github, liveDemo, technologies } = req.body;
  if (!projectImg || !title || !technologies) {
    return res.status(300).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const project = new Project({
      projectImg,
      title,
      github,
      liveDemo,
      technologies,
      userId: user._id,
    });
    await project.save();
    res.status(200).json({
      success: true,
      project,
      message: "Successfully Added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      projects,
      message: "Projects Fetched",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProject = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const response = await Project.deleteOne({ userId: user._id, _id: id });
    if (response.deletedCount == 0) {
      return res.status(300).json({
        success: false,
        message: "Something went wrong!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project Deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Add Certificates
export const addCertificates = async (req, res) => {
  const user = req.user;
  const certificateImg = req.file?.path;
  const { title, verify } = req.body;

  if (!certificateImg || !title || !verify) {
    return res.status(300).json({
      success: false,
      message: "All fields are required!",
    });
  }
  try {
    const certificate = new Certificate({
      certificateImg,
      title,
      verify,
      userId: user._id,
    });
    await certificate.save();
    res.status(201).json({
      success: true,
      certificate,
      message: "Certificate Uploaded!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json({
      success: true,
      certificates,
      message: "Certificated Fetched!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addAbout = async (req, res) => {
  const user = req.user;
  const { summary, education, problemSolving, courses } = req.body;

  if (!summary || !education || !problemSolving || !courses) {
    return res.status(300).json({
      success: false,
      message: "All fields are required!",
    });
  }
  try {
    const about = new About({
      summary,
      education,
      problemSolving,
      courses,
      userId: user._id,
    });
    await about.save();

    res.status(201).json({
      success: true,
      about,
      message: "About data added!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const updateAbout = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { summary, education, problemSolving, courses } = req.body;
  try {
    const updatedDetails = await About.findOneAndReplace(
      { userId: user._id,  _id: id },
      { summary, education, problemSolving, courses, userId: user._id },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedDetails,
      message: "Successfully Updated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAbout = async (req, res) => {
  try {
    const about = await About.find({});
    res.status(200).json({
      success: true,
      about,
      message: "About data fetched!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteSummaryItem = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { value } = req.body;

  try {
    const response = await About.findByIdAndUpdate(
      { userId: user._id, _id: id },
      { $pull: { summary: value } },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Unable to update!",
      });
    }
    res.status(200).json({
      success: true,
      message: "About info updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCourseItem = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { value } = req.body;

  try {
    const response = await About.findByIdAndUpdate(
      { userId: user._id, _id: id },
      { $pull: { courses: value } },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Unable to update!",
      });
    }
    res.status(200).json({
      success: true,
      message: "About info updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePassionateItem = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { value } = req.body;

  try {
    const response = await PersonalDetails.findOneAndUpdate(
      { userId: user._id, _id: id },
      {
        $pull: { passionateIn: value },
      },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Passionate item deleted!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCertificate = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const response = await Certificate.findOneAndDelete({
      _id: id,
      userId: user._id,
    });
    if (response.deletedCount == 0) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong!",
      });
    }
    res.status(201).json({
      success: true,
      message: "Certificate removed!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProblemSolving = async (req, res) => {
  const { id } = req.params;
  const { platform, totalProblems, link } = req.body;

  try {
    const response = await About.findOneAndUpdate(
      { _id: id, "problemSolving.platform": platform },
      {
        $set: {
          "problemSolving.$.totalProblems": totalProblems,
          "problemSolving.$.link": link
        },
      }, {new: true}
    );
    if(!response){
      return res.status(404).json({
        success: false,
        message: "something went wrong"
      })
    }
    res.status(200).json({
      success: true,
      message: "Successfully updated!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
