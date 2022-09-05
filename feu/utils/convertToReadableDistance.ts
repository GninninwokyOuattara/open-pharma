const convertToReadableDistance = (distance: number) => {
    if (distance / 1000 >= 1) {
        distance = Math.round((distance / 1000 + Number.EPSILON) * 100) / 100;
        return distance + " Km";
    }
    return Math.ceil(distance) + " M";
};

export { convertToReadableDistance };
