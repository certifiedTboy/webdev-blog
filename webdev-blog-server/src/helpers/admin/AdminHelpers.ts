import User from "../../models/user";
import Blog from "../../models/blog";
import Visits from "../../models/visits";

/**
 * @class AdminHelpers
 */
class AdminHelpers {
  /**
   * @method registeredUsers
   * @static
   * @async
   * @returns {User}
   */
  static async registeredUsers() {
    const users = await User.find({});
    return users
  }

   /**
   * @method allBlogs
   * @static
   * @async
   * @returns {User}
   */
    static async allBlogs() {
        const blogs = await Blog.find({});
        return blogs
      }

  /**
   * @method visitIncrease
   * @static
   * @async
   * @returns {Visits}
   */
    static async visitIncrease() {
      const visits = await Visits.findOne({url:"localhost:3000"});
     
      if(!visits){
        const newVisit = new Visits({counter:1})
        await newVisit.save()
        return newVisit
      }

      visits.counter +=1
      await visits.save()

      return visits
    }

    /**
   * @method totalVisits
   * @static
   * @async
   * @returns {Visits}
   */
     static async totalVisits() {
      const visits = await Visits.findOne({url:"localhost:3000"});
      if(visits){
        return visits
      }
    }
}

export default AdminHelpers;
