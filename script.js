const cList = {
  add: (el, cl) => el.classList.add(cl),
  rem: (el, cl) => el.classList.remove(cl),
  tog: (el, cl) => el.classList.toggle(cl),
  closest: (el, cl) => el.closest(cl),
};

const select = {
  el: (sl, el) => sl.querySelector(el),
  elAll: (sl, el) => sl.querySelectorAll(el),
  id: (id) => document.getElementById(id),
};

class MortgageCalculator {
  constructor() {
    this.mortgageAmount = 0;
    this.mortgageTerm = 0;
    this.mortgageRate = 0;
    this.mortgageType = null;
    this.isValid = false;
  }

  /**
   * ? Test if a value matches the pattern for a number
   * @returns {boolean}
   */
  testNumber(number, percentage) {
    const pattern = /^(?!-)([1-9]\d*)(\.\d+)?$/;
    const patternPercentage = /^(?!-)(0|[1-9]\d{0,2})(\.\d+)?$/;
    return percentage ? patternPercentage.test(number) : pattern.test(number);
  }

  /**
   * ?  Checks if the provided value is a valid number based on specified criteria.
   * @returns {boolean}
   */
  isNumber(value, percentage) {
    return percentage ? this.testNumber(value, true) : this.testNumber(value);
  }

  /**
   * ?  Displays an error message and marks the input as invalid if the number is not valid.
   * @returns {boolean}
   */
  isNotValidNumber(e, errElement, parent) {
    //? Is not valid
    this.message(errElement, "Please enter a valid number.");
    cList.add(parent, "filed--is-invalid");
    setTimeout(() => (e.target.value = ""), 300);
  }

  /**
   *? Validates the input number and updates the UI based on the validation results.
   * @returns {number|null} - The validated number or null if invalid.
   */
  validateNumber(e, value, parent, errElement, percentage) {
    //? Validate the number
    const numberTest = this.isNumber(value);
    const percentageTest = this.isNumber(value, true);
    const valueIsEmpty = value === "";
    const isPercentageTest = percentage && percentageTest;
    //? Check for empty value
    if (valueIsEmpty) {
      this.message(errElement, "This field is required.");
      cList.add(parent, "filed--is-invalid");
      return null;
    }
    if (isPercentageTest) {
      cList.rem(parent, "filed--is-invalid");
      return +value;
    }
    if (numberTest) {
      cList.rem(parent, "filed--is-invalid");
      return +value;
    }
    this.isNotValidNumber(e, errElement, parent);
  }

  message(el, message) {
    el.textContent = message;
  }

  /**
   * ?Retrieves the values of checked mortgage type checkboxes.
   */
  getCheckedValues() {
    const checkboxes = select.el(
      document,
      `input[name="mortgage-type"]:checked`
    );
    const parent = checkboxes.parentNode;
    const mortgageType = parent.getAttribute("for");
    this.mortgageType = mortgageType;
  }

  /**
   * ? Initialize the input values
   */
  initValue(e, percentage) {
    const inputType = e.target.getAttribute("name");
    const value = this.handleNumberValidation(e, percentage);
    switch (inputType) {
      case "mortgage-amount":
        this.handledErrorDisplay(e);
        this.mortgageAmount = value;
        break;
      case "mortgage-term":
        this.handledErrorDisplay(e);
        this.mortgageTerm = value;
        break;
      case "mortgage-rate":
        this.handledErrorDisplay(e, true);
        this.mortgageRate = value;
        break;
      default:
        break;
    }
  }
  //
  initCheck() {
    this.getCheckedValues();
    this.displayError();
  }
  /**
   *? Handles the validation of number inputs.
   * @param {Event} e - The input event.
   * @param {boolean} percentage - Indicates if the value should be treated as a percentage.
   */
  handleNumberValidation(e, percentage) {
    const value = e.target.value.trim();
    const parent = cList.closest(e.target, "[data-input='filed']");
    const errElement = select.el(parent, `[data-input="error"]`);
    const valid = this.validateNumber(e, value, parent, errElement, percentage);
    return valid;
  }

  handledErrorDisplay(e, percentage) {
    this.handleNumberValidation(e, percentage);
  }

  //!============================================================================{Calculate}
  /**
   * ?Calculate the monthly repayment
   */
  calculateMonthlyRepayment() {
    const monthlyRate = this.mortgageRate / 100 / 12;
    const totalPayment = this.mortgageTerm * 12;
    const repayment = this.mortgageType === "mortgage-repayment";
    const interest = this.mortgageType === "mortgage-interest";
    if (interest) {
      const payment = (this.mortgageAmount * monthlyRate).toFixed(2);
      return payment;
    } else if (repayment) {
      const monthlyRepayment =
        (this.mortgageAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalPayment));
      const payment = monthlyRepayment.toFixed(2);
      return payment;
    }
  }

  /**
   * ?Transform the result to local String
   */
  toLocalString(monthly, total, monthlyElem, totalElem) {
    const formattedMonthlyRepayment = `£${parseFloat(monthly).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumSignificantDigits: 2,
      }
    )}`;
    const formattedTotalRepayment = `£${parseFloat(total).toLocaleString(
      undefined,
      { minimumFractionDigits: 2, maximumSignificantDigits: 2 }
    )}`;
    monthlyElem.textContent = formattedMonthlyRepayment;
    totalElem.textContent = formattedTotalRepayment;
  }

  /**
   * ?Handle the calculations for total and monthly
   */
  calculateTotalRepayment() {
    const monthlyRepayment = this.calculateMonthlyRepayment();
    const totalPayments = this.mortgageTerm * 12;
    const totalElement = select.el(document, `[data-output="total"]`);
    const monthlyElement = select.el(document, `[data-output="repayment"]`);
    const total = (monthlyRepayment * totalPayments).toFixed(2);
    this.toLocalString(monthlyRepayment, total, monthlyElement, totalElement);
  }

  /**
   * ?Check if all the required filed is filled
   */
  allSet() {
    const isNotValid =
      this.mortgageAmount === 0 ||
      this.mortgageTerm === 0 ||
      this.mortgageRate === 0 ||
      this.mortgageType === null;
    return isNotValid;
  }

  /**
   * ?Set the error state
   */
  handleError(input) {
    const parent = cList.closest(input, `[data-input="filed"]`);
    const errorElement = select.el(parent, `[data-input="error"]`);
    this.message(errorElement, "This field is required.");
    cList.add(parent, "filed--is-invalid");
  }

  /**
   * ?Removes the error state
   */
  handleRemError(input) {
    const parent = cList.closest(input, `[data-input="filed"]`);
    const errorElement = select.el(parent, `[data-input="error"]`);
    this.message(errorElement, "This field is required.");
    cList.rem(parent, "filed--is-invalid");
  }

  /**
   * ?Handles error update for input and radio
   */
  displayError() {
    const inputs = select.elAll(document, `input[type="number"]`);
    inputs.forEach((input) => {
      const isEmpty = input.value === "";
      if (isEmpty) this.handleError(input);
    });
    //?Radio
    const isNotChecked = this.mortgageType === null;
    const input = select.el(document, `input[type="radio"]`);
    isNotChecked ? this.handleError(input) : this.handleRemError(input);
  }

  /**
   * ?if the filed is empty display error else calculate
   */
  handleResultDisplay() {
    if (!this.allSet()) {
      this.isValid = true;
      this.calculateTotalRepayment();
    } else {
      this.isValid = false;
      this.displayError();
    }
  }

  /**
   * ?Show the calculated result
   */
  showResult() {
    const empty = select.el(document, `[data-display="empty"]`);
    const active = select.el(document, `[data-display="active"]`);
    cList.rem(active, "hide");
    cList.add(empty, "hide");
  }

  calculate(e) {
    e.preventDefault();
    this.handleResultDisplay();
    if (!this.isValid) return;
    this.showResult();
  }

  //!============================================================{Clear All}
  /**
   * ?Reset all the input back to default
   */
  resetInputs() {
    this.mortgageAmount = 0;
    this.mortgageTerm = 0;
    this.mortgageRate = 0;
    this.mortgageType = null;
    this.isValid = false;
  }

  /**
   * ?Clear all the input filed back to default
   */
  clearAllInputFiled() {
    const inputs = select.elAll(document, `input[type="number"]`);
    inputs.forEach((input) => {
      input.value = "";
      const parent = cList.closest(input, "[data-input='filed']");
      cList.rem(parent, "filed--is-invalid");
      const errorElement = select.el(parent, `[data-input="error"]`);
      this.message(errorElement, "");
    });
  }

  /**
   * ?Clear all the radio filed back to default
   */
  clearAllRadioFiled() {
    const radioButtons = select.elAll(document, `input[name="mortgage-type"]`);
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
  }

  /**
   * ?Reset the display back to default
   */
  resetDisplayResult() {
    const totalElement = select.el(document, `[data-output="total"]`);
    const monthlyElement = select.el(document, `[data-output="repayment"]`);
    totalElement.textContent = "";
    monthlyElement.textContent = "";
  }

  /**
   * ?set the result display back to the default
   */
  hideResult() {
    const empty = select.el(document, `[data-display="empty"]`);
    const active = select.el(document, `[data-display="active"]`);
    cList.add(active, "hide");
    cList.rem(empty, "hide");
  }

  clearAll() {
    this.resetInputs();
    this.clearAllInputFiled();
    this.clearAllRadioFiled();
    this.resetDisplayResult();
    this.hideResult();
  }
}

const calc = new MortgageCalculator();
const main = select.id("main");

const handleInput = (e) => {
  const input = e.target.dataset.input;
  switch (input) {
    case "mortgage-amount":
    case "mortgage-term":
    case "mortgage-rate":
      calc.initValue(e);
      break;
    case "mortgage-type":
      calc.initCheck();
      break;
    default:
      break;
  }
};

const handleClick = (e) => {
  const button = cList.closest(e.target, "[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  switch (action) {
    case "clear-all":
      calc.clearAll();
      break;
    case "calculate":
      calc.calculate(e);
      break;
    default:
      break;
  }
};

const initMain = () => {
  main.addEventListener("input", handleInput);
  main.addEventListener("click", handleClick);
};

document.addEventListener("DOMContentLoaded", initMain);
