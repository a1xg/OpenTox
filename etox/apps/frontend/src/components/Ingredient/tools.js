import {capitalize} from '@material-ui/core';

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

export default capitalizeJoinItems;