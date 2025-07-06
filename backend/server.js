// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate-pdf", async (req, res) => {
  const { name, bio, skills, projects, contact } = req.body;

  const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #4CAF50; }
        .section { margin-bottom: 20px; }
        .skills span { background: #f2f2f2; padding: 4px 10px; margin: 5px; border-radius: 5px; display: inline-block; }
      </style>
    </head>
    <body>
      <h1>${name}</h1>
      <p><strong>Bio:</strong> ${bio}</p>
      <div class="section">
        <h2>Skills</h2>
        <div class="skills">${skills.map(skill => `<span>${skill}</span>`).join("")}</div>
      </div>
      <div class="section">
        <h2>Projects</h2>
        <ul>${projects.map(p => `<li><strong>${p.title}</strong>: <a href="${p.link}">${p.link}</a><br>${p.description}</li>`).join("")}</ul>
      </div>
      <div class="section">
        <h2>Contact</h2>
        <p>Email: ${contact.email} <br> GitHub: ${contact.github} <br> LinkedIn: ${contact.linkedin}</p>
      </div>
    </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=portfolio.pdf",
    });

    res.send(pdf);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
