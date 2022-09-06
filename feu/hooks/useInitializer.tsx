import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPharmacies, getUpdateVersion, updateDeviceUpdateVersionTo } from '../database/db';
import { FETCH_ALL_PHARMACIES } from '../stores/actions';
import { fetchAllPharmacies, getCurrentUpdateVersion } from '../stores/pharmaciesActions';
import { DBPharmacy, RootReducerType } from '../types/dataTypes';
import { parsePharmacy } from '../utils/datasMorphing';

const useInitializer = () => {

    const pharmaciesDatas = useSelector((state: RootReducerType) => {
        return state.pharmacies.toDisplay;
    });
    const dispatch = useDispatch();


    const isDeviceVersionValid = async () => {
        // Check is current version of data is up to date.
        console.log("Checking for device version...");
        try {
            let deviceVersion = await getCurrentUpdateVersion()
            let lastVersion = await getUpdateVersion()

            // console.log(deviceVersion, lastVersion)
            if (deviceVersion === lastVersion) return true;
            return false;
        } catch (error) {
            throw error;
        }
    }


    const updateDeviceVersion = async () => {
        // Update current device version with lastest
        console.log("Updating device version...");
        try {
            const latestVersion = await getCurrentUpdateVersion()
            await updateDeviceUpdateVersionTo(latestVersion)
            return latestVersion
        } catch (error) {
            throw error;
        }

    }

    const init = useCallback(async () => {
        let pharmacies: DBPharmacy[] = await getAllPharmacies()
        if (pharmacies.length > 0) {
            // const isOk = await isDeviceVersionValid()

            console.log("Using locally stored pharmacies")
            let pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy))
            dispatch({
                type: FETCH_ALL_PHARMACIES,
                pharmaciesDatas: pharmaciesDatas
            })
            // const isOk = await isDeviceVersionValid()
            // console.log("isOk: " + isOk)
            if (!await isDeviceVersionValid()) {
                console.log("Outdated device version, fetching most recent one...")
            }



            // Check if version  is ok to work with here

        } else if (!pharmacies.length) {
            // There is no pharmacies in the database yet.
            console.log("Fetching pharmacies online")
            // await dropPharmaciesTable()
            await Promise.all([dispatch(fetchAllPharmacies()), updateDeviceVersion()])
            // await dispatch(fetchAllPharmacies())
            // await updateDeviceVersion()
            // const latestVersion = await getCurrentUpdateVersion()
            // await updateDeviceUpdateVersionTo(latestVersion)
            // const currentVersion = await getUpdateVersion()
            // console.log("Latest version: " + latestVersion)
            // console.log("Current version: " + currentVersion)

        } else {
            // await dispatch(fetchAllPharmacies())
            console.log(pharmacies)
            console.log(!pharmacies)
            console.log("Something went wrong")
        }
    }, [pharmaciesDatas])

    return { init }
}

export default useInitializer