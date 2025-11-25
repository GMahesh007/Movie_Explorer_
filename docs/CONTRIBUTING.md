# Contributing to OMDB Movie Explorer

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 📝 Commit Message Guidelines

Use clear, descriptive commit messages:

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for updates to existing features
- `Refactor:` for code refactoring
- `Docs:` for documentation changes
- `Style:` for formatting changes
- `Test:` for adding tests

Examples:
```
Add: movie filtering by genre
Fix: pagination not working on mobile
Update: improve search performance
Docs: add API endpoint examples
```

## 🎯 Pull Request Process

1. **Update Documentation:** Ensure README.md is updated if needed
2. **Test Thoroughly:** Test your changes on different screen sizes
3. **Follow Code Style:** Maintain consistent code formatting
4. **Describe Changes:** Provide clear PR description
5. **Link Issues:** Reference related issues in PR description

## 🏗️ Development Guidelines

### Backend Development

**File Structure:**
- Controllers: Handle HTTP requests/responses
- Services: Business logic
- Routes: API endpoint definitions
- Middleware: Request processing

**Best Practices:**
- Use async/await for asynchronous operations
- Always handle errors with try-catch
- Validate input parameters
- Add JSDoc comments for functions
- Keep functions small and focused

**Example:**
```javascript
/**
 * Search movies by title
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
const searchMovies = async (req, res, next) => {
  try {
    const { title } = req.query;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title parameter is required'
      });
    }
    
    // Implementation...
  } catch (error) {
    next(error);
  }
};
```

### Frontend Development

**Component Guidelines:**
- Keep components small and reusable
- Use functional components with hooks
- PropTypes or TypeScript for type checking
- CSS modules or styled-components for styling

**Best Practices:**
- Use semantic HTML
- Add ARIA labels for accessibility
- Optimize images (lazy loading)
- Handle loading and error states
- Mobile-first responsive design

**Example:**
```jsx
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onFavorite }) => {
  return (
    <div className="movie-card" role="article" aria-label={`Movie: ${movie.title}`}>
      <img 
        src={movie.poster} 
        alt={movie.title}
        loading="lazy"
      />
      <h3>{movie.title}</h3>
      <button 
        onClick={() => onFavorite(movie)}
        aria-label="Add to favorites"
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default MovieCard;
```

## 🧪 Testing Guidelines

### Backend Tests
```javascript
describe('Movie Controller', () => {
  describe('searchMovies', () => {
    it('should return movies for valid search', async () => {
      // Test implementation
    });
    
    it('should return 400 for missing title', async () => {
      // Test implementation
    });
  });
});
```

### Frontend Tests
```jsx
describe('MovieCard', () => {
  it('should render movie title', () => {
    // Test implementation
  });
  
  it('should call onFavorite when button clicked', () => {
    // Test implementation
  });
});
```

## 📚 Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Error handling is implemented
- [ ] Responsive design is maintained
- [ ] Accessibility is considered
- [ ] Performance is optimized

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description:** Clear description of the issue
2. **Steps to Reproduce:** How to reproduce the bug
3. **Expected Behavior:** What should happen
4. **Actual Behavior:** What actually happens
5. **Screenshots:** If applicable
6. **Environment:** Browser, OS, Node version

**Template:**
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable

## Environment
- Browser: Chrome 96
- OS: Windows 11
- Node: v16.13.0
```

## 💡 Feature Requests

When suggesting features:

1. **Use Case:** Why is this needed?
2. **Proposed Solution:** How should it work?
3. **Alternatives:** Other approaches considered?
4. **Additional Context:** Mockups, examples, etc.

## 🎨 UI/UX Guidelines

### Design Principles
- **Consistency:** Maintain design system
- **Simplicity:** Keep interfaces clean
- **Feedback:** Provide user feedback
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Fast, responsive interactions

### Color Usage
- Primary: `#e50914` (Netflix red)
- Dark backgrounds: `#141414`, `#0d0d0d`
- Text: `#f5f5f5` (light), `#808080` (gray)

### Spacing
- Base: 8px grid system
- Small: 8px
- Medium: 16px
- Large: 24px
- XLarge: 32px

## 🔒 Security Guidelines

1. **Never commit:**
   - API keys
   - Passwords
   - Environment variables
   - Personal data

2. **Always:**
   - Use environment variables
   - Validate user input
   - Sanitize data
   - Use HTTPS in production

3. **Review:**
   - Dependencies regularly
   - Security advisories
   - OWASP top 10

## 📦 Dependencies

### Adding New Dependencies

**Before adding a dependency, consider:**
1. Is it really needed?
2. Is it actively maintained?
3. What's the bundle size impact?
4. Are there security vulnerabilities?
5. Is there a lighter alternative?

**Check:**
```bash
npm audit
npm outdated
```

## 🚀 Deployment

### Backend Deployment
- Set all environment variables
- Use production database
- Enable Redis caching
- Set up monitoring
- Configure logging

### Frontend Deployment
- Build with `npm run build`
- Set API endpoint
- Enable compression
- Configure caching headers
- Set up CDN (optional)

## 📞 Questions?

- Open an issue for bugs
- Start a discussion for questions
- Check existing issues first

## 🙏 Thank You!

Your contributions help make this project better for everyone!

---

**Happy Coding! 🎉**
