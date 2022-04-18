import Reactotron, {
  openInEditor,
  asyncStorage,
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.configure({ name: 'Refuture diggers', host }) // controls connection & communication settings
  .setAsyncStorageHandler(AsyncStorage)
  // .use(asyncStorage())
  .use(openInEditor())
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default reactotron;
