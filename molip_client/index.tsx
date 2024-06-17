import {AppRegistry} from 'react-native';
import MolipApp from './App';
import {name as appName} from './app.json';
import AuthManger from 'src/api/auth';

async function setup() {
    new AuthManger();
}

setup();
AppRegistry.registerComponent(appName, () => MolipApp);
