import { readConfig, setUser } from "./config";


function main() {
    setUser("Taijaun");
    const updatedConfig = readConfig();
    console.log(updatedConfig);
}

main();