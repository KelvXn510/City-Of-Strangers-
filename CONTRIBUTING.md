# Contributing Guidelines

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors must follow our community guidelines.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'Add your feature'`
5. Push: `git push origin feature/your-feature`
6. Open a pull request

## Development Workflow

### Before Starting

1. Check for existing issues or PRs
2. Create an issue for discussion if needed
3. Wait for approval before large changes

### Code Quality Standards

- All code must be TypeScript
- ESLint and Prettier must pass
- Tests required for new features
- Type coverage must be maintained

### Testing Requirements

```bash
# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# E2E tests
npm run test:e2e
```

### Commit Messages

Use conventional commits:
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
test: Add tests
style: Format code
refactor: Restructure code
chore: Update dependencies
```

## Pull Request Process

1. Update documentation as needed
2. Add tests for new functionality
3. Update CHANGELOG.md
4. Ensure all CI checks pass
5. Request review from maintainers
6. Address feedback
7. Maintainer merges when approved

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments to functions
- Update API documentation for endpoint changes
- Create ADR (Architecture Decision Records) for major decisions

## Performance Considerations

- Profile before optimizing
- Consider bundle size impact
- Avoid unnecessary re-renders
- Use efficient database queries

## Security

- Never commit secrets
- Report security issues privately
- Follow OWASP guidelines
- Validate all user input

## Questions?

- Check existing documentation
- Search issues for similar questions
- Ask in discussions section
- Contact: hello@cityofstrangers.com

Thank you for contributing to The City of Strangers! 🏙️
