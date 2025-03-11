import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Link,
  Paper,
  Chip,
  Input,
  InputLabel,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { MdMail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiLinkedinBoxFill } from "react-icons/ri";
import './BlogPost.css';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CodeIcon from "@mui/icons-material/Code";
import VerifiedIcon from "@mui/icons-material/Verified";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
// import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getCallWithPythonURLParam } from "../../../ReuseComponents/ReuseCalls";
// import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  AlignmentType,
  WidthType,
  BorderStyle,
} from "docx";
import html2pdf from "html2pdf.js";
// import htmlDocx from "html-docx-js/dist/html-docx.js";
import { Close } from "@mui/icons-material";
const theme = "#1976d2";
const ResumeBuilderReq = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [PlainTextForm, setPlainTextForm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
  });
  const [EducationInfo, setEducationInfo] = useState([
    {
      degree: "",
      college: "",
      school: "",
      startYear: "",
      endYear: "",
      grade: "",
    },
  ]);
  const [workExperience, setWorkExperience] = useState([
    {
      role: "",
      Organization: "",
      projDes: "",
      fromDate: "",
      toDate: "",
    },
  ]);
  const [projectInfo, setProjectInfo] = useState([
    {
      proNme: "",
      proDes: "",
    },
  ]);
  const [certificateInfo, setCertificateInfo] = useState([
    {
      certiNme: "",
      certiDes: "",
    },
  ]);
  const [skills, setSkills] = useState([]);

  const [expanded, setExpanded] = useState("education");

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : "false");
  };

  const convertToWord = (PlainTextForm) => {
    if (!PlainTextForm) return;

    const blob = new Blob([PlainTextForm], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_text.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // crude operations code
  const DeleteEducationColumn = (ind) => {
    const educationCol = EducationInfo.filter((_, index) => {
      return ind !== index;
    });
    setEducationInfo(educationCol);
  };
  const DeleteWorkExperienceColumn = (index) => {
    const workExpDel = workExperience.filter((_, ind) => {
      return ind !== index;
    });
    setWorkExperience(workExpDel);
  };

  const DeleteProjectColumn = (index) => {
    const projecDelete = projectInfo.filter((_, ind) => {
      return ind !== index;
    });
    setProjectInfo(projecDelete);
  };
  const DeleteCertificationColumn = (index) => {
    const filteredCertificate = certificateInfo.filter((_, ind) => {
      return ind !== index;
    });
    setCertificateInfo(filteredCertificate);
  };

  const handleAddMoreWorkExp = () => {
    setWorkExperience((prev) => [
      ...prev,
      {
        role: "",
        Organization: "",
        projDes: "",
        fromDate: "",
        toDate: "",
      },
    ]);
  };
  const handleAddMoreEducationDetails = () => {
    setEducationInfo((prev) => [
      ...prev,
      {
        degree: "",
        college: "",
        school: "",
        startYear: "",
        endYear: "",
        grade: "",
      },
    ]);
  };
  const handleAddMoreProjects = () => {
    setProjectInfo((proj) => [
      ...proj,
      {
        proNme: "",
        proDes: "",
      },
    ]);
  };
  const handleAddMoreCertificates = () => {
    setCertificateInfo((proj) => [
      ...proj,
      {
        certiNme: "",
        certiDes: "",
      },
    ]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 10);
      setPersonalInfo((prevState) => ({
        ...prevState,

        [name]: formattedValue,
      }));
    } else {
      setPersonalInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEduChange = (index, e) => {
    const { name, value } = e.target;
    setEducationInfo((prev) => {
      const updatedEdu = prev.map((eduInfo, eduInd) => {
        if (eduInd === index) {
          return { ...eduInfo, [name]: value };
        }
        return eduInfo;
      });
      return updatedEdu;
    });
  };

  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    setWorkExperience((prev) => {
      const updatedEdu = prev.map((eduInfo, eduInd) => {
        if (eduInd === index) {
          return { ...eduInfo, [name]: value };
        }
        return eduInfo;
      });
      return updatedEdu;
    });
  };

  const handleCertificationChange = (index, e) => {
    const { value, name } = e.target;
    setCertificateInfo((prev) => {
      const updatedEdu = prev.map((eduInfo, eduInd) => {
        if (eduInd === index) {
          return { ...eduInfo, [name]: value };
        }
        return eduInfo;
      });
      return updatedEdu;
    });
  };

  const handleProjectChange = (index, e) => {
    const { value, name } = e.target;
    setProjectInfo((prev) => {
      const updatedEdu = prev.map((eduInfo, eduInd) => {
        if (eduInd === index) {
          return { ...eduInfo, [name]: value };
        }
        return eduInfo;
      });
      return updatedEdu;
    });
  };

  const handleUpdate = () => {
    setSkills((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const handleDeleteChip = (e, index) => {
    const updatedSkills = skills.filter((_, ind) => ind !== index);
    setSkills(updatedSkills);
  };

  const typeWriter = (text, index = 0) => {
    setIsLoading(false);
    if (index < text.length) {
      setPlainTextForm((prev) => prev + text.charAt(index));
      setTimeout(() => typeWriter(text, index + 1), 5);
    }
  };

  //send selected sentence to python
  const handleAskAI = async (val, index, staticVal) => {
    const typeVal = staticVal === "Proj" ? "project description" : "experience";
    const resp = await getCallWithPythonURLParam(
      "makeItProfessional",
      "content",
      val,
      "type",
      typeVal
    );
    console.log("updatedResp", resp.response);
    const updatedresp = resp.response;
    console.log("updatedResp", updatedresp);

    if (resp && staticVal === "exp") {
      const updatedProjDes = resp.response;
      handleExpChange(index, {
        target: { name: "projDes", value: updatedProjDes },
      });
    } else if (resp && staticVal === "Proj") {
      const updatedProjDes = resp.response;
      handleProjectChange(index, {
        target: { name: "proDes", value: updatedProjDes },
      });
    }
  };

  const handleDownlaodResume = () => {
    const selected = document.getElementById("resumeId");
    console.log("selected--------->", selected);
    html2pdf().from(selected).save("resume.pdf");
    alert("download");
  };

  const handleDownloadDoc = () => {
    // const element = document.getElementById("resumeId");

    // // Get the HTML content of the element
    // const htmlContent = element.innerHTML;
    // const converted = htmlDocx.asBlob(htmlContent);

    // // Create a download link and trigger it to download the file
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(converted);
    // link.download = "resume.docx";
    // link.click();

    const doc = new Document({
      sections: [
        {
          children: [
            // Header: Name, Role, Location
            new Paragraph({
              children: [
                new TextRun({ text: personalInfo.name, bold: true, size: 32 }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: personalInfo.role,
                  italics: true,
                  size: 24,
                }),
                new TextRun({ text: " | " }),
                new TextRun({ text: personalInfo.address, size: 24 }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),

            // Contact Info (Email, Phone, LinkedIn) using an invisible table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE }, // Full width
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: personalInfo.email,
                              bold: true,
                              // color: "black",
                            }),
                          ],
                          alignment: AlignmentType.LEFT,
                        }),
                      ],
                      shading: { fill: "D3D3D3" },
                      width: { size: 33, type: WidthType.PERCENTAGE },
                      borders: {
                        top: BorderStyle.NONE,
                        bottom: BorderStyle.NONE,
                        left: BorderStyle.NONE,
                        right: BorderStyle.NONE,
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: personalInfo.phone,
                              bold: true,
                              // color: "FFFFFF",
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      shading: { fill: "D3D3D3" },
                      width: { size: 34, type: WidthType.PERCENTAGE },
                      borders: {
                        top: BorderStyle.NONE,
                        bottom: BorderStyle.NONE,
                        left: BorderStyle.NONE,
                        right: BorderStyle.NONE,
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: personalInfo.linkedin,
                              bold: true,
                              // color: "FFFFFF",
                            }),
                          ],
                          alignment: AlignmentType.RIGHT,
                        }),
                      ],
                      shading: { fill: "D3D3D3" },
                      width: { size: 33, type: WidthType.PERCENTAGE },
                      borders: {
                        top: BorderStyle.NONE,
                        bottom: BorderStyle.NONE,
                        left: BorderStyle.NONE,
                        right: BorderStyle.NONE,
                      },
                    }),
                  ],
                }),
              ],
            }),

            // Rest of the document remains unchanged
            new Paragraph({
              children: [
                new TextRun({
                  text: "EDUCATION",
                  bold: true,
                  size: 26,
                  color: "#959595",
                }),
              ],
              spacing: { after: 150, before: 150 },
            }),
            ...EducationInfo.map(
              (edu) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: edu.degree, bold: true }),
                    new TextRun({ text: ` - ${edu.college} (${edu.grade})` }),
                    new TextRun({
                      text: ` (${edu.startYear} - ${edu.endYear})`,
                      italics: true,
                    }),
                  ],
                  spacing: { after: 200 },
                  indent: { left: 400 },
                })
            ),

            new Paragraph({
              children: [
                new TextRun({
                  text: "WORK EXPERIENCE",
                  bold: true,
                  size: 26,
                  color: "#959595",
                }),
              ],
              spacing: { after: 150, before: 150 },
            }),
            ...workExperience
              .map((work) => {
                const bulletPoints = work?.projDes
                  ?.split(".")
                  .map((sentence) => sentence.trim())
                  .filter((sentence) => sentence.length > 0)
                  .map(
                    (sentence) =>
                      new Paragraph({
                        children: [
                          new TextRun({ text: `• ${sentence}.`, size: 24 }),
                        ],
                        spacing: { after: 100 },
                        indent: { left: 400 },
                      })
                  );

                return [
                  new Paragraph({
                    children: [
                      new TextRun({ text: work.role, bold: true }),
                      new TextRun({
                        text: ` - ${work.Organization}`,
                        italics: true,
                      }),
                      new TextRun({
                        text: ` (${work.fromDate} - ${work.toDate})`,
                        italics: true,
                      }),
                    ],
                    spacing: { after: 100 },
                  }),
                  ...bulletPoints,
                ];
              })
              .flat(),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SKILLS",
                  bold: true,
                  size: 26,
                  color: "#959595",
                }),
              ],
              spacing: { after: 150, before: 150 },
            }),
            new Paragraph({
              children: skills.map(
                (skill) =>
                  new TextRun({
                    text: ` ${skill} `,
                    size: 24,
                  })
              ),
              spacing: { after: 100 },
              alignment: AlignmentType.LEFT,
              indent: { left: 400 },
            }),

            // Projects Section
            new Paragraph({
              children: [
                new TextRun({
                  text: "PROJECTS",
                  bold: true,
                  size: 26,
                  color: "#959595",
                }),
              ],
              spacing: { after: 150, before: 150 },
            }),
            ...projectInfo
              .map((proj) => {
                const bulletPoints = proj?.proDes
                  ?.split(".")
                  .map((sentence) => sentence.trim())
                  .filter((sentence) => sentence.length > 0)
                  .map(
                    (sentence) =>
                      new Paragraph({
                        children: [
                          new TextRun({ text: `• ${sentence}.`, size: 24 }),
                        ],
                        spacing: { after: 100 },
                        indent: { left: 400 },
                      })
                  );

                return [
                  new Paragraph({
                    children: [new TextRun({ text: proj.proNme, bold: true })],
                    spacing: { after: 100 },
                  }),
                  ...bulletPoints,
                ];
              })
              .flat(),

            // Certifications Section
            new Paragraph({
              children: [
                new TextRun({
                  text: "CERTIFICATIONS",
                  bold: true,
                  size: 26,
                  color: "#959595",
                }),
              ],
              spacing: { after: 150, before: 150 },
            }),

            ...certificateInfo
              .map((cert) => {
                const bulletPoints = cert?.certiDes
                  ?.split(".")
                  .map((sentence) => sentence.trim())
                  .filter((sentence) => sentence.length > 0)
                  .map(
                    (sentence) =>
                      new Paragraph({
                        children: [
                          new TextRun({ text: `• ${sentence}.`, size: 24 }),
                        ],
                        spacing: { after: 100 },
                        indent: { left: 400 },
                      })
                  );

                return [
                  new Paragraph({
                    children: [
                      new TextRun({ text: cert.certiNme, bold: true }),
                    ],
                    spacing: { after: 100 },
                  }),
                  ...bulletPoints,
                ];
              })
              .flat(),
          ],
        },
      ],
    });
    // Convert to Blob and Save
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Resume.docx");
    });
  };

  const isValidatedResume = () => {
    if (
      personalInfo.name &&
      personalInfo.phone &&
      personalInfo.email &&
      personalInfo.role &&
      skills.length > 0 &&
      EducationInfo.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="ResumeBuilderReqWrapper">
        <div className="wrapperLeft">
          {/* Personal Info */}
          <Accordion
            expanded={expanded === "personal"}
            onChange={handleAccordionChange("personal")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PersonIcon className="ResumeBuilderReqIcons" />
              Personal Info
            </AccordionSummary>

            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="name">
                    Name
                  </label>{" "}
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.name}
                    onChange={(e) => handleChange(e)}
                    name="name"
                    id="name"
                    placeholder="Full Name"
                  />
                </Box>
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="address">
                    Role
                  </label>{" "}
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.role}
                    onChange={(e) => handleChange(e)}
                    name="role"
                    id="role"
                    defaultValue="Small"
                    placeholder="Role"
                  />
                </Box>
                {/* Email and Phone */}
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="email">
                    Email
                  </label>{" "}
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.email}
                    onChange={(e) => handleChange(e)}
                    name="email"
                    id="email"
                    variant="filled"
                    placeholder="Email"
                    type="email"
                  />
                </Box>
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="phone">
                    Phone
                  </label>
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.phone}
                    onChange={(e) => handleChange(e)}
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    type="tel"
                  />
                </Box>

                {/* Address and LinkedIn */}
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="address">
                    Address
                  </label>
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.address}
                    onChange={(e) => handleChange(e)}
                    name="address"
                    id="address"
                    placeholder="Address"
                  />
                </Box>
                <Box flex={1} minWidth="300px">
                  <label className="ResumeBuilderLabelFiel" htmlFor="linkedin">
                    Linkedin
                  </label>
                  <br />
                  <input
                    className="ResumeBuilderInputField"
                    value={personalInfo?.linkedin}
                    onChange={(e) => handleChange(e)}
                    name="linkedin"
                    id="linkedin"
                    placeholder="https://linkedin.com"
                    type="url"
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Education */}
          <Accordion
            expanded={expanded === "education"}
            onChange={handleAccordionChange("education")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <SchoolIcon className="ResumeBuilderReqIcons" />
              Education
            </AccordionSummary>
            {EducationInfo?.map((edu, index) => {
              return (
                <AccordionDetails key={index}>
                  <Box className="clgSchoolResumebuilderWrapper">
                    <Box sx={{ margin: "-15px 0px 0px 0px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <InputLabel
                          className="cstmLabelResumeBuilder"
                          htmlFor="degree"
                        >
                          Education Details:
                        </InputLabel>
                        <RemoveCircleOutlineRoundedIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={(e) => {
                            DeleteEducationColumn(index);
                          }}
                          color="red"
                        />
                      </Box>
                      <Input
                        placeholder="Highest degree"
                        fullWidth
                        name="degree"
                        onChange={(e) => {
                          handleEduChange(index, e);
                        }}
                        value={edu.degree}
                        className="cstmResumeBuilderTextField"
                      />
                    </Box>
                    <Box sx={{ margin: "10px 0px" }}>
                      <Input
                        placeholder="College"
                        fullWidth
                        name="college"
                        onChange={(e) => {
                          handleEduChange(index, e);
                        }}
                        value={edu.college || ""}
                        className="cstmResumeBuilderTextField"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box display="flex" gap="0.5em  ">
                      <Box>
                        <InputLabel
                          className="cstmLabelResumeBuilder"
                          htmlFor="startYear"
                        >
                          Start Year :
                        </InputLabel>
                        <input
                          variant="filled"
                          placeholder="start year"
                          name="startYear"
                          value={edu?.startYear || ""}
                          onChange={(e) => {
                            handleEduChange(index, e);
                          }}
                          className="ResumeBuilderInputField"
                        />
                      </Box>
                      <Box>
                        <InputLabel
                          className="cstmLabelResumeBuilder"
                          htmlFor="endYear"
                        >
                          End Year :
                        </InputLabel>
                        <input
                          placeholder="end year"
                          variant="filled"
                          name="endYear"
                          value={edu?.endYear || ""}
                          onChange={(e) => {
                            handleEduChange(index, e);
                          }}
                          className="ResumeBuilderInputField"
                        />
                      </Box>
                      <Box>
                        <InputLabel
                          className="cstmLabelResumeBuilder"
                          htmlFor="grade"
                        >
                          Grade :
                        </InputLabel>
                        <input
                          placeholder="grade"
                          variant="filled"
                          name="grade"
                          value={edu?.grade || ""}
                          onChange={(e) => {
                            handleEduChange(index, e);
                          }}
                          className="ResumeBuilderInputField"
                        />
                      </Box>
                    </Box>
                  </Box>
                  <hr
                    style={{ marginTop: "1em", border: "2px solid blue" }}
                  ></hr>
                </AccordionDetails>
              );
            })}
            <Button
              sx={{ marginTop: "-10px" }}
              onClick={handleAddMoreEducationDetails}
            >
              AddMore
            </Button>
          </Accordion>

          {/* Experience */}
          <Accordion
            expanded={expanded === "experience"}
            onChange={handleAccordionChange("experience")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <WorkIcon className="ResumeBuilderReqIcons" />
              Experience
            </AccordionSummary>
            {workExperience?.map((exp, index) => {
              return (
                <AccordionDetails key={index}>
                  <Box className="clgSchoolResumebuilderWrapper">
                    <Box sx={{ marginTop: "-1.5em" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <InputLabel
                          className="cstmLabelResumeBuilder"
                          htmlFor="work Profile"
                        >
                          Work profile :
                        </InputLabel>
                        <RemoveCircleOutlineRoundedIcon
                          sx={{ cursor: "pointer", color: "red" }}
                          onClick={() => {
                            DeleteWorkExperienceColumn(index);
                          }}
                        />
                      </Box>
                      <Input
                        placeholder=" work Profile"
                        fullWidth
                        name="role"
                        value={exp.role}
                        onChange={(e) => {
                          handleExpChange(index, e);
                        }}
                      />
                    </Box>
                    <Box sx={{ marginTop: "0.2em" }}>
                      <Input
                        placeholder="Company Name"
                        fullWidth
                        name="Organization"
                        value={exp.Organization}
                        onChange={(e) => {
                          handleExpChange(index, e);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: "0.2em" }}>
                    <InputLabel
                      className="cstmLabelResumeBuilder"
                      htmlFor="projDes"
                    >
                      Description:
                    </InputLabel>
                    <textarea
                      rows={5}
                      name="projDes"
                      value={exp.projDes}
                      onChange={(e) => {
                        handleExpChange(index, e);
                      }}
                      className="textarearesumeBuilderreq"
                      id="forpositiontextareresume"
                    />
                    {exp.projDes && (
                      <button
                        className="askAiresumeBuilderreq"
                        onClick={() => {
                          handleAskAI(exp.projDes, index, "exp");
                        }}
                      >
                        <FontAwesomeIcon icon={faCommentDots} />
                        AskAI
                      </button>
                    )}
                  </Box>
                  <Box
                    sx={{ marginTop: "0.2em", gap: "0.5em" }}
                    display="flex"
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <InputLabel
                        className="cstmLabelResumeBuilder"
                        htmlFor="fromDate"
                      >
                        From Date :
                      </InputLabel>
                      <input
                        placeholder="from date"
                        name="fromDate"
                        value={exp.fromDate}
                        onChange={(e) => {
                          handleExpChange(index, e);
                        }}
                        className="ResumeBuilderInputField"
                      />
                    </Box>
                    <Box>
                      <InputLabel
                        className="cstmLabelResumeBuilder"
                        htmlFor="toDate"
                      >
                        To Date :
                      </InputLabel>
                      <input
                        placeholder="To date"
                        name="toDate"
                        value={exp.toDate}
                        onChange={(e) => {
                          handleExpChange(index, e);
                        }}
                        className="ResumeBuilderInputField"
                      />
                    </Box>
                  </Box>
                  <hr
                    style={{ marginTop: "1em", border: "2px solid blue" }}
                  ></hr>
                </AccordionDetails>
              );
            })}
            <Button sx={{ marginTop: "-10px" }} onClick={handleAddMoreWorkExp}>
              AddMore
            </Button>
          </Accordion>

          {/* Skills */}
          <Accordion
            expanded={expanded === "skills"}
            onChange={handleAccordionChange("skills")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <PsychologyIcon className="ResumeBuilderReqIcons" />
              Skills
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Type something"
                  variant="outlined"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdate}
                          size="small"
                        >
                          Add
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Projects */}
          <Accordion
            expanded={expanded === "projects"}
            onChange={handleAccordionChange("projects")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <CodeIcon className="ResumeBuilderReqIcons" />
              Projects
            </AccordionSummary>

            {projectInfo?.map((proj, index) => {
              return (
                <AccordionDetails key={index}>
                  <Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <InputLabel
                        className="cstmLabelResumeBuilder"
                        htmlFor="proNme"
                      >
                        Project Name:
                      </InputLabel>
                      <RemoveCircleOutlineRoundedIcon
                        sx={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          DeleteProjectColumn(index);
                        }}
                        color="red"
                      />
                    </Box>
                    <Input
                      placeholder="Project name"
                      fullWidth
                      name="proNme"
                      value={proj?.proNme}
                      onChange={(e) => {
                        handleProjectChange(index, e);
                      }}
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <InputLabel
                      className="cstmLabelResumeBuilder"
                      htmlFor="ProjectDescription"
                    >
                      Project Description:
                    </InputLabel>
                    <textarea
                      placeholder="Project Description"
                      rows={5}
                      name="proDes"
                      value={proj?.proDes}
                      onChange={(e) => {
                        handleProjectChange(index, e);
                      }}
                      className="textarearesumeBuilderreq"
                      id="forpositionProjecDesc"
                    />
                    {proj?.proDes && (
                      <button
                        className="askAiresumeBuilderreq"
                        onClick={() => {
                          handleAskAI(proj?.proDes, index, "Proj");
                        }}
                      >
                        <FontAwesomeIcon icon={faCommentDots} />
                        AskAI
                      </button>
                    )}
                  </Box>
                  <hr
                    style={{ marginTop: "1em", border: "2px solid blue" }}
                  ></hr>
                </AccordionDetails>
              );
            })}

            <Button sx={{ marginTop: "-10px" }} onClick={handleAddMoreProjects}>
              AddMore
            </Button>
          </Accordion>

          {/* Certifications */}
          <Accordion
            expanded={expanded === "certifications"}
            onChange={handleAccordionChange("certifications")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <VerifiedIcon className="ResumeBuilderReqIcons" />
              Certifications
            </AccordionSummary>
            {certificateInfo?.map((certificate, index) => {
              return (
                <AccordionDetails key={index}>
                  <Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <InputLabel
                        className="cstmLabelResumeBuilder"
                        htmlFor="certiNme"
                      >
                        Certificate Name:
                      </InputLabel>
                      <RemoveCircleOutlineRoundedIcon
                        sx={{ cursor: "pointer", color: "red" }}
                        onClick={(e) => {
                          DeleteCertificationColumn(index);
                        }}
                        color="red"
                      />
                    </Box>
                    <input
                      placeholder="Certificate name"
                      className="ResumeBuilderInputField"
                      name="certiNme"
                      onChange={(e) => {
                        handleCertificationChange(index, e);
                      }}
                      value={certificate?.certiNme}
                    />
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <InputLabel
                      className="cstmLabelResumeBuilder"
                      htmlFor="certiDes"
                    >
                      Recognition Name:
                    </InputLabel>
                    <Input
                      placeholder="Recognized organization"
                      fullWidth
                      name="certiDes"
                      onChange={(e) => {
                        handleCertificationChange(index, e);
                      }}
                      value={certificate?.certiDes}
                    />
                  </Box>
                  <hr
                    style={{ marginTop: "1em", border: "2px solid blue" }}
                  ></hr>
                </AccordionDetails>
              );
            })}

            <Button
              sx={{ marginTop: "-10px" }}
              onClick={handleAddMoreCertificates}
            >
              AddMore
            </Button>
          </Accordion>
         

          <Tooltip title="Please Enter Name,Email,Phone,Roll,skills," arrow>
           <span>
           <Button
              variant="contained"
              sx={{ marginTop: "0.5em",width:"100%" }}
              startIcon={<DownloadIcon />}
              disabled={isValidatedResume()}
              // onClick={handleDownlaodResume}
              onClick={handleDownloadDoc}
            >
              Download Resume
            </Button>
           </span>
           
          </Tooltip>
        </div>

        {/* <div className="WrapperRight"> */}
        <Box
          id="resumeId"
          className="ResumeBuilderReqResumeBox"
          sx={{
            maxWidth: "90%",
            width: "80%",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Stack className="nameRoleResumeHeadingcls">
            <Typography variant="h6">
              {personalInfo.name ? personalInfo.name : "John Doe"}
            </Typography>
            <Stack className="paperstackclsnamewrap">
              <Typography color="textSecondary">
                {personalInfo.role ? personalInfo.role : "Web Developer"}
              </Typography>
              <Typography color="textSecondary">
                <MdLocationPin />
                {personalInfo.address ? personalInfo.address : "Pune, MH"}
              </Typography>
            </Stack>
          </Stack>

          <Paper
            sx={{
              backgroundColor: theme,
              color: "white",
              padding: 2,
              maxWidth: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Stack className="paperstackclsnamewrap">
                <MdMail />
                <Typography>
                  {personalInfo.email
                    ? personalInfo.email
                    : "johndoe@gmail.com"}
                </Typography>
              </Stack>
              <Stack className="paperstackclsnamewrap">
                <MdLocalPhone />
                <Typography>
                  {personalInfo.phone ? personalInfo.phone : "+918559584846"}
                </Typography>
              </Stack>
              <Stack className="paperstackclsnamewrap" flexWrap="wrap">
                <RiLinkedinBoxFill />
                <Link
                  href={
                    personalInfo.linkedin ? personalInfo.linkedin : "LinkedIn"
                  }
                  color="inherit"
                >
                  {personalInfo.linkedin ? personalInfo.linkedin : "LinkedIn"}
                </Link>
              </Stack>
            </Stack>
          </Paper>

          <Stack
            direction="row"
            spacing={2}
            sx={{ padding: 2, maxWidth: "100%" }}
          >
            <Stack spacing={4} sx={{ flex: 1 }}>
              {/* EDUCATION */}
              <Stack spacing={1}>
                <Typography variant="h6" color="textSecondary">
                  EDUCATION
                </Typography>

                {Array.isArray(EducationInfo) &&
                  EducationInfo?.map((edu, index) => {
                    return (
                      <Stack spacing={0.5} key={index}>
                        <Typography variant="body1" fontWeight="medium">
                          {edu.degree
                            ? edu.degree
                            : "B.Tech Computer Engineering"}
                        </Typography>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={1}
                        >
                          <Typography variant="body2">
                            {edu.college
                              ? edu.college
                              : "College of Engineering Pune"}
                            ({edu.grade ? edu.grade : "8.7 CGP"})
                          </Typography>

                          <Typography variant="caption">
                            {edu.startYear ? edu.startYear : "2014"}
                            <span> - </span>
                            {edu.endYear ? edu.endYear : "2018"}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
              </Stack>

              {/* WORK EXPERIENCE */}
              <Stack spacing={1}>
                <Typography variant="h6" color="textSecondary">
                  WORK EXPERIENCE
                </Typography>

                {Array.isArray(workExperience) &&
                  workExperience?.map((wk, index) => {
                    return (
                      <Stack spacing={0.5} key={index}>
                        <Typography variant="body1" fontWeight="medium">
                          {wk.role ? wk.role : "Full Stack Developer"}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2">
                            {wk.Organization
                              ? wk.Organization
                              : "XYZ Infotech Services - Full-time"}
                          </Typography>
                          <Typography variant="caption">
                            {wk.fromDate ? wk.fromDate : "2018/03 "}-
                            {wk.toDate ? wk.toDate : " 2018/03"}
                          </Typography>
                        </Stack>
                        <Typography sx={{ maxWidth: "100%" }} variant="p">
                          {wk.projDes
                            ? wk.projDes
                            : `Fixed bugs from existing websites and implemented
   enhancements that significantly improved web
   functionality.`}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Stack>

              {/* SKILLS */}
              <Stack spacing={1}>
                <Typography variant="h6" color="textSecondary">
                  SKILLS
                </Typography>
                <Stack direction="row" flexWrap="wrap" spacing={1}>
                  {Array.isArray(skills) && skills?.length > 0 ? (
                    skills?.map((val, inde) => {
                      return (
                        <Chip
                          key={inde}
                          label={val}
                          // color="primary"
                          sx={{
                            border: "1.5px solid blue",
                            background: "transparent",
                          }}
                          onDelete={() => {
                            handleDeleteChip(val, inde);
                          }}
                          deleteIcon={<Close style={{ color: "red" }} />}
                        />
                      );
                    })
                  ) : (
                    <>
                      <Chip label="React" color="primary" />
                      <Chip label="Node.js" color="primary" />
                      <Chip label="Express" color="primary" />
                    </>
                  )}
                </Stack>
              </Stack>
              {/* PROJECTS */}
              <Stack spacing={1}>
                <Typography variant="h6" color="textSecondary">
                  PROJECTS
                </Typography>
                {Array.isArray(projectInfo) &&
                  projectInfo?.map((pro, index) => {
                    return (
                      <Stack spacing={0.5} key={index}>
                        <Typography sx={{ fontWeight: "20PX" }}>
                          {pro.proNme ? pro.proNme : "Project Name"}
                        </Typography>
                        <Typography variant="body2">
                          {pro.proDes
                            ? pro.proDes
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit Quasi, distinctio."}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Stack>
              {/* certification info  */}
              <Stack spacing={1}>
                <Typography variant="h6" color="textSecondary">
                  Certification
                </Typography>
                {Array.isArray(certificateInfo) &&
                  certificateInfo?.map((wk, index) => {
                    return (
                      <Stack spacing={0.5} key={index}>
                        <Typography sx={{ fontWeight: "20PX" }}>
                          {wk.certiNme ? wk.certiNme : "Project Name"}
                        </Typography>
                        <Typography variant="body2">
                          {wk.certiDes
                            ? wk.certiDes
                            : "Lorem ipsum dolor sit amet consectetur adipisicing elit Quasi, distinctio."}
                        </Typography>
                      </Stack>
                    );
                  })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {/* </div> */}
      </div>
    </>
  );
};

export default ResumeBuilderReq;
