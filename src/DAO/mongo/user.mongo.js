import UserModel from "./models/user.mongo.model.js";

export default class UsersMongo {
  async createUser(data) {
    try {
      if (data) return await UserModel.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      if (id) return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async getUsers() {
    try {
      return await UserModel.find().lean().exec();
    } catch (error) {
      throw error;
    }
  }
  getUserByEmail = async (email) => {
    try {
      if (email) {
        const user = await UserModel.findOne({ email: email });
        if (user) return user;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };
  getUserByEmailCode = async (email, verificationCode) => {
    try {
      if ((email, verificationCode)) {
        const user = await UserModel.findOne({ email, verificationCode });
        return user;
      }
    } catch (e) {
      throw e;
    }
  };
  async updateUser(id, data) {
    try {
      if ((id, data)) return await UserModel.findByIdAndUpdate(id, data);
    } catch (e) {
      throw e;
    }
  }
  async deleteUser(id) {
    try {
      if (id) return await UserModel.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}
