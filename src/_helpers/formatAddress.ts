const formatAddress = (location: any, geocoded: any) => {
    console.log('geocoded', geocoded);
    console.log('location', location);

    return {
        unit_number: location.value.unit_number,
        complex_name: location.value.complex_name,
        street_address: location.value.street_address,
        suburb: location.value.suburb,
        city: location.value.city,
        province: location.value.province,
        postalcode: location.value.postalcode,
        municipality: location.value.municipality,
        country: location.value.country,
        place_id: location.value.place_id,
        formatted_address: geocoded.formatted_address,
    }
}

export const addressUtils = {
    formatAddress,
}
