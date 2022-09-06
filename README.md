# Engaging Networks Delicious Amount Range Slider - Embed

This project gives you a beautiful and completely customizable Donation Amount Range Slider for your website.

## How to use

1. Add the script below to your website:

```html
<script
  type="text/javascript"
  src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/44/en-range-slider-embed.js"
  defer
></script>
```

2. You need to add the `range-slider` tag where you want to display the slider:

```html
<range-slider href="https://support.peta.org/page/1828/donate/1?mode=DEMO" />
```

You have a lot of options to customize the slider. See below for more information.

## Attributes

The range slider has two main attributes:

- `href` - **REQUIRED** The URL of the page where the user will be redirected when he clicks on the button. If not specified, the range slider will not render and will throw an error in the console.
- `target` - The target of the donation button. If not specified, the target URL will open in the same window. Possible values are `_blank` and `_self`.

## Slider Options

Every option can be set as a data attribute on the `range-slider` tag.

- **min**: The minimum amount that can be selected. Defaults to `5`.
- **min-message**: The message that will be displayed when the minimum amount is selected. Defaults to `Please insert a minimum of $5`.
- **max**: The maximum amount that can be selected. Defaults to `100`.
- **max-message**: The message that will be displayed when the maximum amount is selected. Defaults to `You can donate as much as you like, please insert the amount of your choice below`.
- **step**: The amount that will be added to the slider when the user drags the handle. Defaults to `1`.
- **default-amount**: The amount that will be selected by default. Defaults to `10`.
- **currency-symbol**: The currency symbol that will be displayed. Defaults to the correct symbol for the Engaging Networks "Payment Currency" hidden field.
- **currency-position**: The position of the currency symbol. Defaults to `left`.
- **one-time-label**: The label for the one time button. Defaults to empty. If not set, the button will not be displayed.
- **monthly-label**: The label for the monthly button. Defaults to empty. If not set, the button will not be displayed.
- **annual-label**: The label for the annual button. Defaults to empty. If not set, the button will not be displayed.
- **selected-frequency**: The frequency that will be selected by default. Defaults to `onetime`. Possible values are `onetime`, `monthly` and `annual`.
- **button-label**: The label for the button. Defaults to `Donate Now`.

## Color Options

You can also set data attributes on the `range-slider` tag to change the colors of the slider.

- **color-bg**: The background color of the slider track. Defaults to `#009fe3`.
- **color-txt**: The text color of the slider track. Defaults to `#fff`.
- **color-form-txt**: The text color of the form message text. Defaults to `#aaaaaa`.
- **color-thumb**: The color of the slider handle. Defaults to `#ffb800`.
- **color-thumb-hover**: The color of the slider handle when the user hovers over it. Defaults to `#e5a500`.
- **color-thumb-active**: The color of the slider handle when the user clicks on it. Defaults to `#008fcc`.
- **color-button**: The color of the button. Defaults to `#009fe3`.
- **color-button-hover**: The color of the button when the user hovers over it. Defaults to `#007bb0`.

**Example of the `range-slider` tag with all options set:**

```html
<range-slider
  data-min="1"
  data-min-message="We only accept payments of $5 or more"
  data-max="100"
  data-max-message="You can give more than $100 using the field below"
  data-step="1"
  data-default-amount="50"
  data-currency-symbol="$"
  data-currency-position="left"
  data-one-time-label="One time"
  data-monthly-label="Monthly"
  data-annual-label="Annual"
  data-selected-frequency="monthly"
  data-button-label="Give"
  data-color-bg="#0E1F40"
  data-color-txt="#FFF"
  data-color-form-txt="#333"
  data-color-thumb="#3049D9"
  data-color-thumb-hover="#578BF2"
  data-color-thumb-active="#91B2F2"
  data-color-button="#021E73"
  data-color-button-hover="#0E1F40"
  href="https://support.peta.org/page/1828/donate/1?mode=DEMO"
  target="_blank"
/>
```

### IMPORTANT: You can use this project on any website, but the `href` attribute must be a URL to an Engaging Networks Donation Page.

## Development

Your js code must be on the `src/range-slider.ts` file. Styling changes must be on `src/sass`.

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build` - Builds the project

It's going to create a `dist` folder, where you can get the `en-range-slider-embed.js` file and publish it.

## Hot Module Reloading

1. `npm run start` - Starts the server with hot reloading enabled

## Demo

https://apps.4sitestudios.com/fernando/peta/range-slider/

It's currently published on PETA Germany EN Account:  
https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/44/en-range-slider-embed.js
