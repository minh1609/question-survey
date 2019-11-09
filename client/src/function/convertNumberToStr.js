//Convert 0 to A, 1 to B, 2 to C, ...

const convertNumber = n => {
    if (n === undefined) return "...";
    return String.fromCharCode(n + 65);
};

export default convertNumber;
