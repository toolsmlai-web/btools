# Contributing to Lovable Clone

First off, thank you for considering contributing to Lovable Clone! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if relevant**
* **Include your environment details** (OS, browser, Node version)

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

* **Clear use case** - Why is this feature needed?
* **Detailed description** - How should it work?
* **Examples** - Mock-ups or similar implementations
* **Bangladesh market relevance** - How does it help our target market?

### 🔧 Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** with clear commit messages
3. **Test thoroughly** - Ensure nothing breaks
4. **Update documentation** if needed
5. **Follow the coding style** used throughout the project
6. **Submit the PR** with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/lovable-clone.git

# Install dependencies
cd lovable-clone
npm install

# Create .env.local with your keys
cp .env.example .env.local

# Run development server
npm run dev
```

## Coding Standards

### TypeScript

* Use TypeScript for all new files
* Define proper types and interfaces
* Avoid `any` type unless absolutely necessary

### React

* Use functional components with hooks
* Keep components small and focused
* Use meaningful component and variable names

### Styling

* Use Tailwind CSS utilities
* Follow the existing color scheme
* Ensure mobile responsiveness

### Git Commits

Use clear commit messages:

```
feat: Add Bengali language support
fix: Resolve preview panel crash on large files
docs: Update deployment guide with bKash integration
style: Format code with Prettier
refactor: Simplify chat message handling
```

## Project Structure

```
lovable-clone/
├── app/                 # Next.js pages and API routes
├── components/          # React components
│   ├── editor/         # Editor-specific components
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions and helpers
│   ├── prompts/        # AI system prompts
│   └── store/          # State management
└── public/             # Static assets
```

## Priority Areas

We especially welcome contributions in:

1. **Bengali Language Support** - Translation and RTL support
2. **Payment Integration** - bKash, Nagad, Rocket implementation
3. **Mobile Optimization** - Performance improvements for low-end devices
4. **Templates** - Pre-built templates for common use cases
5. **Documentation** - Tutorials, guides, and examples
6. **Testing** - Unit tests, integration tests, E2E tests

## Bangladesh Market Focus

When contributing, please consider:

* Mobile-first approach (most users are on mobile)
* Low bandwidth optimization (many users have slow internet)
* Bengali language support
* Local payment methods
* Cultural appropriateness
* Affordable pricing models

## Questions?

Feel free to open an issue with the "question" label or reach out via:

* GitHub Discussions
* Email: your.email@example.com
* Twitter: @yourhandle

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making Lovable Clone better! 🚀
