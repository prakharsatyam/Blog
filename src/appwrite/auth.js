import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
 class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client); // whenever we create a new object of this class then only the object of account is created. Preventing default generation of the object and wastage of resources
  }
  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login(email, password);
      } // we are also logging him in as he signs up
      else {
        console.log(userAccount)
        return userAccount;
      }
    } catch (error) {
      console.log("Create Account Error :", error);
    }
  }

  async login(email, password) {
    try {
      const loginResponse = await this.account.createEmailSession(
        email,
        password,
      );
      return loginResponse;
    } catch (error) {
      console.log("Login Error :", error);
    }
  }
  async getCurrentUser() {
    try {
      const dat= await this.account.get();
      return  dat;
      
    } catch (error) {
      console.log("Get Current User Error :", error);
    }

    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout Error :", error);   
    }
  }
  async passwordRecovery(email, recoveryURL, newPassword) {
    try {
      const createRecoveryResponse = await this.account.createRecovery(
        email,
        recoveryURL
      );
      console.log(createRecoveryResponse);

      const updateRecoveryResponse = await this.account.updateRecovery(
        createRecoveryResponse["$id"],
        createRecoveryResponse["$secret"],
        newPassword,
        newPassword
      );
      console.log(updateRecoveryResponse);
    } catch (error) {
      console.log("Password Recovery Error",error);
    }
  }
}
const authService = new AuthService();
export default authService;
