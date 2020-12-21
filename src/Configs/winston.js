const { createLogger, format, transports } = require("winston");
const path = require("path");
const { combine, timestamp, label, printf } = format;
const PROJECT_ROOT = path.join(__dirname, "..");

const formatLog = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] [${level}]: [${message}]`;
});

const options = {
  file: {
    level: "info",
    filename: `${path.basename("/access.log")}`,
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  format: combine(label({ label: "Info logger" }), timestamp(), formatLog),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};









module.exports.debug = module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments));
};

module.exports.info = function () {
  logger.info.apply(logger, formatLogArguments(arguments));
};

module.exports.warn = function () {
  logger.warn.apply(logger, formatLogArguments(arguments));
};

module.exports.error = function () {
  logger.error.apply(logger, formatLogArguments(arguments));
};

module.exports.stream = logger.stream;

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args) {
  args = Array.prototype.slice.call(args);

  const stackInfo = getStackInfo(1);

  if (stackInfo) {
    // get file path relative to project root
    const calleeStr = `{ path:${stackInfo.relativePath} : ${stackInfo.line} }`;
    // const calleeStr = "path:" + stackInfo.relativePath + ":" + stackInfo.line;

    if (typeof args[0] === "string") {
      args[0] = calleeStr + " " + args[0];
    } else {
      args.unshift(calleeStr);
    }
  }

  return args;
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  const stacklist = new Error().stack.split("\n").slice(3);

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join("\n"),
    };
  }
}
