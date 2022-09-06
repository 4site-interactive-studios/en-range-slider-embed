import RangeStyle from "./sass/style.scss";
export class RangeSlider extends HTMLElement {
  private options: { [key: string]: string } = {
    min: "5", // Minimum value of the range
    minMessage: "Please insert a minimum of $5", // Message to display when the minimum value is reached
    max: "100", // Maximum value of the range
    maxMessage:
      "You can donate as much as you like, please insert the amount of your choice below", // Message to display when the maximum value is reached
    step: "1", // Increment of the range
    defaultAmount: "10", // Default amount
    currencySymbol: "", // Default currency symbol
    currencyPosition: "left", // Currency position
    oneTimeLabel: "", // Label for the one time donation
    monthlyLabel: "", // Label for the monthly donation
    annualLabel: "", // Label for the annually donation
    selectedFrequency: "onetime", // Default frequency
    buttonLabel: "Donate Now", // Label for the button
    colorBg: "", // Background color
    colorTxt: "", // Text color
    colorFormTxt: "", // Text color of the form
    colorThumb: "", // Slider Thumb color
    colorThumbHover: "", // Slider Thumb hover color
    colorThumbActive: "", // Slider Thumb active color
    colorButton: "", // Button color
    colorButtonHover: "", // Button hover color
  };
  private debugColor = "red";
  private wrapper = document.createElement("div");
  private href = this.getAttribute("href");
  private target = this.getAttribute("target") || "";
  constructor() {
    // Always call super first in constructor
    super();
    // Create a random debug color
    this.debugColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.log("EN Range Slider: Debug mode is on");
    // If there's no HREF, throw an error
    if (!this.href) {
      throw new Error("EN Range Slider: No HREF provided");
    }
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    this.wrapper.classList.add("en-range-slider-wrapper");
    shadow.appendChild(this.wrapper);
    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.appendChild(document.createTextNode(RangeStyle));
    shadow.appendChild(style);

    this.loadOptions();
    this.renderCustomColors();
    this.renderRangeSlider();
    this.addEvents();
    this.calculateAmountPosition();
  }

  private isDebug() {
    const regex = new RegExp("[\\?&]debug=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  private log(message: string) {
    if (this.isDebug())
      console.log(
        `%c${message}`,
        `color: white; background: ${this.debugColor}; font-size: 1.2rem; font-weight: bold; padding: 2px; border-radius: 2px;`
      );
  }

  private get currency() {
    if (this.options.currencySymbol !== "") return this.options.currencySymbol;
    // Get Lang attribute
    const lang = document.documentElement.lang;
    const currencies = {
      de: "€",
      es: "€",
      "en-US": "$",
      en: "$",
      "en-CA": "$",
      "en-gb": "£",
    };
    return lang && lang in currencies
      ? currencies[lang as keyof typeof currencies]
      : "$";
  }

  renderRangeSlider() {
    const slider = document.createElement("div");
    slider.classList.add("en-range-slider");
    slider.innerHTML = `
      <div class="en-range-slider__container">
        <div class="en-range-slider__min currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__min-value">${this.options.min}</span>
        </div>
        <output class="en-range-slider__amount currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__amount-value">${this.options.defaultAmount}</span>
        </output>
        <div class="en-range-slider__range">
          <input type="range" class="en-range-slider__range-input" min="${this.options.min}" max="${this.options.max}" step="${this.options.step}" value="${this.options.defaultAmount}">
        </div>
        <div class="en-range-slider__max currency-${this.options.currencyPosition}">
          <span class="en-range-slider__currency">${this.currency}</span>
          <span class="en-range-slider__max-value">${this.options.max}</span>
        </div>
      </div>
      <div class="en-range-slider__min-message">${this.options.minMessage}</div>
      <div class="en-range-slider__max-message">${this.options.maxMessage}</div>
    `;
    this.wrapper.appendChild(slider);
    const sliderForm = document.createElement("div");
    sliderForm.classList.add("en-range-slider-form");
    sliderForm.innerHTML = `
    <div class="en-range-slider__form-container">
        <div class="en-range-slider__form-frequency">
          <div class="en-range-slider__form-amount currency-${
            this.options.currencyPosition
          }">
            <span class="en-range-slider__currency">${this.currency}</span>
            <input type="text" class="en-range-slider__form-amount-input" placeholder="Amount" value="${
              this.options.defaultAmount
            }" autocomplete="off" data-lpignore="true" inputmode="decimal">
          </div>
          ${this.getFrequency("oneTimeLabel")}
          ${this.getFrequency("monthlyLabel")}
          ${this.getFrequency("annualLabel")}
          ${
            this.options.buttonLabel !== ""
              ? `<button class="en-range-slider__form-button">${this.options.buttonLabel}</button>`
              : ""
          }
          
        </div>
      </div>
    `;
    this.wrapper.appendChild(sliderForm);
  }

  private getFrequency(
    frequency: "oneTimeLabel" | "monthlyLabel" | "annualLabel"
  ) {
    if (this.options[frequency] === "") return "";
    const frequencyValues = {
      oneTimeLabel: "ONETIME",
      monthlyLabel: "MONTHLY",
      annualLabel: "ANNUAL",
    };
    const selected =
      (this.options.selectedFrequency || "").toUpperCase() ===
      frequencyValues[frequency];
    return `
          <label class="en-range-slider__form-frequency-label">
            <input type="radio" class="en-range-slider__form-frequency-input" name="frequency" value="${
              frequencyValues[frequency]
            }" ${selected ? "checked" : ""}>
            <span class="en-range-slider__form-frequency-label-text">${
              this.options[frequency]
            }</span>
          </label>
          `;
  }

  private renderCustomColors() {
    if (this.options.colorBg !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-bg",
        this.options.colorBg
      );
    }
    if (this.options.colorTxt !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-txt",
        this.options.colorTxt
      );
    }
    if (this.options.colorFormTxt !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-form-txt",
        this.options.colorFormTxt
      );
    }
    if (this.options.colorThumb !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-thumb",
        this.options.colorThumb
      );
    }
    if (this.options.colorThumbHover !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-thumb-hover",
        this.options.colorThumbHover
      );
    }
    if (this.options.colorThumbActive !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-thumb-active",
        this.options.colorThumbActive
      );
    }
    if (this.options.colorButton !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-button",
        this.options.colorButton
      );
    }
    if (this.options.colorButtonHover !== "") {
      this.wrapper.style.setProperty(
        "--en-range-slider-color-button-hover",
        this.options.colorButtonHover
      );
    }
  }

  private addEvents() {
    const rangeInput = this.wrapper?.querySelector(
      ".en-range-slider__range-input"
    ) as HTMLInputElement;
    const formAmountInput = this.wrapper?.querySelector(
      ".en-range-slider__form-amount-input"
    ) as HTMLInputElement;

    if (rangeInput) {
      rangeInput.addEventListener("input", () => {
        this.calculateAmountPosition();
      });
    }
    if (formAmountInput) {
      formAmountInput.addEventListener("change", () => {
        // Check if the value has comma
        if (formAmountInput.value.indexOf(",") > -1) {
          formAmountInput.value = formAmountInput.value.replace(",", ".");
        }
        if (+formAmountInput.value < +this.options.min) {
          formAmountInput.value = this.options.min;
        }
        this.calculateAmountPosition(formAmountInput.value);
      });
      formAmountInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (formAmountInput.value.indexOf(",") > -1) {
            formAmountInput.value = formAmountInput.value.replace(",", ".");
          }
          if (+formAmountInput.value < +this.options.min) {
            formAmountInput.value = this.options.min;
          }
          this.calculateAmountPosition(formAmountInput.value);
          return false;
        }
      });
    }
    window.addEventListener("resize", () => {
      this.calculateAmountPosition();
    });
    if (this.options.buttonLabel !== "") {
      const formButton = this.wrapper?.querySelector(
        ".en-range-slider__form-button"
      ) as HTMLButtonElement;
      if (formButton) {
        formButton.addEventListener("click", () => {
          this.goToDonationPage();
        });
      }
    }
  }
  private calculateAmountPosition(amount = "") {
    this.hideWarning();
    const rangeInput = this.wrapper?.querySelector(
      ".en-range-slider__range-input"
    ) as HTMLInputElement;
    const output = this.wrapper?.querySelector(
      ".en-range-slider__amount-value"
    ) as HTMLSpanElement;
    const amountContainer = this.wrapper?.querySelector(
      ".en-range-slider__amount"
    ) as HTMLOutputElement;

    const maxContainer = this.wrapper?.querySelector(
      ".en-range-slider__max"
    ) as HTMLDivElement;
    const minContainer = this.wrapper?.querySelector(
      ".en-range-slider__min"
    ) as HTMLDivElement;

    const maxAmount = maxContainer.querySelector(
      ".en-range-slider__max-value"
    ) as HTMLSpanElement;

    if (+rangeInput.value > 999) {
      amountContainer.classList.add("en-range-slider__amount--small");
    } else {
      amountContainer.classList.remove("en-range-slider__amount--small");
    }

    if (amount) {
      if (parseFloat(amount) > parseFloat(this.options.max)) {
        rangeInput.max = parseInt(amount).toString();
        maxAmount.innerHTML = amount;
      } else {
        rangeInput.max = this.options.max;
        maxAmount.innerHTML = this.options.max;
      }
      rangeInput.value = amount;
    }

    const amountContainerPosition =
      ((+rangeInput.value - +rangeInput.min) /
        (+rangeInput.max - +rangeInput.min)) *
        (rangeInput.offsetWidth - 30 - 30) +
      30;

    if (output && amountContainer) {
      amountContainer.style.left = `${
        amountContainerPosition < 30 ? 30 : amountContainerPosition
      }px`;
      output.innerText = rangeInput.value;
      if (!amount) {
        const amountInput = this.wrapper?.querySelector(
          ".en-range-slider__form-amount-input"
        ) as HTMLInputElement;
        if (amountInput) amountInput.value = rangeInput.value;
      }
    }
    if (maxContainer) {
      maxContainer.style.opacity =
        parseInt(rangeInput.value) > parseInt(rangeInput.max) - 15 ? "0" : "1";
    }
    if (minContainer) {
      minContainer.style.opacity = amountContainerPosition < 64 ? "0" : "1";
    }
    if (rangeInput.value === rangeInput.min) this.showMinWarning();
    if (rangeInput.value === rangeInput.max) this.showMaxWarning();
  }

  private showMinWarning() {
    const minWarning = this.wrapper?.querySelector(
      ".en-range-slider__min-message"
    ) as HTMLDivElement;
    if (minWarning) {
      minWarning.classList.add("show");
    }
  }
  private showMaxWarning() {
    const maxWarning = this.wrapper?.querySelector(
      ".en-range-slider__max-message"
    ) as HTMLDivElement;
    if (maxWarning) {
      maxWarning.classList.add("show");
    }
  }
  private hideWarning() {
    const minWarning = this.wrapper?.querySelector(
      ".en-range-slider__min-message"
    ) as HTMLDivElement;
    const maxWarning = this.wrapper?.querySelector(
      ".en-range-slider__max-message"
    ) as HTMLDivElement;
    if (minWarning && maxWarning) {
      minWarning.classList.remove("show");
      maxWarning.classList.remove("show");
    }
  }

  private goToDonationPage() {
    const href = new URL(this.href);
    // Append the amount and frequency to the url
    href.searchParams.append("transaction.donationAmt", this.getAmount());
    const frequency = this.wrapper?.querySelector(
      "[name='frequency']:checked"
    ) as HTMLInputElement;
    if (frequency) {
      href.searchParams.append("transaction.recurrfreq", frequency.value);
      if (frequency.value !== "ONETIME") {
        href.searchParams.append("transaction.recurrpay", "Y");
      }
    }
    if (this.target && this.target !== "_self") {
      window.open(href.toString(), this.target);
      return;
    }
    window.location.href = href.toString();
  }

  private getAmount() {
    const rangeInput = this.wrapper?.querySelector(
      ".en-range-slider__range-input"
    ) as HTMLInputElement;
    return rangeInput.value;
  }

  private loadOptions() {
    const options = this.dataset;
    if (options) {
      for (const key in options) {
        if (key in this.options) {
          this.options[key] = options[key];
          this.log(`EN Range Slider: ${key} = ${options[key]}`);
        }
      }
    }
  }
}
