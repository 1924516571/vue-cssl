(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("svideo", [], factory);
	else if(typeof exports === 'object')
		exports["svideo"] = factory();
	else
		root["svideo"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@suc/canvas2image/lib/canvas2image.js":
/*!************************************************************!*\
  !*** ./node_modules/@suc/canvas2image/lib/canvas2image.js ***!
  \************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Canvas2Image = __webpack_require__(1);
module.exports = Canvas2Image;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * covert canvas to image
 * and save the image file
 */


const DataUrl2Blob = __webpack_require__(2);

var Canvas2Image = function () {

	// check if support sth.
	var $support = function () {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		return {
			canvas: !!ctx,
			imageData: !!ctx.getImageData,
			dataURL: !!canvas.toDataURL,
			btoa: !!window.btoa
		};
	}();

	var downloadMime = 'image/octet-stream';

	function scaleCanvas (canvas, width, height) {
		var w = canvas.width,
			h = canvas.height;
		if (width == undefined) {
			width = w;
		}
		if (height == undefined) {
			height = h;
		}

		var retCanvas = document.createElement('canvas');
		var retCtx = retCanvas.getContext('2d');
		retCanvas.width = width;
		retCanvas.height = height;
		retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
		return retCanvas;
	}

	function getDataURL (canvas, type, width, height) {
		var retCanvas = scaleCanvas(canvas, width, height);
		return retCanvas.toDataURL(type);
	}

	function saveFile (strData,filename) {
		var file_blob = DataUrl2Blob(strData);
		var obj_url = URL.createObjectURL(file_blob);
		var save_link = document.createElement('a');
		save_link.href = obj_url;
		save_link.download = filename;
		var event = new MouseEvent('click',{"bubbles":false, "cancelable":false});
		save_link.dispatchEvent(event);
	}

	function genImage(strData) {
		var img = document.createElement('img');
		img.src = strData;
		return img;
	}
	function fixType (type) {
		type = type.toLowerCase().replace(/jpg/i, 'jpeg');
		var r = type.match(/png|jpeg|bmp|gif/)[0];
		return 'image/' + r;
	}
	function encodeData (data) {
		if (!window.btoa) { throw 'btoa undefined' }
		var str = '';
		if (typeof data == 'string') {
			str = data;
		} else {
			for (var i = 0; i < data.length; i ++) {
				str += String.fromCharCode(data[i]);
			}
		}

		return btoa(str);
	}
	function getImageData (canvas) {
		var w = canvas.width,
			h = canvas.height;
		return canvas.getContext('2d').getImageData(0, 0, w, h);
	}
	function makeURI (strData, type) {
		return 'data:' + type + ';base64,' + strData;
	}


	/**
	 * create bitmap image
	 * 按照规则生成图片响应头和响应体
	 */
	var genBitmapImage = function (oData) {

		//
		// BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
		// BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
		//

		var biWidth  = oData.width;
		var biHeight	= oData.height;
		var biSizeImage = biWidth * biHeight * 3;
		var bfSize  = biSizeImage + 54; // total header size = 54 bytes

		//
		//  typedef struct tagBITMAPFILEHEADER {
		//  	WORD bfType;
		//  	DWORD bfSize;
		//  	WORD bfReserved1;
		//  	WORD bfReserved2;
		//  	DWORD bfOffBits;
		//  } BITMAPFILEHEADER;
		//
		var BITMAPFILEHEADER = [
			// WORD bfType -- The file type signature; must be "BM"
			0x42, 0x4D,
			// DWORD bfSize -- The size, in bytes, of the bitmap file
			bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
			// WORD bfReserved1 -- Reserved; must be zero
			0, 0,
			// WORD bfReserved2 -- Reserved; must be zero
			0, 0,
			// DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
			54, 0, 0, 0
		];

		//
		//  typedef struct tagBITMAPINFOHEADER {
		//  	DWORD biSize;
		//  	LONG  biWidth;
		//  	LONG  biHeight;
		//  	WORD  biPlanes;
		//  	WORD  biBitCount;
		//  	DWORD biCompression;
		//  	DWORD biSizeImage;
		//  	LONG  biXPelsPerMeter;
		//  	LONG  biYPelsPerMeter;
		//  	DWORD biClrUsed;
		//  	DWORD biClrImportant;
		//  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
		//
		var BITMAPINFOHEADER = [
			// DWORD biSize -- The number of bytes required by the structure
			40, 0, 0, 0,
			// LONG biWidth -- The width of the bitmap, in pixels
			biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
			// LONG biHeight -- The height of the bitmap, in pixels
			biHeight & 0xff, biHeight >> 8  & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
			// WORD biPlanes -- The number of planes for the target device. This value must be set to 1
			1, 0,
			// WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
			// has a maximum of 2^24 colors (16777216, Truecolor)
			24, 0,
			// DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
			0, 0, 0, 0,
			// DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
			biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
			// LONG biXPelsPerMeter, unused
			0,0,0,0,
			// LONG biYPelsPerMeter, unused
			0,0,0,0,
			// DWORD biClrUsed, the number of color indexes of palette, unused
			0,0,0,0,
			// DWORD biClrImportant, unused
			0,0,0,0
		];

		var iPadding = (4 - ((biWidth * 3) % 4)) % 4;

		var aImgData = oData.data;

		var strPixelData = '';
		var biWidth4 = biWidth<<2;
		var y = biHeight;
		var fromCharCode = String.fromCharCode;

		do {
			var iOffsetY = biWidth4*(y-1);
			var strPixelRow = '';
			for (var x = 0; x < biWidth; x++) {
				var iOffsetX = x<<2;
				strPixelRow += fromCharCode(aImgData[iOffsetY+iOffsetX+2]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX+1]) +
							   fromCharCode(aImgData[iOffsetY+iOffsetX]);
			}

			for (var c = 0; c < iPadding; c++) {
				strPixelRow += String.fromCharCode(0);
			}

			strPixelData += strPixelRow;
		} while (--y);

		var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);

		return strEncoded;
	};


	/**
	 * [saveAsImage]
	 * @param  {[obj]} canvas   [canvasElement]
	 * @param  {[Number]} width    [optional] png width
	 * @param  {[Number]} height   [optional] png height
	 * @param  {[String]} type     [image type]
	 * @param  {[String]} filename [image filename]
	 * @return {[type]}          [description]
	 */
	var saveAsImage = function (canvas, width, height, type,filename) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			filename = filename == undefined||filename.length === 0 ?Date.now()+'.'+type: filename+'.'+type
			type = fixType(type);

			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);

				saveFile(makeURI(strData, downloadMime),filename);
			} else {
				var strData = getDataURL(canvas, type, width, height);
				saveFile(strData.replace(type, downloadMime),filename);
			}
		}
	};

	var convertToImage = function (canvas, width, height, type) {
		if ($support.canvas && $support.dataURL) {
			if (typeof canvas == "string") { canvas = document.getElementById(canvas); }
			if (type == undefined) { type = 'png'; }
			type = fixType(type);

			if (/bmp/.test(type)) {
				var data = getImageData(scaleCanvas(canvas, width, height));
				var strData = genBitmapImage(data);
				return genImage(makeURI(strData, 'image/bmp'));
			} else {
				var strData = getDataURL(canvas, type, width, height);
				return genImage(strData);
			}
		}
	};


	return {
		saveAsImage: saveAsImage,
		saveAsPNG: function (canvas, width, height, fileName) {
			return saveAsImage(canvas, width, height, 'png',fileName);
		},
		saveAsJPEG: function (canvas, width, height, fileName) {
			return saveAsImage(canvas, width, height, 'jpeg',fileName);
		},
		saveAsGIF: function (canvas, width, height, fileName) {
			return saveAsImage(canvas, width, height, 'gif',fileName);
		},
		saveAsBMP: function (canvas, width, height, fileName) {
			return saveAsImage(canvas, width, height, 'bmp',fileName);
		},

		convertToImage: convertToImage,
		convertToPNG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'png');
		},
		convertToJPEG: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'jpeg');
		},
		convertToGIF: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'gif');
		},
		convertToBMP: function (canvas, width, height) {
			return convertToImage(canvas, width, height, 'bmp');
		}
	};

}();

module.exports = Canvas2Image;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Expose dataURLToBlob
 */

module.exports = dataURLToBlob

/**
 * dataURLToBlob
 */

function dataURLToBlob (dataURL) {
  var hasBlobConstructor = supportsBlobConstructor()
  var hasArrayBufferViewSupport = hasBlobConstructor && supportsArrayBufferView()

  var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
  var dataURLPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/

  // Parse the dataURL components as per RFC 2397
  var matches = dataURL.match(dataURLPattern)
  if (!matches) {
    throw new Error('invalid data URI')
  }

  // Default to text/plain;charset=US-ASCII
  var mediaType = matches[2]
    ? matches[1]
    : 'text/plain' + (matches[3] || ';charset=US-ASCII')

  var isBase64 = !!matches[4]
  var dataString = dataURL.slice(matches[0].length)
  var byteString;

  if (isBase64) {
    // Convert base64 to raw binary data held in a string:
    byteString = atob(dataString)
  } else {
    // Convert base64/URLEncoded data component to raw binary:
    byteString = decodeURIComponent(dataString)
  }
  // Write the bytes of the string to an ArrayBuffer:
  var arrayBuffer = new ArrayBuffer(byteString.length)
  var intArray = new Uint8Array(arrayBuffer)

  for (var i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i)
  }

  // Write the ArrayBuffer (or ArrayBufferView) to a blob:
  if (hasBlobConstructor) {
    return new Blob(
      [hasArrayBufferViewSupport ? intArray : arrayBuffer],
      {type: mediaType}
    )
  }

  var bb = new BlobBuilder()
  bb.append(arrayBuffer)
  return bb.getBlob(mediaType)
}

/**
 * Helpers
 */

function supportsBlobConstructor () {
  if (window.Blob) {
    try {
      return Boolean(new Blob())
    } catch (e) {}
  }

  return false
}

function supportsArrayBufferView () {
  if (window.Uint8Array) {
     try {
       return new Blob([new Uint8Array(100)]).size === 100
     } catch (e) {}
  }

  return false
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DYW52YXMySW1hZ2Uvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0NhbnZhczJJbWFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9DYW52YXMySW1hZ2UvLi9pbmRleC5qcyIsIndlYnBhY2s6Ly9DYW52YXMySW1hZ2UvLi9zcmMvY2FudmFzMmltYWdlLmpzIiwid2VicGFjazovL0NhbnZhczJJbWFnZS8uL25vZGVfbW9kdWxlcy9Ac3VjL2RhdGF1cmwtdG8tYmxvYi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7QUNsRkEsbUJBQW1CLG1CQUFPLENBQUMsQ0FBdUI7QUFDbEQ7Ozs7Ozs7O0FDREE7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Q0E7O0FBRUEsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQSIsImZpbGUiOiJjYW52YXMyaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDYW52YXMySW1hZ2VcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ2FudmFzMkltYWdlXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJ2YXIgQ2FudmFzMkltYWdlID0gcmVxdWlyZSgnLi9zcmMvY2FudmFzMmltYWdlLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhczJJbWFnZTtcbiIsIi8qKlxuICogY292ZXJ0IGNhbnZhcyB0byBpbWFnZVxuICogYW5kIHNhdmUgdGhlIGltYWdlIGZpbGVcbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IERhdGFVcmwyQmxvYiA9IHJlcXVpcmUoXCJAc3VjL2RhdGF1cmwtdG8tYmxvYlwiKTtcblxudmFyIENhbnZhczJJbWFnZSA9IGZ1bmN0aW9uICgpIHtcblxuXHQvLyBjaGVjayBpZiBzdXBwb3J0IHN0aC5cblx0dmFyICRzdXBwb3J0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcblx0XHRcdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGNhbnZhczogISFjdHgsXG5cdFx0XHRpbWFnZURhdGE6ICEhY3R4LmdldEltYWdlRGF0YSxcblx0XHRcdGRhdGFVUkw6ICEhY2FudmFzLnRvRGF0YVVSTCxcblx0XHRcdGJ0b2E6ICEhd2luZG93LmJ0b2Fcblx0XHR9O1xuXHR9KCk7XG5cblx0dmFyIGRvd25sb2FkTWltZSA9ICdpbWFnZS9vY3RldC1zdHJlYW0nO1xuXG5cdGZ1bmN0aW9uIHNjYWxlQ2FudmFzIChjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHR2YXIgdyA9IGNhbnZhcy53aWR0aCxcblx0XHRcdGggPSBjYW52YXMuaGVpZ2h0O1xuXHRcdGlmICh3aWR0aCA9PSB1bmRlZmluZWQpIHtcblx0XHRcdHdpZHRoID0gdztcblx0XHR9XG5cdFx0aWYgKGhlaWdodCA9PSB1bmRlZmluZWQpIHtcblx0XHRcdGhlaWdodCA9IGg7XG5cdFx0fVxuXG5cdFx0dmFyIHJldENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHRcdHZhciByZXRDdHggPSByZXRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0XHRyZXRDYW52YXMud2lkdGggPSB3aWR0aDtcblx0XHRyZXRDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHJldEN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwLCB3LCBoLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRyZXR1cm4gcmV0Q2FudmFzO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0RGF0YVVSTCAoY2FudmFzLCB0eXBlLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0dmFyIHJldENhbnZhcyA9IHNjYWxlQ2FudmFzKGNhbnZhcywgd2lkdGgsIGhlaWdodCk7XG5cdFx0cmV0dXJuIHJldENhbnZhcy50b0RhdGFVUkwodHlwZSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzYXZlRmlsZSAoc3RyRGF0YSxmaWxlbmFtZSkge1xuXHRcdHZhciBmaWxlX2Jsb2IgPSBEYXRhVXJsMkJsb2Ioc3RyRGF0YSk7XG5cdFx0dmFyIG9ial91cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVfYmxvYik7XG5cdFx0dmFyIHNhdmVfbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRzYXZlX2xpbmsuaHJlZiA9IG9ial91cmw7XG5cdFx0c2F2ZV9saW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG5cdFx0dmFyIGV2ZW50ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyx7XCJidWJibGVzXCI6ZmFsc2UsIFwiY2FuY2VsYWJsZVwiOmZhbHNlfSk7XG5cdFx0c2F2ZV9saW5rLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuSW1hZ2Uoc3RyRGF0YSkge1xuXHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRpbWcuc3JjID0gc3RyRGF0YTtcblx0XHRyZXR1cm4gaW1nO1xuXHR9XG5cdGZ1bmN0aW9uIGZpeFR5cGUgKHR5cGUpIHtcblx0XHR0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL2pwZy9pLCAnanBlZycpO1xuXHRcdHZhciByID0gdHlwZS5tYXRjaCgvcG5nfGpwZWd8Ym1wfGdpZi8pWzBdO1xuXHRcdHJldHVybiAnaW1hZ2UvJyArIHI7XG5cdH1cblx0ZnVuY3Rpb24gZW5jb2RlRGF0YSAoZGF0YSkge1xuXHRcdGlmICghd2luZG93LmJ0b2EpIHsgdGhyb3cgJ2J0b2EgdW5kZWZpbmVkJyB9XG5cdFx0dmFyIHN0ciA9ICcnO1xuXHRcdGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuXHRcdFx0c3RyID0gZGF0YTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArKykge1xuXHRcdFx0XHRzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShkYXRhW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYnRvYShzdHIpO1xuXHR9XG5cdGZ1bmN0aW9uIGdldEltYWdlRGF0YSAoY2FudmFzKSB7XG5cdFx0dmFyIHcgPSBjYW52YXMud2lkdGgsXG5cdFx0XHRoID0gY2FudmFzLmhlaWdodDtcblx0XHRyZXR1cm4gY2FudmFzLmdldENvbnRleHQoJzJkJykuZ2V0SW1hZ2VEYXRhKDAsIDAsIHcsIGgpO1xuXHR9XG5cdGZ1bmN0aW9uIG1ha2VVUkkgKHN0ckRhdGEsIHR5cGUpIHtcblx0XHRyZXR1cm4gJ2RhdGE6JyArIHR5cGUgKyAnO2Jhc2U2NCwnICsgc3RyRGF0YTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIGNyZWF0ZSBiaXRtYXAgaW1hZ2Vcblx0ICog5oyJ54Wn6KeE5YiZ55Sf5oiQ5Zu+54mH5ZON5bqU5aS05ZKM5ZON5bqU5L2TXG5cdCAqL1xuXHR2YXIgZ2VuQml0bWFwSW1hZ2UgPSBmdW5jdGlvbiAob0RhdGEpIHtcblxuXHRcdC8vXG5cdFx0Ly8gQklUTUFQRklMRUhFQURFUjogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3dpbmRvd3MvZGVza3RvcC9kZDE4MzM3NCh2PXZzLjg1KS5hc3B4XG5cdFx0Ly8gQklUTUFQSU5GT0hFQURFUjogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2RkMTgzMzc2LmFzcHhcblx0XHQvL1xuXG5cdFx0dmFyIGJpV2lkdGggID0gb0RhdGEud2lkdGg7XG5cdFx0dmFyIGJpSGVpZ2h0XHQ9IG9EYXRhLmhlaWdodDtcblx0XHR2YXIgYmlTaXplSW1hZ2UgPSBiaVdpZHRoICogYmlIZWlnaHQgKiAzO1xuXHRcdHZhciBiZlNpemUgID0gYmlTaXplSW1hZ2UgKyA1NDsgLy8gdG90YWwgaGVhZGVyIHNpemUgPSA1NCBieXRlc1xuXG5cdFx0Ly9cblx0XHQvLyAgdHlwZWRlZiBzdHJ1Y3QgdGFnQklUTUFQRklMRUhFQURFUiB7XG5cdFx0Ly8gIFx0V09SRCBiZlR5cGU7XG5cdFx0Ly8gIFx0RFdPUkQgYmZTaXplO1xuXHRcdC8vICBcdFdPUkQgYmZSZXNlcnZlZDE7XG5cdFx0Ly8gIFx0V09SRCBiZlJlc2VydmVkMjtcblx0XHQvLyAgXHREV09SRCBiZk9mZkJpdHM7XG5cdFx0Ly8gIH0gQklUTUFQRklMRUhFQURFUjtcblx0XHQvL1xuXHRcdHZhciBCSVRNQVBGSUxFSEVBREVSID0gW1xuXHRcdFx0Ly8gV09SRCBiZlR5cGUgLS0gVGhlIGZpbGUgdHlwZSBzaWduYXR1cmU7IG11c3QgYmUgXCJCTVwiXG5cdFx0XHQweDQyLCAweDRELFxuXHRcdFx0Ly8gRFdPUkQgYmZTaXplIC0tIFRoZSBzaXplLCBpbiBieXRlcywgb2YgdGhlIGJpdG1hcCBmaWxlXG5cdFx0XHRiZlNpemUgJiAweGZmLCBiZlNpemUgPj4gOCAmIDB4ZmYsIGJmU2l6ZSA+PiAxNiAmIDB4ZmYsIGJmU2l6ZSA+PiAyNCAmIDB4ZmYsXG5cdFx0XHQvLyBXT1JEIGJmUmVzZXJ2ZWQxIC0tIFJlc2VydmVkOyBtdXN0IGJlIHplcm9cblx0XHRcdDAsIDAsXG5cdFx0XHQvLyBXT1JEIGJmUmVzZXJ2ZWQyIC0tIFJlc2VydmVkOyBtdXN0IGJlIHplcm9cblx0XHRcdDAsIDAsXG5cdFx0XHQvLyBEV09SRCBiZk9mZkJpdHMgLS0gVGhlIG9mZnNldCwgaW4gYnl0ZXMsIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgQklUTUFQRklMRUhFQURFUiBzdHJ1Y3R1cmUgdG8gdGhlIGJpdG1hcCBiaXRzLlxuXHRcdFx0NTQsIDAsIDAsIDBcblx0XHRdO1xuXG5cdFx0Ly9cblx0XHQvLyAgdHlwZWRlZiBzdHJ1Y3QgdGFnQklUTUFQSU5GT0hFQURFUiB7XG5cdFx0Ly8gIFx0RFdPUkQgYmlTaXplO1xuXHRcdC8vICBcdExPTkcgIGJpV2lkdGg7XG5cdFx0Ly8gIFx0TE9ORyAgYmlIZWlnaHQ7XG5cdFx0Ly8gIFx0V09SRCAgYmlQbGFuZXM7XG5cdFx0Ly8gIFx0V09SRCAgYmlCaXRDb3VudDtcblx0XHQvLyAgXHREV09SRCBiaUNvbXByZXNzaW9uO1xuXHRcdC8vICBcdERXT1JEIGJpU2l6ZUltYWdlO1xuXHRcdC8vICBcdExPTkcgIGJpWFBlbHNQZXJNZXRlcjtcblx0XHQvLyAgXHRMT05HICBiaVlQZWxzUGVyTWV0ZXI7XG5cdFx0Ly8gIFx0RFdPUkQgYmlDbHJVc2VkO1xuXHRcdC8vICBcdERXT1JEIGJpQ2xySW1wb3J0YW50O1xuXHRcdC8vICB9IEJJVE1BUElORk9IRUFERVIsICpQQklUTUFQSU5GT0hFQURFUjtcblx0XHQvL1xuXHRcdHZhciBCSVRNQVBJTkZPSEVBREVSID0gW1xuXHRcdFx0Ly8gRFdPUkQgYmlTaXplIC0tIFRoZSBudW1iZXIgb2YgYnl0ZXMgcmVxdWlyZWQgYnkgdGhlIHN0cnVjdHVyZVxuXHRcdFx0NDAsIDAsIDAsIDAsXG5cdFx0XHQvLyBMT05HIGJpV2lkdGggLS0gVGhlIHdpZHRoIG9mIHRoZSBiaXRtYXAsIGluIHBpeGVsc1xuXHRcdFx0YmlXaWR0aCAmIDB4ZmYsIGJpV2lkdGggPj4gOCAmIDB4ZmYsIGJpV2lkdGggPj4gMTYgJiAweGZmLCBiaVdpZHRoID4+IDI0ICYgMHhmZixcblx0XHRcdC8vIExPTkcgYmlIZWlnaHQgLS0gVGhlIGhlaWdodCBvZiB0aGUgYml0bWFwLCBpbiBwaXhlbHNcblx0XHRcdGJpSGVpZ2h0ICYgMHhmZiwgYmlIZWlnaHQgPj4gOCAgJiAweGZmLCBiaUhlaWdodCA+PiAxNiAmIDB4ZmYsIGJpSGVpZ2h0ID4+IDI0ICYgMHhmZixcblx0XHRcdC8vIFdPUkQgYmlQbGFuZXMgLS0gVGhlIG51bWJlciBvZiBwbGFuZXMgZm9yIHRoZSB0YXJnZXQgZGV2aWNlLiBUaGlzIHZhbHVlIG11c3QgYmUgc2V0IHRvIDFcblx0XHRcdDEsIDAsXG5cdFx0XHQvLyBXT1JEIGJpQml0Q291bnQgLS0gVGhlIG51bWJlciBvZiBiaXRzLXBlci1waXhlbCwgMjQgYml0cy1wZXItcGl4ZWwgLS0gdGhlIGJpdG1hcFxuXHRcdFx0Ly8gaGFzIGEgbWF4aW11bSBvZiAyXjI0IGNvbG9ycyAoMTY3NzcyMTYsIFRydWVjb2xvcilcblx0XHRcdDI0LCAwLFxuXHRcdFx0Ly8gRFdPUkQgYmlDb21wcmVzc2lvbiAtLSBUaGUgdHlwZSBvZiBjb21wcmVzc2lvbiwgQklfUkdCIChjb2RlIDApIC0tIHVuY29tcHJlc3NlZFxuXHRcdFx0MCwgMCwgMCwgMCxcblx0XHRcdC8vIERXT1JEIGJpU2l6ZUltYWdlIC0tIFRoZSBzaXplLCBpbiBieXRlcywgb2YgdGhlIGltYWdlLiBUaGlzIG1heSBiZSBzZXQgdG8gemVybyBmb3IgQklfUkdCIGJpdG1hcHNcblx0XHRcdGJpU2l6ZUltYWdlICYgMHhmZiwgYmlTaXplSW1hZ2UgPj4gOCAmIDB4ZmYsIGJpU2l6ZUltYWdlID4+IDE2ICYgMHhmZiwgYmlTaXplSW1hZ2UgPj4gMjQgJiAweGZmLFxuXHRcdFx0Ly8gTE9ORyBiaVhQZWxzUGVyTWV0ZXIsIHVudXNlZFxuXHRcdFx0MCwwLDAsMCxcblx0XHRcdC8vIExPTkcgYmlZUGVsc1Blck1ldGVyLCB1bnVzZWRcblx0XHRcdDAsMCwwLDAsXG5cdFx0XHQvLyBEV09SRCBiaUNsclVzZWQsIHRoZSBudW1iZXIgb2YgY29sb3IgaW5kZXhlcyBvZiBwYWxldHRlLCB1bnVzZWRcblx0XHRcdDAsMCwwLDAsXG5cdFx0XHQvLyBEV09SRCBiaUNsckltcG9ydGFudCwgdW51c2VkXG5cdFx0XHQwLDAsMCwwXG5cdFx0XTtcblxuXHRcdHZhciBpUGFkZGluZyA9ICg0IC0gKChiaVdpZHRoICogMykgJSA0KSkgJSA0O1xuXG5cdFx0dmFyIGFJbWdEYXRhID0gb0RhdGEuZGF0YTtcblxuXHRcdHZhciBzdHJQaXhlbERhdGEgPSAnJztcblx0XHR2YXIgYmlXaWR0aDQgPSBiaVdpZHRoPDwyO1xuXHRcdHZhciB5ID0gYmlIZWlnaHQ7XG5cdFx0dmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cblx0XHRkbyB7XG5cdFx0XHR2YXIgaU9mZnNldFkgPSBiaVdpZHRoNCooeS0xKTtcblx0XHRcdHZhciBzdHJQaXhlbFJvdyA9ICcnO1xuXHRcdFx0Zm9yICh2YXIgeCA9IDA7IHggPCBiaVdpZHRoOyB4KyspIHtcblx0XHRcdFx0dmFyIGlPZmZzZXRYID0geDw8Mjtcblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gZnJvbUNoYXJDb2RlKGFJbWdEYXRhW2lPZmZzZXRZK2lPZmZzZXRYKzJdKSArXG5cdFx0XHRcdFx0XHRcdCAgIGZyb21DaGFyQ29kZShhSW1nRGF0YVtpT2Zmc2V0WStpT2Zmc2V0WCsxXSkgK1xuXHRcdFx0XHRcdFx0XHQgICBmcm9tQ2hhckNvZGUoYUltZ0RhdGFbaU9mZnNldFkraU9mZnNldFhdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgYyA9IDA7IGMgPCBpUGFkZGluZzsgYysrKSB7XG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG5cdFx0XHR9XG5cblx0XHRcdHN0clBpeGVsRGF0YSArPSBzdHJQaXhlbFJvdztcblx0XHR9IHdoaWxlICgtLXkpO1xuXG5cdFx0dmFyIHN0ckVuY29kZWQgPSBlbmNvZGVEYXRhKEJJVE1BUEZJTEVIRUFERVIuY29uY2F0KEJJVE1BUElORk9IRUFERVIpKSArIGVuY29kZURhdGEoc3RyUGl4ZWxEYXRhKTtcblxuXHRcdHJldHVybiBzdHJFbmNvZGVkO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFtzYXZlQXNJbWFnZV1cblx0ICogQHBhcmFtICB7W29ial19IGNhbnZhcyAgIFtjYW52YXNFbGVtZW50XVxuXHQgKiBAcGFyYW0gIHtbTnVtYmVyXX0gd2lkdGggICAgW29wdGlvbmFsXSBwbmcgd2lkdGhcblx0ICogQHBhcmFtICB7W051bWJlcl19IGhlaWdodCAgIFtvcHRpb25hbF0gcG5nIGhlaWdodFxuXHQgKiBAcGFyYW0gIHtbU3RyaW5nXX0gdHlwZSAgICAgW2ltYWdlIHR5cGVdXG5cdCAqIEBwYXJhbSAge1tTdHJpbmddfSBmaWxlbmFtZSBbaW1hZ2UgZmlsZW5hbWVdXG5cdCAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuXHQgKi9cblx0dmFyIHNhdmVBc0ltYWdlID0gZnVuY3Rpb24gKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgdHlwZSxmaWxlbmFtZSkge1xuXHRcdGlmICgkc3VwcG9ydC5jYW52YXMgJiYgJHN1cHBvcnQuZGF0YVVSTCkge1xuXHRcdFx0aWYgKHR5cGVvZiBjYW52YXMgPT0gXCJzdHJpbmdcIikgeyBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXMpOyB9XG5cdFx0XHRpZiAodHlwZSA9PSB1bmRlZmluZWQpIHsgdHlwZSA9ICdwbmcnOyB9XG5cdFx0XHRmaWxlbmFtZSA9IGZpbGVuYW1lID09IHVuZGVmaW5lZHx8ZmlsZW5hbWUubGVuZ3RoID09PSAwID9EYXRlLm5vdygpKycuJyt0eXBlOiBmaWxlbmFtZSsnLicrdHlwZVxuXHRcdFx0dHlwZSA9IGZpeFR5cGUodHlwZSk7XG5cblx0XHRcdGlmICgvYm1wLy50ZXN0KHR5cGUpKSB7XG5cdFx0XHRcdHZhciBkYXRhID0gZ2V0SW1hZ2VEYXRhKHNjYWxlQ2FudmFzKGNhbnZhcywgd2lkdGgsIGhlaWdodCkpO1xuXHRcdFx0XHR2YXIgc3RyRGF0YSA9IGdlbkJpdG1hcEltYWdlKGRhdGEpO1xuXG5cdFx0XHRcdHNhdmVGaWxlKG1ha2VVUkkoc3RyRGF0YSwgZG93bmxvYWRNaW1lKSxmaWxlbmFtZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgc3RyRGF0YSA9IGdldERhdGFVUkwoY2FudmFzLCB0eXBlLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHRcdFx0c2F2ZUZpbGUoc3RyRGF0YS5yZXBsYWNlKHR5cGUsIGRvd25sb2FkTWltZSksZmlsZW5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHR2YXIgY29udmVydFRvSW1hZ2UgPSBmdW5jdGlvbiAoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCB0eXBlKSB7XG5cdFx0aWYgKCRzdXBwb3J0LmNhbnZhcyAmJiAkc3VwcG9ydC5kYXRhVVJMKSB7XG5cdFx0XHRpZiAodHlwZW9mIGNhbnZhcyA9PSBcInN0cmluZ1wiKSB7IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhcyk7IH1cblx0XHRcdGlmICh0eXBlID09IHVuZGVmaW5lZCkgeyB0eXBlID0gJ3BuZyc7IH1cblx0XHRcdHR5cGUgPSBmaXhUeXBlKHR5cGUpO1xuXG5cdFx0XHRpZiAoL2JtcC8udGVzdCh0eXBlKSkge1xuXHRcdFx0XHR2YXIgZGF0YSA9IGdldEltYWdlRGF0YShzY2FsZUNhbnZhcyhjYW52YXMsIHdpZHRoLCBoZWlnaHQpKTtcblx0XHRcdFx0dmFyIHN0ckRhdGEgPSBnZW5CaXRtYXBJbWFnZShkYXRhKTtcblx0XHRcdFx0cmV0dXJuIGdlbkltYWdlKG1ha2VVUkkoc3RyRGF0YSwgJ2ltYWdlL2JtcCcpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBzdHJEYXRhID0gZ2V0RGF0YVVSTChjYW52YXMsIHR5cGUsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdFx0XHRyZXR1cm4gZ2VuSW1hZ2Uoc3RyRGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cblx0cmV0dXJuIHtcblx0XHRzYXZlQXNJbWFnZTogc2F2ZUFzSW1hZ2UsXG5cdFx0c2F2ZUFzUE5HOiBmdW5jdGlvbiAoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCBmaWxlTmFtZSkge1xuXHRcdFx0cmV0dXJuIHNhdmVBc0ltYWdlKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgJ3BuZycsZmlsZU5hbWUpO1xuXHRcdH0sXG5cdFx0c2F2ZUFzSlBFRzogZnVuY3Rpb24gKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgZmlsZU5hbWUpIHtcblx0XHRcdHJldHVybiBzYXZlQXNJbWFnZShjYW52YXMsIHdpZHRoLCBoZWlnaHQsICdqcGVnJyxmaWxlTmFtZSk7XG5cdFx0fSxcblx0XHRzYXZlQXNHSUY6IGZ1bmN0aW9uIChjYW52YXMsIHdpZHRoLCBoZWlnaHQsIGZpbGVOYW1lKSB7XG5cdFx0XHRyZXR1cm4gc2F2ZUFzSW1hZ2UoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCAnZ2lmJyxmaWxlTmFtZSk7XG5cdFx0fSxcblx0XHRzYXZlQXNCTVA6IGZ1bmN0aW9uIChjYW52YXMsIHdpZHRoLCBoZWlnaHQsIGZpbGVOYW1lKSB7XG5cdFx0XHRyZXR1cm4gc2F2ZUFzSW1hZ2UoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCAnYm1wJyxmaWxlTmFtZSk7XG5cdFx0fSxcblxuXHRcdGNvbnZlcnRUb0ltYWdlOiBjb252ZXJ0VG9JbWFnZSxcblx0XHRjb252ZXJ0VG9QTkc6IGZ1bmN0aW9uIChjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0VG9JbWFnZShjYW52YXMsIHdpZHRoLCBoZWlnaHQsICdwbmcnKTtcblx0XHR9LFxuXHRcdGNvbnZlcnRUb0pQRUc6IGZ1bmN0aW9uIChjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0VG9JbWFnZShjYW52YXMsIHdpZHRoLCBoZWlnaHQsICdqcGVnJyk7XG5cdFx0fSxcblx0XHRjb252ZXJ0VG9HSUY6IGZ1bmN0aW9uIChjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0VG9JbWFnZShjYW52YXMsIHdpZHRoLCBoZWlnaHQsICdnaWYnKTtcblx0XHR9LFxuXHRcdGNvbnZlcnRUb0JNUDogZnVuY3Rpb24gKGNhbnZhcywgd2lkdGgsIGhlaWdodCkge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRUb0ltYWdlKGNhbnZhcywgd2lkdGgsIGhlaWdodCwgJ2JtcCcpO1xuXHRcdH1cblx0fTtcblxufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhczJJbWFnZTtcbiIsIi8qKlxuICogRXhwb3NlIGRhdGFVUkxUb0Jsb2JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFVUkxUb0Jsb2JcblxuLyoqXG4gKiBkYXRhVVJMVG9CbG9iXG4gKi9cblxuZnVuY3Rpb24gZGF0YVVSTFRvQmxvYiAoZGF0YVVSTCkge1xuICB2YXIgaGFzQmxvYkNvbnN0cnVjdG9yID0gc3VwcG9ydHNCbG9iQ29uc3RydWN0b3IoKVxuICB2YXIgaGFzQXJyYXlCdWZmZXJWaWV3U3VwcG9ydCA9IGhhc0Jsb2JDb25zdHJ1Y3RvciAmJiBzdXBwb3J0c0FycmF5QnVmZmVyVmlldygpXG5cbiAgdmFyIEJsb2JCdWlsZGVyID0gd2luZG93LkJsb2JCdWlsZGVyIHx8IHdpbmRvdy5XZWJLaXRCbG9iQnVpbGRlciB8fCB3aW5kb3cuTW96QmxvYkJ1aWxkZXIgfHwgd2luZG93Lk1TQmxvYkJ1aWxkZXJcbiAgdmFyIGRhdGFVUkxQYXR0ZXJuID0gL15kYXRhOigoLio/KSg7Y2hhcnNldD0uKj8pPykoO2Jhc2U2NCk/LC9cblxuICAvLyBQYXJzZSB0aGUgZGF0YVVSTCBjb21wb25lbnRzIGFzIHBlciBSRkMgMjM5N1xuICB2YXIgbWF0Y2hlcyA9IGRhdGFVUkwubWF0Y2goZGF0YVVSTFBhdHRlcm4pXG4gIGlmICghbWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBkYXRhIFVSSScpXG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHRleHQvcGxhaW47Y2hhcnNldD1VUy1BU0NJSVxuICB2YXIgbWVkaWFUeXBlID0gbWF0Y2hlc1syXVxuICAgID8gbWF0Y2hlc1sxXVxuICAgIDogJ3RleHQvcGxhaW4nICsgKG1hdGNoZXNbM10gfHwgJztjaGFyc2V0PVVTLUFTQ0lJJylcblxuICB2YXIgaXNCYXNlNjQgPSAhIW1hdGNoZXNbNF1cbiAgdmFyIGRhdGFTdHJpbmcgPSBkYXRhVVJMLnNsaWNlKG1hdGNoZXNbMF0ubGVuZ3RoKVxuICB2YXIgYnl0ZVN0cmluZztcblxuICBpZiAoaXNCYXNlNjQpIHtcbiAgICAvLyBDb252ZXJ0IGJhc2U2NCB0byByYXcgYmluYXJ5IGRhdGEgaGVsZCBpbiBhIHN0cmluZzpcbiAgICBieXRlU3RyaW5nID0gYXRvYihkYXRhU3RyaW5nKVxuICB9IGVsc2Uge1xuICAgIC8vIENvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeTpcbiAgICBieXRlU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGRhdGFTdHJpbmcpXG4gIH1cbiAgLy8gV3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXI6XG4gIHZhciBhcnJheUJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aClcbiAgdmFyIGludEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaW50QXJyYXlbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSlcbiAgfVxuXG4gIC8vIFdyaXRlIHRoZSBBcnJheUJ1ZmZlciAob3IgQXJyYXlCdWZmZXJWaWV3KSB0byBhIGJsb2I6XG4gIGlmIChoYXNCbG9iQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IEJsb2IoXG4gICAgICBbaGFzQXJyYXlCdWZmZXJWaWV3U3VwcG9ydCA/IGludEFycmF5IDogYXJyYXlCdWZmZXJdLFxuICAgICAge3R5cGU6IG1lZGlhVHlwZX1cbiAgICApXG4gIH1cblxuICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKVxuICBiYi5hcHBlbmQoYXJyYXlCdWZmZXIpXG4gIHJldHVybiBiYi5nZXRCbG9iKG1lZGlhVHlwZSlcbn1cblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNCbG9iQ29uc3RydWN0b3IgKCkge1xuICBpZiAod2luZG93LkJsb2IpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4obmV3IEJsb2IoKSlcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ICgpIHtcbiAgaWYgKHdpbmRvdy5VaW50OEFycmF5KSB7XG4gICAgIHRyeSB7XG4gICAgICAgcmV0dXJuIG5ldyBCbG9iKFtuZXcgVWludDhBcnJheSgxMDApXSkuc2l6ZSA9PT0gMTAwXG4gICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=

/***/ }),

/***/ "./node_modules/@suc/h5-yuv-player/lib/download_progress.js":
/*!******************************************************************!*\
  !*** ./node_modules/@suc/h5-yuv-player/lib/download_progress.js ***!
  \******************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __webpack_require__(/*! isomorphic-ws */ "./node_modules/isomorphic-ws/browser.js");
var DownloaderProgressLogLevel;
(function (DownloaderProgressLogLevel) {
    DownloaderProgressLogLevel[DownloaderProgressLogLevel["kError"] = 0] = "kError";
    DownloaderProgressLogLevel[DownloaderProgressLogLevel["kWarning"] = 1] = "kWarning";
    DownloaderProgressLogLevel[DownloaderProgressLogLevel["kInfo"] = 2] = "kInfo";
})(DownloaderProgressLogLevel = exports.DownloaderProgressLogLevel || (exports.DownloaderProgressLogLevel = {}));
class DownloaderProgress {
    constructor(url, opt) {
        this.url_ = url;
        this.opt_ = opt;
        this.is_stopped_ = true;
        this.reconnect_interval_ = this.opt_.reconnect_interval || 50;
    }
    Start() {
        this.Reconnect();
        this.no_frame_timeout_id_ = setTimeout(() => {
            if (this.opt_.on_error !== undefined)
                this.opt_.on_error("意外错误：未收到下载进度数据");
        }, 10000);
        return 0;
    }
    Pause() {
        return this.Stop();
    }
    Resume() {
        return this.Start();
    }
    Stop() {
        this.is_stopped_ = true;
        clearTimeout(this.reconnecter_id_);
        if (this.ws_ !== undefined)
            this.ws_.close();
        return 0;
    }
    Destructor() {
        this.Stop();
    }
    OnOpen(event) {
    }
    OnError(event) {
        if (this.opt_.log_level >= DownloaderProgressLogLevel.kInfo)
            console.log("OnError", "type:", event.type, "message:", event.message, event.target);
    }
    OnClose(event) {
        if (this.opt_.log_level >= DownloaderProgressLogLevel.kInfo)
            console.log("OnClose", "wasClean:", event.wasClean, "code:", event.code, "reason:", event.reason, event.target);
        if (!this.is_stopped_) {
            this.reconnecter_id_ = setTimeout(() => {
                this.Reconnect();
            }, this.reconnect_interval_);
        }
    }
    OnMessage(event) {
        this.opt_.on_progress(event.data);
    }
    Reconnect() {
        this.ws_ = new WebSocket(this.url_, this.opt_.ws_opt);
        this.ws_.binaryType = "blob";
        this.ws_.onmessage = this.OnMessage.bind(this);
        this.ws_.onopen = this.OnOpen.bind(this);
        this.ws_.onerror = this.OnError.bind(this);
        this.ws_.onclose = this.OnClose.bind(this);
    }
}
exports.DownloaderProgress = DownloaderProgress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRfcHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZG93bmxvYWRfcHJvZ3Jlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBNEM7QUFFNUMsSUFBWSwwQkFJWDtBQUpELFdBQVksMEJBQTBCO0lBQ3BDLCtFQUFVLENBQUE7SUFDVixtRkFBUSxDQUFBO0lBQ1IsNkVBQUssQ0FBQTtBQUNQLENBQUMsRUFKVywwQkFBMEIsR0FBMUIsa0NBQTBCLEtBQTFCLGtDQUEwQixRQUlyQztBQVVELE1BQWEsa0JBQWtCO0lBQzdCLFlBQVksR0FBVyxFQUFFLEdBQThCO1FBQ3JELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQztJQUNoRSxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ1YsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLElBQUk7UUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFUyxNQUFNLENBQUMsS0FBNEI7SUFFN0MsQ0FBQztJQUVTLE9BQU8sQ0FBQyxLQUF1RTtRQUN2RixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBdUMsSUFBSSwwQkFBMEIsQ0FBQyxLQUFLO1lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRVMsT0FBTyxDQUFDLEtBQTZFO1FBQzdGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUF1QyxJQUFJLDBCQUEwQixDQUFDLEtBQUs7WUFDdkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDckMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQThCLENBQUM7U0FDM0Q7SUFDSCxDQUFDO0lBRVMsU0FBUyxDQUFDLEtBQWdFO1FBQ2xGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBU0Y7QUE1RUQsZ0RBNEVDIn0=

/***/ }),

/***/ "./node_modules/@suc/h5-yuv-player/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@suc/h5-yuv-player/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var download_progress_1 = __webpack_require__(/*! ./download_progress */ "./node_modules/@suc/h5-yuv-player/lib/download_progress.js");
exports.DownloaderProgress = download_progress_1.DownloaderProgress;
exports.DownloaderProgressLogLevel = download_progress_1.DownloaderProgressLogLevel;
var yuv_player_1 = __webpack_require__(/*! ./yuv_player */ "./node_modules/@suc/h5-yuv-player/lib/yuv_player.js");
exports.YuvPlayer = yuv_player_1.YuvPlayer;
exports.YuvPlayerLogLevel = yuv_player_1.YuvPlayerLogLevel;
exports.WartermarkPrefixMode = yuv_player_1.WartermarkPrefixMode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBZ0g7QUFBdkcsaURBQUEsa0JBQWtCLENBQUE7QUFBNkIseURBQUEsMEJBQTBCLENBQUE7QUFDbEYsMkNBQW9IO0FBQTNHLGlDQUFBLFNBQVMsQ0FBQTtBQUFvQix5Q0FBQSxpQkFBaUIsQ0FBQTtBQUFrQiw0Q0FBQSxvQkFBb0IsQ0FBQSJ9

/***/ }),

/***/ "./node_modules/@suc/h5-yuv-player/lib/yuv_player.js":
/*!***********************************************************!*\
  !*** ./node_modules/@suc/h5-yuv-player/lib/yuv_player.js ***!
  \***********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __webpack_require__(/*! isomorphic-ws */ "./node_modules/isomorphic-ws/browser.js");
const Canvas2Image = __webpack_require__(/*! @suc/canvas2image */ "./node_modules/@suc/canvas2image/lib/canvas2image.js");
const YuvCanvas = __webpack_require__(/*! @suc/yuv-canvas */ "./node_modules/@suc/yuv-canvas/src/yuv-canvas.js");
const YuvBuffer = __webpack_require__(/*! @suc/yuv-buffer */ "./node_modules/@suc/yuv-buffer/yuv-buffer.js");
const DateTime = __webpack_require__(/*! date-time */ "./node_modules/date-time/index.js");
const ScreenFull = __webpack_require__(/*! screenfull */ "./node_modules/screenfull/dist/screenfull.js");
class Tag {
    constructor() {
        this.num_ = 0;
    }
    static NewTag() {
        return ++Tag.tag_.num_;
    }
}
Tag.tag_ = new Tag();
exports.Tag = Tag;
var StartCode;
(function (StartCode) {
    StartCode[StartCode["kResizedNotify"] = 510] = "kResizedNotify";
})(StartCode || (StartCode = {}));
var YuvPlayerLogLevel;
(function (YuvPlayerLogLevel) {
    YuvPlayerLogLevel[YuvPlayerLogLevel["kError"] = 0] = "kError";
    YuvPlayerLogLevel[YuvPlayerLogLevel["kWarning"] = 1] = "kWarning";
    YuvPlayerLogLevel[YuvPlayerLogLevel["kInfo"] = 2] = "kInfo";
})(YuvPlayerLogLevel = exports.YuvPlayerLogLevel || (exports.YuvPlayerLogLevel = {}));
var WartermarkPrefixMode;
(function (WartermarkPrefixMode) {
    WartermarkPrefixMode[WartermarkPrefixMode["kEmpty"] = 0] = "kEmpty";
    WartermarkPrefixMode[WartermarkPrefixMode["kLocalTime"] = 1] = "kLocalTime";
})(WartermarkPrefixMode = exports.WartermarkPrefixMode || (exports.WartermarkPrefixMode = {}));
class IRender {
}
class CanvasRender extends IRender {
    constructor(opt) {
        super();
        this.tag_ = Tag.NewTag();
        this.is_keep_render_ = false;
        this.canvas_ = opt.canvas;
        this.is_webgl_ = (opt.enable_webgl && YuvCanvas.WebGLFrameSink.isAvailable(this.canvas_));
        this.yuv_canvas_ = YuvCanvas.attach(opt.canvas, { webGL: this.is_webgl_ });
        this.format_ = YuvBuffer.format({
            width: opt.canvas.width,
            height: opt.canvas.height,
            cropLeft: 0,
            cropTop: 0,
            displayWidth: opt.canvas.width,
            displayHeight: opt.canvas.height,
        });
        this.old_width_ = opt.canvas.width;
        this.old_height_ = opt.canvas.height;
        this.is_full_screen_ = false;
        this.on_stream_info_ = opt.on_stream_info;
        this.on_quit_fullscreen_ = opt.on_quit_fullscreen;
        this.is_watermark_enabled_ = true;
        // FIXME: WebGL渲染暂不支持水印
        if (this.is_webgl_ || opt.watermark_prefix_mode === undefined && opt.watermark_string === undefined)
            this.is_watermark_enabled_ = false;
        if (opt.watermark_prefix_mode === undefined)
            opt.watermark_prefix_mode = WartermarkPrefixMode.kEmpty;
        switch (opt.watermark_prefix_mode) {
            case WartermarkPrefixMode.kLocalTime: {
                this.watermark_prefix_ = DateTime();
                this.update_watermark_prefix_id_ = setInterval(() => {
                    this.watermark_prefix_ = DateTime();
                }, 1000);
                this.update_watermark_prefix_id_.unref();
                break;
            }
            default: this.watermark_prefix_ = "";
        }
        this.canvas_ctx_ = this.canvas_.getContext("2d");
        this.watermark_string_ = opt.watermark_string ? opt.watermark_string : "";
        this.log_level_ = (opt.log_level === undefined || opt.log_level === null)
            ? YuvPlayerLogLevel.kError : opt.log_level;
        if (ScreenFull.enabled) {
            ScreenFull.on("change", () => {
                if (ScreenFull.isFullscreen) {
                    this.old_width_ = this.format_.displayWidth;
                    this.old_height_ = this.format_.displayHeight;
                    this.Resize(window.screen.width, window.screen.height);
                }
                else {
                    this.Resize(this.old_width_, this.old_height_);
                    if (this.on_quit_fullscreen_ !== undefined) {
                        this.on_quit_fullscreen_(this.old_width_, this.old_height_);
                    }
                }
            });
        }
    }
    Start() {
        this.is_keep_render_ = true;
        if (this.update_watermark_prefix_id_ !== undefined)
            this.update_watermark_prefix_id_.refresh();
        return 0;
    }
    Pause() {
        this.is_keep_render_ = false;
        return 0;
    }
    Resume() {
        this.is_keep_render_ = true;
        return 0;
    }
    Stop() {
        this.is_keep_render_ = false;
        if (this.stream_info_notify_id_ !== undefined) {
            clearInterval(this.stream_info_notify_id_);
        }
        if (this.update_watermark_prefix_id_ !== undefined) {
            clearInterval(this.update_watermark_prefix_id_);
        }
        return 0;
    }
    Resize(width, height) {
        if (this.is_keep_render_) {
            this.format_.displayWidth = width;
            this.format_.displayHeight = height;
            // FIXME: 使用WebGL渲染时，宽高的每次调整都必须重新创建对象
            // 否则，WebGL渲染抛出异常，无法继续渲染图像
            if (this.is_webgl_) {
                this.yuv_canvas_.clear();
                this.yuv_canvas_ = undefined;
                this.yuv_canvas_ = YuvCanvas.attach(this.canvas_);
            }
        }
    }
    Fullscreen() {
        if (this.is_keep_render_) {
            this.RequestFullscreen();
        }
    }
    IsFullscreen() {
        return false;
    }
    Capture(filename, type) {
        if (this.is_keep_render_) {
            Canvas2Image.saveAsImage(this.canvas_, this.format_.width, this.format_.height, type, filename);
        }
    }
    GetStreamInfo() {
        if (this.stream_info_ !== undefined && this.stream_info_ !== null) {
            return this.stream_info_;
        }
        return this.stream_info_;
    }
    Destructor() {
        this.Stop();
        this.canvas_ = undefined;
        this.yuv_canvas_ = undefined;
        this.format_ = undefined;
        this.stream_info_ = undefined;
        this.on_stream_info_ = undefined;
        this.on_quit_fullscreen_ = undefined;
        this.canvas_ctx_ = undefined;
        this.watermark_prefix_ = undefined;
        this.watermark_string_ = undefined;
    }
    Render(frame) {
        if (this.is_keep_render_) {
            let header = new Uint16Array(frame);
            let data = new Uint8Array(frame);
            let w = header[3];
            let h = header[4];
            this.format_ = YuvBuffer.format({
                width: w,
                height: h,
                chromaWidth: w / 2,
                chromaHeight: h / 2,
                cropLeft: 0,
                cropTop: 0,
                cropWidth: w,
                cropHeight: h,
                displayWidth: this.format_.displayWidth,
                displayHeight: this.format_.displayHeight,
            });
            this.stream_info_ = {
                container: "PS",
                codec: header[7] === 0 ? "H264" : "H265",
                origin_width: header[8],
                origin_height: header[9],
                lost_rate: header[10] * 1.0 / header[11],
                kbitrate: (new Uint32Array(header.subarray(0, 14).buffer))[6],
            };
            let y = { stride: header[5] };
            let u = { stride: header[6] };
            let v = { stride: header[6] };
            let src = data.subarray(header[2]);
            y.bytes = src.subarray(0, this.format_.height * y.stride);
            src = src.subarray(this.format_.height * y.stride);
            u.bytes = src.subarray(0, this.format_.height * u.stride / 2);
            src = src.subarray(this.format_.height * u.stride / 2);
            v.bytes = src.subarray(0, this.format_.height * v.stride / 2);
            let yuv_frame = YuvBuffer.frame(this.format_, y, u, v);
            this.yuv_canvas_.drawFrame(yuv_frame);
            if (this.is_watermark_enabled_)
                this.DrawWatermark();
            if (this.stream_info_notify_id_ === undefined && this.on_stream_info_ !== undefined) {
                this.stream_info_notify_id_ = setInterval(() => {
                    this.on_stream_info_(this.stream_info_);
                }, 500);
            }
        }
    }
    Copy2Plane(dest, src, stride) {
        for (let i = 0; i < this.format_.height * stride; i++) {
            dest[i] = src[i];
        }
        return src.subarray(this.format_.height * stride);
    }
    DrawWatermark() {
        let diff_x = this.format_.displayWidth;
        let diff_y = this.format_.displayHeight / 3;
        let font_size = this.format_.displayHeight / 10;
        let ctx = this.canvas_ctx_;
        ctx.font = font_size.toString() + "px" + " Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.rotate(-Math.PI / 6);
        // 画三行 每行画三个 错落排列
        let row_start = 0;
        for (let i = 0; i < 5; i += 1) {
            row_start = 0 - (i % 2) * diff_x * 0.5;
            for (let j = 0; j < 3; j += 1) {
                ctx.fillText(this.watermark_prefix_ + " " + this.watermark_string_, row_start + j * diff_x, 0 + i * diff_y);
            }
        }
        ctx.rotate(+Math.PI / 6);
    }
    RequestFullscreen() {
        ScreenFull.request(this.canvas_);
    }
}
class Player {
}
exports.Player = Player;
class YuvPlayer extends Player {
    constructor(url, opt) {
        super();
        this.tag_ = Tag.NewTag();
        this.url_ = url;
        if (opt.log_level === undefined || opt.log_level === null)
            opt.log_level = YuvPlayerLogLevel.kError;
        this.opt_ = opt;
        this.is_completed_ = false;
        this.is_established_ = false;
        this.is_stopped_ = true;
        this.progress_ = 0;
        this.reconnect_interval_ = this.opt_.reconnect_interval || 3;
        this.opt_.render_opt.on_stream_info = opt.on_stream_info;
        let on_quit_fullscreen = this.opt_.render_opt.on_quit_fullscreen;
        this.opt_.render_opt.on_quit_fullscreen = (width, height) => {
            this.SendResizedNotify(width, height);
            if (on_quit_fullscreen) {
                on_quit_fullscreen(width, height);
            }
        };
        this.opt_.render_opt.watermark_string = opt.watermark_string;
        this.render_ = new CanvasRender(this.opt_.render_opt);
        this.is_first_frame_received_ = false;
        this.is_ws_closed_ = true;
    }
    Start() {
        this.is_completed_ = false;
        this.is_established_ = true;
        this.is_stopped_ = false;
        this.progress_ = 0;
        this.render_.Start();
        this.Reconnect();
        this.no_frame_timeout_id_ = setTimeout(() => {
            if (this.opt_.on_error !== undefined)
                this.opt_.on_error("意外错误：未收到下级平台发送的视频数据或下级平台未发送视频数据");
        }, 10000);
        return 0;
    }
    Pause() {
        return this.Stop();
    }
    Resume() {
        return this.Start();
    }
    Stop() {
        this.is_stopped_ = true;
        clearTimeout(this.reconnecter_id_);
        if (this.no_frame_timeout_id_ !== undefined)
            clearTimeout(this.no_frame_timeout_id_);
        if (this.ws_ !== undefined)
            this.ws_.close();
        return 0;
    }
    Resize(width, height) {
        this.render_.Resize(width, height);
    }
    SwitchFullscreen() {
        this.render_.Fullscreen();
    }
    IsFullscreen() {
        return this.render_.IsFullscreen();
    }
    Capture(filename, filetype = "png") {
        this.render_.Capture(filename, filetype);
    }
    GetStreamInfo() {
        return this.render_.GetStreamInfo();
    }
    Destructor() {
        this.Stop();
        if (this.render_ !== undefined) {
            this.render_.Destructor();
            this.ws_ = undefined;
            let action = () => {
                this.render_ = undefined;
                this.opt_ = undefined;
            };
            let timeout_cnt = 60;
            let clear_up_id = setTimeout(() => {
                if (this.is_ws_closed_) {
                    action();
                    clear_up_id = undefined;
                    console.log("Cleanupped");
                }
                else {
                    if (--timeout_cnt <= 0) {
                        action();
                        clear_up_id = undefined;
                        console.error("Cleanup timeout");
                    }
                    else {
                        clear_up_id.refresh();
                    }
                }
            }, 100);
        }
    }
    OnOpen(event) {
        if (this.opt_.log_level >= YuvPlayerLogLevel.kInfo)
            console.log(this.tag_, "OnOpen", event.target);
        this.progress_ = 1;
        this.is_ws_closed_ = false;
    }
    OnError(event) {
        if (this.opt_.log_level >= YuvPlayerLogLevel.kInfo)
            console.log(this.tag_, "OnError", "type:", event.type, "message:", event.message, event.target);
    }
    OnClose(event) {
        if (this.opt_.log_level >= YuvPlayerLogLevel.kInfo)
            console.log(this.tag_, "OnClose", "wasClean:", event.wasClean, "code:", event.code, "reason:", event.reason, event.target);
        if (!this.is_stopped_) {
            this.reconnecter_id_ = setTimeout(() => {
                this.Reconnect();
            }, this.reconnect_interval_);
        }
        this.is_ws_closed_ = true;
    }
    OnMessage(event) {
        if (!this.is_first_frame_received_) {
            this.is_first_frame_received_ = true;
            clearTimeout(this.no_frame_timeout_id_);
            if (this.opt_.on_first_frame !== undefined)
                this.opt_.on_first_frame();
        }
        this.render_.Render(event.data);
    }
    Reconnect() {
        this.ws_ = new WebSocket(this.url_, this.opt_.ws_opt);
        this.ws_.binaryType = "arraybuffer";
        this.ws_.onmessage = this.OnMessage.bind(this);
        this.ws_.onopen = this.OnOpen.bind(this);
        this.ws_.onerror = this.OnError.bind(this);
        this.ws_.onclose = this.OnClose.bind(this);
    }
    SendResizedNotify(width, height) {
        if (this.ws_ !== undefined) {
            let pkt = new ArrayBuffer(8);
            let header = new Uint32Array(pkt);
            let data = new Uint16Array(pkt);
            header[0] = StartCode.kResizedNotify;
            data[2] = width;
            data[3] = height;
            this.ws_.send(pkt);
        }
    }
}
exports.YuvPlayer = YuvPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieXV2X3BsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy95dXZfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQTRDO0FBQzVDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFekMsTUFBYSxHQUFHO0lBSWQ7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBTE0sTUFBTSxDQUFDLE1BQU07UUFDbEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7O0FBSWMsUUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFQbEMsa0JBU0M7QUFPRCxJQUFLLFNBRUo7QUFGRCxXQUFLLFNBQVM7SUFDWiwrREFBMkIsQ0FBQTtBQUM3QixDQUFDLEVBRkksU0FBUyxLQUFULFNBQVMsUUFFYjtBQUVELElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQiw2REFBVSxDQUFBO0lBQ1YsaUVBQVEsQ0FBQTtJQUNSLDJEQUFLLENBQUE7QUFDUCxDQUFDLEVBSlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFJNUI7QUFFRCxJQUFZLG9CQUdYO0FBSEQsV0FBWSxvQkFBb0I7SUFDOUIsbUVBQVUsQ0FBQTtJQUNWLDJFQUFVLENBQUE7QUFDWixDQUFDLEVBSFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFHL0I7QUFxQkQsTUFB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

/***/ }),

/***/ "./node_modules/@suc/yuv-buffer/yuv-buffer.js":
/*!****************************************************!*\
  !*** ./node_modules/@suc/yuv-buffer/yuv-buffer.js ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/*
Copyright (c) 2014-2016 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
ONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Represents metadata about a YUV frame format.
 * @typedef {Object} YUVFormat
 * @property {number} width - width of encoded frame in luma pixels
 * @property {number} height - height of encoded frame in luma pixels
 * @property {number} chromaWidth - width of encoded frame in chroma pixels
 * @property {number} chromaHeight - height of encoded frame in chroma pixels
 * @property {number} cropLeft - upper-left X coordinate of visible crop region, in luma pixels
 * @property {number} cropTop - upper-left Y coordinate of visible crop region, in luma pixels
 * @property {number} cropWidth - width of visible crop region, in luma pixels
 * @property {number} cropHeight - height of visible crop region, in luma pixels
 * @property {number} displayWidth - final display width of visible region, in luma pixels
 * @property {number} displayHeight - final display height of visible region, in luma pixels
 */

/**
 * Represents underlying image data for a single luma or chroma plane.
 * Cannot be interpreted without the format data from a frame buffer.
 * @typedef {Object} YUVPlane
 * @property {Uint8Array} bytes - typed array containing image data bytes
 * @property {number} stride - byte distance between rows in data
 */

/**
 * Represents a YUV image frame buffer, with enough format information
 * to interpret the data usefully. Buffer objects use generic objects
 * under the hood and can be transferred between worker threads using
 * the structured clone algorithm.
 *
 * @typedef {Object} YUVFrame
 * @property {YUVFormat} format
 * @property {YUVPlane} y
 * @property {YUVPlane} u
 * @property {YUVPlane} v
 */

/**
 * Holder namespace for utility functions and constants related to
 * YUV frame and plane buffers.
 *
 * @namespace
 */
var YUVBuffer = {
  /**
   * Validate a plane dimension
   * @param {number} dim - vertical or horizontal dimension
   * @throws exception on zero, negative, or non-integer value
   */
  validateDimension: function(dim) {
    if (dim <= 0 || dim !== (dim | 0)) {
      throw 'YUV plane dimensions must be a positive integer';
    }
  },

  /**
   * Validate a plane offset
   * @param {number} dim - vertical or horizontal dimension
   * @throws exception on negative or non-integer value
   */
  validateOffset: function(dim) {
    if (dim < 0 || dim !== (dim | 0)) {
      throw 'YUV plane offsets must be a non-negative integer';
    }
  },

  /**
   * Validate and fill out a YUVFormat object structure.
   *
   * At least width and height fields are required; other fields will be
   * derived if left missing or empty:
   * - chromaWidth and chromaHeight will be copied from width and height as for a 4:4:4 layout
   * - cropLeft and cropTop will be 0
   * - cropWidth and cropHeight will be set to whatever of the frame is visible after cropTop and cropLeft are applied
   * - displayWidth and displayHeight will be set to cropWidth and cropHeight.
   *
   * @param {YUVFormat} fields - input fields, must include width and height.
   * @returns {YUVFormat} - validated structure, with all derivable fields filled out.
   * @throws exception on invalid fields or missing width/height
   */
  format: function(fields) {
    var width = fields.width,
      height = fields.height,
      chromaWidth = fields.chromaWidth || width,
      chromaHeight = fields.chromaHeight || height,
      cropLeft = fields.cropLeft || 0,
      cropTop = fields.cropTop || 0,
      cropWidth = fields.cropWidth || width - cropLeft,
      cropHeight = fields.cropHeight || height - cropTop,
      displayWidth = fields.displayWidth || cropWidth,
      displayHeight = fields.displayHeight || cropHeight;
    this.validateDimension(width);
    this.validateDimension(height);
    this.validateDimension(chromaWidth);
    this.validateDimension(chromaHeight);
    this.validateOffset(cropLeft);
    this.validateOffset(cropTop);
    this.validateDimension(cropWidth);
    this.validateDimension(cropHeight);
    this.validateDimension(displayWidth);
    this.validateDimension(displayHeight);
    return {
      width: width,
      height: height,
      chromaWidth: chromaWidth,
      chromaHeight: chromaHeight,
      cropLeft: cropLeft,
      cropTop: cropTop,
      cropWidth: cropWidth,
      cropHeight: cropHeight,
      displayWidth: displayWidth,
      displayHeight: displayHeight
    };
  },

  /**
   * Allocate a new YUVPlane object of the given size.
   * @param {number} stride - byte distance between rows
   * @param {number} rows - number of rows to allocate
   * @returns {YUVPlane} - freshly allocated planar buffer
   */
  allocPlane: function(stride, rows) {
    YUVBuffer.validateDimension(stride);
    YUVBuffer.validateDimension(rows);
    return {
      bytes: new Uint8Array(stride * rows),
      stride: stride
    }
  },

  /**
   * Pick a suitable stride for a custom-allocated thingy
   * @param {number} width - width in bytes
   * @returns {number} - new width in bytes at least as large
   * @throws exception on invalid input width
   */
  suitableStride: function(width) {
    YUVBuffer.validateDimension(width);
    var alignment = 4,
      remainder = width % alignment;
    if (remainder == 0) {
      return width;
    } else {
      return width + (alignment - remainder);
    }
  },

  /**
   * Allocate or extract a YUVPlane object from given dimensions/source.
   * @param {number} width - width in pixels
   * @param {number} height - height in pixels
   * @param {Uint8Array} source - input byte array; optional (will create empty buffer if missing)
   * @param {number} stride - row length in bytes; optional (will create a default if missing)
   * @param {number} offset - offset into source array to extract; optional (will start at 0 if missing)
   * @returns {YUVPlane} - freshly allocated planar buffer
   */
  allocPlane: function(width, height, source, stride, offset) {
    var size, bytes;

    this.validateDimension(width);
    this.validateDimension(height);

    offset = offset || 0;

    stride = stride || this.suitableStride(width);
    this.validateDimension(stride);
    if (stride < width) {
      throw "Invalid input stride for YUV plane; must be larger than width";
    }

    size = stride * height;

    if (source) {
      if (source.length - offset < size) {
        throw "Invalid input buffer for YUV plane; must be large enough for stride times height";
      }
      bytes = source.slice(offset, offset + size);
    } else {
      bytes = new Uint8Array(size);
      stride = stride || this.suitableStride(width);
    }

    return {
      bytes: bytes,
      stride: stride
    };
  },

  /**
   * Allocate a new YUVPlane object big enough for a luma plane in the given format
   * @param {YUVFormat} format - target frame format
   * @param {Uint8Array} source - input byte array; optional (will create empty buffer if missing)
   * @param {number} stride - row length in bytes; optional (will create a default if missing)
   * @param {number} offset - offset into source array to extract; optional (will start at 0 if missing)
   * @returns {YUVPlane} - freshly allocated planar buffer
   */
  lumaPlane: function(format, source, stride, offset) {
    return this.allocPlane(format.width, format.height, source, stride, offset);
  },

  /**
   * Allocate a new YUVPlane object big enough for a chroma plane in the given format,
   * optionally copying data from an existing buffer.
   *
   * @param {YUVFormat} format - target frame format
   * @param {Uint8Array} source - input byte array; optional (will create empty buffer if missing)
   * @param {number} stride - row length in bytes; optional (will create a default if missing)
   * @param {number} offset - offset into source array to extract; optional (will start at 0 if missing)
   * @returns {YUVPlane} - freshly allocated planar buffer
   */
  chromaPlane: function(format, source, stride, offset) {
    return this.allocPlane(format.chromaWidth, format.chromaHeight, source, stride, offset);
  },

  /**
   * Allocate a new YUVFrame object big enough for the given format
   * @param {YUVFormat} format - target frame format
   * @param {YUVPlane} y - optional Y plane; if missing, fresh one will be allocated
   * @param {YUVPlane} u - optional U plane; if missing, fresh one will be allocated
   * @param {YUVPlane} v - optional V plane; if missing, fresh one will be allocated
   * @returns {YUVFrame} - freshly allocated frame buffer
   */
  frame: function(format, y, u, v) {
    y = y || this.lumaPlane(format);
    u = u || this.chromaPlane(format);
    v = v || this.chromaPlane(format);
    return {
      format: format,
      y: y,
      u: u,
      v: v
    }
  },

  /**
   * Duplicate a plane using new buffer memory.
   * @param {YUVPlane} plane - input plane to copy
   * @returns {YUVPlane} - freshly allocated and filled planar buffer
   */
  copyPlane: function(plane) {
    return {
      bytes: plane.bytes.slice(),
      stride: plane.stride
    };
  },

  /**
   * Duplicate a frame using new buffer memory.
   * @param {YUVFrame} frame - input frame to copyFrame
   * @returns {YUVFrame} - freshly allocated and filled frame buffer
   */
  copyFrame: function(frame) {
    return {
      format: frame.format,
      y: this.copyPlane(frame.y),
      u: this.copyPlane(frame.u),
      v: this.copyPlane(frame.v)
    }
  },

  /**
   * List the backing buffers for the frame's planes for transfer between
   * threads via Worker.postMessage.
   * @param {YUVFrame} frame - input frame
   * @returns {Array} - list of transferable objects
   */
  transferables: function(frame) {
    return [frame.y.bytes.buffer, frame.u.bytes.buffer, frame.v.bytes.buffer];
  }
};

module.exports = YUVBuffer;


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/build/shaders.js":
/*!*******************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/build/shaders.js ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = {
  vertex: "precision lowp float;\n\nattribute vec2 aPosition;\nattribute vec2 aLumaPosition;\nattribute vec2 aChromaPosition;\nvarying vec2 vLumaPosition;\nvarying vec2 vChromaPosition;\nvoid main() {\n    gl_Position = vec4(aPosition, 0, 1);\n    vLumaPosition = aLumaPosition;\n    vChromaPosition = aChromaPosition;\n}\n",
  fragment: "// inspired by https://github.com/mbebenita/Broadway/blob/master/Player/canvas.js\n\nprecision lowp float;\n\nuniform sampler2D uTextureY;\nuniform sampler2D uTextureCb;\nuniform sampler2D uTextureCr;\nvarying vec2 vLumaPosition;\nvarying vec2 vChromaPosition;\nvoid main() {\n   // Y, Cb, and Cr planes are uploaded as LUMINANCE textures.\n   float fY = texture2D(uTextureY, vLumaPosition).x;\n   float fCb = texture2D(uTextureCb, vChromaPosition).x;\n   float fCr = texture2D(uTextureCr, vChromaPosition).x;\n\n   // Premultipy the Y...\n   float fYmul = fY * 1.1643828125;\n\n   // And convert that to RGB!\n   gl_FragColor = vec4(\n     fYmul + 1.59602734375 * fCr - 0.87078515625,\n     fYmul - 0.39176171875 * fCb - 0.81296875 * fCr + 0.52959375,\n     fYmul + 2.017234375   * fCb - 1.081390625,\n     1\n   );\n}\n",
  vertexStripe: "precision lowp float;\n\nattribute vec2 aPosition;\nattribute vec2 aTexturePosition;\nvarying vec2 vTexturePosition;\n\nvoid main() {\n    gl_Position = vec4(aPosition, 0, 1);\n    vTexturePosition = aTexturePosition;\n}\n",
  fragmentStripe: "// extra 'stripe' texture fiddling to work around IE 11's poor performance on gl.LUMINANCE and gl.ALPHA textures\n\nprecision lowp float;\n\nuniform sampler2D uStripe;\nuniform sampler2D uTexture;\nvarying vec2 vTexturePosition;\nvoid main() {\n   // Y, Cb, and Cr planes are mapped into a pseudo-RGBA texture\n   // so we can upload them without expanding the bytes on IE 11\n   // which doesn't allow LUMINANCE or ALPHA textures\n   // The stripe textures mark which channel to keep for each pixel.\n   // Each texture extraction will contain the relevant value in one\n   // channel only.\n\n   float fLuminance = dot(\n      texture2D(uStripe, vTexturePosition),\n      texture2D(uTexture, vTexturePosition)\n   );\n\n   gl_FragColor = vec4(fLuminance, fLuminance, fLuminance, 1);\n}\n"
};


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/FrameSink.js":
/*!*******************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/FrameSink.js ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

(function() {
  "use strict";

  /**
   * Create a YUVCanvas and attach it to an HTML5 canvas element.
   *
   * This will take over the drawing context of the canvas and may turn
   * it into a WebGL 3d canvas if possible. Do not attempt to use the
   * drawing context directly after this.
   *
   * @param {HTMLCanvasElement} canvas - HTML canvas element to attach to
   * @param {YUVCanvasOptions} options - map of options
   * @throws exception if WebGL requested but unavailable
   * @constructor
   * @abstract
   */
  function FrameSink(canvas, options) {
    throw new Error('abstract');
  }

  /**
   * Draw a single YUV frame on the underlying canvas, converting to RGB.
   * If necessary the canvas will be resized to the optimal pixel size
   * for the given buffer's format.
   *
   * @param {YUVBuffer} buffer - the YUV buffer to draw
   * @see {@link https://www.npmjs.com/package/yuv-buffer|yuv-buffer} for format
   */
  FrameSink.prototype.drawFrame = function(buffer) {
    throw new Error('abstract');
  };

  /**
   * Clear the canvas using appropriate underlying 2d or 3d context.
   */
  FrameSink.prototype.clear = function() {
    throw new Error('abstract');
  };

  module.exports = FrameSink;

})();


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/SoftwareFrameSink.js":
/*!***************************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/SoftwareFrameSink.js ***!
  \***************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/*
Copyright (c) 2014-2016 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
	"use strict";

	var FrameSink = __webpack_require__(/*! ./FrameSink.js */ "./node_modules/@suc/yuv-canvas/src/FrameSink.js"),
		YCbCr = __webpack_require__(/*! ./YCbCr.js */ "./node_modules/@suc/yuv-canvas/src/YCbCr.js");

	/**
	 * @param {HTMLCanvasElement} canvas - HTML canvas eledment to attach to
	 * @constructor
	 */
	function SoftwareFrameSink(canvas) {
		var self = this,
			ctx = canvas.getContext('2d'),
			imageData = null,
			resampleCanvas = null,
			resampleContext = null;



		function initImageData(width, height) {
			imageData = ctx.createImageData(width, height);

			// Prefill the alpha to opaque
			var data = imageData.data,
				pixelCount = width * height * 4;
			for (var i = 0; i < pixelCount; i += 4) {
				data[i + 3] = 255;
			}
		}

		function initResampleCanvas(cropWidth, cropHeight) {
			resampleCanvas = document.createElement('canvas');
			resampleCanvas.width = cropWidth;
			resampleCanvas.height = cropHeight;
			resampleContext = resampleCanvas.getContext('2d');
		}

		/**
		 * Actually draw a frame into the canvas.
		 * @param {YUVFrame} buffer - YUV frame buffer object to draw
		 */
		self.drawFrame = function drawFrame(buffer) {
			var format = buffer.format;

			if (canvas.width !== format.displayWidth || canvas.height !== format.displayHeight) {
				// Keep the canvas at the right size...
				canvas.width = format.displayWidth;
				canvas.height = format.displayHeight;
			}

			if (imageData === null ||
					imageData.width != format.width ||
					imageData.height != format.height) {
				initImageData(format.width, format.height);
			}

			// YUV -> RGB over the entire encoded frame
			YCbCr.convertYCbCr(buffer, imageData.data);

			var resample = (format.cropWidth != format.displayWidth || format.cropHeight != format.displayHeight);
			var drawContext;
			if (resample) {
				// hack for non-square aspect-ratio
				// putImageData doesn't resample, so we have to draw in two steps.
				if (!resampleCanvas || resampleCanvas.width !== format.cropWidth || resampleCanvas.height !== format.cropHeight) {
					initResampleCanvas(format.cropWidth, format.cropHeight);
				}
				drawContext = resampleContext;
			} else {
				drawContext = ctx;
			}

			// Draw cropped frame to either the final or temporary canvas
			drawContext.putImageData(imageData,
				-format.cropLeft, -format.cropTop, // must offset the offset
				format.cropLeft, format.cropTop,
				format.cropWidth, format.cropHeight);

			if (resample) {
				ctx.drawImage(resampleCanvas, 0, 0, format.displayWidth, format.displayHeight);
			}
		};

		self.clear = function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		};

		return self;
	}

	SoftwareFrameSink.prototype = Object.create(FrameSink.prototype);

	module.exports = SoftwareFrameSink;
})();


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/WebGLFrameSink.js":
/*!************************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/WebGLFrameSink.js ***!
  \************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/*
Copyright (c) 2014-2016 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
	"use strict";

	var FrameSink = __webpack_require__(/*! ./FrameSink.js */ "./node_modules/@suc/yuv-canvas/src/FrameSink.js"),
		shaders = __webpack_require__(/*! ../build/shaders.js */ "./node_modules/@suc/yuv-canvas/build/shaders.js");

	/**
	 * Warning: canvas must not have been used for 2d drawing prior!
	 *
	 * @param {HTMLCanvasElement} canvas - HTML canvas element to attach to
	 * @constructor
	 */
	function WebGLFrameSink(canvas) {
		var self = this,
			gl = WebGLFrameSink.contextForCanvas(canvas),
			debug = false; // swap this to enable more error checks, which can slow down rendering

		if (gl === null) {
			throw new Error('WebGL unavailable');
		}

		// GL!
		function checkError() {
			if (debug) {
				err = gl.getError();
				if (err !== 0) {
					throw new Error("GL error " + err);
				}
			}
		}

		function compileShader(type, source) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				var err = gl.getShaderInfoLog(shader);
				gl.deleteShader(shader);
				throw new Error('GL shader compilation for ' + type + ' failed: ' + err);
			}

			return shader;
		}


		var program,
			unpackProgram,
			err;

		// In the world of GL there are no rectangles.
		// There are only triangles.
		// THERE IS NO SPOON.
		var rectangle = new Float32Array([
			// First triangle (top left, clockwise)
			-1.0, -1.0,
			+1.0, -1.0,
			-1.0, +1.0,

			// Second triangle (bottom right, clockwise)
			-1.0, +1.0,
			+1.0, -1.0,
			+1.0, +1.0
		]);

		var textures = {};
		var framebuffers = {};
		var stripes = {};
		var buf, positionLocation, unpackPositionLocation;
		var unpackTexturePositionBuffer, unpackTexturePositionLocation;
		var stripeLocation, unpackTextureLocation;
		var lumaPositionBuffer, lumaPositionLocation;
		var chromaPositionBuffer, chromaPositionLocation;

		function createOrReuseTexture(name) {
			if (!textures[name]) {
				textures[name] = gl.createTexture();
			}
			return textures[name];
		}

		function uploadTexture(name, width, height, data) {
			var texture = createOrReuseTexture(name);
			gl.activeTexture(gl.TEXTURE0);

			if (WebGLFrameSink.stripe) {
				var uploadTemp = !textures[name + '_temp'];
				var tempTexture = createOrReuseTexture(name + '_temp');
				gl.bindTexture(gl.TEXTURE_2D, tempTexture);
				if (uploadTemp) {
					// new texture
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texImage2D(
						gl.TEXTURE_2D,
						0, // mip level
						gl.RGBA, // internal format
						width / 4,
						height,
						0, // border
						gl.RGBA, // format
						gl.UNSIGNED_BYTE, // type
						data // data!
					);
				} else {
					// update texture
					gl.texSubImage2D(
						gl.TEXTURE_2D,
						0, // mip level
						0, // x offset
						0, // y offset
						width / 4,
						height,
						gl.RGBA, // format
						gl.UNSIGNED_BYTE, // type
						data // data!
					);
				}

				var stripeTexture = textures[name + '_stripe'];
				var uploadStripe = !stripeTexture;
				if (uploadStripe) {
					stripeTexture = createOrReuseTexture(name + '_stripe');
				}
				gl.bindTexture(gl.TEXTURE_2D, stripeTexture);
				if (uploadStripe) {
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					gl.texImage2D(
						gl.TEXTURE_2D,
						0, // mip level
						gl.RGBA, // internal format
						width,
						1,
						0, // border
						gl.RGBA, // format
						gl.UNSIGNED_BYTE, //type
						buildStripe(width, 1) // data!
					);
				}

			} else {
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texImage2D(
					gl.TEXTURE_2D,
					0, // mip level
					gl.LUMINANCE, // internal format
					width,
					height,
					0, // border
					gl.LUMINANCE, // format
					gl.UNSIGNED_BYTE, //type
					data // data!
				);
			}
		}

		function unpackTexture(name, width, height) {
			var texture = textures[name];

			// Upload to a temporary RGBA texture, then unpack it.
			// This is faster than CPU-side swizzling in ANGLE on Windows.
			gl.useProgram(unpackProgram);

			var fb = framebuffers[name];
			if (!fb) {
				// Create a framebuffer and an empty target size
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texImage2D(
					gl.TEXTURE_2D,
					0, // mip level
					gl.RGBA, // internal format
					width,
					height,
					0, // border
					gl.RGBA, // format
					gl.UNSIGNED_BYTE, //type
					null // data!
				);

				fb = framebuffers[name] = gl.createFramebuffer();
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

			var tempTexture = textures[name + '_temp'];
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, tempTexture);
			gl.uniform1i(unpackTextureLocation, 1);

			var stripeTexture = textures[name + '_stripe'];
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, stripeTexture);
			gl.uniform1i(stripeLocation, 2);

			// Rectangle geometry
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.enableVertexAttribArray(positionLocation);
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

			// Set up the texture geometry...
			gl.bindBuffer(gl.ARRAY_BUFFER, unpackTexturePositionBuffer);
			gl.enableVertexAttribArray(unpackTexturePositionLocation);
			gl.vertexAttribPointer(unpackTexturePositionLocation, 2, gl.FLOAT, false, 0, 0);

			// Draw into the target texture...
			gl.viewport(0, 0, width, height);

			gl.drawArrays(gl.TRIANGLES, 0, rectangle.length / 2);

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		}

		function attachTexture(name, register, index) {
			gl.activeTexture(register);
			gl.bindTexture(gl.TEXTURE_2D, textures[name]);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

			gl.uniform1i(gl.getUniformLocation(program, name), index);
		}

		function buildStripe(width) {
			if (stripes[width]) {
				return stripes[width];
			}
			var len = width,
				out = new Uint32Array(len);
			for (var i = 0; i < len; i += 4) {
				out[i    ] = 0x000000ff;
				out[i + 1] = 0x0000ff00;
				out[i + 2] = 0x00ff0000;
				out[i + 3] = 0xff000000;
			}
			return stripes[width] = new Uint8Array(out.buffer);
		}

		function initProgram(vertexShaderSource, fragmentShaderSource) {
			var vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
			var fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

			var program = gl.createProgram();
			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);

			gl.linkProgram(program);
			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
				var err = gl.getProgramInfoLog(program);
				gl.deleteProgram(program);
				throw new Error('GL program linking failed: ' + err);
			}

			return program;
		}

		function init() {
			if (WebGLFrameSink.stripe) {
				unpackProgram = initProgram(shaders.vertexStripe, shaders.fragmentStripe);
				unpackPositionLocation = gl.getAttribLocation(unpackProgram, 'aPosition');

				unpackTexturePositionBuffer = gl.createBuffer();
				var textureRectangle = new Float32Array([
					0, 0,
					1, 0,
					0, 1,
					0, 1,
					1, 0,
					1, 1
				]);
				gl.bindBuffer(gl.ARRAY_BUFFER, unpackTexturePositionBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, textureRectangle, gl.STATIC_DRAW);

				unpackTexturePositionLocation = gl.getAttribLocation(unpackProgram, 'aTexturePosition');
				stripeLocation = gl.getUniformLocation(unpackProgram, 'uStripe');
				unpackTextureLocation = gl.getUniformLocation(unpackProgram, 'uTexture');
			}
			program = initProgram(shaders.vertex, shaders.fragment);

			buf = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.bufferData(gl.ARRAY_BUFFER, rectangle, gl.STATIC_DRAW);

			positionLocation = gl.getAttribLocation(program, 'aPosition');
			lumaPositionBuffer = gl.createBuffer();
			lumaPositionLocation = gl.getAttribLocation(program, 'aLumaPosition');
			chromaPositionBuffer = gl.createBuffer();
			chromaPositionLocation = gl.getAttribLocation(program, 'aChromaPosition');
		}

		/**
		 * Actually draw a frame.
		 * @param {YUVFrame} buffer - YUV frame buffer object
		 */
		self.drawFrame = function(buffer) {
			var format = buffer.format;

			var formatUpdate = (!program || canvas.width !== format.displayWidth || canvas.height !== format.displayHeight);
			if (formatUpdate) {
				// Keep the canvas at the right size...
				canvas.width = format.displayWidth;
				canvas.height = format.displayHeight;
				self.clear();
			}

			if (!program) {
				init();
			}

			if (formatUpdate) {
				var setupTexturePosition = function(buffer, location, texWidth) {
					// Warning: assumes that the stride for Cb and Cr is the same size in output pixels
					var textureX0 = format.cropLeft / texWidth;
					var textureX1 = (format.cropLeft + format.cropWidth) / texWidth;
					var textureY0 = (format.cropTop + format.cropHeight) / format.height;
					var textureY1 = format.cropTop / format.height;
					var textureRectangle = new Float32Array([
						textureX0, textureY0,
						textureX1, textureY0,
						textureX0, textureY1,
						textureX0, textureY1,
						textureX1, textureY0,
						textureX1, textureY1
					]);

					gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
					gl.bufferData(gl.ARRAY_BUFFER, textureRectangle, gl.STATIC_DRAW);
				};
				setupTexturePosition(
					lumaPositionBuffer,
					lumaPositionLocation,
					buffer.y.stride);
				setupTexturePosition(
					chromaPositionBuffer,
					chromaPositionLocation,
					buffer.u.stride * format.width / format.chromaWidth);
			}

			// Create or update the textures...
			uploadTexture('uTextureY', buffer.y.stride, format.height, buffer.y.bytes);
			uploadTexture('uTextureCb', buffer.u.stride, format.chromaHeight, buffer.u.bytes);
			uploadTexture('uTextureCr', buffer.v.stride, format.chromaHeight, buffer.v.bytes);

			if (WebGLFrameSink.stripe) {
				// Unpack the textures after upload to avoid blocking on GPU
				unpackTexture('uTextureY', buffer.y.stride, format.height);
				unpackTexture('uTextureCb', buffer.u.stride, format.chromaHeight);
				unpackTexture('uTextureCr', buffer.v.stride, format.chromaHeight);
			}

			// Set up the rectangle and draw it
			gl.useProgram(program);
			gl.viewport(0, 0, canvas.width, canvas.height);

			attachTexture('uTextureY', gl.TEXTURE0, 0);
			attachTexture('uTextureCb', gl.TEXTURE1, 1);
			attachTexture('uTextureCr', gl.TEXTURE2, 2);

			// Set up geometry
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.enableVertexAttribArray(positionLocation);
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

			// Set up the texture geometry...
			gl.bindBuffer(gl.ARRAY_BUFFER, lumaPositionBuffer);
			gl.enableVertexAttribArray(lumaPositionLocation);
			gl.vertexAttribPointer(lumaPositionLocation, 2, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, chromaPositionBuffer);
			gl.enableVertexAttribArray(chromaPositionLocation);
			gl.vertexAttribPointer(chromaPositionLocation, 2, gl.FLOAT, false, 0, 0);

			// Aaaaand draw stuff.
			gl.drawArrays(gl.TRIANGLES, 0, rectangle.length / 2);
		};

		self.clear = function() {
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
		};

		self.clear();

		return self;
	}

	// For Windows; luminance and alpha textures are ssllooww to upload,
	// so we pack into RGBA and unpack in the shaders.
	//
	// This seems to affect all browsers on Windows, probably due to fun
	// mismatches between GL and D3D.
	WebGLFrameSink.stripe = (function() {
		if (navigator.userAgent.indexOf('Windows') !== -1) {
			return true;
		}
		return false;
	})();

	WebGLFrameSink.contextForCanvas = function(canvas) {
		var options = {
			// Don't trigger discrete GPU in multi-GPU systems
			preferLowPowerToHighPerformance: true,
			powerPreference: 'low-power',
			// Don't try to use software GL rendering!
			failIfMajorPerformanceCaveat: true,
			// In case we need to capture the resulting output.
			preserveDrawingBuffer: true
		};
		return canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
	};

	/**
	 * Static function to check if WebGL will be available with appropriate features.
	 *
	 * @param {HTMLCanvasElement} canvas - HTML canvas element
	 * @returns {boolean} - true if available
	 */
	WebGLFrameSink.isAvailable = function(canvas) {
		var c = document.createElement("canvas");
		if (canvas) {
			c.width = canvas.width;
			c.height = canvas.height;
		} else {
			c.width = 4;
			c.height = 4;
		}
		var gl;
		try {
			gl = WebGLFrameSink.contextForCanvas(c);
		} catch (e) {
			return false;
		}
		if (gl) {
			var register = gl.TEXTURE0,
				width = 4,
				height = 4,
				texture = gl.createTexture(),
				data = new Uint8Array(width * height),
				texWidth = WebGLFrameSink.stripe ? (width / 4) : width,
				format = WebGLFrameSink.stripe ? gl.RGBA : gl.LUMINANCE,
				filter = WebGLFrameSink.stripe ? gl.NEAREST : gl.LINEAR;

			gl.activeTexture(register);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
			gl.texImage2D(
				gl.TEXTURE_2D,
				0, // mip level
				format, // internal format
				texWidth,
				height,
				0, // border
				format, // format
				gl.UNSIGNED_BYTE, //type
				data // data!
			);

			var err = gl.getError();
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			if (err) {
				// Doesn't support luminance textures?
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};

	WebGLFrameSink.prototype = Object.create(FrameSink.prototype);

	module.exports = WebGLFrameSink;
})();


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/YCbCr.js":
/*!***************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/YCbCr.js ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/*
Copyright (c) 2014-2019 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
	"use strict";

	var depower = __webpack_require__(/*! ./depower.js */ "./node_modules/@suc/yuv-canvas/src/depower.js");

	/**
	 * Basic YCbCr->RGB conversion
	 *
	 * @author Brion Vibber <brion@pobox.com>
	 * @copyright 2014-2019
	 * @license MIT-style
	 *
	 * @param {YUVFrame} buffer - input frame buffer
	 * @param {Uint8ClampedArray} output - array to draw RGBA into
	 * Assumes that the output array already has alpha channel set to opaque.
	 */
	function convertYCbCr(buffer, output) {
		var width = buffer.format.width | 0,
			height = buffer.format.height | 0,
			hdec = depower(buffer.format.width / buffer.format.chromaWidth) | 0,
			vdec = depower(buffer.format.height / buffer.format.chromaHeight) | 0,
			bytesY = buffer.y.bytes,
			bytesCb = buffer.u.bytes,
			bytesCr = buffer.v.bytes,
			strideY = buffer.y.stride | 0,
			strideCb = buffer.u.stride | 0,
			strideCr = buffer.v.stride | 0,
			outStride = width << 2,
			YPtr = 0, Y0Ptr = 0, Y1Ptr = 0,
			CbPtr = 0, CrPtr = 0,
			outPtr = 0, outPtr0 = 0, outPtr1 = 0,
			colorCb = 0, colorCr = 0,
			multY = 0, multCrR = 0, multCbCrG = 0, multCbB = 0,
			x = 0, y = 0, xdec = 0, ydec = 0;

		if (hdec == 1 && vdec == 1) {
			// Optimize for 4:2:0, which is most common
			outPtr0 = 0;
			outPtr1 = outStride;
			ydec = 0;
			for (y = 0; y < height; y += 2) {
				Y0Ptr = y * strideY | 0;
				Y1Ptr = Y0Ptr + strideY | 0;
				CbPtr = ydec * strideCb | 0;
				CrPtr = ydec * strideCr | 0;
				for (x = 0; x < width; x += 2) {
					colorCb = bytesCb[CbPtr++] | 0;
					colorCr = bytesCr[CrPtr++] | 0;

					// Quickie YUV conversion
					// https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.2020_conversion
					// multiplied by 256 for integer-friendliness
					multCrR   = (409 * colorCr | 0) - 57088 | 0;
					multCbCrG = (100 * colorCb | 0) + (208 * colorCr | 0) - 34816 | 0;
					multCbB   = (516 * colorCb | 0) - 70912 | 0;

					multY = 298 * bytesY[Y0Ptr++] | 0;
					output[outPtr0    ] = (multY + multCrR) >> 8;
					output[outPtr0 + 1] = (multY - multCbCrG) >> 8;
					output[outPtr0 + 2] = (multY + multCbB) >> 8;
					outPtr0 += 4;

					multY = 298 * bytesY[Y0Ptr++] | 0;
					output[outPtr0    ] = (multY + multCrR) >> 8;
					output[outPtr0 + 1] = (multY - multCbCrG) >> 8;
					output[outPtr0 + 2] = (multY + multCbB) >> 8;
					outPtr0 += 4;

					multY = 298 * bytesY[Y1Ptr++] | 0;
					output[outPtr1    ] = (multY + multCrR) >> 8;
					output[outPtr1 + 1] = (multY - multCbCrG) >> 8;
					output[outPtr1 + 2] = (multY + multCbB) >> 8;
					outPtr1 += 4;

					multY = 298 * bytesY[Y1Ptr++] | 0;
					output[outPtr1    ] = (multY + multCrR) >> 8;
					output[outPtr1 + 1] = (multY - multCbCrG) >> 8;
					output[outPtr1 + 2] = (multY + multCbB) >> 8;
					outPtr1 += 4;
				}
				outPtr0 += outStride;
				outPtr1 += outStride;
				ydec++;
			}
		} else {
			outPtr = 0;
			for (y = 0; y < height; y++) {
				xdec = 0;
				ydec = y >> vdec;
				YPtr = y * strideY | 0;
				CbPtr = ydec * strideCb | 0;
				CrPtr = ydec * strideCr | 0;

				for (x = 0; x < width; x++) {
					xdec = x >> hdec;
					colorCb = bytesCb[CbPtr + xdec] | 0;
					colorCr = bytesCr[CrPtr + xdec] | 0;

					// Quickie YUV conversion
					// https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.2020_conversion
					// multiplied by 256 for integer-friendliness
					multCrR   = (409 * colorCr | 0) - 57088 | 0;
					multCbCrG = (100 * colorCb | 0) + (208 * colorCr | 0) - 34816 | 0;
					multCbB   = (516 * colorCb | 0) - 70912 | 0;

					multY = 298 * bytesY[YPtr++] | 0;
					output[outPtr    ] = (multY + multCrR) >> 8;
					output[outPtr + 1] = (multY - multCbCrG) >> 8;
					output[outPtr + 2] = (multY + multCbB) >> 8;
					outPtr += 4;
				}
			}
		}
	}

	module.exports = {
		convertYCbCr: convertYCbCr
	};
})();


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/depower.js":
/*!*****************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/depower.js ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/*
Copyright (c) 2014-2016 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
  "use strict";

  /**
   * Convert a ratio into a bit-shift count; for instance a ratio of 2
   * becomes a bit-shift of 1, while a ratio of 1 is a bit-shift of 0.
   *
   * @author Brion Vibber <brion@pobox.com>
   * @copyright 2016
   * @license MIT-style
   *
   * @param {number} ratio - the integer ratio to convert.
   * @returns {number} - number of bits to shift to multiply/divide by the ratio.
   * @throws exception if given a non-power-of-two
   */
  function depower(ratio) {
    var shiftCount = 0,
      n = ratio >> 1;
    while (n != 0) {
      n = n >> 1;
      shiftCount++
    }
    if (ratio !== (1 << shiftCount)) {
      throw 'chroma plane dimensions must be power of 2 ratio to luma plane dimensions; got ' + ratio;
    }
    return shiftCount;
  }

  module.exports = depower;
})();


/***/ }),

/***/ "./node_modules/@suc/yuv-canvas/src/yuv-canvas.js":
/*!********************************************************!*\
  !*** ./node_modules/@suc/yuv-canvas/src/yuv-canvas.js ***!
  \********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/*
Copyright (c) 2014-2016 Brion Vibber <brion@pobox.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
MPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
  "use strict";

  var FrameSink = __webpack_require__(/*! ./FrameSink.js */ "./node_modules/@suc/yuv-canvas/src/FrameSink.js"),
    SoftwareFrameSink = __webpack_require__(/*! ./SoftwareFrameSink.js */ "./node_modules/@suc/yuv-canvas/src/SoftwareFrameSink.js"),
    WebGLFrameSink = __webpack_require__(/*! ./WebGLFrameSink.js */ "./node_modules/@suc/yuv-canvas/src/WebGLFrameSink.js");

  /**
   * @typedef {Object} YUVCanvasOptions
   * @property {boolean} webGL - Whether to use WebGL to draw to the canvas and accelerate color space conversion. If left out, defaults to auto-detect.
   */

  var YUVCanvas = {
    FrameSink: FrameSink,

    SoftwareFrameSink: SoftwareFrameSink,

    WebGLFrameSink: WebGLFrameSink,

    /**
     * Attach a suitable FrameSink instance to an HTML5 canvas element.
     *
     * This will take over the drawing context of the canvas and may turn
     * it into a WebGL 3d canvas if possible. Do not attempt to use the
     * drawing context directly after this.
     *
     * @param {HTMLCanvasElement} canvas - HTML canvas element to attach to
     * @param {YUVCanvasOptions} options - map of options
     * @returns {FrameSink} - instance of suitable subclass.
     */
    attach: function(canvas, options) {
      options = options || {};
      var webGL = ('webGL' in options) ? options.webGL : WebGLFrameSink.isAvailable(canvas);
      if (webGL) {
        return new WebGLFrameSink(canvas, options);
      } else {
        return new SoftwareFrameSink(canvas, options);
      }
    }
  };

  module.exports = YUVCanvas;
})();


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/axios/node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/node_modules/is-buffer/index.js ***!
  \************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/date-time/index.js":
/*!*****************************************!*\
  !*** ./node_modules/date-time/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const timeZone = __webpack_require__(/*! time-zone */ "./node_modules/time-zone/index.js");

const dateTime = options => {
	options = Object.assign({
		date: new Date(),
		local: true,
		showTimeZone: false,
		showMilliseconds: false
	}, options);

	let {date} = options;

	if (options.local) {
		// Offset the date so it will return the correct value when getting the ISO string
		date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
	}

	let end = '';

	if (options.showTimeZone) {
		end = ' UTC' + (options.local ? timeZone(date) : '');
	}

	if (options.showMilliseconds && date.getUTCMilliseconds() > 0) {
		end = ` ${date.getUTCMilliseconds()}ms${end}`;
	}

	return date
		.toISOString()
		.replace(/T/, ' ')
		.replace(/\..+/, end);
};

module.exports = dateTime;
// TODO: Remove this for the next major release
module.exports.default = dateTime;


/***/ }),

/***/ "./node_modules/isomorphic-ws/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/isomorphic-ws/browser.js ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

var ws = null

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket || global.MozWebSocket
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket || window.MozWebSocket
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket || self.MozWebSocket
}

module.exports = ws

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/screenfull/dist/screenfull.js":
/*!****************************************************!*\
  !*** ./node_modules/screenfull/dist/screenfull.js ***!
  \****************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

/*!
* screenfull
* v4.2.1 - 2019-07-27
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs =  true && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (elem) {
			return new Promise(function (resolve, reject) {
				var request = fn.requestFullscreen;

				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				elem = elem || document.documentElement;

				var promise;

				// Work around Safari 5.1 bug: reports support for
				// keyboard in fullscreen even though it doesn't.
				// Browser sniffing, since the alternative with
				// setTimeout is even worse.
				if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
					promise = elem[request]();
				} else {
					promise = elem[request](keyboardAllowed ? Element.ALLOW_KEYBOARD_INPUT : {});
				}

				Promise.resolve(promise).catch(reject);
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				document[fn.exitFullscreen]();

				this.on('change', onFullScreenExit);
			}.bind(this));
		},
		toggle: function (elem) {
			return this.isFullscreen ? this.exit() : this.request(elem);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
		// TODO: remove this in the next major version
		module.exports.default = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();


/***/ }),

/***/ "./node_modules/time-zone/index.js":
/*!*****************************************!*\
  !*** ./node_modules/time-zone/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = date => {
	const offset = (date || new Date()).getTimezoneOffset();
	const absOffset = Math.abs(offset);
	const hours = Math.floor(absOffset / 60);
	const minutes = absOffset % 60;
	const minutesOut = minutes > 0 ? ':' + ('0' + minutes).slice(-2) : '';

	return (offset < 0 ? '+' : '-') + hours + minutesOut;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/h5player.ts":
/*!*************************!*\
  !*** ./src/h5player.ts ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var LOCAL_SERVER_BASEURL = "http://127.0.0.1:61080";
var LOCAL_SERVER_VERSION = 12;
var LOCAL_SERVER_DOWNURL = "/download/浙江成功软件开发有限公司解码服务.zip";
var DEFAULT_FLOWTYPE = interface_1.FlowTypes.server;
var SUCCESS_CODE = 200;
var PLAY_STATUS_SUC = "success";
var PLAY_STATUS_FAIL = "fail";
var ERROR_COLOR = "rgba(255, 0, 0, 1)";
var RECONNECT_INTERVAL = 50;
var LOADING_TEXT = "加 载 中. . . ";
var LOADING_COLOR = "rgba(255, 255, 255, 1)";
var CANVAS_FONT = "16px 微软雅黑";
var CANVAS_DEFAULT_WIDTH = "300";
var CANVAS_DEFAULT_HEIGTH = "300";
var h5_yuv_player_1 = __webpack_require__(/*! @suc/h5-yuv-player */ "./node_modules/@suc/h5-yuv-player/lib/index.js");
var IPlayer = (function () {
    function IPlayer() {
    }
    return IPlayer;
}());
exports.IPlayer = IPlayer;
var SucH5Player = (function (_super) {
    __extends(SucH5Player, _super);
    function SucH5Player(sipServerInfo, canvasId, config) {
        var _this = _super.call(this) || this;
        var defaultConfig = {
            localserverUrl: LOCAL_SERVER_BASEURL,
            localserverVersion: LOCAL_SERVER_VERSION,
            localserverDown: LOCAL_SERVER_DOWNURL,
            dragable: false,
            flowType: DEFAULT_FLOWTYPE,
            hasWaterMarker: false,
            dragzoomType: interface_1.DragZoomTypes.in,
            root: document.body
        };
        _this.events = [
            {
                name: "resize",
                handle: _this.windowResizeHandle
            }
        ];
        _this.browseIp = "";
        _this.sipServerInfo = utils_1.assign({}, sipServerInfo);
        _this.config = utils_1.assign({}, defaultConfig, config);
        config ? (config.root == "string" ? _this.config.root = document.querySelector(config.root) : config.root) : null;
        var baseUrl = _this.config.localserverUrl;
        _this.curScreen = null;
        _this.screens = [];
        _this.downloads = [];
        _this.ports = {
            version: baseUrl + "/version",
            init: baseUrl + "/share/stream/init",
            play: baseUrl + "/share/stream/play",
            playRtsp: baseUrl + "/share/stream/rtsp/play",
            playback: baseUrl + "/share/stream/playback",
            playbackTo: baseUrl + "/share/stream/playback/randomaccess",
            stop: baseUrl + "/share/stream/terminate",
            stopRtsp: baseUrl + "/share/stream/rtsp/play",
            pause: baseUrl + "/share/stream/playback/pause",
            replay: baseUrl + "/share/stream/playback/resume",
            resize: baseUrl + "/share/stream/resize",
            files: baseUrl + "/share/videofileslist",
            down: baseUrl + "/share/stream/download"
        };
        _this.bindEvents();
        if (canvasId) {
            _this.initScreen(canvasId);
        }
        if (_this.config.flowType === interface_1.FlowTypes.server && _this.sipServerInfo.sip_id) {
            _this.init(_this.sipServerInfo).then(function (data) { _this.config.oninit ? _this.config.oninit(data) : null; });
        }
        return _this;
    }
    SucH5Player.prototype.checkVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, axios_1.default.get(this.ports.version).then(function (res) {
                        var version = res.data;
                        var response = {
                            code: 200,
                            msg: "通过",
                            url: _this.config.localserverDown
                        };
                        if (version < _this.config.localserverVersion) {
                            response.code = 500;
                            response.msg = "本地视频服务版本过低,请升级高版本!";
                        }
                        return response;
                    }).catch(function (err) {
                        throw new Error(_this.config.localserverDown);
                    })];
            });
        });
    };
    SucH5Player.prototype.isFullscreen = function () {
        var _document = window.document;
        return (_document.fullscreenElement !== undefined && _document.fullscreenElement !== null) ||
            (_document.msFullscreenElement !== undefined && _document.msFullscreenElement !== null) ||
            (_document.mozFullScreenElement !== undefined && _document.mozFullScreenElement !== null) ||
            (_document.webkitFullscreenElement !== undefined && _document.webkitFullscreenElement !== null) ||
            false;
    };
    SucH5Player.prototype.windowResizeHandle = function () {
        if (!this.curScreen) {
            return;
        }
        if (!this.isFullscreen && this.curScreen.player.IsFullscreen()) {
            this.curScreen.player.SwitchFullscreen();
        }
    };
    SucH5Player.prototype.bindEvents = function () {
        var _this = this;
        this.events.forEach(function (_event) {
            _event.handle = _event.handle.bind(_this);
            window.addEventListener(_event.name, _event.handle);
        });
    };
    SucH5Player.prototype.removeEvents = function () {
        this.events.forEach(function (_event) {
            window.removeEventListener(_event.name, _event.handle);
        });
    };
    SucH5Player.prototype.resetSize = function (canvasId, width, height) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        var canvas = screen.canvas;
        var rect_info = canvas.getClientRects()[0];
        canvas.setAttribute("width", (width || rect_info.width) + "px");
        canvas.setAttribute("height", (height || rect_info.height) + "px");
        if (screen.player) {
            var privateData = screen.privateData;
            var params = {
                deviceid: privateData.deviceId,
                streamid: privateData.streamId,
                width: window.screen.width,
                height: window.screen.height
            };
            return axios_1.default.post(this.ports.resize, null, { params: params }).then(function (res) { return res.data; });
        }
        return Promise.resolve();
    };
    SucH5Player.prototype.setConfig = function (config) {
        utils_1.assign(this.config, config);
        config.root ? (config.root == "string" ? this.config.root = document.querySelector(config.root) : config.root) : null;
        return this.config;
    };
    SucH5Player.prototype.init = function (sipServerInfo, config) {
        return __awaiter(this, void 0, void 0, function () {
            var checkResult, body;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.checkVersion()];
                    case 1:
                        checkResult = _a.sent();
                        utils_1.assign(this.sipServerInfo, sipServerInfo);
                        if (config) {
                            this.setConfig(config);
                        }
                        body = {
                            server: this.sipServerInfo,
                            transport: "tcp"
                        };
                        if (checkResult.code != 200) {
                            return [2, Promise.resolve(checkResult)];
                        }
                        return [2, axios_1.default.post(this.ports.init, body).then(function (res) {
                                var data = res.data;
                                _this.browseIp = data.local_ip;
                                if (_this.config.oninit) {
                                    _this.config.oninit(res.data);
                                }
                                return {
                                    code: 200,
                                    msg: res.data
                                };
                            })];
                }
            });
        });
    };
    SucH5Player.prototype.createChooseBox = function (canvasId, callback) {
        var _this = this;
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        screen.boxChoose = new interface_1.BoxChoose(screen.canvas, { canvasId: screen.id }, function (dragInfo, targetInfo) {
            var dragZoomParams = {
                windowwidth: targetInfo.width || 0,
                windowheight: targetInfo.height || 0,
                dragcenterx: dragInfo.center[0] || 0,
                dragcentery: dragInfo.center[1] || 0,
                dragareawidth: dragInfo.width || 0,
                dragareaheight: dragInfo.height || 0
            };
            _this.dragZoom(_this.config.dragzoomType, dragZoomParams);
            if (callback) {
                callback({ dragInfo: dragInfo, targetInfo: targetInfo });
            }
        });
    };
    SucH5Player.prototype.dragZoomToOut = function () {
        this.config.dragzoomType = interface_1.DragZoomTypes.out;
    };
    SucH5Player.prototype.dragZoomToIn = function () {
        this.config.dragzoomType = interface_1.DragZoomTypes.in;
    };
    SucH5Player.prototype.play = function (camSipId, canvasId, monitable) {
        return __awaiter(this, void 0, void 0, function () {
            var canvasEle, canvasWidth, canvasHeight, flowType, keyProp, url, body;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (canvasId)
                            this.initScreen(canvasId);
                        if (!this.curScreen)
                            return [2, Promise.resolve()];
                        if (monitable) {
                            this.curScreen.monitor = new interface_1.HttpMonitor({ uuid: camSipId });
                        }
                        canvasEle = this.curScreen.canvas;
                        canvasWidth = canvasEle && canvasEle.getAttribute('width') || CANVAS_DEFAULT_WIDTH;
                        canvasHeight = canvasEle && canvasEle.getAttribute('height') || CANVAS_DEFAULT_HEIGTH;
                        flowType = this.config.flowType;
                        keyProp = flowType === interface_1.FlowTypes.server ? "devices" : "rtsp_urls";
                        url = flowType === interface_1.FlowTypes.server ? this.ports.play : this.ports.playRtsp;
                        body = (_a = {},
                            _a[keyProp] = [camSipId],
                            _a.width = parseInt(canvasWidth),
                            _a.height = parseInt(canvasHeight),
                            _a);
                        if (flowType === interface_1.FlowTypes.server) {
                            body.server = this.sipServerInfo;
                        }
                        if (!this.curScreen.streamId) return [3, 2];
                        return [4, this.stop(canvasId)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.curScreen.camSipId = camSipId;
                        return [2, this.requestStreams(url, body, [this.curScreen.id])];
                }
            });
        });
    };
    SucH5Player.prototype.plays = function (playInfos) {
        return __awaiter(this, void 0, void 0, function () {
            var canvasWidth, canvasHeight, devices, canvasIds, hisStreams, flowType, url, keyProp, body;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        canvasWidth = "";
                        canvasHeight = "";
                        devices = [];
                        canvasIds = [];
                        hisStreams = [];
                        playInfos.forEach(function (playParams) {
                            _this.initScreen(playParams.canvasId);
                            if (!_this.curScreen)
                                return;
                            if (_this.curScreen.streamId) {
                                hisStreams.push({
                                    stream_id: _this.curScreen.streamId,
                                    device: _this.curScreen.camSipId,
                                    canvasId: _this.curScreen.id
                                });
                            }
                            devices.push(playParams.camSipId);
                            canvasIds.push(playParams.canvasId);
                            if (playParams.monitable) {
                                _this.curScreen.monitor = new interface_1.HttpMonitor({ uuid: playParams.camSipId });
                            }
                            var canvasEle = _this.curScreen.canvas;
                            canvasWidth = canvasEle && canvasEle.getAttribute('width') || CANVAS_DEFAULT_WIDTH;
                            canvasHeight = canvasEle && canvasEle.getAttribute('height') || CANVAS_DEFAULT_HEIGTH;
                            _this.curScreen.camSipId = playParams.camSipId;
                        });
                        flowType = this.config.flowType;
                        url = flowType === interface_1.FlowTypes.server ? this.ports.play : this.ports.playRtsp;
                        keyProp = flowType === interface_1.FlowTypes.server ? "devices" : "rtsp_urls";
                        body = (_a = {},
                            _a[keyProp] = devices,
                            _a.width = parseInt(canvasWidth),
                            _a.height = parseInt(canvasHeight),
                            _a);
                        if (flowType === interface_1.FlowTypes.server) {
                            body.server = this.sipServerInfo;
                        }
                        if (!(hisStreams && hisStreams.length)) return [3, 2];
                        return [4, this.stopAll(hisStreams)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2, this.requestStreams(url, body, canvasIds)];
                }
            });
        });
    };
    SucH5Player.prototype.getFilesByTime = function (camSipId, start_time, end_time) {
        var _this = this;
        var screen = this.curScreen;
        var queryItem = {
            device_id: camSipId,
            slices: [
                {
                    start_time: start_time,
                    end_time: end_time,
                    type: "time"
                }
            ]
        };
        return axios_1.default.post(this.ports.files, { queries: [queryItem] }).then(function (res) {
            var _a = res.data, responses = _a.responses, code = _a.code;
            if (code != 200) {
                _this.canvasText(screen.canvas, responses[0].reason, "red");
            }
            return responses[0] && responses[0].slices;
        });
    };
    SucH5Player.prototype.playBack = function (device, canvasId) {
        if (!device.device_id || !canvasId) {
            console.error("请传入摄像机编号和视频容器id");
            return Promise.resolve();
        }
        this.initScreen(canvasId);
        var screen = this.curScreen;
        if (!screen)
            return Promise.resolve();
        var width = screen.canvas && screen.canvas.getAttribute('width') || "";
        var height = screen.canvas && screen.canvas.getAttribute('height') || "";
        var body = {
            server: this.sipServerInfo,
            devices: [device],
            width: parseInt(width),
            height: parseInt(height)
        };
        screen.camSipId = device.device_id;
        return this.requestStreams(this.ports.playback, body, [canvasId]);
    };
    SucH5Player.prototype.requestStreams = function (url, data, canvasIds) {
        return __awaiter(this, void 0, void 0, function () {
            var cancelId, cancelToken;
            var _this = this;
            return __generator(this, function (_a) {
                cancelId = "";
                if (canvasIds) {
                    canvasIds.forEach(function (canvasId) {
                        var screen = _this.getScreenById(canvasId);
                        _this.canvasText(screen.canvas, LOADING_TEXT, LOADING_COLOR);
                    });
                    cancelId = canvasIds.join("_");
                }
                if (cancelId && this.curScreen) {
                    if (this.curScreen.cancel)
                        this.curScreen.cancel();
                    cancelToken = new axios_1.default.CancelToken(function (cancel) {
                        _this.curScreen ? _this.curScreen.cancel = cancel : null;
                    });
                }
                return [2, axios_1.default.post(url, data, { cancelToken: cancelToken })
                        .then(function (res) {
                        var data = res.data;
                        if (canvasIds) {
                            data.streams.forEach(function (stream, index) {
                                var screen = _this.getScreenById(canvasIds[index]);
                                _this.dealVideo(stream, screen);
                            });
                        }
                        return res.data;
                    }, function (err) {
                        var request = err.request, data = err.data;
                        if (canvasIds) {
                            canvasIds.forEach(function (canvasId, index) {
                                var msg = request.readyState === 0 ? "意外错误:本地解码服务已停止" : data.streams[index].reason;
                                var screen = _this.getScreenById(canvasId);
                                _this.canvasText(screen.canvas, msg, ERROR_COLOR);
                            });
                        }
                        return data;
                    })];
            });
        });
    };
    SucH5Player.prototype.terminateStreams = function (url, streams, canvasIds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!streams.length)
                    return [2, Promise.resolve(null)];
                return [2, axios_1.default.delete(url, { data: { streams: streams } }).then(function (res) {
                        if (canvasIds) {
                            canvasIds.forEach(function (id) {
                                var screen = _this.getScreenById(id);
                                screen.streamId = "";
                                screen.camSipId = "";
                                _this.clearCanvas(screen.canvas);
                            });
                        }
                        return res.data;
                    })];
            });
        });
    };
    SucH5Player.prototype.playbackTo = function (relativetime, canvasId) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (screen && screen.privateData) {
            var params = {
                deviceid: screen.privateData.deviceId,
                streamid: screen.privateData.streamId,
                relativetime: relativetime
            };
            return axios_1.default.post(this.ports.playbackTo, null, { params: params }).then(function (res) { return res.data; });
        }
        return Promise.resolve();
    };
    SucH5Player.prototype.pausePlayback = function (canvasId) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (!screen || !screen.streamId)
            return Promise.resolve();
        var params = {
            deviceid: screen.camSipId,
            streamid: screen.streamId,
            speed: 1,
            relativetime: 0
        };
        return axios_1.default.post(this.ports.pause, null, { params: params }).then(function (res) { return res.data; });
    };
    SucH5Player.prototype.replayPlayback = function (canvasId) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (!screen || !screen.streamId)
            return Promise.resolve();
        var params = {
            deviceid: screen.camSipId,
            streamid: screen.streamId
        };
        return axios_1.default.post(this.ports.replay, null, { params: params }).then(function (res) { return res.data; });
    };
    SucH5Player.prototype.download = function (downOpt) {
        var _this = this;
        var body = {
            server: this.sipServerInfo,
            devices: [
                {
                    device_id: downOpt.camsipId,
                    start_time: Math.round(downOpt.start.getTime() / 1000),
                    end_time: Math.round(downOpt.end.getTime() / 1000),
                    origin_end_time: Math.round(downOpt.end.getTime() / 1000)
                }
            ]
        };
        return axios_1.default.post(this.ports.down, body).then(function (res) {
            var data = res.data;
            var streamInfo = data.streams[0] || {};
            if (streamInfo.code === SUCCESS_CODE) {
                var ws_url = streamInfo.progress_url;
                if (ws_url) {
                    _this.downloads.push({
                        stream_id: data.streams[0].stream_id,
                        device: downOpt.camsipId
                    });
                    var downloader = new h5_yuv_player_1.DownloaderProgress(ws_url, { on_progress: downOpt.callback || (function () { }) });
                    downloader.Start();
                    return {
                        streamId: streamInfo.stream_id,
                        filePath: streamInfo.file_path
                    };
                }
            }
        });
    };
    SucH5Player.prototype.stopDownload = function (stream_id) {
        var _this = this;
        var streams = stream_id ? [this.downloads.find(function (it) { return it.stream_id === stream_id; })] : this.downloads.slice(0);
        return axios_1.default.delete(this.ports.stop, { data: { streams: streams } }).then(function (res) {
            return _this.downloads = stream_id ? _this.downloads.filter(function (it) { return it.stream_id != stream_id; }) : [];
        });
    };
    SucH5Player.prototype.stop = function (canvasId) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (!screen || !screen.streamId)
            return Promise.resolve();
        screen.player && screen.player.Stop();
        screen.player && screen.player.Destructor();
        var streams = screen.streamId ? [
            {
                stream_id: screen.streamId,
                device: screen.camSipId
            }
        ] : [];
        var _canvasId = canvasId || screen.id;
        var url = this.config.flowType === interface_1.FlowTypes.server ? this.ports.stop : this.ports.stopRtsp;
        return this.terminateStreams(url, streams, [_canvasId]);
    };
    SucH5Player.prototype.stopAll = function (streams) {
        var url = this.config.flowType === interface_1.FlowTypes.server ? this.ports.stop : this.ports.stopRtsp;
        if (streams) {
            var _a = streams.reduce(function (result, next) {
                result._streams.push({ stream_id: next.stream_id, device: next.device });
                result.canvasIds.push(next.canvasId);
                return result;
            }, { _streams: [], canvasIds: [] }), _streams_1 = _a._streams, canvasIds_1 = _a.canvasIds;
            return this.terminateStreams(url, _streams_1, canvasIds_1);
        }
        var _streams = [];
        var canvasIds = [];
        this.screens.forEach(function (screen) {
            if (!screen.streamId)
                return;
            screen.player && screen.player.Stop();
            screen.player && screen.player.Destructor();
            if (screen.streamId) {
                _streams.push({
                    stream_id: screen.streamId,
                    device: screen.camSipId
                });
                canvasIds.push(screen.id);
            }
        });
        return this.terminateStreams(url, _streams, canvasIds);
    };
    SucH5Player.prototype.changeScreen = function (canvasId) {
        this.curScreen = this.screens.find(function (screen) { return screen.id === canvasId; }) || null;
    };
    SucH5Player.prototype.fullScreen = function (canvasId) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (screen && screen.player && !screen.player.IsFullscreen()) {
            screen.player.SwitchFullscreen();
            this.resetSize("", window.screen.width, window.screen.height);
        }
    };
    SucH5Player.prototype.cancelFull = function (canvasId) {
        var _this = this;
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        if (screen.player && screen.player.IsFullscreen()) {
            screen.player.SwitchFullscreen();
            setTimeout(function () {
                _this.resetSize();
            }, 50);
        }
    };
    SucH5Player.prototype.capture = function (canvasId, fileName) {
        if (canvasId) {
            this.changeScreen(canvasId);
        }
        var screen = this.curScreen;
        var fileN = fileName || (new Date().toLocaleDateString() + new Date().toLocaleTimeString());
        screen.player && screen.player.Capture(fileN);
    };
    SucH5Player.prototype.dragZoom = function (type, params) {
        var screen = this.curScreen;
        if (screen && screen.privateData) {
            params.deviceid = screen.privateData && screen.privateData.deviceId;
            params.streamid = screen.privateData && screen.privateData.streamId;
            return axios_1.default.post(this.ports.play + "/" + type, null, { params: params }).then(function (res) { return res.data; });
        }
        return Promise.resolve();
    };
    SucH5Player.prototype.destroy = function () {
        this.stopAll();
        this.removeEvents();
    };
    SucH5Player.prototype.initScreen = function (canvasId) {
        this.curScreen = this.screens.find(function (item) { return item.id === canvasId; }) || null;
        var canvas = this.config.root.querySelector("#" + canvasId);
        if (!this.curScreen) {
            this.curScreen = {
                id: canvasId,
                camSipId: "",
                canvas: canvas,
                player: null,
                privateData: null
            };
            this.screens.push(this.curScreen);
            this.resetSize();
        }
        if (this.config.dragable && !this.curScreen.boxChoose) {
            this.createChooseBox();
        }
    };
    SucH5Player.prototype.getScreenById = function (id) {
        return this.screens.find(function (screen) { return screen.id === id; });
    };
    SucH5Player.prototype.dealVideo = function (stream, screen) {
        var _this = this;
        var _screen = screen || this.curScreen;
        var opt = {
            render_opt: {
                canvas: _screen.canvas
            },
            reconnect_interval: RECONNECT_INTERVAL,
            on_error: function (str) {
                _this.canvasText(_screen.canvas, str, ERROR_COLOR);
            },
            on_stream_info: _screen.onStreamInfo ? _screen.onStreamInfo : function (stream_info) { },
            on_first_frame: function () {
                if (_this.config.playSuccess) {
                    _this.config.playSuccess(_this.config);
                }
            },
            watermark_string: this.config.hasWaterMarker ? this.browseIp + ' ' + localStorage.curUserName : ""
        };
        if (stream[this.config.flowType === interface_1.FlowTypes.server ? "device" : "rtsp"] !== _screen.camSipId) {
            return;
        }
        ;
        if (stream.code != SUCCESS_CODE) {
            _screen.playStatus = PLAY_STATUS_FAIL;
            this.canvasText(_screen.canvas, stream.reason || "", ERROR_COLOR);
        }
        var ws_url = stream.url;
        var playerPrivateData = {
            deviceId: _screen.camSipId || "",
            streamId: stream.stream_id || ""
        };
        if (ws_url) {
            _screen.playStatus = PLAY_STATUS_SUC;
            _screen.streamId = stream.stream_id;
            _screen.player = new h5_yuv_player_1.YuvPlayer(ws_url, opt);
            _screen.privateData = playerPrivateData;
            _screen.player.Start();
        }
    };
    SucH5Player.prototype.canvasText = function (canvasEle, text, color) {
        var ctx = canvasEle.getContext('2d');
        var width = canvasEle.clientWidth;
        var height = canvasEle.clientHeight;
        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = 'center';
        ctx.font = CANVAS_FONT;
        ctx.fillStyle = color;
        ctx.fillText(text, width / 2, height / 2, width);
    };
    SucH5Player.prototype.clearCanvas = function (canvasEle) {
        var ctx = canvasEle.getContext("2d");
        var height = canvasEle.getAttribute("height") || "";
        var width = canvasEle.getAttribute("width") || "";
        ctx.clearRect(0, 0, parseInt(width), parseInt(height));
    };
    return SucH5Player;
}(IPlayer));
exports.default = SucH5Player;


/***/ }),

/***/ "./src/httpMonitor.ts":
/*!****************************!*\
  !*** ./src/httpMonitor.ts ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
var CTRL_LEFT = "left";
var CTRL_RIGHT = "right";
var CTRL_UP = "up";
var CTRL_DOWN = "down";
var CTRL_LEFT_UP = "top-left";
var CTRL_LEFT_DOWN = "bottom-left";
var CTRL_RIGHT_UP = "top-right";
var CTRL_RIGHT_DOWN = "bottom-right";
var CTRL_ZOOM_IN = "in";
var CTRL_ZOOM_OUT = "out";
var CTRL_FOCUS_FAR = "away";
var CTRL_FOCUS_NEAR = "close";
var CTRL_IMAGE_SMALL = "out";
var CTRL_IMAGE_LARGE = "in";
var LOCAL_SERVER_BASEURL = "http://127.0.0.1:61080";
var Monitor = (function () {
    function Monitor() {
    }
    return Monitor;
}());
exports.Monitor = Monitor;
var HttpMonitor = (function (_super) {
    __extends(HttpMonitor, _super);
    function HttpMonitor(opt) {
        var _this = _super.call(this) || this;
        _this.option = opt;
        var baseUrl = _this.localserverUrl = opt && opt.localserverUrl || LOCAL_SERVER_BASEURL;
        _this.ports = {
            turn_zoom: baseUrl + "/share/stream/play/ptz",
            focus_iris: baseUrl + "/share/stream/play/fi",
            stop: baseUrl + "/share/stream/play/stopcontrol",
            preset: baseUrl + "/share/stream/play/preset"
        };
        return _this;
    }
    HttpMonitor.prototype.sendCmd = function (url, params) {
        if (!url || !params) {
            console.error("请传入地址和参数");
            return Promise.reject();
        }
        return axios_1.default.post(url, null, { params: params }).then(function (res) { return res.data; });
    };
    HttpMonitor.prototype.turnLeft = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_LEFT,
            pan_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnRight = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_RIGHT,
            pan_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnUp = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_UP,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnDown = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_DOWN,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnRightUp = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_RIGHT_UP,
            pan_speed: speed,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnRightDown = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_RIGHT_DOWN,
            pan_speed: speed,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnLeftDown = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_LEFT_DOWN,
            pan_speed: speed,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.turnLeftUp = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            direction: CTRL_LEFT_UP,
            pan_speed: speed,
            tilt_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.zoomIn = function (speed) {
        if (speed === void 0) { speed = 5; }
        var params = {
            deviceid: this.option.uuid,
            zoom: CTRL_ZOOM_IN,
            zoom_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.zoomOut = function (speed) {
        if (speed === void 0) { speed = 5; }
        var params = {
            deviceid: this.option.uuid,
            zoom: CTRL_ZOOM_OUT,
            zoom_speed: speed
        };
        return this.sendCmd(this.ports.turn_zoom, params);
    };
    HttpMonitor.prototype.focusFar = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            focus: CTRL_FOCUS_FAR,
            focus_speed: speed
        };
        return this.sendCmd(this.ports.focus_iris, params);
    };
    HttpMonitor.prototype.focusNear = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            focus: CTRL_FOCUS_NEAR,
            focus_speed: speed
        };
        return this.sendCmd(this.ports.focus_iris, params);
    };
    HttpMonitor.prototype.imageSmall = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            iris: CTRL_IMAGE_SMALL,
            iris_speed: speed
        };
        return this.sendCmd(this.ports.focus_iris, params);
    };
    HttpMonitor.prototype.imageLarge = function (speed) {
        if (speed === void 0) { speed = 50; }
        var params = {
            deviceid: this.option.uuid,
            iris: CTRL_IMAGE_LARGE,
            iris_speed: speed
        };
        return this.sendCmd(this.ports.focus_iris, params);
    };
    HttpMonitor.prototype.stop = function () {
        var params = {
            deviceid: this.option.uuid
        };
        return this.sendCmd(this.ports.stop, params);
    };
    HttpMonitor.prototype.getPresets = function () {
        var params = {
            deviceid: this.option.uuid
        };
        return axios_1.default.get("" + this.ports.preset, { params: params }).then(function (res) { return res.data; });
    };
    HttpMonitor.prototype.createPreset = function (preNum) {
        var params = {
            deviceid: this.option.uuid
        };
        return this.sendCmd(this.ports.preset + "/" + preNum, params);
    };
    HttpMonitor.prototype.getPreset = function (preNum) {
        var params = {
            deviceid: this.option.uuid
        };
        return axios_1.default.get(this.ports.preset + "/" + preNum, { params: params }).then(function (res) { return res.data; });
    };
    HttpMonitor.prototype.deletePreset = function (preNum) {
        var params = {
            deviceid: this.option.uuid
        };
        return axios_1.default.delete(this.ports.preset + "/" + preNum, { params: params }).then(function (res) { return res.data; });
    };
    return HttpMonitor;
}(Monitor));
exports.HttpMonitor = HttpMonitor;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var h5player_1 = __webpack_require__(/*! ./h5player */ "./src/h5player.ts");
exports.SucH5Player = h5player_1.default;
exports.IPlayer = h5player_1.IPlayer;
var sdkPlayer_1 = __webpack_require__(/*! ./sdkPlayer */ "./src/sdkPlayer.ts");
exports.SdkNetPlayer = sdkPlayer_1.SdkNetPlayer;
var httpMonitor_1 = __webpack_require__(/*! ./httpMonitor */ "./src/httpMonitor.ts");
exports.Monitor = httpMonitor_1.Monitor;
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
exports.TimeLineScale = utils_1.TimeLineScale;
exports.videoFilesTransform = utils_1.videoFilesTransform;
exports.toVideoTime = utils_1.toVideoTime;


/***/ }),

/***/ "./src/interface.ts":
/*!**************************!*\
  !*** ./src/interface.ts ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
exports.BoxChoose = utils_1.BoxChoose;
var httpMonitor_1 = __webpack_require__(/*! ./httpMonitor */ "./src/httpMonitor.ts");
exports.HttpMonitor = httpMonitor_1.HttpMonitor;
var DragZoomTypes;
(function (DragZoomTypes) {
    DragZoomTypes["out"] = "dragzoomout";
    DragZoomTypes["in"] = "dragzoomin";
})(DragZoomTypes = exports.DragZoomTypes || (exports.DragZoomTypes = {}));
var FlowTypes;
(function (FlowTypes) {
    FlowTypes["server"] = "server";
    FlowTypes["url"] = "url";
})(FlowTypes = exports.FlowTypes || (exports.FlowTypes = {}));


/***/ }),

/***/ "./src/sdkPlayer.ts":
/*!**************************!*\
  !*** ./src/sdkPlayer.ts ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var INIT_CODE_MAP = {
    "DAHUA": 3,
    "HAIKANG": 0,
    "28181": 2,
    "8700": 13,
    "8700-H": 14
};
var LOGIN_CODE_MAP = {
    "10": "资源加载失败",
    "20": "资源加载失败",
    "30": "登陆失败",
    "40": "已经登陆",
    "60": "未初始化"
};
var PLAY_CODE_MAP = {
    "10": "资源加载失败",
    "20": "资源加载失败",
    "30": "播放失败",
    "40": "已经在播放",
    "50": "未登录",
    "60": "未初始化"
};
var SUCCESS_INFO = {
    code: 200,
    msg: "成功"
};
var NO_FIND_MSG = "没有查找到控件元素";
var INIT_ERROR_MSG = "初始化失败";
var LOGOUT_ERROR_MSG = "视频登出失败";
var STOP_ERROR_MSG = "视频停止操作失败";
var MONITOR_ERROR_MSG = "视频云台创建失败";
var PAUSE_ERROR_MSG = "视频暂停播放操作失败";
var RESTART_ERROR_MSG = "视频恢复播放操作失败";
var STOPBACK_ERROR_MSG = "视频停止回放操作失败";
var MONITOR_OPRATE_ERROR_MSG = "视频云台操作失败";
var FULLSCREEN_ERROR_MSG = "全屏操作失败";
var DOWN_CTRL_URL = "/download/SetupActiveX3nd.zip";
var DOWN_CTRL_CONFIRM = "确认下载视频控件？";
var BROWSE_TYPE_MSG = "视频播放需使用IE浏览器！";
var hasCheck = false;
var install = function () {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        if (window.confirm(DOWN_CTRL_CONFIRM)) {
            window.open(DOWN_CTRL_URL);
        }
    }
    else {
        window.alert(BROWSE_TYPE_MSG);
    }
    hasCheck = true;
};
var SdkNetPlayer = (function () {
    function SdkNetPlayer(selector, opt) {
        this.options = utils_1.assign({ down_ctrl_url: DOWN_CTRL_URL }, opt);
        this.ctrl = typeof selector === "string" ? document.querySelector(selector) : selector;
        this.hasCtrl();
    }
    SdkNetPlayer.prototype.hasCtrl = function () {
        if (!this.ctrl) {
            console.error(NO_FIND_MSG);
        }
        return {
            code: !!this.ctrl ? 200 : 404,
            msg: NO_FIND_MSG
        };
    };
    SdkNetPlayer.prototype.sendCmd = function (cmd, params, msg) {
        var res = 0;
        var checkRes = this.hasCtrl();
        if (checkRes.code != 200)
            return checkRes;
        var execString = "this.ctrl[cmd](";
        params.forEach(function (item) {
            execString += "item,";
        });
        execString += ")";
        try {
            res = eval(execString);
        }
        catch (error) {
            console.warn(error.toString());
        }
        if (res != 0) {
            return {
                code: res,
                msg: typeof msg === "string" ? msg : msg[res]
            };
        }
        return SUCCESS_INFO;
    };
    SdkNetPlayer.prototype.setDownCtrlUrl = function (url) {
        this.options.down_ctrl_url = url;
    };
    SdkNetPlayer.prototype.init = function (manufacturer) {
        var res = 0;
        if (!this.hasCtrl())
            return;
        var initCode = INIT_CODE_MAP[manufacturer];
        try {
            res = this.ctrl.Init(initCode);
            if (res != 0) {
                return {
                    code: res,
                    msg: INIT_ERROR_MSG
                };
            }
        }
        catch (error) {
            if (!hasCheck)
                install();
            console.log(error.toString());
        }
        return SUCCESS_INFO;
    };
    SdkNetPlayer.prototype.login = function (user, pwd, url, port) {
        return this.sendCmd("Login", [user, pwd, url, port], LOGIN_CODE_MAP);
    };
    SdkNetPlayer.prototype.logout = function () {
        return this.sendCmd("Logout", [], LOGOUT_ERROR_MSG);
    };
    SdkNetPlayer.prototype.clean = function () {
        if (!this.hasCtrl())
            return;
        this.ctrl.CleanUp();
    };
    SdkNetPlayer.prototype.playByUuid = function (uuid) {
        return this.sendCmd("PlayByUUID", [uuid, 0], PLAY_CODE_MAP);
    };
    SdkNetPlayer.prototype.playByChannel = function (channel) {
        return this.sendCmd("playByChannel", [channel], PLAY_CODE_MAP);
    };
    SdkNetPlayer.prototype.createMonitor = function (uuid) {
        return this.sendCmd("PTZCreate", [uuid], MONITOR_ERROR_MSG);
    };
    SdkNetPlayer.prototype.stop = function () {
        return this.sendCmd("StopPlay", [], STOP_ERROR_MSG);
    };
    SdkNetPlayer.prototype.playBack = function (uuid, start, end) {
        return this.sendCmd("startPlayBack", [uuid, start, end], PLAY_CODE_MAP);
    };
    SdkNetPlayer.prototype.stopPlayBack = function () {
        return this.sendCmd("stopPlayBack", [], STOPBACK_ERROR_MSG);
    };
    SdkNetPlayer.prototype.pause = function () {
        return this.sendCmd("PlayBackPause", [], PAUSE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.restart = function () {
        return this.sendCmd("PlayBackRestart", [], RESTART_ERROR_MSG);
    };
    SdkNetPlayer.prototype.getFiles = function (uuid, start, end, totalWidth) {
        if (totalWidth === void 0) { totalWidth = 300; }
        var checkRes = this.hasCtrl();
        if (checkRes.code != 200)
            return checkRes;
        var res = this.ctrl.GetReplayFileList(uuid, start, end);
        var result = {
            code: 200,
            msg: ""
        };
        if (res) {
            result.content = utils_1.videoFilesTransform(res, new Date(start).getTime(), new Date(end).getTime(), totalWidth);
        }
        return result;
    };
    SdkNetPlayer.prototype.fullScreen = function () {
        return this.sendCmd("fullScreen", [], FULLSCREEN_ERROR_MSG);
    };
    SdkNetPlayer.prototype.turnLeft = function (speed) {
        if (speed === void 0) { speed = 150; }
        return this.sendCmd("PTZLeft", [speed], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.turnRight = function (speed) {
        if (speed === void 0) { speed = 150; }
        return this.sendCmd("PTZRight", [speed], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.turnUp = function (speed) {
        if (speed === void 0) { speed = 150; }
        return this.sendCmd("PTZUp", [speed], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.zoomOut = function (speed) {
        if (speed === void 0) { speed = 150; }
        return this.sendCmd("PTZDown", [speed], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.zoomIn = function (speed) {
        if (speed === void 0) { speed = 150; }
        return this.sendCmd("PTZDown", [speed], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.zoomStop = function () {
        return this.sendCmd("PTZStop", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.focusFar = function () {
        return this.sendCmd("PTZFocusFar", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.focusNear = function () {
        return this.sendCmd("PTZFocusNear", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.focusStop = function () {
        return this.sendCmd("PTZFocusStop", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.imageLarge = function () {
        return this.sendCmd("PTZImageLarge", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.imageSmall = function () {
        return this.sendCmd("PTZImageSmall", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.imageStop = function () {
        return this.sendCmd("PTZImageStop", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.wiperClose = function () {
        return this.sendCmd("PTZWiperClose", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.wiperOpen = function () {
        return this.sendCmd("PTZWiperOpen", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.lightOpen = function () {
        return this.sendCmd("PTZLightOpen", [], MONITOR_OPRATE_ERROR_MSG);
    };
    SdkNetPlayer.prototype.lightClose = function () {
        return this.sendCmd("PTZLightClose", [], MONITOR_OPRATE_ERROR_MSG);
    };
    return SdkNetPlayer;
}());
exports.SdkNetPlayer = SdkNetPlayer;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HELP_CANVAS_ZINDEX = "10000";
var HELP_CANVAS_ID = "drag-canvas-help";
var RECT_STROKE_COLOR = "red";
var RECT_STROKE_SIZE = 4;
var BoxChoose = (function () {
    function BoxChoose(selector, targetInfo, callback) {
        this.element = typeof selector == "object" ? selector : document.querySelector(selector);
        this.rect_info = {
            x: 0,
            y: 0,
            regionX: 0,
            regionY: 0,
            width: 0,
            height: 0,
            center: [0, 0]
        };
        this.target_info = Object.assign({}, { width: 0, height: 0 }, targetInfo);
        this.callback = callback || function () { };
        this.bindEvents();
    }
    BoxChoose.prototype.bindEvents = function () {
        this.mousedownHandler = this.mousedownHandler.bind(this);
        this.element.addEventListener("mousedown", this.mousedownHandler);
    };
    BoxChoose.prototype.destroy = function () {
        this.element.removeEventListener("mousedown", this.mousedownHandler);
    };
    BoxChoose.prototype.mousedownHandler = function (e) {
        var computedStyle = window.getComputedStyle(this.element);
        var x = this.rect_info.x = e.clientX - this.element.getBoundingClientRect().left;
        var y = this.rect_info.y = e.clientY - this.element.getBoundingClientRect().top;
        this.rect_info.regionX = e.clientX;
        this.rect_info.regionY = e.clientY;
        var helpCanvas = this.createHelpCanvas();
        this.target_info.width = computedStyle.width && Number(computedStyle.width.slice(0, -2)) || 0;
        this.target_info.height = computedStyle.height && Number(computedStyle.height.slice(0, -2)) || 0;
        this.mousemoveHandler = this.mousemoveHandler.bind(this);
        this.mouseupHandler = this.mouseupHandler.bind(this);
        helpCanvas.addEventListener("mousemove", this.mousemoveHandler);
        helpCanvas.addEventListener("mouseup", this.mouseupHandler);
    };
    BoxChoose.prototype.mousemoveHandler = function (e) {
        var rect_info = this.rect_info;
        var real_x = e.clientX > rect_info.regionX ? rect_info.regionX : e.clientX;
        var real_y = e.clientY > rect_info.regionY ? rect_info.regionY : e.clientY;
        var x = e.clientX - this.element.getBoundingClientRect().left;
        var y = e.clientY - this.element.getBoundingClientRect().top;
        rect_info.width = Math.abs(x - rect_info.x);
        rect_info.height = Math.abs(y - rect_info.y);
        rect_info.center[0] = rect_info.x + Math.round((x - rect_info.x) / 2);
        rect_info.center[1] = rect_info.y + Math.round((y - rect_info.y) / 2);
        this.drawRect(real_x, real_y, rect_info.width, rect_info.height);
    };
    BoxChoose.prototype.createHelpCanvas = function () {
        var canvas = document.createElement("canvas");
        var body = document.body;
        this.removeHelpCanvas();
        canvas.style.width = canvas.style.height = "100%";
        canvas.style.position = "fixed";
        canvas.style.left = canvas.style.top = "0";
        canvas.style.zIndex = HELP_CANVAS_ZINDEX;
        canvas.setAttribute("width", window.innerWidth);
        canvas.setAttribute("height", window.innerHeight);
        canvas.setAttribute("id", HELP_CANVAS_ID);
        body.appendChild(canvas);
        return canvas;
    };
    BoxChoose.prototype.removeHelpCanvas = function () {
        var helper = document.getElementById(HELP_CANVAS_ID);
        var body = document.body;
        if (helper) {
            helper.removeEventListener("mousemove", this.mousemoveHandler);
            body.removeChild(helper);
        }
    };
    BoxChoose.prototype.mouseupHandler = function (e) {
        var helpCanvas = document.getElementById(HELP_CANVAS_ID);
        if (this.callback && typeof this.callback === "function") {
            this.callback(this.rect_info, this.target_info);
        }
        this.removeHelpCanvas();
        helpCanvas.removeEventListener("mousemove", this.mousemoveHandler);
        helpCanvas.removeEventListener("mouseup", this.mouseupHandler);
    };
    BoxChoose.prototype.drawRect = function (x0, y0, width, height) {
        var helpCanvas = document.getElementById(HELP_CANVAS_ID);
        var cw = helpCanvas.clientWidth;
        var ch = helpCanvas.clientHeight;
        var ctx = helpCanvas.getContext("2d");
        ctx.lineWidth = RECT_STROKE_SIZE;
        ctx.strokeStyle = RECT_STROKE_COLOR;
        ctx.clearRect(0, 0, cw, ch);
        ctx.strokeRect(x0, y0, width, height);
    };
    return BoxChoose;
}());
exports.BoxChoose = BoxChoose;
var TimeLineScale = (function () {
    function TimeLineScale(totolWidth, totalTime, option) {
        var defaultOpt = {
            formater: "mm:ss",
            startLabel: "",
            endLayer: ""
        };
        this.tw = totolWidth;
        this.tt = totalTime;
        this.option = Object.assign({}, defaultOpt, option);
        this.scales = [];
        this.scaleNum = 0;
        this.initScales();
    }
    TimeLineScale.prototype.calcScaleNum = function () {
        if (this.tt <= 60) {
            this.scaleNum = 15;
        }
        else if (this.tt <= 3600) {
            this.tt = 3600;
            this.scaleNum = 12;
        }
        else if (this.tt <= 3600 * 3) {
            this.tt = 3600 * 3;
            this.scaleNum = 9;
        }
        else if (this.tt <= 3600 * 6) {
            this.tt = 3600 * 6;
            this.scaleNum = 12;
        }
        else if (this.tt <= 3600 * 12) {
            this.tt = 3600 * 12;
            this.scaleNum = 12;
        }
        else {
            this.tt = 3600 * 24;
            this.scaleNum = 16;
        }
    };
    TimeLineScale.prototype.initScales = function () {
        this.calcScaleNum();
        this.scales.length = 0;
        var scaleNum = this.scaleNum;
        var totalW = this.tw;
        var totalT = this.tt;
        var singW = totalW / scaleNum;
        var singT = totalT / scaleNum;
        while (scaleNum + 1) {
            var left = singW * scaleNum;
            var time = singT * scaleNum;
            var scale = this.createScale(left, time);
            scale.label = scaleNum == 0 ? (this.option.startLabel || scale.label) : (scaleNum == this.scaleNum ? (this.option.endLabel || scale.label) : scale.label);
            this.scales.unshift(scale);
            scaleNum--;
        }
    };
    TimeLineScale.prototype.createScale = function (left, time) {
        var label = this.timeFormat(time);
        return {
            label: label,
            left: left,
            time: time
        };
    };
    TimeLineScale.prototype.timeFormat = function (time) {
        var date = new Date(1570636800000 + time * 1000);
        var fmt = this.option.formater;
        var dateList = {
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds()
        };
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateList) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
            }
        }
        return fmt;
    };
    return TimeLineScale;
}());
exports.TimeLineScale = TimeLineScale;
exports.videoFilesTransform = function (files, start, end, totalWidth) {
    var lastEnd = 0;
    var videoList = [];
    var timeParts = [];
    var fileList = typeof (files) == "string" ? files.split(",") : files;
    fileList.forEach(function (file, i) {
        var partStart = typeof (files) == "string"
            ? new Date(file.slice(file.indexOf("start") + 6, file.indexOf("_end")).replace("_", " ").replace(/-/g, "/")).getTime()
            : new Date(file.start_time).getTime();
        var partEnd = typeof (files) == "string"
            ? new Date(file.slice(file.indexOf("end") + 4).replace("_", " ").replace(/-/g, "/")).getTime()
            : new Date(file.end_time).getTime();
        if (partStart == lastEnd) {
            timeParts[timeParts.length - 1].style.width = (Math.min(partEnd, end) - videoList[videoList.length - 1][0]) / (end - start) * totalWidth + "px";
            videoList[videoList.length - 1][1] = partEnd;
        }
        else {
            var left = (partStart - start < 0 ? 0 : partStart - start) / (end - start) * totalWidth + "px";
            var width = (Math.min(partEnd, end) - partStart) / (end - start) * totalWidth + "px";
            var startVal = Math.max(partStart, start);
            timeParts.push({
                style: { left: left, width: width },
                value: [startVal, partEnd]
            });
            videoList.push([startVal, partEnd]);
        }
        lastEnd = partEnd;
    });
    return {
        videoList: videoList,
        timeParts: timeParts
    };
};
exports.exactType = function (data, type) { return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === type.toLowerCase(); };
exports.assign = function (target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    try {
        Object.assign.apply(null, __spreadArrays([target], rest));
    }
    catch (error) {
        rest.forEach(function (item) {
            Object.keys(item).forEach(function (key) {
                target[key] = item[key];
            });
        });
    }
    return target;
};
exports.toVideoTime = function (date, fmt) {
    if (fmt === void 0) { fmt = "yyyy-MM-ddTHH:mm:ss"; }
    var input = date;
    if (exports.exactType(date, "string") || exports.exactType(date, "number")) {
        input = new Date(date);
    }
    var dateList = {
        "M+": input.getMonth() + 1,
        "d+": input.getDate(),
        "H+": input.getHours(),
        "m+": input.getMinutes(),
        "s+": input.getSeconds(),
        "q+": Math.floor((input.getMonth() + 3) / 3),
        "S+": input.getMilliseconds()
    };
    if (/(y+)/i.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (input.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in dateList) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
        }
    }
    return fmt;
};


/***/ })

/******/ });
});
//# sourceMappingURL=svideo.js.map