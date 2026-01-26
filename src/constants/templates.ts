export const templates = [
    { 
        id: "blank", 
        label: "Blank Document", 
        imageUrl: "/blank-document.svg",
        initialContent: ""
    },
    { 
        id: "software-proposal", 
        label: "Software Development proposal", 
        imageUrl: "/software-proposal.svg",
        initialContent: `
            <h1 style="text-align:center;">Software Development Proposal</h1>

            <p><strong>Prepared for:</strong> [Client Name]</p>
            <p><strong>Prepared by:</strong> [Your Name]</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

            <hr />

            <h2>1. Introduction</h2>
            <p>Briefly describe the purpose of this proposal and the problem you aim to solve.</p>

            <h2>2. Project Overview</h2>
            <p>Explain what software you will build and its main goals.</p>

            <h2>3. Scope of Work</h2>
            <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
            </ul>

            <h2>4. Technology Stack</h2>
            <p>Mention tools, frameworks, and platforms.</p>

            <h2>5. Timeline & Milestones</h2>
            <p>Provide estimated phases and delivery dates.</p>

            <h2>6. Budget (Optional)</h2>
            <p>Outline expected costs.</p>

            <h2>7. Conclusion</h2>
            <p>Summarize your proposal and next steps.</p>
`
    },
    { 
        id: "project-proposal", 
        label: "Project Proposal", 
        imageUrl: "/project-proposal.svg",
        initialContent: `
            <h1>Project Proposal</h1>

            <h2>Project Title</h2>
            <p>[Enter project title]</p>

            <h2>Prepared By</h2>
            <p>[Your Name]</p>

            <h2>Problem Statement</h2>
            <p>Describe the problem this project addresses.</p>

            <h2>Objectives</h2>
            <ul>
            <li>Objective 1</li>
            <li>Objective 2</li>
            <li>Objective 3</li>
            </ul>

            <h2>Proposed Solution</h2>
            <p>Explain your approach.</p>

            <h2>Expected Outcomes</h2>
            <p>What will success look like?</p>

            <h2>Timeline</h2>
            <p>Project phases and estimated duration.</p>
        `
    },
    { 
        id: "business-letter", 
        label: "Business Letter", 
        imageUrl: "/business-letter.svg",
        initialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP]</p>
            <p>${new Date().toLocaleDateString()}</p>

            <br />

            <p>[Recipient Name]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>

            <br />

            <p>Dear [Recipient Name],</p>

            <p>
            I am writing to inform you about...
            </p>

            <p>
            [Main body of the letter goes here.]
            </p>

            <p>
            Thank you for your time and consideration.
            </p>

            <br />

            <p>Sincerely,</p>
            <p><strong>[Your Name]</strong></p>
        `

    },
    { 
        id: "resume", 
        label: "Resume", 
        imageUrl: "/resume.svg",
        initialContent: `
            <h1 style="text-align:center;">Your Name</h1>
            <p style="text-align:center;">
            Email: your@email.com | Phone: +91-XXXXXXXXXX | LinkedIn: linkedin.com/in/yourname
            </p>

            <hr />

            <h2>Professional Summary</h2>
            <p>Brief summary of your skills, experience, and goals.</p>

            <h2>Skills</h2>
            <ul>
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
            </ul>

            <h2>Experience</h2>
            <p><strong>Job Title – Company Name</strong></p>
            <p>Month Year – Month Year</p>
            <ul>
            <li>Responsibility / achievement</li>
            <li>Responsibility / achievement</li>
            </ul>

            <h2>Education</h2>
            <p><strong>Degree – Institution Name</strong></p>
            <p>Year – Year</p>

            <h2>Projects</h2>
            <ul>
            <li>Project name – short description</li>
            </ul>
        `
    },
    { 
        id: "cover-letter", 
        label: "Cover Letter", 
        imageUrl: "/cover-letter.svg",
        initialContent: `
            <h1>Cover Letter</h1>

            <p>${new Date().toLocaleDateString()}</p>

            <p>Dear Hiring Manager,</p>

            <p>
            I am writing to express my interest in the [Position Name] role at [Company Name].
            </p>

            <p>
            Briefly introduce yourself and explain why you are interested in this role.
            </p>

            <p>
            Highlight your relevant skills, projects, and achievements.
            </p>

            <p>
            Thank you for considering my application. I look forward to hearing from you.
            </p>

            <p>Sincerely,<br/><strong>[Your Name]</strong></p>
        `
    },
    { 
        id: "letter", 
        label: "Letter", 
        imageUrl: "/letter.svg",
        initialContent: `
            <h1>Letter</h1>

            <p>${new Date().toLocaleDateString()}</p>

            <p>Dear [Name],</p>

            <p>
            Write your message here.
            </p>

            <p>
            You can use this space to express ideas, share information, or communicate formally.
            </p>

            <p>
            Best regards,<br/><strong>[Your Name]</strong></p>
        `
    },
];