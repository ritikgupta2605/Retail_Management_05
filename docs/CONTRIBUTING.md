# Contributing Guidelines

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Description of changes"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Code Style

### JavaScript/React
- Use ES6+ features
- Use functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic
- Follow consistent indentation (2 spaces)

### CSS
- Use CSS variables for theming
- Follow BEM naming convention when applicable
- Mobile-first responsive design
- Avoid inline styles

## Commit Messages

Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
- `feat(search): add debounced search functionality`
- `fix(pagination): resolve page reset issue`
- `docs(readme): update installation instructions`

## Testing

Before submitting:
1. Test all features manually
2. Check responsive design
3. Verify no console errors
4. Test edge cases
5. Ensure backward compatibility

## Pull Request Guidelines

1. Update documentation if needed
2. Add description of changes
3. Link related issues
4. Request review from maintainers
5. Address feedback promptly

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about implementation
- Documentation improvements
