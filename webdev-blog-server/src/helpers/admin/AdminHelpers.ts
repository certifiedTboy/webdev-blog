import User from "../../models/user";
import Blog from "../../models/blog";
import Visits from "../../models/visits";
import axios from "axios";

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
    static async visitIncrease(userIp:string) {
      const visits = await Visits.findOne({url:"localhost:3000"});
      const response = await this.getCountryFromIp(userIp)

      const country = response.geoplugin_countryName
      const state = response.geoplugin_regionName
      const city = response.geoplugin_city

      const visitData = { url:"localhost:3000", counter: 1, ipData: {userIp, updatedAt: new Date(), country, state, city}  }
      if(!visits){
        const newVisit = new Visits(visitData)
        await newVisit.save()
        return newVisit
      }else {
        const date = new Date()
        const today = date.getDay()
        const ipAddress = visits.ipData.find((ip:any) => ip.userIp === userIp)
        if(!ipAddress){
          visits.ipData.push({userIp, updatedAt: new Date(), country, state, city})
          visits.counter += 1
          await visits.save()
          return visits
      }else {
        if(ipAddress.updatedAt.getDay() !== today){
          visits.counter += 1
  
          return visits
        }
      }
    }
     
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


    /**
     * @method getCountryFromIp
     * @static
     * @async
     * @returns {Country}
     */

    static async getCountryFromIp (userIp:string) {
     const country = await axios.get(`http://www.geoplugin.net/json.gp?ip=102.36.134.242`)
      if(country){
        return country.data
      }
      
    }
}

export default AdminHelpers;
