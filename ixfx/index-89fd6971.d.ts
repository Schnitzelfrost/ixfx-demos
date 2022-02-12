import { D as Drawing } from './Drawing-c34ace63';
import { b as CirclePositioned } from './Circle-f30fc0a6';
import { a as Point, f as Line } from './Rect-320e55dc';
import { M as MapOfMutable, C as CircularArray } from './Interfaces-817120ae';
import * as d3Colour from 'd3-color';

declare type MarkerOpts = DrawingOpts$1 & {
    readonly id: string;
    readonly markerWidth?: number;
    readonly markerHeight?: number;
    readonly orient?: string;
    readonly viewBox?: string;
    readonly refX?: number;
    readonly refY?: number;
};
declare type DrawingOpts$1 = {
    readonly strokeStyle?: string;
    readonly fillStyle?: string;
    readonly debug?: boolean;
    readonly strokeWidth?: number;
    readonly strokeDash?: string;
};
declare type LineDrawingOpts = DrawingOpts$1 & PathDrawingOpts;
declare type PathDrawingOpts = {
    readonly markerEnd?: MarkerOpts;
    readonly markerStart?: MarkerOpts;
    readonly markerMid?: MarkerOpts;
};
declare type TextDrawingOpts = DrawingOpts$1 & {
    readonly anchor?: `start` | `middle` | `end`;
    readonly align?: `text-bottom` | `text-top` | `baseline` | `top` | `hanging` | `middle`;
};
declare type TextPathDrawingOpts = TextDrawingOpts & {
    readonly method?: `align` | `stretch`;
    readonly side?: `left` | `right`;
    readonly spacing?: `auto` | `exact`;
    readonly startOffset?: number;
    readonly textLength?: number;
};
/**
 * Creates and appends a SVG element.
 * If `queryOrExisting` is specified, element will be returned if it already exists.
 * @param parent Parent element
 * @param type Type of SVG element
 * @param queryOrExisting Query, eg `#id`
 * @returns
 */
declare const createOrResolve: <V extends SVGElement>(parent: SVGElement, type: string, queryOrExisting?: string | V | undefined) => V;
/**
 * Adds definition if it doesn't already exist
 * @param parent
 * @param id
 * @param creator
 * @returns
 */
declare const getOrCreateDefX: (parent: SVGElement, id: string, creator: () => SVGElement | undefined) => SVGElement;
/**
 * Creates an element of `type` and with `id` (if specified)
 * @param type Element type, eg `circle`
 * @param id Optional id to assign to element
 * @returns Element
 */
declare const createEl: <V extends SVGElement>(type: string, id?: string | undefined) => V;
declare const applyPathOpts: (elem: SVGElement, opts: PathDrawingOpts) => void;
/**
 * Applies drawing options to given SVG element.
 *
 * Use to easily assign fillStyle, strokeStyle, strokeWidth.
 * @param elem Element
 * @param opts Drawing options
 */
declare const applyOpts: (elem: SVGElement, opts: DrawingOpts$1) => void;
declare const svg: (parent: SVGElement, parentOpts?: DrawingOpts$1 | undefined) => {
    text: (text: string, pos: Point, opts?: TextDrawingOpts | undefined, queryOrExisting?: string | SVGTextElement | undefined) => SVGTextElement;
    textPath: (pathRef: string, text: string, opts?: TextDrawingOpts | undefined, queryOrExisting?: string | SVGTextPathElement | undefined) => SVGTextPathElement;
    line: (line: Line, opts?: LineDrawingOpts | undefined, queryOrExisting?: string | SVGLineElement | undefined) => SVGLineElement;
    circle: (circle: CirclePositioned, opts?: DrawingOpts$1 | undefined, queryOrExisting?: string | SVGCircleElement | undefined) => SVGCircleElement;
    path: (svgStr: string | readonly string[], opts?: DrawingOpts$1 | undefined, queryOrExisting?: string | SVGPathElement | undefined) => SVGPathElement;
    grid: (center: Point, spacing: number, width: number, height: number, opts?: DrawingOpts$1 | undefined) => void;
    query: <V extends SVGElement>(selectors: string) => V | null;
    width: number;
    readonly parent: SVGElement;
    height: number;
    clear: () => void;
};

type Svg_MarkerOpts = MarkerOpts;
type Svg_LineDrawingOpts = LineDrawingOpts;
type Svg_PathDrawingOpts = PathDrawingOpts;
type Svg_TextDrawingOpts = TextDrawingOpts;
type Svg_TextPathDrawingOpts = TextPathDrawingOpts;
declare const Svg_createOrResolve: typeof createOrResolve;
declare const Svg_getOrCreateDefX: typeof getOrCreateDefX;
declare const Svg_createEl: typeof createEl;
declare const Svg_applyPathOpts: typeof applyPathOpts;
declare const Svg_applyOpts: typeof applyOpts;
declare const Svg_svg: typeof svg;
declare namespace Svg {
  export {
    Svg_MarkerOpts as MarkerOpts,
    DrawingOpts$1 as DrawingOpts,
    Svg_LineDrawingOpts as LineDrawingOpts,
    Svg_PathDrawingOpts as PathDrawingOpts,
    Svg_TextDrawingOpts as TextDrawingOpts,
    Svg_TextPathDrawingOpts as TextPathDrawingOpts,
    Svg_createOrResolve as createOrResolve,
    Svg_getOrCreateDefX as getOrCreateDefX,
    Svg_createEl as createEl,
    Svg_applyPathOpts as applyPathOpts,
    Svg_applyOpts as applyOpts,
    Svg_svg as svg,
  };
}

/**
 * Manage a set of colours. Uses CSS variables as a fallback if colour is not added
 *
 */
declare type Palette = {
    setElementBase(el: Element): void;
    has(key: string): boolean;
    /**
     * Returns a colour by name.
     *
     * If the colour is not found:
     *  1. Try to use a CSS variable `--key`, or
     *  2. The next fallback colour is used (array cycles)
     *
     * @param key
     * @returns
     */
    get(key: string, fallback?: string): string;
    /**
     * Gets a colour by key, adding and returning fallback if not present
     * @param key Key of colour
     * @param fallback Fallback colour if key is not found
     */
    getOrAdd(key: string, fallback?: string): string;
    /**
     * Adds a colour with a given key
     *
     * @param key
     * @param colour
     */
    add(key: string, value: string): void;
    alias(from: string, to: string): void;
};
declare const create: (fallbacks?: readonly string[] | undefined) => Palette;
/**
 * Gets a CSS variable.
 * @example Fetch --accent variable, or use `yellow` if not found.
 * ```
 * getCssVariable(`accent`, `yellow`);
 * ```
 * @param name Name of variable. Do not starting `--`
 * @param fallbackColour Fallback colour if not found
 * @param root  Element to search variable from
 * @returns Colour or fallback.
 */
declare const getCssVariable: (name: string, fallbackColour?: string, root?: HTMLElement | undefined) => string;

type Palette$1_Palette = Palette;
declare const Palette$1_create: typeof create;
declare const Palette$1_getCssVariable: typeof getCssVariable;
declare namespace Palette$1 {
  export {
    Palette$1_Palette as Palette,
    Palette$1_create as create,
    Palette$1_getCssVariable as getCssVariable,
  };
}

declare type Series = {
    min: number;
    max: number;
    range: number;
    name: string;
};
declare type DrawingOpts = PlotOpts & {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    dataXScale?: number;
    yLabelWidth: number;
    palette: Palette;
    textHeight: number;
    capacity: number;
    coalesce: boolean;
};
declare type PlotOpts = {
    autoSizeCanvas?: boolean;
    style?: `connected` | `dots`;
    palette?: Palette;
    capacity?: number;
    showYAxis?: boolean;
    yAxes?: string[] | string;
    textHeight?: number;
    lineWidth?: number;
    coalesce?: boolean;
    fixedRange?: [number, number];
    dataXScale?: number;
};
declare const createScales: (buffer: MapOfMutable<number, CircularArray<number>>) => Series[];
declare const add: (buffer: MapOfMutable<number, CircularArray<number>>, value: number, series?: string) => void;
declare const draw: (buffer: MapOfMutable<number, CircularArray<number>>, drawing: DrawingOpts) => void;
declare const drawSeriesAxis: (series: Series, drawing: DrawingOpts) => void;
declare const drawSeries: (series: Series, values: CircularArray<number>, drawing: DrawingOpts) => void;
/**
 * Creates a simple horizontal data plot within a DIV.
 *
 * ```
 * const plot = plot2(`#parentDiv`);
 * plot.add(10);
 * plot.clear();
 *
 * // Plot data using series
 * plot.add(-1, `temp`);
 * plot.add(0.4, `humidty`);
 * ```
 *
 * Options can be specified to customise plot
 * ```
 * const plot = plot2(`#parentDiv`, {
 *  capacity: 100,     // How many data points to store (default: 10)
 *  showYAxis: false,  // Toggle whether y axis is shown (default: true)
 *  lineWidth: 2,      // Width of plot line (default: 2)
 *  yAxes:  [`temp`],  // Only show these y axes (by default all are shown)
 *  palette: Palette,  // Colour palette instance to use
 *  coalesce: true,    // If true, sub-pixel data points are skipped, improving performance for dense plots at the expense of plot precision
 * });
 * ```
 *
 * By default, will attempt to use CSS variable `--series[seriesName]` for axis colours. -axis for titles.
 * @param {string} parentElOrQuery
 * @param {PlotOpts} opts
 * @return {*}
 */
declare const plot: (parentElOrQuery: string | HTMLElement, opts: PlotOpts) => Plotter;
declare type Plotter = {
    add(value: number, series?: string, skipDrawing?: boolean): void;
    clear(): void;
    dispose(): void;
};

type Plot_PlotOpts = PlotOpts;
declare const Plot_createScales: typeof createScales;
declare const Plot_add: typeof add;
declare const Plot_draw: typeof draw;
declare const Plot_drawSeriesAxis: typeof drawSeriesAxis;
declare const Plot_drawSeries: typeof drawSeries;
declare const Plot_plot: typeof plot;
type Plot_Plotter = Plotter;
declare namespace Plot {
  export {
    Plot_PlotOpts as PlotOpts,
    Plot_createScales as createScales,
    Plot_add as add,
    Plot_draw as draw,
    Plot_drawSeriesAxis as drawSeriesAxis,
    Plot_drawSeries as drawSeries,
    Plot_plot as plot,
    Plot_Plotter as Plotter,
  };
}

declare type Cmyk = readonly [number, number, number, number];
declare type Lab = readonly [number, number, number];
declare type Rgb$1 = readonly [number, number, number];
declare type DictColour = {
    readonly name: string;
    readonly combinations: ReadonlyArray<number>;
    readonly swatch: number;
    readonly cmyk: Cmyk;
    readonly lab: Lab;
    readonly rgb: Rgb$1;
    readonly hex: string;
};
declare const randomPalette: (minColours?: number) => readonly DictColour[];

type DictionaryOfColourCombinations_DictColour = DictColour;
declare const DictionaryOfColourCombinations_randomPalette: typeof randomPalette;
declare namespace DictionaryOfColourCombinations {
  export {
    DictionaryOfColourCombinations_DictColour as DictColour,
    DictionaryOfColourCombinations_randomPalette as randomPalette,
  };
}

declare type Hsl = {
    h: number;
    s: number;
    l: number;
};
declare type Rgb = {
    r: number;
    g: number;
    b: number;
};
declare type Spaces = `hsl` | `rgb` | `lab` | `hcl` | `cubehelix`;
declare type Colour = d3Colour.RGBColor | d3Colour.HSLColor;
declare type Colourish = string | d3Colour.ColorCommonInstance;
declare const toHex: (colour: Colour) => string;
declare const opacity: (colour: Colourish, amt: number) => string;
declare const interpolate: (amount: number, from: Colourish, to: Colourish, opts?: InterpolationOpts) => string;
declare type InterpolationOpts = {
    /**
     * Gamma correction. Eg 4 brightens values. Only applies to rgb and cubehelix
     * [Read more](https://github.com/d3/d3-interpolate#interpolate_gamma)
     */
    gamma?: number;
    /**
     * Colour space
     */
    space: Spaces;
    /**
     * If true, interpolation happens the longer distance. Only applies to hsl, hcl and cubehelix
     */
    long?: boolean;
};
declare const scale: (steps: number, from: Colourish, to: Colourish, opts?: InterpolationOpts) => string[];

type Colour$1_Hsl = Hsl;
type Colour$1_Rgb = Rgb;
type Colour$1_Spaces = Spaces;
type Colour$1_Colour = Colour;
type Colour$1_Colourish = Colourish;
declare const Colour$1_toHex: typeof toHex;
declare const Colour$1_opacity: typeof opacity;
declare const Colour$1_interpolate: typeof interpolate;
type Colour$1_InterpolationOpts = InterpolationOpts;
declare const Colour$1_scale: typeof scale;
declare namespace Colour$1 {
  export {
    Colour$1_Hsl as Hsl,
    Colour$1_Rgb as Rgb,
    Colour$1_Spaces as Spaces,
    Colour$1_Colour as Colour,
    Colour$1_Colourish as Colourish,
    Colour$1_toHex as toHex,
    Colour$1_opacity as opacity,
    Colour$1_interpolate as interpolate,
    Colour$1_InterpolationOpts as InterpolationOpts,
    Colour$1_scale as scale,
  };
}

declare const index_Drawing: typeof Drawing;
declare const index_Svg: typeof Svg;
declare const index_Plot: typeof Plot;
declare const index_DictionaryOfColourCombinations: typeof DictionaryOfColourCombinations;
declare namespace index {
  export {
    Palette$1 as Palette,
    Colour$1 as Colour,
    index_Drawing as Drawing,
    index_Svg as Svg,
    index_Plot as Plot,
    index_DictionaryOfColourCombinations as DictionaryOfColourCombinations,
  };
}

export { Colour$1 as C, DictionaryOfColourCombinations as D, Palette$1 as P, Svg as S, Plot as a, index as i };
