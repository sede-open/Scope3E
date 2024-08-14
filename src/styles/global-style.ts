import { createGlobalStyle } from 'styled-components';
import { Black, White } from './colours';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'exampleBold';
    src: local('exampleBold'),
      url(/assets/fonts/example-font/exampleBold.tff) format('tff'),
      url(/assets/fonts/example-font/exampleBold.woff) format('woff');
  }

  @font-face {
    font-family: 'exampleBook';
    src: local('exampleBook'),
      url(/assets/fonts/example-font/exampleBook.tff) format('tff'),
      url(/assets/fonts/example-font/exampleBook.woff) format('woff');
  }

  @font-face {
    font-family: 'exampleMedium';
    src: local('exampleMedium'),
      url(/assets/fonts/example-font/exampleMedium.tff) format('tff'),
      url(/assets/fonts/example-font/exampleMedium.woff) format('woff');
  }

  @font-face {
    font-family: 'exampleHeavy';
    src: local('exampleHeavy'),
      url(/assets/fonts/example-font/exampleHeavy.tff) format('tff'),
      url(/assets/fonts/example-font/exampleHeavy.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNext';
    src: local('AvenirNext'),
      url(/assets/fonts/avenir/AvenirNext-Regular.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNextBold';
    src: local('AvenirNextBold'),
      url(/assets/fonts/avenir/AvenirNext-Bold.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNextMedium';
    src: local('AvenirNextMedium'),
      url(/assets/fonts/avenir/AvenirNext-Medium.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNextHeavy';
    src: local('AvenirNextHeavy'),
      url(/assets/fonts/avenir/AvenirNext-Heavy.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNextDemiBold';
    src: local('AvenirNextDemiBold'),
      url(/assets/fonts/avenir/AvenirNext-DemiBold.woff) format('woff');
  }

  @font-face {
    font-family: 'AvenirNextUltraLight';
    src: local('AvenirNextUltraLight'),
      url(/assets/fonts/avenir/AvenirNext-UltraLight.woff) format('woff');
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    line-height: 140%;
    margin: 0;
    padding: 0;
  }

  // this is the shared style
  html {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  body {
    background-color: ${White};
    color: ${Black};
    font-family: Arial, sans-serif;
    height: 100%;
    width: 100%;
    font-size: 0.875rem;
    margin: 0;
    padding: 0;
  }

  #__next {
    height: 100%;
  }

  ul {
    list-style-type: none;
  }

  button {
    background: none;
    border: none;
  }
`;
