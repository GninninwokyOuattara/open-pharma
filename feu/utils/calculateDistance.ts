const calculateDistance = (pos1: [number, number], pos2: [number, number]): number => {
    // const parseLatLon = (pos: string): number[] => {
    //     return pos
    //         .trim()
    //         .split(",")
    //         .map((e) => parseFloat(e));
    // };

    const [lat1, lon1] = pos1;
    const [lat2, lon2] = pos2;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
};

export { calculateDistance };
