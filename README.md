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

## LICENSE

MIT LICENSE
