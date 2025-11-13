# Contributing to Cannabis Manager

Thank you for your interest in contributing to Cannabis Manager! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cannabis-manager.git
   cd cannabis-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Game

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Coding Standards

### TypeScript

- Use strict TypeScript
- Prefer interfaces over types for objects
- Use enums for constants
- Avoid `any` type
- Document public APIs with JSDoc

Example:
```typescript
/**
 * Add money to the player's wallet
 * @param amount - Amount to add (must be positive)
 * @returns true if successful
 */
addMoney(amount: number): boolean {
  if (amount <= 0) return false;
  this.money += amount;
  return true;
}
```

### File Organization

- One class per file
- Use barrel exports (`index.ts`)
- Group related functionality
- Clear folder structure

### Naming Conventions

- **Files**: PascalCase for classes (`GameEngine.ts`), camelCase for utils (`formatters.ts`)
- **Classes**: PascalCase (`GameEngine`, `ResourceManager`)
- **Interfaces**: PascalCase with descriptive names (`PlayerState`, `UpgradeConfig`)
- **Functions**: camelCase (`addMoney`, `calculateProgress`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LEVEL`, `BASE_COST`)
- **Private members**: prefix with `_` or use `private` keyword

### Code Style

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters
- Use Prettier for formatting

Example:
```typescript
export class ResourceManager {
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  addMoney(amount: number): void {
    if (amount <= 0) return;
    this.gameState.player.money += amount;
  }
}
```

## Testing

### Writing Tests

- Write tests for new features
- Maintain existing test coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

Example:
```typescript
describe('ResourceManager', () => {
  let resourceManager: ResourceManager;
  let gameState: GameState;

  beforeEach(() => {
    // Arrange
    gameState = createDefaultGameState();
    resourceManager = new ResourceManager(gameState);
  });

  it('should add money correctly', () => {
    // Arrange
    const initialMoney = gameState.player.money;

    // Act
    resourceManager.addMoney(100);

    // Assert
    expect(gameState.player.money).toBe(initialMoney + 100);
  });
});
```

### Test Coverage

Aim for:
- Core systems: 90%+
- Managers: 80%+
- Utils: 95%+

### Test Types

1. **Unit Tests**: Test individual functions/methods
2. **Integration Tests**: Test manager interactions
3. **E2E Tests**: Test complete user flows

## Pull Request Process

### Before Submitting

1. Run all tests: `npm run test`
2. Run linter: `npm run lint`
3. Run type check: `npm run type-check`
4. Update documentation if needed
5. Add tests for new features

### PR Guidelines

1. **Title**: Use conventional commits format
   - `feat: add new plant type`
   - `fix: resolve save corruption`
   - `docs: update README`
   - `test: add FarmManager tests`
   - `refactor: improve performance`

2. **Description**:
   - What does this PR do?
   - Why is it needed?
   - How was it tested?
   - Any breaking changes?

3. **Checklist**:
   - [ ] Tests pass
   - [ ] Code is formatted
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] TypeScript compiles

### Review Process

1. Automated checks must pass
2. At least one maintainer approval
3. No unresolved comments
4. Branch is up to date with main

## Issue Reporting

### Bug Reports

Include:
- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Error messages

Template:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Browser: [e.g. Chrome 90]
 - OS: [e.g. Windows 10]
 - Game Version: [e.g. 1.0.0]
```

### Feature Requests

Include:
- Problem it solves
- Proposed solution
- Alternative solutions considered
- Additional context

Template:
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots.
```

## Areas for Contribution

### Good First Issues

- Fix typos in documentation
- Add missing tests
- Improve error messages
- Add code comments
- Update dependencies

### Feature Ideas

- New plant types
- New upgrades
- New quest types
- UI improvements
- Performance optimizations
- Accessibility improvements

### Documentation

- Improve README
- Add code examples
- Create tutorials
- Write blog posts
- Create videos

## Getting Help

- Open an issue for questions
- Join discussions
- Check existing issues and PRs
- Read the documentation

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Cannabis Manager!
