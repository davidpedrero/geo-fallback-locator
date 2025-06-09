type GeoResult = {
    success: boolean
    state?: string | null
    country?: string | null
    error?: unknown
}

async function fetchUserLocation(): Promise<GeoResult> {
    const runGeoCheck = async (): Promise<GeoResult> => {
        return new Promise((resolve) => {
            const successCallback = (position) => {
                const { latitude, longitude } = position.coords;
                // console.log(latitude, longitude);

                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                    .then(response => response.json()
                        .then(data => {
                            console.log(data);

                            const { principalSubdivision, countryCode } = data;
                            console.log(`User location via Geolocation check: ${principalSubdivision}, ${countryCode}`);

                            resolve({ success: true, state: principalSubdivision, country: countryCode });
                        }))
            }

            const errorCallback = (error) => resolve({ success: false, error });

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        });
    }

    const geoCheckResult = await runGeoCheck();
    console.log("Geo check result:");
    console.log(geoCheckResult);

    if (geoCheckResult.success) return geoCheckResult;

    // If geocheck is unsuccessful, we check user location via IP
    const runIPCheck = async (): Promise<GeoResult> => {
        // return { success: false };

        try {
            const response = await fetch("https://ipwho.is/");
            const data = await response.json();
            // console.log(data);

            const { region, country_code } = data
            console.log(`User location via IP check: ${region}, ${country_code}`);

            return { success: true, state: region, country: country_code };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    }

    const ipCheckResult = await runIPCheck();
    console.log("IP check result:");
    console.log(ipCheckResult);

    if (ipCheckResult.success) return ipCheckResult;

    // If both location checks are unsuccessful, return success: false
    console.log("Could not determine user's location");
    return { success: false, state: null, country: null };
}

fetchUserLocation();