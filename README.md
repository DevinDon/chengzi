# Chengzi Tools

## 如何在项目中启用 TailWindCSS

```shell
npm i -D tailwindcss tailwind-styled-components
npx tailwindcss init -p
```

```js
// tailwind.config.js
module.exports = {
  purge: [
    './apps/**/*/src/**/*.tsx',
    './libs/**/*/src/**/*.tsx',
  ],
  darkMode: 'media', // false or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

```tsx
// apps/xxx/src/main.tsx
import 'tailwindcss/tailwind.css';
```

```tsx
// some/component.tsx
import styled from 'styled-components';
import tw from 'tailwind-styled-components';


const StyledHeading = tw(
  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `
)`
  shadow-md
`;
```

## THE MIT LICENSE

Copyright 2018+ Devin Don

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
