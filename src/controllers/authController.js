import jwt from 'jsonwebtoken';
import UserService from '../services/userService.js';
import { UserAlreadyExistException } from '../exceptions/userException.js';
import bcrypt from 'bcrypt';

export const userLogin = async (req, res) => {
  console.log('Server::userLogin');
  try {
    let user = await UserService.getUserByName(req.body.username);
    if (!user && req.body.didSignInFromGoogle) {
      user = await UserService.createUser({
        username: req.body.username,
        email: req.body.username,
        password: ''
      });
    }
    if (user && (
      req.body.didSignInFromGoogle || (!req.body.didSignInFromGoogle && await bcrypt.compare(req.body.password, user.password))
    )) {
      const accessToken = getAccessToken(user);
      const refreshToken = await saveRefreshToken(user);
      user = UserService.getLeanUser(user);
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ message: 'UserLogin Successfully', user, accessToken });
    } else {
      res.status(200).json({ message: 'Incorrect username or password!', user: null });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export const registerUser = async (req, res) => {
  console.log('Server::registerUser');
  try {
    let newUser = await UserService.createUser(req.body);
    const accessToken = getAccessToken(newUser);
    const refreshToken = await saveRefreshToken(newUser);
    newUser = UserService.getLeanUser(newUser);
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: 'Registered successfully!', newUser, accessToken });
  } catch (err) {
    console.error(err);
    if (err instanceof UserAlreadyExistException) {
      res.status(409).send(err.message);
    } else {
      res.status(400).send(err.message);
    }
  }
};

export const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  let foundUser = await UserService.getUserByRefreshToken(refreshToken);
  if (!foundUser) { return res.sendStatus(403); } // forbidden
  /* Otherwise, evaluate jwt */
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.username !== decoded.username) { return res.sendStatus(403); }
      const accessToken = getAccessToken(foundUser);
      foundUser = UserService.getLeanUser(foundUser);
      res.status(200).json({ message: 'RefreshToken Successfully', user: foundUser, accessToken });
    }
  );
};

export const logoutUser = async (req, res) => {
  console.log('Server::logoutUser');
  const cookies = req.cookies;
  // console.log(cookies);
  if (cookies && !cookies.jwt) { return res.sendStatus(204); } // no content
  /* Is refreshToken in db? If so, clear it; clear cookie regardless */
  try {
    const refreshToken = cookies.jwt;
    const foundUser = await UserService.getUserByRefreshToken(refreshToken);
    if (foundUser) {
      foundUser.refreshToken = '';
      await foundUser.save();
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

function getAccessToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' } // 10s for testing purposes; can be longer
  );
}

function getRefreshToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
}
async function saveRefreshToken(user) {
  const refreshToken = getRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return refreshToken;
}
