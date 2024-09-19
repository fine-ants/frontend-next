const colors = {
  white: "#FFFFFF",
  white04: "#FFFFFF0A",
  white08: "#FFFFFF20",
  gray50: "#F5F6FC",
  gray100: "#EBECF4",
  gray200: "#E0E2EC",
  gray300: "#D1D2DE",
  gray400: "#B7B8C3",
  gray40016: "#B7B8C328",
  gray500: "#9E9FA9",
  gray600: "#75767F",
  gray700: "#525361",
  gray800: "#373840",
  gray900: "#212229",
  black: "#000000",
  blue50: "#E8EAFA",
  blue100: "#C4CAF3",
  blue200: "#9CA8EA",
  blue300: "#7186E3",
  blue400: "#4D6ADC",
  blue500: "#1F4FD5",
  blue50008: "#1F4FD520",
  blue600: "#1847CA",
  blue700: "#013DBE",
  blue800: "#001DA0",
  blue900: "#001DA0",
  green16: "#16C64828",
  green50: "#DAF6E2",
  green500: "#16C648",
  green800: "#375044",
  red16: "#FD494928",
  red50: "#FEE2E2",
  red500: "#FD4949",
  red800: "#53353C",
  orange16: "#FE8B2028",
  orange50: "#FFECDB",
  orange500: "#FE8B20",
  orange800: "#523F32",
  kakaoYellow: "#FEE500",
  naverGreen: "#02bd34",
};

const font = {
  display1: `
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    letter-spacing: -0.02rem;
  `,
  display2: `
    font-weight: 700;
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -0.02rem;
  `,
  display3: `
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: -0.02rem;
  `,

  heading1: `
    font-weight: 500;
    font-size: 48px;
    line-height: 58px;
    letter-spacing: -0.02rem;
  `,
  heading2: `
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: -0.02rem;
  `,
  heading3: `
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.02rem;
  `,
  heading4: `
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02rem;
  `,

  title1: `
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.02rem;
  `,
  title2: `
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.02rem;
  `,
  title3: `
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.02rem;
  `,
  title4: `
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02rem;
  `,
  title5: `
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02rem;
  `,
  title6: `
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: -0.02rem;
  `,
  title7: `
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.02rem;
  `,

  body1: `
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
  `,
  body2: `
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `,
  body3: `
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
  `,
  body4: `
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  `,

  button1: `
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02rem;
  `,
  button2: `
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02rem;
  `,
};

const designSystem = {
  color: {
    primary: {
      blue50: colors.blue50,
      blue100: colors.blue100,
      blue200: colors.blue200,
      blue300: colors.blue300,
      blue400: colors.blue400,
      blue500: colors.blue500,
      blue50008: colors.blue50008,
      blue600: colors.blue600,
      blue700: colors.blue700,
      blue800: colors.blue800,
      blue900: colors.blue900,
    },
    neutral: {
      white: colors.white,
      white04: colors.white04,
      white08: colors.white08,
      gray50: colors.gray50,
      gray100: colors.gray100,
      gray200: colors.gray200,
      gray300: colors.gray300,
      gray400: colors.gray400,
      gray40016: colors.gray40016,
      gray500: colors.gray500,
      gray600: colors.gray600,
      gray700: colors.gray700,
      gray800: colors.gray800,
      gray900: colors.gray900,
      black: colors.black,
    },
    state: {
      green16: colors.green16,
      green50: colors.green50,
      green500: colors.green500,
      green800: colors.green800,
      red16: colors.red16,
      red50: colors.red50,
      red500: colors.red500,
      red800: colors.red800,
      orange16: colors.orange16,
      orange50: colors.orange50,
      orange500: colors.orange500,
      orange800: colors.orange800,
    },
    kakao: {
      primary: colors.kakaoYellow,
    },
    naver: {
      primary: colors.naverGreen,
    },
  },

  font,
};

export default designSystem;

type RGB =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number},${number},${number})`;

type RGBA =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;

type HEX = `#${string}`;

export type DesignSystemColorType = keyof typeof colors;

export type ColorType = DesignSystemColorType | RGB | RGBA | HEX;

export function validateColor(color: ColorType): boolean {
  const colorRegex =
    /^(#([A-Fa-f0-9]{6}([A-Fa-f0-9]{2})?|[A-Fa-f0-9]{3})|rgb\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\))$/;

  return colorRegex.test(color);
}

export function getColor(color: ColorType) {
  const colorValue = colors[color as DesignSystemColorType];

  if (colorValue) {
    return colorValue;
  } else if (validateColor(color)) {
    return color;
  }

  throw new Error(`"${color}"은 유효하지 않은 색상 값입니다.`);
}

export const parseFontString = (fontString: string): Record<string, string> => {
  return fontString
    .trim()
    .split(";")
    .filter(Boolean)
    .reduce((acc: Record<string, string>, style) => {
      const [key, value] = style.split(":").map((item) => item.trim());
      if (key && value) {
        const camelCaseKey = key.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase()
        );
        acc[camelCaseKey] = value;
      }
      return acc;
    }, {});
};
