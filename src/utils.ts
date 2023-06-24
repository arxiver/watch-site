import * as bcrypt from 'bcrypt';
import * as NodeGeocoder from 'node-geocoder';
import { ObjectId } from 'mongodb';

/** Hashes a password with bcrypt
 *
 * @param password The password to hash
 *
 * @return The hashed password
 */
export const hashPassword = async (password: string) => {
 const salt = await bcrypt.genSalt();
 return await bcrypt.hash(password, salt);
};

/** Compares a password with a hash
 *
 * @param password The password to hash
 * @param hash The hash to compare against
 *
 * @return Boolean whether the password matches the hash
 */
export const comparePasswordHash = async (password: string, hash: string) => {
 return await bcrypt.compare(password, hash);
};

/** Infers the city and state from a latitude and longitude
 *  Uses the openstreetmap provider
 *
 * @param latitude The latitude
 * @param longitude The longitude
 *
 * @return An object with the city and state
 *
 * @example
 * const { city, state } = await inferCityAndState(40.7128, 74.0060);
 * console.log(city, state); // New York, NY
 *
 * */

// Set up the geocoder
const geocoder = NodeGeocoder({
 provider: 'openstreetmap',
});

// Infer the city and state from the latitude and longitude
export async function inferCityAndState(
 latitude: number,
 longitude: number,
): Promise<{ city: string; state: string; country: string }> {
 try {
  const [result] = await geocoder.reverse({ lat: latitude, lon: longitude });
  const { city, state, countryCode } = result;
  return { city: city || '', state: state || '', country: countryCode || '' };
 } catch (e) {
  return { city: '', state: '', country: '' };
 }
}

export const toObjectId = (value: string | ObjectId): ObjectId => {
 return typeof value === 'string' ? new ObjectId(value) : value;
};
