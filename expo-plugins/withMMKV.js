const {withMainApplication, withPlugins} = require('@expo/config-plugins');

const withCustomMainApplication = config => {
  return withMainApplication(config, async config => {
    let mainApplication = config.modResults.contents;

    // Adding imports
    const publicClassIndex = mainApplication.indexOf('public class MainApplication');
    mainApplication = `
${mainApplication.substring(0, publicClassIndex - 1)}
import java.util.Collections;

import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.reactnativemmkv.MmkvModule;

${mainApplication.substring(publicClassIndex)}
`;

    // Adding MMKVJSIPackage class
    mainApplication = `
${mainApplication}
class MMKVJSIPackage extends ReanimatedJSIModulePackage {
  @Override
  public List<JSIModuleSpec> getJSIModules(ReactApplicationContext reactApplicationContext, JavaScriptContextHolder jsContext) {
    super.getJSIModules(reactApplicationContext, jsContext);
    MmkvModule.install(jsContext, reactApplicationContext.getFilesDir().getAbsolutePath() + "/mmkv");
    return Collections.emptyList();
  }
}
`;

    // Changing ReanimatedJSIModulePackage to MMKVJSIPackage
    mainApplication = mainApplication.replace(
      'return new ReanimatedJSIModulePackage();',
      'return new MMKVJSIPackage();',
    );

    config.modResults.contents = mainApplication;
    return config;
  });
};

module.exports = function withMMKV(config) {
  return withPlugins(config, [withCustomMainApplication]);
};
