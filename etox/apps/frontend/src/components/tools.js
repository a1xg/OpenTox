import { capitalize } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Converts the elements of an array first into a lowercase then 
 * capitalized and concatenated through a separator.
 * @param {Array} functions 
 * @param {string} separator
 * @returns {Array}
 */
const capitalizeJoinItems = ({ items, separator }) => {
    let newItems = [];
    items.map((item) => {
        newItems.push(capitalize(item.toLowerCase()))
    });
    return newItems.join(`${separator} `);
};

/**
 * Defines the width of the user's display. 
 * If resolution > 'md' breakpoint - return 'desctop' else 'mobile'
 * @returns 'desctop' | 'mobile'
 */
const MobileOrDesctop = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    return matches == true ? 'desctop' : 'mobile'
};

/**
 * Converts base64 image to jpg file
 * @param {*} dataURL 
 * @returns 
 */
const base64decode = (dataURL) => {
    let arr = dataURL.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    };

    return new File([u8arr], 'image.jpg', { type: mime });
};

/**
 * Takes in the dimensions of the image and the parameter of the 
 * maximum dimension. The image will be scaled keeping proportions 
 * and any of its dimensions will be no more than the maximum
 * @param {number} width
 * @param {number} height
 * @param {number} maxResolution
 * @returns 
 */
const getPreviewSize = ({ width, height, maxResolution }) => {
    const maxDimension = Math.max(width, height)
    const scaleCoefficient = maxDimension / maxResolution
    const newWidth = Math.ceil(width / scaleCoefficient)
    const newHeight = Math.ceil(height / scaleCoefficient)
    return {
        width: newWidth,
        height: newHeight
    }
};

export {
    capitalizeJoinItems,
    MobileOrDesctop,
    base64decode,
    getPreviewSize
};

