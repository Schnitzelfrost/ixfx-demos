/**
 * pixels-overlay: draws on top of a camera feed
 * 
 * Please see README.md in parent folder.
 */
import {Camera} from '../../ixfx/io.js';
import {Video} from '../../ixfx/visual.js';
import {intervalTracker} from '../../ixfx/temporal.js';

/**
 * Define settings
 */
const settings = {
  // Difference in grayscale value to count as a changed pixel
  threshold: 30,
  // If true, the differencing is shown. If false, just the difference calculation is shown
  visualise: true,
  frameIntervalTracker: intervalTracker(`fps`, 100),
  // HTML Elements
  /** @type {HTMLCanvasElement} */
  canvasEl: document.getElementById(`canvas`),
  lblFps: document.getElementById(`lblFps`),
  lblDifferences: document.getElementById(`lblDifferences`)
}

/**
 * Define state
 */
let state = {
  fps: 0,
  lastFrame: new Uint8ClampedArray(),
  differences: 0
}

/**
 * Uses calculated state to update labels
 */
const draw = () => {
  const {fps, differences} = state;
  const {lblFps, lblDifferences} = settings;
  lblFps.innerText = `FPS: ${fps}`;
  lblDifferences.innerText = `Differences: ${Math.round(differences * 100)}%`;
}


/**
 * In this simple frame processor, the current frame is compared
 * to the last frame. Pixels are compared to get the amount of change
 * frame-on-frame.
 * 
 * @param {ImageData} frame 
 * @param {CanvasRenderingContext2D} ctx
 */
const update = (frame, ctx) => {
  const {data} = frame;
  const {lastFrame} = state;
  const {threshold, frameIntervalTracker, visualise} = settings;
  let differences = 0;
  if (lastFrame.length === 0) {
    // No previous frame
  } else {
    // Compare to previous frame

    // Count of pixels which are deemed different
    differences = 0;

    const w = frame.width;
    const h = frame.height;
    ctx.fillStyle = `magenta`;

    // Loop left to right of frame
    for (let x = 0; x < w; x++) {
      // ...and top-to-bottom
      for (let y = 0; y < h; y++) {
        const indexes = rgbaIndexes(w, x, y);
        const pixel = rgbaValues(data, indexes);
        const pixelGray = grayscale(pixel);

        // Get the grayscale value of the same pixel in last frame
        const lastFramePixelGray = grayscale(rgbaValues(lastFrame, indexes));

        // Calculate absolute difference (ignore if it is above/below)
        const diff = Math.abs(pixelGray - lastFramePixelGray);

        // If the difference meets our threshold, count it
        if (diff > threshold) {
          differences++;
          // ...and if we should, colour that pixel
          if (visualise) ctx.fillRect(x, y, 1, 1);
        }
      }
    }

    // Get a proportional difference, dividing by total number of pixels
    differences /= (w * h);
  }

  // Keep track of how long it takes us to process frames
  frameIntervalTracker.mark();

  // Update state with latest calculations
  state = {
    ...state,
    fps: Math.round(1000 / frameIntervalTracker.avg),
    lastFrame: data,
    differences
  };
}

/**
 * Get array indexes for pixel at x,y. This is four indexes,
 * for R, G, B and A.
 * @param {number} width Width of frame
 * @param {number} x X position
 * @param {number} y Y position
 * @returns number[]
 */
const rgbaIndexes = (width, x, y) => {
  const p = y * (width * 4) + x * 4;
  return [p, p + 1, p + 2, p + 3]
}

/**
 * Get the pixel values for a set of indexes
 * @param Uint8ClampedArray frame 
 * @param {number[]} indexes 
 * @returns number[]
 */
const rgbaValues = (frame, indexes) => [
  frame[indexes[0]],
  frame[indexes[1]],
  frame[indexes[2]],
  frame[indexes[3]]
];

/**
 * Calculates grayscale value of a pixel (ignoring alpha)
 * @param {number[]} values 
 * @returns number
 */
const grayscale = (values) => (values[0] + values[1] + values[2]) / 3;


/**
 * Starts video stream
 */
const startVideo = async () => {
  const {canvasEl, visualise} = settings;
  const {videoEl, dispose} = await Camera.start();
  const ctx = canvasEl.getContext(`2d`);
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  // Hide canvas if visualise is turned off
  if (!visualise) canvasEl.style.display = `none`;

  try {
    // Video.frames generator loops forever, returning ImageData from video stream
    for await (const frame of Video.frames(videoEl, {canvasEl})) {
      // Update calculations
      update(frame, ctx);

      // Update labels
      draw();
    }
  } catch (ex) {
    console.error(ex);

    // Clean up camera
    dispose();
  }
}

const setup = () => {
  // Attempt to start video stream when button is pressed
  document.getElementById(`btnStart`).addEventListener(`click`, async () => {
    try {
      await startVideo();
    } catch (ex) {
      console.error(`Could not start video`);
      console.error(ex);
    }
  });
}
setup();