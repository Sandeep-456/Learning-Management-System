import mongoose from "mongoose";
import "dotenv/config";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Batch from "../models/Batch.js";
import Course from "../models/Course.js";
import Stage from "../models/Stage.js";
import Topic from "../models/Topic.js";
import Student from "../models/StudentCourseSchema.js";
import BatchSession from "../models/BatchSession.js";
import MCQsSet from "../models/MCQsSet.js";
import CodingQuestionSet from "../models/CodingQuestionsSet.js";

const seedData = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
    console.log("Connected to MongoDB successfully for seeding!");

    // 1. Clear existing database collections to prevent duplicate index errors
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Course.deleteMany({});
    await Stage.deleteMany({});
    await Topic.deleteMany({});
    await Batch.deleteMany({});
    await Student.deleteMany({});
    await BatchSession.deleteMany({});
    await MCQsSet.deleteMany({});
    await CodingQuestionSet.deleteMany({});
    console.log("Existing data cleared.");

    // 2. Create Course topics & subtopics
    console.log("Creating Topics and Subtopics...");
    const pythonTopic = new Topic({
      name: "Python Programming",
      subtopics: [
        {
          name: "Variables & Operators",
          cheatSheetUrl: "https://learn.microsoft.com/en-us/training/modules/python-introduction/",
        },
        {
          name: "Lists & Loops",
          cheatSheetUrl: "https://learn.microsoft.com/en-us/training/modules/python-lists/",
        }
      ]
    });
    const savedPythonTopic = await pythonTopic.save();

    const statsTopic = new Topic({
      name: "Statistics & Probability",
      subtopics: [
        {
          name: "Descriptive Statistics",
          cheatSheetUrl: "https://example.com/stats-cheatsheet",
        },
        {
          name: "Probability Distributions",
          cheatSheetUrl: "https://example.com/probability-cheatsheet",
        }
      ]
    });
    const savedStatsTopic = await statsTopic.save();

    const machineLearningTopic = new Topic({
      name: "Machine Learning Foundations",
      subtopics: [
        {
          name: "Linear Regression",
          cheatSheetUrl: "https://example.com/linear-regression-cheatsheet",
        },
        {
          name: "Logistic Regression",
          cheatSheetUrl: "https://example.com/logistic-regression-cheatsheet",
        }
      ]
    });
    const savedMLTopic = await machineLearningTopic.save();

    // 3. Create Course Stages
    console.log("Creating Course Stages...");
    const stage1 = new Stage({
      name: "Stage 1: Foundations",
      description: "Python programming and foundational mathematical concepts.",
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      topics: [savedPythonTopic._id, savedStatsTopic._id],
    });
    const savedStage1 = await stage1.save();

    const stage2 = new Stage({
      name: "Stage 2: Core Machine Learning",
      description: "Classical Machine Learning models from scratch and utilizing libraries.",
      progress: 0,
      startDate: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      topics: [savedMLTopic._id],
    });
    const savedStage2 = await stage2.save();

    // 4. Create the main Course
    console.log("Creating Course...");
    const course = new Course({
      name: "AI/ML",
      courseType: "8 Months",
      description: "Become an industry-ready Machine Learning and Artificial Intelligence engineer.",
      stages: [savedStage1._id, savedStage2._id],
    });
    const savedCourse = await course.save();
    console.log(`Course created: ${savedCourse.name} (${savedCourse._id})`);

    // 5. Create a Batch
    console.log("Creating Batch...");
    const batch = new Batch({
      name: "AI-ML-Cohort-1",
      startDate: new Date(),
      isActive: true,
      courseId: savedCourse._id,
    });
    const savedBatch = await batch.save();
    console.log(`Batch created: ${savedBatch.name} (${savedBatch._id})`);

    // 6. Create dummy Users (Admin & Student)
    console.log("Creating Users and Profiles...");
    // A Student User
    const studentUser = await User.create({
      mobile: "9876543210",
      email: "student@runelearning.com",
      name: "Sandeep Kumar",
      username: "sandeep_student",
      provider: "phone",
      firebaseUid: "mock-firebase-uid-student",
    });

    // Profile for Student User
    const studentProfile = await Profile.create({
      user: studentUser._id,
      firstName: "Sandeep",
      lastName: "Kumar",
      gender: "Male",
      dob: "2000-01-01",
      email: "student@runelearning.com",
      country: "India",
      state: "Telangana",
      city: "Hyderabad",
      course: "AI/ML",
      courseType: "8 Months",
    });

    // An Admin User
    const adminUser = await User.create({
      mobile: "9999999999",
      email: "admin@runelearning.com",
      name: "LMS Admin",
      username: "lms_admin",
      provider: "google",
      firebaseUid: "mock-firebase-uid-admin",
    });

    const adminProfile = await Profile.create({
      user: adminUser._id,
      firstName: "LMS",
      lastName: "Admin",
      email: "admin@runelearning.com",
      course: "AI/ML",
      courseType: "8 Months",
    });
    console.log("Users and Profiles created successfully.");

    // 7. Create Student Course Schema & Progress tracker
    console.log("Creating Student Course progress tracker...");
    const pythonSubtopics = savedPythonTopic.subtopics.map(st => ({
      subtopicId: st._id,
      status: "In Progress"
    }));

    const statsSubtopics = savedStatsTopic.subtopics.map(st => ({
      subtopicId: st._id,
      status: "Pending"
    }));

    const mlSubtopics = savedMLTopic.subtopics.map(st => ({
      subtopicId: st._id,
      status: "Pending"
    }));

    const studentProgress = new Student({
      user: studentUser._id,
      batchId: savedBatch._id,
      courses: [
        {
          courseId: savedCourse._id,
          progress: 10,
          stages: [
            {
              stageId: savedStage1._id,
              progress: 20,
              topics: [
                {
                  topicId: savedPythonTopic._id,
                  status: "In Progress",
                  subtopics: pythonSubtopics
                },
                {
                  topicId: savedStatsTopic._id,
                  status: "Pending",
                  subtopics: statsSubtopics
                }
              ]
            },
            {
              stageId: savedStage2._id,
              progress: 0,
              topics: [
                {
                  topicId: savedMLTopic._id,
                  status: "Pending",
                  subtopics: mlSubtopics
                }
              ]
            }
          ]
        }
      ]
    });
    await studentProgress.save();
    console.log("Student course progress schema seeded.");

    // 8. Create some Mock MCQ sets
    console.log("Creating MCQs Sets...");
    const firstPythonSubtopic = savedPythonTopic.subtopics[0];
    const mcqSet = new MCQsSet({
      subtopicId: firstPythonSubtopic._id,
      setType: "PRACTICE",
      level: "EASY",
      questions: [
        {
          questionText: "What is the output of print(type(10))?",
          options: [
            { key: "A", content: "<class 'float'>" },
            { key: "B", content: "<class 'int'>" },
            { key: "C", content: "<class 'str'>" },
            { key: "D", content: "<class 'list'>" }
          ],
          correctOptionKey: "B",
          explanation: "In Python, 10 is an integer, so its type is <class 'int'>."
        },
        {
          questionText: "Which operator is used for exponentiation (power) in Python?",
          options: [
            { key: "A", content: "^" },
            { key: "B", content: "**" },
            { key: "C", content: "*" },
            { key: "D", content: "//" }
          ],
          correctOptionKey: "B",
          explanation: "** is the exponentiation operator in Python. For example, 2**3 returns 8."
        }
      ],
      config: {
        displayCount: 2,
        randomize: false
      }
    });
    await mcqSet.save();
    console.log("MCQ Practice Set seeded.");

    // 9. Create some Mock Coding Question sets
    console.log("Creating Coding Question Sets...");
    const linearRegSubtopic = savedMLTopic.subtopics[0]; // Linear Regression
    const codingSet = new CodingQuestionSet({
      subtopicId: linearRegSubtopic._id,
      level: "EASY",
      questions: [
        {
          title: "Mean Squared Error",
          problemStatement: "<p>Calculate the Mean Squared Error (MSE) between actual and predicted values.</p><pre>y_true = [1, 2, 3]\ny_pred = [1.5, 2.5, 2.8]</pre>",
          sampleTestCases: [
            {
              input: "y_true = [1, 2, 3]\ny_pred = [1.5, 2.5, 2.8]",
              output: "0.18",
              explanation: "((1-1.5)^2 + (2-2.5)^2 + (3-2.8)^2) / 3 = (0.25 + 0.25 + 0.04) / 3 = 0.18"
            }
          ],
          resources: [
            { label: "Linear Regression Introduction", url: "https://wikipedia.org/wiki/Linear_regression" }
          ],
          constraints: "Time Limit: 1 second"
        }
      ]
    });
    await codingSet.save();
    console.log("Coding Question Set seeded.");

    // 10. Seed some live batch sessions
    console.log("Creating Batch Sessions (Live Class & Labs)...");
    const session1 = new BatchSession({
      batchId: savedBatch._id,
      subtopicId: firstPythonSubtopic._id,
      topicId: savedPythonTopic._id,
      type: "LIVE_CLASS",
      liveClassLink: "https://meet.google.com/abc-defg-hij",
      scheduledDate: new Date(),
      sessionStatus: "LIVE",
    });
    await session1.save();

    const session2 = new BatchSession({
      batchId: savedBatch._id,
      subtopicId: savedPythonTopic.subtopics[1]._id,
      topicId: savedPythonTopic._id,
      type: "LAB",
      questionContent: "Write a python program to print the first 10 numbers in Fibonacci sequence.",
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      sessionStatus: "SCHEDULED",
    });
    await session2.save();
    console.log("Batch sessions seeded.");

    console.log("\nDatabase seeded successfully with all initial dummy data!");
    console.log(`Use Student User credentials (mobile: 9876543210) to log in.`);
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
