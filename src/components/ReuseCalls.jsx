import axios from "axios";
import { resources } from "../BasicComponents/Resources";
import { getCurrentUser } from "../BasicComponents/AuthService";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Using Recharts for simplicity (you can use MUI's charting library as well)

export const userDetailsData = async () => {
  try {
    const tokenDetails = await getCurrentUser()
    return tokenDetails
  } catch (e) {
    console.error('error', e.message)
  }
}

export const handleFetchBatches = async () => {
  const UserDetails = await userDetailsData();

  try {
    const batcheRes = await axios.get(`${resources.APPLICATION_URL}getBatches?collegeCode=${UserDetails?.collegeCode}`);
    if (batcheRes.data && batcheRes.data.length > 0) {
      return batcheRes.data;
    }
    return [];
  } catch (error) {
    console.error("error", error.message);
  }
};


export const handleFetchCourses = async (selectedBatch) => {
  const UserDetails = await userDetailsData();
  try {
    const courseRes = await axios.get(
      `${resources.APPLICATION_URL}getDegreeBasedOnBatch?batch=${selectedBatch}&collegeCode=${UserDetails?.collegeCode}`
    );
    if (courseRes.data && courseRes.data.length > 0) {
      return courseRes.data;
    }
    return [];
  } catch (error) {
    console.error("error", error.message);
  }
};

export const handleFetchBranches = async (selectedDegree, selectedBatch) => {
  const UserDetails = await userDetailsData();
  try {
    const branchesRes = await axios.get(
      `${resources.APPLICATION_URL}getBranchForStudentCreation?degree=${selectedDegree}&batch=${selectedBatch}&collegeCode=${UserDetails?.collegeCode}`
    );
    if (branchesRes.data && branchesRes.data.length > 0) {
      return branchesRes.data;
    }
    return [];
  } catch (error) {
    console.error("error", error.message);
  }
};

export const handleFetchSemesters = async (
  selectedDegree,
  selectedBatch,
  selectedBranch
) => {
  const UserDetails = await userDetailsData();
  try {
    const semsRes = await axios.get(
      `${resources.APPLICATION_URL}getSemesterForStudentCreation?degree=${selectedDegree}&batch=${selectedBatch}&branch=${encodeURIComponent(selectedBranch)}&collegeCode=${UserDetails?.collegeCode}`
    );
    if (semsRes.data && semsRes.data.length > 0) {
      return semsRes.data;
    }
    return [];
  } catch (error) {
    console.error("error", error.message);
  }
};

export const handleFetchSection = async (
  selectedDegree,
  selectedBatch,
  selectedBranch
) => {
  const UserDetails = await userDetailsData();
  try {
    const secsRes = await axios.get(
      `${resources.APPLICATION_URL}getSectionForStudentCreation?degree=${selectedDegree}&batch=${selectedBatch}&branch=${encodeURIComponent(selectedBranch)}&collegeCode=${UserDetails?.collegeCode}`
    );
    if (secsRes.data && secsRes.data.length > 0) {
      return secsRes?.data[0]?.split(",");
    }
    return [];
  } catch (error) {
    console.error("error", error.message);
  }
};


export const getCallWithOutParam = async (callname) => {
  try {
    const courseRes = await axios.get(
      `${resources.APPLICATION_URL}${callname}`
    );
    if (courseRes.data && courseRes.data.length > 0) {
      console.log("triggered");

      return courseRes.data;
    }
    return courseRes.data;
  } catch (error) {
    console.error("error", error.message);
  }
};

export const getCallWithSingleParam = async (callname, param, paramValue) => {
  try {
    const courseRes = await axios.get(
      `${resources.APPLICATION_URL}${callname}?${param}=${paramValue}`
    );
    if (courseRes.data && courseRes.data.length > 0) {
      console.log("triggered");

      return courseRes.data;
    }
    return courseRes.data;
  } catch (error) {
    console.error("error", error.message);
  }
};
export const getCallWithDualParam = async (
  callname,
  param1,
  paramValue1,
  param2,
  paramValue2
) => {
  try {
    const courseRes = await axios.get(
      `${resources.APPLICATION_URL}${callname}?${param1}=${paramValue1}&${param2}=${paramValue2}`
    );
    if (courseRes.data && courseRes.data.length > 0) {
      return courseRes.data;
    }
    return courseRes.data;
  } catch (error) {
    console.error("error", error.message);
  }
};
// post call
export const postCallWithDualParamAndSingleObj = async (
  callname,
  param1,
  paramValue1,
  param2,
  paramValue2,
  objData
) => {
  try {
    const courseRes = await axios.post(
      `${resources.APPLICATION_URL}${callname}?${param1}=${paramValue1}&${param2}=${paramValue2}`, objData
    );

    if (courseRes.data && courseRes.data.length > 0) {
      return courseRes.message;
    }
    return courseRes.data;
  } catch (error) {
    console.error("error", error.message);
  }
};
export const getCallWithTripleParam = async (
  callname,
  param1,
  paramValue1,
  param2,
  paramValue2,
  param3,
  paramValue3
) => {
  try {
    const courseRes = await axios.get(
      `${resources.APPLICATION_URL}${callname}?${param1}=${paramValue1}&${param2}=${paramValue2}&${param3}=${paramValue3}`
    );
    if (courseRes.data && courseRes.data.length > 0) {
      return courseRes.data;
    }
    return courseRes.data;
  } catch (error) {
    console.error("error", error.message);
  }
};

export const GenerateYears = () => {
  let YearsList = [];
  const currentYear = new Date().getFullYear();
  for (let i = -5; i <= 5; i++) {
    YearsList.push(currentYear - i);
  }
  return YearsList;
};

export const stdLearningContent = async () => {
  const userDetails = await getCurrentUser();
  const url =
    userDetails?.roles[0] === "ROLE_STUDENT"
      ? `${resources.APPLICATION_URL}getStudent/learningContent?studentId=${userDetails?.username
      }&collegeName=${encodeURIComponent(
        userDetails.collegeName
      )}&collegeCode=${encodeURIComponent(userDetails.collegeCode)}`
      : resources.APPLICATION_URL + "get-Day-Wise-Content?collegeCode=" +
      encodeURIComponent(userDetails.collegeCode);
  try {
    const res = await axios.get(url);
    if (res.data && res.data?.status === "true") {

      console.log("studentLearningData====>", res.data.result)
      return res.data.result;
    } else {
      return [];
    }
  } catch (error) {
    console.error("error==>", error.message);
  }
};

export const CourseContentMaintainByCrt = async (obj) => {
  try {
    const res = await axios.post(
      `${resources.APPLICATION_URL}get-learning-Content`,
      obj
    );


    return res;
    if (res.data && res.data?.status === "true") {
      return res.data.result;
    } else {
      return [];
    }
  } catch (error) {
    console.error("error==>", error.message);
  }
};

export const handleFetchCourseCategories = async () => {
  //here I maitained technical only thats why i put static as technical
  try {
    const res = await axios.get(
      `${resources.APPLICATION_URL}get-Courses-By-Categories?categories=Technical`
    );
    console.log("res===>", res.data);
    if (res.data && res.data?.status === "True") {
      return res.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("error==>", error.message);
  }
};
