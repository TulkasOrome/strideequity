import { Op } from 'sequelize';
import SettingModel from './settingModel';
import SettingsModel from './settingModel';



const SettingsController = {
  async get(key){
    return SettingsModel.findOne({key});
  },
  async set(key, value){
    const setting = await SettingsModel.findOne({key});
    if(setting) return SettingModel.update({key}, {where: {id: setting.id}});
    return SettingModel.create({key, value})
  },
  async all(){
    return SettingsModel.findAll();
  },
}

export default SettingsController;
