//Import Packages
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

//Import Files

/**
 * @function <b>hashPasswordUsingBcrypt</b><br>
 * Hash Password
 * @param {String} plainTextPassword Unsecured Password
 * @return {String} Secured Password
 */
const hashPasswordUsingBcrypt = (plainTextPassword: string): string => {
  try {
    return bcrypt.hashSync(plainTextPassword, process.env.salt_round);
  } catch (error) {
    throw error;
  }
};

/**
 * @function <b>comparePasswordUsingBcrypt</b><br> Verify Password
 * @param {String} plainTextPassword Password to be checked
 * @param {String} passwordhash Hashed Password
 * @return {Boolean} True if match else False
 */
const comparePasswordUsingBcrypt = (
  plainTextPassword: string,
  passwordhash: any,
) => bcrypt.compare(plainTextPassword, passwordhash);

/**
 * @function <b>generateAuthToken</b><br> Generate Token
 * @param {Object} criteriaForJwt keys for jwt to generate tokens
 * @return {String} Auth Token
 */

const generateAuthToken = async (criteriaForJwt: any): Promise<string> => {
  console.log('process.env.jwtSecret', process.env.jwtSecret);

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret not found in environment variables');
  }
  const token = await jwt.sign(criteriaForJwt, 'thisis');
  if (token) {
    try {
      return token;
    } catch (error) {
      throw error;
    }
  }
};

const encryptPasswordUsingBcrypt = async (
  plainTextPassword: string,
  saltRounds: number = 10,
): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password encryption failed');
  }
};

/**
 * @function <b>findByToken</b><br> decrypt Token
 * @param {String} token token to be decrypt
 * @return {Object}
 */
const findByToken = (token: string) => jwt.verify(token, process.env.jwtSecret);

export {
  hashPasswordUsingBcrypt,
  comparePasswordUsingBcrypt,
  generateAuthToken,
  findByToken,
  encryptPasswordUsingBcrypt,
};
