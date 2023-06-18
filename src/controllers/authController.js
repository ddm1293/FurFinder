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
      user = getUserObject(user);
      const refreshToken = getRefreshToken(user);
      const accessToken = getAccessToken(user);
      // TODO: need to write refreshToken to DB
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
  console.log(req.body);
  try {
    let newUser = await UserService.createUser(req.body);
    newUser = getUserObject(newUser);
    const refreshToken = getRefreshToken(newUser);
    const accessToken = getAccessToken(newUser);
    // TODO: need to write refreshToken to DB
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

function getUserObject(user) {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

function getAccessToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '120s' }
  );
}

function getRefreshToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
}
