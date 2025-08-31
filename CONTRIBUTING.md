# 🤝 Contributing to GreenTrace

We love your input! We want to make contributing to GreenTrace as easy and transparent as possible, whether it's:

- 🐛 Reporting a bug
- 💡 Discussing the current state of the code
- 🚀 Submitting a fix
- 🎨 Proposing new features
- 📚 Becoming a maintainer

## 🚀 **We Develop with Github**
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## 🏗️ **We Use [Github Flow](https://guides.github.com/introduction/flow/)**
We use [Github Flow](https://guides.github.com/introduction/flow/), so all code changes happen through Pull Requests. Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. **Fork the repo** and create your branch from `main`.
2. **If you've added code that should be tested**, add tests.
3. **If you've changed APIs**, update the documentation.
4. **Ensure the test suite passes**.
5. **Make sure your code lints**.
6. **Issue that pull request**!

## 🐛 **We Use [Github Issues](https://github.com/yourusername/greentrace/issues)**
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/greentrace/issues/new); it's that easy!

## 📝 **Write bug reports with detail, background, and sample code**

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 🎯 **Use a Consistent Coding Style**

* 2 spaces for indentation rather than tabs
* 80 character line length
* Run `npm run lint` to conform to our lint rules
* Run `npm run format` to format your code

## 📚 **License**
By contributing, you agree that your contributions will be licensed under its MIT License.

## 🏆 **Any contributions you make will be under the MIT Software License**
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## 🚨 **Report bugs using Github's [issue tracker](https://github.com/yourusername/greentrace/issues)**
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/greentrace/issues/new).

## 🎨 **Write bug reports with detail, background, and sample code**

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 🧪 **Testing**

Before submitting a pull request, please ensure:

1. **Frontend Tests Pass**:
   ```bash
   cd frontend
   npm test
   ```

2. **Backend Tests Pass**:
   ```bash
   cd backend
   python3 manage.py test
   ```

3. **Smart Contract Tests Pass**:
   ```bash
   npx hardhat test
   ```

4. **Code Quality Checks**:
   ```bash
   # Frontend
   npm run lint
   npm run format
   
   # Backend
   python3 -m flake8
   python3 -m black .
   ```

## 📋 **Pull Request Process**

1. **Update the README.md** with details of changes to the interface, if applicable.
2. **Update the CHANGELOG.md** with a note describing your changes.
3. **The PR will be merged** once you have the sign-off of at least one other developer.

## 🎯 **Development Setup**

### **Prerequisites**
- Node.js 16+
- Python 3.8+
- Git
- MetaMask wallet

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/yourusername/greentrace.git
cd greentrace

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Run migrations
python3 manage.py migrate

# Start development servers
# Terminal 1: Backend
python3 manage.py runserver

# Terminal 2: Frontend
cd ../frontend
npm start
```

## 🔧 **Code Style Guidelines**

### **Frontend (React/TypeScript)**
- Use functional components with hooks
- Prefer TypeScript over JavaScript
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow React best practices

### **Backend (Django/Python)**
- Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Add docstrings for all functions and classes
- Use Django best practices
- Write comprehensive tests

### **Smart Contracts (Solidity)**
- Follow Solidity style guide
- Use meaningful variable and function names
- Add NatSpec documentation
- Write comprehensive tests
- Use latest Solidity version (0.8.19+)

## 🚀 **Feature Requests**

We love feature requests! Please use the [issue tracker](https://github.com/yourusername/greentrace/issues) to request new features. When requesting a feature:

1. **Describe the feature** in detail
2. **Explain why** this feature would be useful
3. **Provide examples** of how it would work
4. **Consider the impact** on existing functionality

## 🐛 **Bug Reports**

When reporting bugs, please include:

1. **Environment details**:
   - Operating system
   - Browser version (if applicable)
   - Node.js version
   - Python version

2. **Steps to reproduce**:
   - Detailed step-by-step instructions
   - Sample data if applicable

3. **Expected vs actual behavior**:
   - What you expected to happen
   - What actually happened

4. **Additional context**:
   - Screenshots if applicable
   - Console errors
   - Network tab information

## 📞 **Questions or Need Help?**

- **GitHub Issues**: [Open an issue](https://github.com/yourusername/greentrace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/greentrace/discussions)
- **Email**: [your.email@example.com](mailto:your.email@example.com)

## 🙏 **Acknowledgments**

Thank you for contributing to GreenTrace! Your contributions help make supply chains more transparent and sustainable.

---

**Happy coding! 🌱**
