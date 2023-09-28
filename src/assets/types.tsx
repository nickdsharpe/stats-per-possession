import { CSSObject } from "styled-components";

export interface TableStyles {
  table?: {
    style: CSSObject;
  };
  tableWrapper?: {
    style: CSSObject;
  };
  responsiveWrapper?: {
    style: CSSObject;
  };
  header?: {
    style: CSSObject;
  };
  subHeader?: {
    style: CSSObject;
  };
  head?: {
    style: CSSObject;
  };
  headRow?: {
    style?: CSSObject;
    denseStyle?: CSSObject;
  };
  headCells?: {
    style?: CSSObject;
    draggingStyle?: CSSObject;
  };
  contextMenu?: {
    style?: CSSObject;
    activeStyle?: CSSObject;
  };
  cells?: {
    style: CSSObject;
    draggingStyle?: CSSObject;
  };
  rows?: {
    style?: CSSObject;
    selectedHighlightStyle?: CSSObject;
    denseStyle?: CSSObject;
    highlightOnHoverStyle?: CSSObject;
    stripedStyle?: CSSObject;
  };
  expanderRow?: {
    style: CSSObject;
  };
  expanderCell?: {
    style: CSSObject;
  };
  expanderButton?: {
    style: CSSObject;
  };
  pagination?: {
    style?: CSSObject;
    pageButtonsStyle?: CSSObject;
  };
  noData?: {
    style: CSSObject;
  };
  progress?: {
    style: CSSObject;
  };
}

// Theming
type ThemeText = {
  primary: string;
  secondary: string;
  disabled: string;
};

type ThemeBackground = {
  default: string;
};

type ThemeContext = {
  background: string;
  text: string;
};

type ThemeDivider = {
  default: string;
};

type ThemeButton = {
  default: string;
  focus: string;
  hover: string;
  disabled: string;
};

type ThemeSelected = {
  default: string;
  text: string;
};

type ThemeHighlightOnHover = {
  default: string;
  text: string;
};

type ThemeStriped = {
  default: string;
  text: string;
};

export type Themes = string;

export interface Theme {
  text: ThemeText;
  background: ThemeBackground;
  context: ThemeContext;
  divider: ThemeDivider;
  button: ThemeButton;
  selected: ThemeSelected;
  highlightOnHover: ThemeHighlightOnHover;
  striped: ThemeStriped;
}
