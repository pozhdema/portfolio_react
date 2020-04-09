import React from 'react'

function Replace(key) {
    let arr = getData(key);
    console.log(arr);
    return arr;

}

async function getData(key) {
    let arr = await fetch('http://localhost:3000/lang/uk.json')
        .then((response) => {
            return response.json();
        });
    return arr[key];
}

export default Replace