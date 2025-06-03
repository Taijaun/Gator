import fs from "fs";
import ost from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName: string
};

export function setUser(username: string, config: Config){
    config.currentUserName = username;
    writeConfig(config);

}

export function readConfig(){
    const path = getConfigFilePath()
    const json = fs.readFileSync(path, "utf-8");
    const jsonToObj = JSON.parse(json);
    return validateConfig(jsonToObj);
}

function getConfigFilePath() {
   const home = ost.homedir();
   const filePath = path.join(home, ".gatorconfig.json");
   return filePath;
}

function writeConfig(config: Config) {
    const data = JSON.stringify(config);
    fs.writeFileSync(getConfigFilePath(), data);
}

function validateConfig(rawConfig: any): Config {
    if ("dbUrl" in rawConfig && "currentUserName" in rawConfig){
        if (typeof rawConfig.dbUrl == "string" && typeof rawConfig.currentUserName == "string"){
            const config: Config = {
                dbUrl: rawConfig.dbUrl,
                currentUserName: rawConfig.currentUserName
            };
            return config;
        }
    }
    throw new Error("Invalid config file");
}