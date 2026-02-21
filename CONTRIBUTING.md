# Contributing to Mini CRM

Thank you for your interest in contributing! Here's how to get started.

---

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/mini-crm.git
   cd mini-crm
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Set up the project**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Create .env file** (backend)
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

---

## 💻 Development Workflow

### Start Backend
```bash
cd backend
node server.js
```

### Start Frontend (in another terminal)
```bash
cd frontend
npm start
```

### Make Changes
- Create meaningful commits
- Follow the code style
- Test your changes

### Commit & Push
```bash
git add .
git commit -m "Add: description of changes"
git push origin feature/your-feature-name
```

### Create Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Add description of changes
- Submit PR

---

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style
- [ ] No console errors/warnings
- [ ] Tested on local machine
- [ ] Commit messages are clear
- [ ] PR description explains changes

### PR Title Format
```
[Feature] Add pagination to lead table
[Fix] Correct status update bug
[Docs] Update README with deployment guide
[Refactor] Clean up API response handling
```

### PR Description Template
```markdown
## Description
Brief description of what this PR does

## Changes
- Change 1
- Change 2
- Change 3

## Testing
How to test this feature

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code tested locally
- [ ] No breaking changes
- [ ] Documentation updated
```

---

## 🐛 Reporting Issues

### Before Creating Issue
- [ ] Check existing issues (no duplicates)
- [ ] Test on latest code
- [ ] Collect error messages

### Issue Title
Clear and descriptive
```
Fix: Login fails with MongoDB connection
Add: Pagination to lead list
Bug: Status dropdown not updating UI
```

### Issue Description
```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows/Mac/Linux
- Node version: 
- Browser: Chrome/Firefox/Safari

## Error Message
```
Error stack trace here
```

## Screenshots
[Add screenshots if relevant]
```

---

## 🎯 Feature Requests

### Before Requesting
- [ ] Feature aligns with project scope
- [ ] Not already requested
- [ ] Clear use case

### Feature Suggestion Template
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How would you implement it?

## Alternative Solutions
Other approaches considered

## Additional Context
Any other relevant info
```

---

## 📝 Code Style Guidelines

### JavaScript
```javascript
// ✅ Good
const getUserById = (id) => {
  return users.find(u => u.id === id);
};

// ❌ Avoid
function get_user_by_id(id){
return users.find(u=>u.id===id)
}
```

### React Components
```javascript
// ✅ Good - Functional component with hooks
export default function LeadForm({ onSubmit }) {
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
    </form>
  );
}
```

### Backend Routes
```javascript
// ✅ Good - Clear, RESTful
router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### Comments
```javascript
// Use when code is non-obvious
// ✅ Good
// Filter leads by conversion status for analytics
const converted = leads.filter(l => l.status === 'converted');

// ❌ Avoid
// Get converted leads
const converted = leads.filter(l => l.status === 'converted');
```

---

## 🔄 Git Workflow

### Branch Naming
```
feature/add-pagination
fix/login-bug
docs/update-readme
refactor/component-naming
```

### Commit Messages
```
Add: New feature description
Fix: Bug description
Docs: Documentation update
Refactor: Code improvement
Remove: Deprecated feature
```

### Before Merging
- [ ] Code reviewed by maintainer
- [ ] Tests passing
- [ ] No conflicts
- [ ] Code style compliant

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login works
- [ ] Create lead works
- [ ] Update lead works
- [ ] Delete lead works
- [ ] Search works
- [ ] Analytics updates
- [ ] Notes add correctly
- [ ] Status changes save

### Commands
```bash
# Frontend
cd frontend
npm start

# Backend
cd backend
node server.js

# Test API (Postman/curl)
curl http://localhost:5001/api/leads
```

---

## 📚 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Workflow](https://docs.github.com/en/get-started)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## ❓ Questions?

- Open a GitHub issue
- Check existing discussions
- Read project documentation

---

## 🙏 Thank You!

Your contributions make this project better. Thanks for helping! 

**Let's build something amazing together!** 🚀
