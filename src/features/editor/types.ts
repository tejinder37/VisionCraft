import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];
export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];
export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "pen"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};
export const DIANMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};
export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};
export const TEXT_OPTIONS = {
  type: "text-box",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontfamily: FONT_FAMILY,
};

export const PENTAGON_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const HEXAGON_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const STAR_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  numPoints: 5,
  innerRadius: 100,
  outerRadius: 200,
};

export const ARROW_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 200,
  angle: 0,
};

export const ELLIPSE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  rx: 200,
  ry: 100,
  angle: 0,
};

export const PARALLELOGRAM_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 200,
  skewX: 20,
  angle: 0,
};

export const TRAPEZOID_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 200,
  angle: 0,
};

export const CROSS_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const HEART_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const CLOUD_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 200,
  angle: 0,
};
export interface EditorHookProps {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: (value: {
    json: string;
    height: number;
    width: number;
  }) => void;
}

export type BuildEditorProps = {
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  autoZoom: () => void;
  copy: () => void;
  paste: () => void;
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  fontFamily: string;
  setFillColor: (values: string) => void;
  setStrokeColor: (values: string) => void;
  setStrokeWidth: (values: number) => void;
  setFontFamily: (values: string) => void;
  setStrokeDashArray: (values: number[]) => void;
  selectedObjects: fabric.Object[];
};

export interface Editor {
  savePng: () => void;
  saveJpg: () => void;
  saveSvg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  getWorkspace: () => fabric.Object | undefined;
  autoZoom: () => void;
  changeSize: (value: { width: number; height: number }) => void;
  changeBackground: (value: string) => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  onCopy: () => void;
  onPaste: () => void;
  addImage: (values: string) => void;
  delete: () => void;
  changeTextAlign: (values: string) => void;
  changeImageFilter: (value: string) => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  bringForward: () => void;
  sendBackwards: () => void;
  changeFillColor: (values: string) => void;
  changeStrokeWidth: (values: number) => void;
  changeFontSize: (values: number) => void;
  changeFontStyle: (values: string) => void;
  changeFontLinethrough: (values: boolean) => void;
  changeFontUnderline: (values: boolean) => void;
  changeFontWeight: (values: number) => void;
  changeStrokeColor: (values: string) => void;
  changeFontfamily: (values: string) => void;
  changeStrokeDashArray: (values: number[]) => void;
  changeOpacity: (value: number) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addPentagon: () => void;
  addHexagon: () => void;
  addStar: () => void;
  addArrow: () => void;
  // addEllipse: () => void;
  addParallelogram: () => void;
  addTrapezoid: () => void;
  addCross: () => void;
  addHeart: () => void;
  addCloud: () => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveTextAlign: () => string;
  getActiveFontFamily: () => string;
  getActiveFontLinethrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveStrokeWidth: () => number;
  getActiveFontSize: () => number;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
}
