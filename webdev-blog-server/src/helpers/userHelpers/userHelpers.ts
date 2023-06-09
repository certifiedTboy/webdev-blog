import User from "../../models/user";
import {
  NotFoundError,
  ServerError,
  UnauthenticatedError,
  UnprocessableError,
} from "../../lib/exceptions";

/**
 * @class UserHelper
 */
class UserHelper {
  /**
   * @method createUser
   * @static
   * @async
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} profilePicture
   * @returns {Promise<User>}
   */
  static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string
  ) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const  username = email.split("@")[0] + "-" + uniqueSuffix;
    const userData = {
     username,
      firstName,
      lastName,
      email,
      profilePicture,
    };
    const user = new User(userData);

    await user.save();
    return user;
  }

   /**
   * @method updateUser
   * @static
   * @async
   * @param {string} userId
   * @param {string} profilePicture
   * @returns {Promise<User>}
   */
    static async updateUser(
      userId:string,
      profilePicture: string, 
      firstName:string, lastName:string
    ) {
      
      const userData = {
        profilePicture,
        firstName, lastName
      };
      const updatedUser = await User.findByIdAndUpdate(userId, userData)
      return updatedUser;
    }

  /**
   * @method profileUpload
   * @static
   * @async
   * @param {string} userId
   * @returns {Promise<User>}
   */
  static async profileUpload(userId: string, imagePath: string) {
    const updateData = {
      profilePicture: imagePath,
    };
    const updateUserPicture = await User.findByIdAndUpdate(userId, updateData);

    if (updateUserPicture) {
      return updateUserPicture;
    } else {
      throw new UnprocessableError("upload did not work");
    }
  }

  /**
   * @method updateUserAbout
   * @static
   * @async
   * @param {string} userId
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} about
   * @returns {Promise<User>}
   */

  static async updateUserData(
    userId: string,
    firstName: string,
    lastName: string,
    about: string
  ) {

      const updateData = {
        firstName,
        lastName,
        about,
      };
   
    const updateUser = await User.findByIdAndUpdate(userId, updateData);
    if (updateUser) {
      return updateUser;
    } else {
      throw new UnprocessableError("something went wrong");
    }
  }
  /**
   * @method checkThatEmailExist
   * @static
   * @async
   * @param {string} email
   * @returns {Promise<User>}
   */
  static async checkThatEmailExist(email: string) {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return foundUser;
    }

    throw new NotFoundError("User not found!");
  }

  /**
   * @method checkThatUserExistByEmail
   * @static
   * @async
   * @param {string} email
   * @returns {Promise<User>}
   */
   static async checkThatUserExistByEmail(email: string) {
    const foundUser = await User.findOne( {email});
    if (foundUser) {
      return foundUser;
    }

  }

  /**
   * @method checkThatEmailExistForLogin
   * @static
   * @async
   * @param {string} email
   * @returns {Promise<User>}
   */
  static async checkThatEmailExistForLogin(email: string) {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return foundUser;
    }

    throw new UnauthenticatedError("Invalid login credentials!");
  }

  /**
   * @method getUserProfilePicture
   * @static
   * @async
   * @param {string} userId
   * @returns {Promise<User>}
   */
  static async getUserProfilePicture(userId: string) {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      return foundUser.profilePicture;
    }

    throw new NotFoundError("something went wrong");
  }

  /**
   * @method getOtherUserProfilePicture
   * @static
   * @async
   * @param {string} userId
   * @returns {Promise<User>}
   */
  static async getOtherUserProfilePicture(username: string) {
    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return foundUser.profilePicture;
    }

    throw new NotFoundError("something went wrong");
  }

  /**
   * @method checkThatUserExistByUsername
   * @static
   * @async
   * @param {string} username
   * @returns {Promise<User>}
   */
  static async checkThatUserExistByUsername(username: string) {
    const foundUser = await User.findOne({ username }).select("-password");

    if (foundUser) {
      return foundUser;
    } else {
      throw new NotFoundError("user does not exist");
    }
  }

  /**
   * @method updateUserFollower
   * @static
   * @async
   * @param {string} userId
   * @param {string} username
   * @returns {Promise<User>}
   */
  static async updateUserFollower(
    userId: string,
    username: string
  ): Promise<any> {
    try {
      const currentUser = await this.checkThatUserExistById(userId);
      const user = await this.checkUserByUsername(username);

      if (currentUser && user) {
        const userAlreadyFollowed = await this.checkThatUserAlreadyFollowed(
          currentUser._id.toString(),
          user._id.toString()
        );

        // update user following
        if (!userAlreadyFollowed) {
          const followerData = {
            username: currentUser.username,
            name: currentUser.firstName + " " + currentUser.lastName,
            userId: currentUser._id,
          };

          const followingData = {
            username: user.username,
            name: user.firstName + " " + user?.lastName,
            userId: user._id,
          };
          user?.followers.push(followerData);
          currentUser.following.push(followingData);

          await user.save();
          await currentUser.save();

          return currentUser;
        } else {
          const followingIndex = currentUser.following.findIndex(
            (follow: any) => follow.userId === user._id
          );
          const followerIndex = user.followers.findIndex(
            (follower) => follower.userId === currentUser._id
          );
          currentUser.following.splice(followingIndex, 1);
          user.followers.splice(followerIndex, 1);
          await currentUser.save();
          await user.save();
          return currentUser;
        }
      }
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method checkThatUserExistById
   * @static
   * @async
   * @param {string} userId
   * @returns {Promise<User>}
   */
  static async checkThatUserExistById(userId: string) {
    const foundUser = await User.findById(userId)
      .populate("followers")
      .populate("following")
      .exec();

    return foundUser;
  }

  /**
   * @method checkUserByUsername
   * @static
   * @async
   * @param {string} username
   * @returns {Promise<User>}
   */
  private static async checkUserByUsername(username: string) {
    const foundUser = await User.findOne({ username })
      .populate("followers")
      .populate("following")
      .exec();

    return foundUser;
  }

  /**
   * @method checkThatUserAlreadyFollowed
   * @static
   * @param {string} followerId
   * @param {string} userId
   * @returns {Promise<Boolean>}
   */
  static async checkThatUserAlreadyFollowed(
    followerId: string,
    userId: string
  ) {
    const user = await this.checkThatUserExistById(followerId);
    if (user) {
      const alreadyFollowedUser = user.following.find(
        (follow: any) => follow.userId.toString() === userId
      );

      return alreadyFollowedUser;
    }
  }
}

export default UserHelper;
