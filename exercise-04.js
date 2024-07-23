// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, 'data.json');

const getData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper function for pagination
const paginate = (array, page, limit) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return array.slice(start, end);
};

// Advanced search and pagination for articles
app.get('/articles', (req, res) => {
  const { created_by, is_published, title, content, page = 1, limit = 10 } = req.query;
  const data = getData();
  let articles = data.articles;

  if (created_by) {
    articles = articles.filter(article => article.created_by === created_by);
  }

  if (is_published !== undefined) {
    articles = articles.filter(article => article.is_published === (is_published === 'true'));
  }

  if (title) {
    articles = articles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
  }

  if (content) {
    articles = articles.filter(article => article.contents.toLowerCase().includes(content.toLowerCase()));
  }

  const paginatedArticles = paginate(articles, parseInt(page), parseInt(limit));

  res.json({
    total: articles.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedArticles
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });