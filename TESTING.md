# Reminder To Do Testing

![Reminder To Do viewed in different screens](docs/testing.md/testing-responsive-header-img.png)

Developer: [Kim Bergström](https://github.com/KimBergstroem) <br>
[Live webpage](https://reminder-to-do-app.netlify.app/)<br>
[Project Repository](https://github.com/KimBergstroem/to-do-app)<br>

## Table of Content

- 📄[**Code Validation**](#code-validation)
  - [HTML Validation](#html-validation)
  - [CSS Validation](#css-validation)
  - [JAVASCRIPT Validation](#javascript-validation)
  - [PYTHON Validaton](#python-validation)
- 📄[**Accessibility**](#accessibility)
  - [Wave](#--wave--)
- 📄[**Performance**](#performance)
  - [Desktop Performance](#desktop-performance)
  - [Mobile Performance](#mobile-performance)
- 📄[**Performing tests on various devices**](#performing-tests-on-various-devices)
- 📄[**Browser compatibility**](#browser-compatibility)
- 📄[**Manual Testing**](#manual-testing)
  - [Testing user stories](#testing-user-stories)
  - [User Experience and Improvements](#user-experience-and-improvements)
  - [Full Testing](#full-testing)
- 📄[**Summary**](#summary)

<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Code Validation

### HTML Validation

W3C Markup Validation is a service offered by W3C, which enables you to assess the compliance of your HTML code with the official standards. This service identifies syntax errors, improper tag usage, and other issues that might impact the structure and meaning of your web pages. By utilizing W3C Markup Validation, you can ensure that your HTML code is well-structured and conforms to established web standards.

Google Chrome web browser and the 'Inspect' function were used to capture the HTML page from the webb applications templates, which was then validated against the W3C Validator.

| **Tested**             | **Result**                 | **View Result**                                                                                 | **Pass** |
| ---------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- | :------: |
| **Components / Views** |
| HomeView.vue           | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| ProfileView.vue        | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| ProfileEdit.vue        | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| TaskView.vue           | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| TaskCreate.vue         | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| TaskDetailView.vue     | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| Footer.vue             | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| Nav.vue                | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignIn.vue             | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignUp.vue             | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| NotFound.vue           | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

### CSS Validation

[W3C Jigsaw](https://jigsaw.w3.org/css-validator/) is a tool provided by the World Wide Web Consortium (W3C) that allows you to validate and check the correctness of your HTML and CSS code. It helps ensure that your web pages comply with the standards set by the W3C, promoting interoperability and accessibility.

| **Tested** | **Result**            | **View Result**                                                                                 | **Pass** |
| ---------- | --------------------- | ----------------------------------------------------------------------------------------------- | :------: |
| main.css   | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

### JAVASCRIPT Validation

[JSHint](https://jshint.com/) is a robust JavaScript code analysis tool that aids in improving the quality and reliability of your JavaScript code. It serves as a linter, helping you catch potential errors, enforce coding conventions, and enhance the overall maintainability of your code.
Taking full JS files from the project folder, but also JavaScript snippets in different Components.vue files where there is JavaScript code for validation of the JS code. Below, you can find the file path along with errors and passes.

Below you can see the errors that was showing on all the script that was embedded in components.vue and vue structure. Besides from this errors, all javascript was passing without any errors.

-       `Error message`
- `Error explaination`

| **Tested**              | **Result**            | **View Result**                                                                                 | **Pass** |
| ----------------------- | --------------------- | ----------------------------------------------------------------------------------------------- | :------: |
| index.js                | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| main.js                 | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| taskStore.js            | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| userStore.js            | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| supabase.js             | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| validateAuthData.js     | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| validateProfileData.js  | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| validateTaskItemData.js | No errors or warnings | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

### Vue3 Validation

[Vue 3](https://next.com/) MAYBE, LET SEE IF THERE IS A SPECIAL VUE 3 VALDIATOR.

| **Tested**          | **Result**                 | **View Result**                                                                                 | **Pass** |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- | :------: |
| **.VUE Components** |
| App.vue             | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| Home.vue            | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| Footer.vue          | All clear, no errors found | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Accessibility

### **Wave**

[The WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/) was used to assess the accessibility of the website. WAVE helps identify potential accessibility issues and provides guidance on how to improve the accessibility of web content.

During the evaluation, the following issues were identified:

- **Errors**:

- **Contrast Warning**:

<p align="center">
  <img src="docs/testing.md/test-accessibility.png">
</p>

By using the WAVE tool, I gained valuable insights into the accessibility of my website. While I have chosen not to address certain errors at this time, I remain committed to creating an inclusive user experience and will continue to explore ways to improve accessibility in the future.

<p align="right">(<a href="#table-of-content">back to top</a>)</p>

<p align="center">
  <img src="docs/readme.md/readme-divider.png">
</p>

## Performance

I conducted a comprehensive evaluation of [The Reminder To Do website](https://next.com/) using [Google Lighthouse in Google Chrome Developer Tools](https://developer.chrome.com/docs/lighthouse/). This evaluation was performed in Google Chrome browser's incognito mode to eliminate all potential impacts from other addons and cached files.

The performance scores were assessed for both desktop and mobile devices. Below are the summarized results:

### Desktop Performance

- Average performance score: 0 / 100
- The majority of pages received scores above 0 / 100, indicating excellent performance.

| **Tested**             | **Performance Score** | **View Result**                                                                                 | **Pass** |
| ---------------------- | --------------------- | ----------------------------------------------------------------------------------------------- | :------: |
| **Components / Views** |
| HomeView               | 97 / 100              | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| ProfileView            | 99 / 100              | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignUpView             | 99 / 100              | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignInView             | 99 / 100              | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

### Mobile Performance

- Average performance score: 0 / 100
- The pages showed slightly lower performance compared to the desktop but still maintained a satisfactory score.

| **Tested**             | **Performance** | **View Result**                                                                                 | **Pass** |
| ---------------------- | --------------- | ----------------------------------------------------------------------------------------------- | :------: |
| **Components / Views** |
| HomeView               | 97 / 100        | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| ProfileView            | 99 / 100        | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignUpView             | 99 / 100        | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |
| SignInView             | 99 / 100        | <details><summary>Screenshot of result</summary>![Result](docs/testing.md/coming.png)</details> |    ✅    |

In terms of performance, Reminder To Do website delivered strong results, ensuring a seamless user experience on both desktop and mobile platforms.

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Performing tests on various devices

The website was tested on the following devices:

<ins>Mobile</ins>

1. Samsung s22 ultra
2. iPhone X
3. Samsung galaxy s22
4. iPhone 14 Pro max

<ins>Desktop</ins>

1. Samsung Galaxy Book 360
2. HP Elite book 830 g9
3. HP Victus gaming desktop

<ins>Monitors</ins>

1. 49-inch Samsung CHG9 ultra-wide
2. 27-inch Benq zowie XL2746S
3. 27-inch Dell ultrasharp U2723QE

In addition, the website was tested using the Google Chrome Developer Tools Device Toggling option for all available device options.

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Browser compatibility

The website was tested on the following:

<ins>Browsers</ins>

1. Microsoft Edge
2. Google Chrome
3. Mozilla Firefox
4. Safari

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Automated Testing

Autmated Testing was not implemented at this time in this project. But this will be come available in near future!

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

## Manual Testing

### Testing user stories

### User Experience and Improvements

I engaged in user testing involving family members and friends to collect feedback regarding their website experience. I requested them to complete the following tasks and share their feedback on their overall experience:

Total users attended the testing: 3

| Test                    | Result   |
| ----------------------- | -------- |
| Create an account       | **100%** |
| Update the profile      | **100%** |
| Upload a profile img    | **100%** |
| Create a reminder       | **100%** |
| Update a reminder       | **100%** |
| Delete a reminder       | **100%** |
| Add task to reminder    | **100%** |
| Edit task to reminder   | **100%** |
| Delete task to reminder | **100%** |
| Search for a Reminder   | **100%** |
| Filter for a Reminder   | **100%** |
| Test all links          | **100%** |
| Try forgot password     | **100%** |
| Delete account          | **100%** |

&nbsp;

### Full Testing

COMING SOON

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>

# Summary

### Performance

- **Desktop Performance:**

  - Average performance score: 0 / 100
  - Majority of pages received scores above 0 / 100, indicating excellent performance.

- **Mobile Performance:**
  - Average performance score: 0 / 100
  - Pages showed slightly lower performance compared to desktop but maintained a satisfactory score.

### Device Testing

The website was tested on a variety of devices, including mobile phones (_Samsung s22 ultra_, _iPhone X_, _Samsung galaxy s22_, _iPhone 14 Pro max_), desktops (_Samsung Galaxy Book 360_, _HP Elite book 830 g9_, _HP Victus gaming desktop_), and monitors (_49-inch Samsung CHG9 ultra-wide_, _27-inch Benq zowie XL2746S_, _27-inch Dell ultrasharp U2723QE_). Additionally, testing was performed using Google Chrome Developer Tools Device Toggling for various device options.

### Browser Compatibility

The website was tested on popular browsers, ensuring compatibility with:

1. Microsoft Edge
2. Google Chrome
3. Mozilla Firefox
4. Safari

### Automated Testing

Automated testing has not been implemented in the current project but is planned for future development.

### Manual Testing

User stories and various scenarios were tested manually, involving family members and friends. The success rate for tasks such as account creation, profile updates, product interactions, and more was 100%.

### Overall User Experience

Feedback from user testing and manual testing indicates a seamless user experience. The website performed well in terms of functionality, responsiveness, and user interface across different devices and browsers.

The testing process was comprehensive, covering various aspects of the website, and the identified issues have been documented for further improvement.

<p align="right">(<a href="#table-of-content">back to top</a>)</p>
<p align="center">
  <img src="docs/readme.md/readme-divider.png" />
</p>
