import Image from "next/image";
export type Course = {
  id: number;
  short_title?: string;
  long_title?: string;
  Image?: string;
  coverImage?: string;
  category: string;
  subjects?: string[];
  rate?: string;
  duration?: string;
  sessions?: string;
  fee?: string;
  discount?: string;
  includes?: string[];
  schedule?: string;
  flexibility?: string;
  action: string;
  overview?: string;
  perfectFor?: string;
  billingCycle?: string;
  subscriptionFee?: string;
};

export const courseCategories: { name: string; slug: string }[] = [
  { name: "All Courses", slug: "all-courses" },
  { name: "Primary", slug: "primary" },
  { name: "Secondary", slug: "secondary" },
  { name: "National 5", slug: "national-5" },
  { name: "Highers", slug: "highers" },
  { name: "Advanced Highers", slug: "advanced-highers" },
  { name: "Exam Revision", slug: "exam-revision" },
  { name: "Mock Exams", slug: "mock-exams" },
  { name: "Tips & Hints", slug: "tips-and-hints" },
  { name: "Homework Club", slug: "homework-club" },
];

export const courses: Course[] = [
  {
    id: 16,
    short_title: "Homework Club",
    long_title: "Homework Club at iLearner's Hub",
    Image: "/images/courses/c16.jpg",
    coverImage: "/images/courses/cover/classroom-cover.png",
    category: "Homework Club",
    subjects: ["All Subjects"],
    rate: "£15/session",
    sessions: "2.5 hours",
    fee: "£15.00",
    billingCycle: "Monthly",
    subscriptionFee: "£250.00",
    action: "Join Now",
    overview: `Where Independent Study Meets Real Support.

Our Homework Club provides learners of any level a calm, structured space to focus on their own studies — whether revising for tests, catching up on missed work, or making steady academic progress. This isn’t a lesson or tutoring session. It’s their time to work independently, with our tutors available to offer helpful guidance and encouragement whenever needed.`,
    includes: [
      "Learners bring their own homework, revision, or study tasks",
      "Use the time to complete homework and ensure all work is done on time",
      "Tutors are available to support, review work, or answer questions",
      "Calm, focused environment — no formal teaching, no pressure",
      "Encourages motivation, independence, and confidence",
      "Learners who benefit from structured study time after school",
      "Families seeking academic support without full tutoring",
      "Students managing homework, revision, or long-term progress",
    ],
    perfectFor:
      "Learners who want a supportive, structured environment to complete homework, revise, or study independently after school, with tutors available for guidance.",
  },
  {
    id: 1,
    short_title: "P3 to P7",
    long_title: "P3 to P7: (All Year Round)",
    Image: "/images/courses/c1.jpg",
    coverImage: "/images/courses/cover/primary.png",
    category: "Primary",
    subjects: ["Maths", "English", "Science"],
    sessions: "2 hours",
    rate: "£10/hr",
    fee: "£10.00",
    action: "Enroll Now",
    overview: `Our P3 to P7 tutoring programme offers year-round support in Maths, English, and Science, designed to develop a strong academic foundation and genuine interest in learning. Sessions are interactive and tailored to each child's pace, helping them grow confident, creative, and curious learners. Each 2-hour session comprises activities that build core skills while encouraging independent thinking. Students are guided in a supportive, non-lecture-based environment with regular homework, creative tasks, and personalised feedback.`,
    includes: [
      "Interactive & curiosity-based learning",
      "Weekly homework and skill-building tasks",
      "Regular feedback to track progress",
      "Supportive, child-friendly tutors",
    ],
    perfectFor:
      "Students in P3 to P7 looking for a fun and engaging way to strengthen their core skills in Maths, English, and Science.",
  },
  {
    id: 2,
    short_title: "S1 & S2",
    long_title: "S1 & S2: (All Year Round)",
    Image: "/images/courses/c2.jpg",
    coverImage: "/images/courses/cover/secondary.png",
    category: "Secondary",
    subjects: ["Maths", "Science"],
    rate: "£12/hr",
    sessions: "2 hours",
    fee: "£12.00",
    action: "Enroll Now",
    overview: `Our S1 & S2 programme bridges the transition from primary to secondary with academic and
emotional support. Covering Maths and Science, sessions are designed to reinforce
classroom learning while introducing independent study habits and critical thinking.
Students engage in group discussions, guided tasks, and problem-solving sessions. Tutors
provide personalised attention, homework tasks, and regular updates on progress to
parents. `,
    includes: [
      "Study habit development",
      "Focused topic reviews & skill checks",
      "Personalised support & mentoring",
      "Parent updates every few weeks",
    ],
    perfectFor:
      "Students in S1 and S2 looking for extra support in Maths and Science to build confidence and study skills.",
  },
  {
    id: 3,
    short_title: "S3",
    long_title: "S3 (All Year Round)",
    Image: "/images/courses/c3.jpg",
    coverImage: "/images/courses/cover/secondary.png",
    category: "Secondary",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£16/hr",
    sessions: "1 hours",
    fee: "£16.00",
    action: "Enroll Now",
    overview: `In S3, students begin early preparation for National 5-level work. Our tutoring focuses on Maths and Science subjects, helping students deepen their understanding of key concepts and begin light exam-style practice in a stress-free way.
Sessions involve concept exploration, guided questions, structured note-making, and revision strategy building. Tutors assign light homework and provide consistent feedback to help students progress.`,
    includes: [
      "Early intro to National 5-style questions",
      "Concept-focused teaching",
      "Study planning & feedback",
      "Encouragement of independent learning",
    ],
    perfectFor:
      "Students in S3 looking to build a strong foundation in Maths and Science while preparing for National 5 exams.",
  },
  {
    id: 4,
    short_title: "National 5",
    long_title: "National 5: (August to February)",
    Image: "/images/courses/c4.jpg",
    coverImage: "/images/courses/cover/national5.png",
    category: "National 5",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£17/hr",
    sessions: "1.5 hours (per subject)",
    fee: "£17.00",
    action: "Enroll Now",
    overview: `Our National 5 tutoring covers Maths, Physics, Chemistry, and Biology in focused,
curriculum-aligned sessions starting in August to February.
Each 1.5-hour session includes topic walkthroughs, question practice, and individual
support. Homework is assigned regularly and checked by tutors, with feedback shared to
guide improvement. Our tutors also help build exam confidence and study discipline. `,
    includes: [
      "Homework + feedback included",
      "Curriculum-aligned teaching",
      "Concept building before intense exam prep starts",
      "Progress reviews",
      "Structured lessons with mini quizzes",
      "Personalised tutor support",
    ],
    perfectFor:
      "Students in S4 preparing for National 5 exams who want to build confidence and understanding in Maths, Physics, Chemistry, and Biology.",
  },
  {
    id: 5,
    short_title: "National 5 Exam Revision Course",
    long_title: "National 5 Exam Revision Course: (January to April)",
    Image: "/images/courses/c5.jpg",
    coverImage: "/images/courses/cover/national5.png",
    category: "Exam Revision",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£20/hr",
    sessions: "1.5 hours",
    duration: "30 hours total",
    fee: "£20.00",
    action: "Enroll Now",
    overview: `This 30-hour intensive revision course, starting from January to April, prepares students for
the National 5 exams in Maths, Physics, Chemistry, and Biology. It includes 3 full Mock
Exams, Feedback sessions, Hints & Tips session, revision materials, and expert guidance.
Each two-hour session focuses on key topics, past paper practice, timed tests, and tips &
tricks for tackling tricky questions. Mock tests are followed by dedicated review sessions with
detailed feedback and improvement strategies.`,
    includes: [
      "3 Mock Exams included",
      "Feedback sessions",
      "Full syllabus revision",
      "Exam strategies + tips",
      "Marked mocks with tutor feedback",
      "Progress reports for parents",
      "Model answer walkthroughs and writing structure guidance",
      "Performance review sessions",
      "Breakdown of SQA marking schemes and grade boundaries",
    ],
    perfectFor:
      "Students preparing for National 5 exams who want to boost their confidence and exam performance.",
  },
  {
    id: 6,
    short_title: "Highers",
    long_title: "Highers: (August to February)",
    Image: "/images/courses/c6.jpg",
    coverImage: "/images/courses/cover/highers.png",
    category: "Highers",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£25/hr",
    sessions: "1.5 hours",
    fee: "£25.00",
    action: "Enroll Now",
    overview: `Our Higher-level tutoring starting August to February offers expert support in Maths, Physics,
Chemistry, and Biology. These sessions are perfect for students aiming for strong results in
S5/S6 and beyond.
Each 1.5-hour session includes topic deep dives, past paper-style questions, and structured
feedback. Homework is tailored and marked with progress tracking. Tutors also support
students with time management and exam preparation strategies.`,
    includes: [
      "In-depth syllabus coverage",
      "Study planning and workload management",
      "Personalised academic support with writing, problem-solving, and theory",
      "Weekly tasks and feedback",
      "University preparation guidance",
    ],
    perfectFor:
      "Students in S5/S6 looking for tailored support in Maths, Physics, Chemistry, and Biology to excel in their Highers.",
  },
  {
    id: 7,
    short_title: "Highers Exam Revision Course",
    long_title: "Highers Exam Revision Course: (January to April)",
    Image: "/images/courses/c7.jpg",
    coverImage: "/images/courses/cover/highers.png",
    category: "Exam Revision",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£25/hr",
    sessions: "1.5 hours",
    duration: "30 hours total",
    fee: "£25.00",
    action: "Enroll Now",
    overview: `This 30-hour course is a focused exam prep programme for Highers in Maths, Physics,
Chemistry, and Biology. It includes 3 full Mock Exams, Feedback sessions, Hints & Tips session, timed practice, and detailed review
sessions.
We help students master content, develop smart revision techniques, and stay confident
under exam pressure. Tutors provide marked scripts with actionable feedback.`,
    includes: [
      "3 Mock Exams included with grading, feedback & improvement tips",
      "Intensive revision of critical topics",
      "Timed paper practice",
      "Practice with long-answer and problem-solving questions",
      "Mistake analysis + Tips & strategies for exams",
      "Visual Revision tools: mind maps, flow charts, summaries",
      "Performance review sessions",
      "Breakdown of SQA marking schemes and grade boundaries",
      "Regular tutor feedback and confidence tracking",
    ],
    perfectFor:
      "Students preparing for Highers who want to boost their exam performance and confidence.",
  },
  {
    id: 8,
    short_title: "Advanced Highers",
    long_title: "Advanced Highers: (From August)",
    Image: "/images/courses/c8.jpg",
    coverImage: "/images/courses/cover/advanced-highers.png",
    category: "Advanced Highers",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£45/hr",
    sessions: "1.5 hours",
    fee: "£45.00",
    action: "Enroll Now",
    overview: `Our Advanced Higher tutoring programme, running from August to February, is designed for students aiming for top grades in Maths, Physics, Chemistry, and Biology. Each session is tailored to the individual needs of the student, focusing on advanced concepts, problem-solving, and exam techniques. Each 1.5-hour session includes in-depth topic exploration, past paper practice, and personalised feedback. Tutors also help students develop effective study habits and time management skills. Regular homework is assigned and marked, with progress updates provided to parents.`,
    includes: [
      "Advanced syllabus coverage",
      "Study planning and workload management",
      "Personalised academic support with writing, problem-solving, and theory",
      "Weekly tasks and feedback",
      "University preparation guidance",
    ],
    perfectFor:
      "Students in S6 looking for tailored support in Maths, Physics, Chemistry, and Biology to excel in their Advanced Highers.",
  },
  {
    id: 9,
    short_title: "Advanced Highers Exam Revision Course",
    long_title: "Advanced Highers Exam Revision Course: (From December)",
    Image: "/images/courses/c9.jpg",
    coverImage: "/images/courses/cover/advanced-highers.png",
    category: "Exam Revision",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£50/hr",
    sessions: "2 hours",
    duration: "30 hours total",
    fee: "£50.00",
    action: "Enroll Now",
    overview: `This 30-hour course is a focused exam prep programme for Advanced Highers in Maths, Physics, Chemistry, and Biology. It includes 2 full Mock Exams, timed practice, and detailed review sessions. We help students master content, develop smart revision techniques, and stay confident under exam pressure. Tutors provide marked scripts with actionable feedback.`,
    includes: [
      "2 Mock Exams included with grading, feedback & improvement tips",
      "Intensive revision of critical topics",
      "Timed paper practice",
      "Practice with long-answer and problem-solving questions",
      "Mistake analysis + Tips & strategies for exams",
      "Visual Revision tools: mind maps, flow charts, summaries",
      "Performance review sessions",
      "Breakdown of SQA marking schemes and grade boundaries",
      "Regular tutor feedback and confidence tracking",
    ],
    perfectFor:
      "Students preparing for Advanced Highers who want to boost their exam performance and confidence.",
  },
  {
    id: 10,
    short_title: "National 5 Mock Exam",
    long_title: "National 5 Mock Exam",
    Image: "/images/courses/c10.jpg",
    coverImage: "/images/courses/cover/national5.png",
    category: "Mock Exams",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£50/test",
    fee: "£50.00",
    action: "Book Now",
    overview: `Take a full-length mock exam in Maths, Physics, Chemistry, or Biology under real exam conditions. Papers are marked by our tutors and returned with detailed feedback.`,
    includes: [
      "Full test + marking",
      "Individual feedback report",
      "Improvement advice",
    ],
    perfectFor:
      "Students who want to experience exam conditions and receive feedback on their performance.",
  },
  {
    id: 11,
    short_title: "Highers Mock Exam",
    long_title: "Highers Mock Exam",
    Image: "/images/courses/c11.jpg",
    coverImage: "/images/courses/cover/highers.png",
    category: "Mock Exams",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£70/test",
    fee: "£70.00",
    action: "Book Now",
    overview: `Real-exam style mocks for Maths, Physics, Chemistry, and Biology—perfect to evaluate
readiness before finals. Includes personalised tutor marking and feedback.`,
    includes: [
      "Full mock exam",
      "Marked scripts with comments",
      "Performance insights",
    ],
    perfectFor:
      "Students who want to assess their exam readiness and receive expert feedback on their performance.",
  },
  {
    id: 12,
    short_title: "Advanced Highers Mock Exam",
    long_title: "Advanced Highers Mock Exam",
    Image: "/images/courses/c12.jpg",
    coverImage: "/images/courses/cover/advanced-highers.png",
    category: "Mock Exams",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£100/test",
    fee: "£100.00",
    action: "Book Now",
    overview: `Challenging mock exams for Advanced Highers in science and maths. Designed to simulate actual exam stress and help students refine their approach.`,
    includes: [
      "Real exam conditions",
      "Expert-marked scripts",
      "Feedback on technique",
      "Suggested next steps",
    ],
    perfectFor:
      "Students preparing for Advanced Highers who want to test their knowledge and exam technique under pressure.",
  },
  {
    id: 13,
    short_title: "National 5: Tips & Hints Session",
    long_title: "National 5: Tips & Hints Session",
    Image: "/images/courses/c13.jpg",
    coverImage: "/images/courses/cover/national5.png",
    category: "Tips & Hints",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£100/session",
    fee: "£100.00",
    action: "Book Now",
    overview: `This is not just another revision session — it's a strategic lesson designed to give students
an edge before their exams. Our expert tutors break down what really matters, what to
expect in the exam, and how to maximise marks with smart techniques.`,
    includes: [
      "Breakdown of common question types & how to answer them",
      "Tips for understanding command words: 'describe', 'explain', 'justify'",
      "Highlighting commonly missed marks and how to avoid them",
      "Time-saving strategies for high-pressure questions",
      "Quick recall tricks for formulas, processes, and definitions",
      "What NOT to do — real student errors and how to dodge them",
      "Final-week revision checklist & study planner",
      "Q&A with experienced SQA-focused tutors",
      "Take-home tips sheet with condensed advice",
    ],
    perfectFor:
      "Students who've already revised and now need a smart, exam-savvy push to gain confidence and squeeze out extra marks.",
  },
  {
    id: 14,
    short_title: "Highers: Tips & Hints",
    long_title: "Highers: Tips & Hints Session",
    Image: "/images/courses/c14.jpg",
    coverImage: "/images/courses/cover/highers.png",
    category: "Tips & Hints",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£150/session",
    fee: "£150.00",
    action: "Book Now",
    overview: `This focused, expert-led session equips students with insider strategies to approach Higher
exams precisely and confidently. It's packed with actionable techniques, time management
tools, and insights from tutors who know the SQA exam inside out.`,
    includes: [
      "Advanced exam strategies tailored to each subject",
      "How to structure high-mark written responses",
      "Techniques for analysing question language and unlocking intent",
      "Time management: allocating minutes per section or marks",
      "Tips for long-answer planning and data-handling questions",
      "High-frequency topics and what to prioritise in revision",
      "Final-day prep checklist & study map",
      "Live question dissection & group discussion",
      "Post-session cheat sheet with tips and reminders",
    ],
    perfectFor:
      "Students aiming for top grades who want to fine-tune their exam performance and reduce last-minute stress.",
  },
  {
    id: 15,
    short_title: "Advanced Highers: Tips & Hints",
    long_title: "Advanced Highers: Tips & Hints Session",
    Image: "/images/courses/c15.jpg",
    coverImage: "/images/courses/cover/advanced-highers.png",
    category: "Tips & Hints",
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
    rate: "£250/session",
    fee: "£250.00",
    action: "Book Now",
    overview: `This intensive premium session is designed for ambitious students sitting Advanced Highers,
where every mark counts. Our tutors provide deep strategic insight, show how to tackle
complex questions, and share techniques that set A-band candidates apart.`,
    includes: [
      "Advanced techniques for tackling high-mark and essay-style questions",
      "Exam blueprint: how SQA examiners allocate marks",
      "Guidance on showing analytical depth in responses",
      "Subject-specific advice for interpreting tricky problems",
      "Breakdown of sample A-grade answers and how to replicate them",
      "Time-saving structures for extended responses",
      "Final revision priorities and efficiency plan",
      "One-to-one feedback on question approach (if needed)",
      "Exclusive tip booklet for Advanced Highers",
    ],
    perfectFor:
      "Students aiming for top-band grades, applying to competitive university courses, or needing tailored guidance to excel under pressure. ",
  },
];
