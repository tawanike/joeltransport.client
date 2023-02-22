import { geocodeByPlaceId } from "react-google-places-autocomplete";

type StreetAddress = {
    street_number: string;
    street_name: string;
};


type Address = {
    street_address: string;
    suburb: string;
    city: string;
    province: string;
    postalcode: string;
    country: string;
    municipality: string;
    place_id: string;
    formatted_address: string;
}

const formatAddress = async (location: any) => {
    let address = {} as Address;
    let street_address = {} as StreetAddress;
    const googlePlace = await geocodeByPlaceId(location?.value?.place_id);
    googlePlace[0].address_components.forEach((component: any) => {

        if (component.types.includes('street_number')) street_address = Object.assign(street_address, { street_number: component.long_name });
        if (component.types.includes('route')) street_address = Object.assign(street_address, { street_name: component.long_name });

        if (street_address.street_number && street_address.street_name) address = Object.assign(address, { street_address: `${street_address.street_number} ${street_address.street_name}` });
        if (component.types.includes('sublocality')) address = Object.assign(address, { suburb: component.long_name });
        if (component.types.includes('locality')) address = Object.assign(address, { city: component.long_name });
        if (component.types.includes('administrative_area_level_1')) address = Object.assign(address, { province: component.long_name });
        if (component.types.includes('postal_code')) address = Object.assign(address, { postalcode: component.long_name });
        if (component.types.includes('country')) address = Object.assign(address, { country: component.long_name });
        if (component.types.includes('administrative_area_level_2')) address = Object.assign(address, { municipality: component.long_name });

    });
    address.place_id = googlePlace[0].place_id;
    address.formatted_address = googlePlace[0].formatted_address;
    return address;
}

export const addressUtils = {
    formatAddress,
}
