# Frontend Mentor | Mortgage Repayment Calculator

This repository contains my solution for the "Mortgage Repayment Calculator" challenge on Frontend Mentor. The project involves creating a responsive calculator that allows users to calculate their mortgage repayments based on various inputs.

## Table of Contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![Desktop](./design/Desktop.png)
![Mobile](./design/Mobile.png)

### Links

- Solution URL: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/your-solution-url)
- Live Site URL: [Live Demo](https://your-github-username.github.io/your-repo-name)

## My Process

This project focuses on building a user-friendly mortgage repayment calculator that provides instant feedback based on user input. The design is clean and adheres to modern web practices, ensuring a seamless experience across devices.

### Built With

- **Semantic HTML5 Markup:** Utilized semantic elements for improved accessibility and SEO.
- **CSS:** Used custom properties for consistent styling, Flexbox for layout, and responsive design techniques.
- **JavaScript:** Implemented dynamic calculations and event handling to update the UI in real-time.

### JavaScript Functionality

The project includes a single JavaScript file that handles the core functionality. Key components include:

- **Input Handling:** Listens for changes in the input fields (loan amount, interest rate, and loan term) and triggers calculations.
- **Calculation Logic:** Computes the monthly repayments using the formula for calculating loan repayments.
- **UI Updates:** Dynamically updates the displayed repayment amount based on user input.

### Example Calculation Formula

The monthly repayment can be calculated using the formula:

\[ M = P \times \frac{r(1+r)^n}{(1+r)^n-1} \]

Where:

- \( M \) = monthly repayment
- \( P \) = loan amount
- \( r \) = monthly interest rate (annual interest rate / 12)
- \( n \) = number of payments (loan term in months)

### What I Learned

Through this project, I enhanced my skills in:

- **Event Handling:** Efficiently managing input events to provide instant feedback.
- **Mathematical Calculations in JavaScript:** Implementing financial calculations accurately in the application.
- **Responsive Design:** Creating a layout that adapts to various screen sizes using CSS Flexbox.
- **Accessibility:** Ensuring that the form elements are accessible and usable for all users.

### Continued Development

Future updates may include:

- **Additional Features:** Implementing features such as amortization tables or adjustable sliders for inputs.
- **Styling Enhancements:** Adding more advanced styling and animations to improve the user experience.
- **Error Handling:** Implementing validation and error messages for user inputs.

### Useful Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/) - Comprehensive documentation for web technologies.
- [CSS-Tricks](https://css-tricks.com/) - Articles and tutorials on modern CSS techniques.
- [JavaScript.info](https://javascript.info/) - In-depth JavaScript tutorials and guides.
- [Frontend Mentor](https://www.frontendmentor.io/) - Platform for frontend challenges and community feedback.

## Author

- **Frontend Mentor:** [@YourUsername](https://www.frontendmentor.io/profile/@YourUsername)
- **GitHub:** [@YourUsername](https://github.com/YourUsername)

## Acknowledgments

A special thanks to Frontend Mentor for providing this challenging project and to the community for their valuable feedback and support throughout the development process.
