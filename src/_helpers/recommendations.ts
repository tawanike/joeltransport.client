const between = (storage_units: number, min: number, max: number): boolean => {
    return storage_units >= min && storage_units <= max;
}


const recommend_truck = (trucks: any[], storage_units: number) => {
    return trucks.find(truck => between(
        storage_units,
        truck.storage_units_recommendations.min,
        truck.storage_units_recommendations.max));
}


export default recommend_truck;
