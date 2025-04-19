// Utility function to check if vehicle details are complete
export const checkVehicleDetailsComplete = (vehicleDetails: {
    mileage?: string | null;
    vehicleColor?: string | null;
    milesPerGallon?: string | number | null;
    vehicleIdentificationNumber?: string | null;
    vehicleStatus?: string | null;
    vehicleCondition?: string | null;
    vehicleType?: string | null;
    seatingCapacity?: string | number | null;
    fuelType?: string | null;
    transmission?: string | null;
}): boolean => {
    // Check each field with appropriate validation
    const isValid = (
        // Text inputs - handle all possible cases including undefined/null
        !!vehicleDetails.mileage && vehicleDetails.mileage.trim() !== '' &&
        !!vehicleDetails.vehicleColor && vehicleDetails.vehicleColor.trim() !== '' &&
        !!vehicleDetails.vehicleIdentificationNumber && vehicleDetails.vehicleIdentificationNumber.trim() !== '' &&

        // For milesPerGallon, check if it's a valid number regardless of type
        !!vehicleDetails.milesPerGallon &&
        ((typeof vehicleDetails.milesPerGallon === 'string' && vehicleDetails.milesPerGallon.trim() !== '' && !isNaN(Number(vehicleDetails.milesPerGallon))) ||
            (typeof vehicleDetails.milesPerGallon === 'number' && !isNaN(vehicleDetails.milesPerGallon))) &&

        // For seatingCapacity, validate it's a positive number regardless of type
        !!vehicleDetails.seatingCapacity &&
        ((typeof vehicleDetails.seatingCapacity === 'string' && vehicleDetails.seatingCapacity.trim() !== '' && Number(vehicleDetails.seatingCapacity) > 0) ||
            (typeof vehicleDetails.seatingCapacity === 'number' && vehicleDetails.seatingCapacity > 0)) &&

        // Ensure selection fields have values
        !!vehicleDetails.vehicleStatus && vehicleDetails.vehicleStatus !== '' &&
        !!vehicleDetails.vehicleCondition && vehicleDetails.vehicleCondition !== '' &&
        !!vehicleDetails.vehicleType && vehicleDetails.vehicleType !== '' &&
        !!vehicleDetails.fuelType && vehicleDetails.fuelType !== '' &&
        !!vehicleDetails.transmission && vehicleDetails.transmission !== ''
    );

    return isValid;
};