# Tawk.to AI & Chatbot Setup Guide

Since we have successfully integrated the **Tawk.to Widget** into your website, you can now power it with AI to automate student queries. Tawk.to has a built-in AI called **Apollo**.

Here is how you set it up from the [Tawk.to Dashboard](https://dashboard.tawk.to):

## 1. Accessing Apollo AI

1.  Log in to your **Tawk.to Dashboard**.
2.  Click on the **"Apollo AI"** icon in the left sidebar (it looks like a robot head).
3.  If you don't see it, go to **Add-ons** and look for Apollo AI to enable it (it usually has a free tier or trial).

## 2. Training the AI (The Most Important Part)

The AI needs to "know" about Raj Software Institute to answer questions. You teach it by setting up a **Knowledge Base** or **Shortcuts**.

### Option A: Enable "AI Assist" (Automated)

1.  In the Apollo settings, look for **"Data Sources"** or **"Training"**.
2.  **Website Crawl**: Enter your website URL (`https://raj-software-institute.vercel.app` or your domain). The AI will read all your pages (Courses, Placements, FAQs) and learn them.
3.  **Upload Documents**: If you have a PDF brochure or Syllabus, upload it here. The AI will read it.

### Option B: Shortcuts (Best for frequent questions)

Go to **Administration (Gear Icon) -> Settings -> Shortcuts**.
Create canned responses for common questions. The AI often prioritizes these.

- **Trigger**: `/fees`
- **Message**: "Our Full Stack Development course fee is ₹25,000. We offer EMI options starting at ₹5,000/month."

## 3. Configuring the "Bot" Behavior

Go to **Administration -> Widget Settings**.

1.  **Widget Scheduler**: Set your "Online" hours (e.g., 9 AM - 6 PM).
2.  **Offline Behavior**: When you are offline, you can let the AI answer OR show a "Leave a Message" form.
    - _Recommendation_: Let Apollo AI handle chats 24/7. It can take the student's name/email and answer their basic questions.

## 4. Setting up the "Knowledge Base" (KB)

Tawk.to has a free "Knowledge Base" feature (like a Help Center).

1.  Click the **Book Icon** (Knowledge Base) in the sidebar.
2.  Create articles like "Admission Process", "Course Syllabus", "Placement Record".
3.  **Why do this?** Apollo AI reads these articles to give **perfect** answers. If a student asks "How is placement?", Apollo will summarize your "Placement Record" article.

## Summary of Workflow

1.  **Student asks:** "Do you have Python course?"
2.  **Apollo AI** checks your Website/KB.
3.  **Apollo AI answers:** "Yes! We offer a Python Full Stack course with Django/FastAPI. It's a 3-month program."
4.  **Student asks:** "Can I speak to a human?"
5.  **Apollo AI** transfers the chat to you or your staff.

_No coding is required for any of this. It works instantly with the widget ID we already added._
